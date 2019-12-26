
export class ChatMessage {
    sender: String;
    senderCode: String;
    receiverCode: String;
    groupCode: String;
    groupName: String;
    content: String;
    senderProfile: String;
    date: Date;
    
    public static create(content: String) {
        let message = new ChatMessage();
        message.content = content;

        return message;
    }
}