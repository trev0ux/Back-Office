import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ChatContact } from 'src/app/models/chat-contact';
import * as io from 'socket.io-client';
import {config} from '../../../config';

import { User } from 'src/app/models/user.model';

import { AuthService } from 'src/app/services/auth.service';
import { ChatMessage } from 'src/app/models/chat-message';
import { GroupContact } from 'src/app/models/group-contact';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserType } from 'src/app/models/user-type';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.css']
})
export class MensagensComponent implements OnInit {

  clients: ChatContact[] = [];
  professionals: ChatContact[] = [];
  currentMessages: ChatMessage[] = [];
  historyMessages: ChatMessage[] = [];
  
  groupsContact: GroupContact[] = [];
  
  currentContact: ChatContact;
  currentGroupContact: GroupContact;

  private socket: any;
  typedMessage: String;

  private userLoggedIn: any;

  private FIRST_MESSAGE_GROUP = "first-message";

  
private USER_SUPPORT_ID = "5d099ea6a2c217289518aa5c";

  constructor(private userService: UserService, private authService: AuthService, private modalService: NgbModal) { 
  }

  ngOnInit() {
    this.findUserLogged();
    this.conectSocketServer();
    this.subscribeMessages();
    this.subscribeHistoryMessages();
    this.subscribeFirstMessage();
    this.findOfficeGroups();
    this.findUsers();
  }

  private conectSocketServer() {
    this.socket = io(config.ENDPOINT_SOCKETIO_CHAT_PORT, {
      transports: ['websocket'],
      upgrade: true
    });
  }

  private findUsers() {
    this.userService
        .contacts()
        .subscribe(users => {
          this.clients = users.filter(user => user.role == "Client")
              .map(user => {
                let contact = new ChatContact();
                contact.id = user.id;
                contact.name = user.name;
                contact.contactId = user.contactId;
                contact.email = user.email;
                contact.role = user.role;

                return contact;
              });
          
          this.professionals = users.filter(user => user.role == "Professional")
              .map(user => {
                let contact = new ChatContact();
                contact.id = user.id;
                contact.name = user.name;
                contact.contactId = user.contactId;
                contact.email = user.email;
                contact.role = user.role;

                return contact;
              });    
        }, error => console.log("Erro ao carregar usuarios"));
  }

  private findOfficeGroups() {
    this.userService
        .userOfficeGroups(this.USER_SUPPORT_ID)
        .subscribe(userOfficeGroups => {
          this.groupsContact = userOfficeGroups;

          this.conectGroupsOnline(this.groupsContact);
        });
  }

  public loadHistory(contact: ChatContact) {
    this.currentGroupContact = new GroupContact();
    this.historyMessages = [];
    this.currentMessages = [];

    this.currentContact = contact;
    
    let selectedGroupContact = this.groupsContact.find(groupContact => groupContact.contactId == this.currentContact.contactId);

    if (selectedGroupContact && selectedGroupContact != null) {
      this.currentGroupContact = selectedGroupContact;

      this.socket.emit('load-room-history',	this.currentGroupContact.groupCode); 
    } 
  }

