import { Component, OnInit, Host } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {


  public clients: any[] = [];

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.clients = [];
    this.listAll();
  }

  listAll(){
    this.userService.listAllClients().subscribe((data)=>{
      console.log(data);
      this.clients = data;
    });
  }

  public alterar(item: any) {
   const url = `clientes/cadastrar/${item._id}`;
   this.router.navigate([url]);
  }

}
