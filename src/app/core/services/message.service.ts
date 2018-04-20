import { Injectable } from '@angular/core';
import { IMessage } from './../interfaces/Imessage';
 
@Injectable()
export class MessageService {
    private storage: IMessage[]=[];

    public constructor() { }

    public pushMessage(message:IMessage)
    {
        if (message)
            this.storage.push(message);
    }

    public getMessage(page:string, topic:string)
    {
        var message = this.storage.filter(value=>value.page==page && value.topic==topic)[0];
        
        //Si se encuentra el mensaje entonces se quita del stored de mensajes. 
        if (message)
            this.storage=this.storage.filter(value=>!(value.page==page && value.topic==topic));
        
        return message.data;
    }

}