  public send(userType: String) {
    if (!this.currentContact || this.currentContact == null) {
      this.modalService.open("Selecione um contato!", { size: 'lg' });
      return;
    }

    if (this.currentGroupContact && this.currentGroupContact.contactId == this.currentContact.contactId) {
      let message = new ChatMessage();
      message.sender = this.userLoggedIn.name;
      message.senderCode = this.userLoggedIn._id;
      message.receiverCode = this.currentContact.id;
      message.content =  this.typedMessage;
      message.groupCode = this.currentGroupContact.groupCode;
      message.date = new Date();
      message.groupName = 'Suporte Yoolo';

      this.socket.emit('manage-room',	message.groupCode, message);
      this.typedMessage = ""; 
    } else {
      let newGroup = {groupName: '', guestEmail: '', founderId: ''};
      //newGroup.groupName = this.userLoggedIn.name;
      newGroup.groupName = 'Suporte Yoolo';
      newGroup.guestEmail = this.currentContact.email;
      newGroup.founderId = this.USER_SUPPORT_ID;

      this.userService
          .createSupportGroup(newGroup)
          .subscribe((createdGroup: any) => {
            if (userType == UserType.CLIENT) {
              this.clients = this.clients.map(client => {
                if (client.id == createdGroup.guestUserId) {
                  client.contactId = createdGroup.guestContactId;
                }
  
                return client;
              })
            }

            if (userType == UserType.PROFESSIONAL) {
              this.professionals = this.professionals.map(professional => {
                if (professional.id == createdGroup.guestUserId) {
                  professional.contactId = createdGroup.guestContactId;
                }
  
                return professional;
              })
            }

            let newGroupContact = new GroupContact();
            newGroupContact.groupCode = createdGroup.code;
            newGroupContact.contactId = createdGroup.guestContactId;
            this.groupsContact.push(newGroupContact);

            this.currentGroupContact = newGroupContact;
            
            let message = new ChatMessage();
            message.sender = this.userLoggedIn.name;
            message.senderCode = this.userLoggedIn._id;
            message.receiverCode = this.currentContact.id
            message.content =  this.typedMessage;
            message.groupCode = this.currentGroupContact.groupCode;
            message.date = new Date();
            message.groupName = 'Suporte Yoolo';

            this.socket.emit(this.FIRST_MESSAGE_GROUP,	message.groupCode, message);
            this.typedMessage = ""; 
        });
    }
  }

  private subscribeMessages() {
    this.socket.on('manage-room', (msg) => {
      let actualMessage = new ChatMessage();
      
      actualMessage.senderCode = msg.senderCode;
      actualMessage.sender = msg.sender;
      actualMessage.content = msg.content;
      actualMessage.groupCode = msg.groupCode;
      actualMessage.date = msg.date;

      this.currentMessages.push(actualMessage);
    });
  }

  private subscribeHistoryMessages() {
    this.socket.on('load-room-history', (msg) => {
      let actualMessage = new ChatMessage();
      
      actualMessage.senderCode = msg.senderCode;
      actualMessage.sender = msg.sender;
      actualMessage.content = msg.content;
      actualMessage.groupCode = msg.groupCode;
      actualMessage.date = msg.date;

      this.historyMessages.push(actualMessage);
    });
  }

  private subscribeFirstMessage() {
    this.socket.on('first-message', (msg) => {
      let actualMessage = new ChatMessage();
      
      actualMessage.senderCode = msg.senderCode;
      actualMessage.sender = msg.sender;
      actualMessage.content = msg.content;
      actualMessage.groupCode = msg.groupCode;
      actualMessage.date = msg.date;

      this.userService.findUserContact(actualMessage.senderCode)
      .subscribe(userContact => {
        let contact = new ChatContact();
        contact.id = userContact.id;
        contact.name = userContact.name;
        contact.contactId = userContact.contactId;
        contact.email = userContact.email;
        contact.role = userContact.role;

        if (userContact.role == 'Client') {
          this.clients.push(contact);
        }

        if (userContact.role == 'Professional') {
          this.professionals.push(contact);
        }

        let groupContact = new GroupContact();
        groupContact.contactId = contact.contactId;
        groupContact.groupCode = msg.groupCode;

        this.groupsContact.push(groupContact);
        this.currentMessages.push(actualMessage);

        this.socket.emit('create-or-conect-room',	msg.groupCode);
      });
    });
  }

  private conectGroupsOnline(groups: GroupContact[]) {
    groups.forEach(group => {
      this.socket.emit('create-or-conect-room',	group.groupCode);
    });
  }

  public displayLastMessage(client: any) {
    let content: any = "";

    this.currentMessages.forEach(message => {
      if (message.senderCode == client.id) {
        content = message.content;
      }
    });

    return content;
  }

  public shouldDisplayMessage(message: ChatMessage): Boolean {
    return (this.currentGroupContact && this.currentGroupContact.groupCode == message.groupCode); 
  }

  private findUserLogged() {
    this.userLoggedIn = this.authService.isAuthenticated();
  }

  public resetChat() {
    console.log("Reset Chat...");

    this.currentGroupContact = new GroupContact();
    this.currentContact = new ChatContact();
    this.historyMessages = [];
    this.currentMessages = [];
  }
}
