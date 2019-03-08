import * as io from 'socket.io-client';
import { Injectable } from '../../node_modules/@angular/core';
import { Observable } from '../../node_modules/rxjs';


@Injectable()
export class AppService
{
    private socket;
    private url = 'http://localhost:3000';

    constructor()
    {
        this.socket=io(this.url);
    }

    sendMessage(data)
    {
        this.socket.emit('new-message',data);
    }

    messageSent()
    {
        let observable = new Observable<{ user: String,room:String, message: String }>(observer => {
            this.socket.on("message sent", (data) => {
                observer.next(data);
            })
            return () => {
                this.socket.disconnect();
            }
        })
        return observable;
    }

    joinRoom(data)
    {
        this.socket.emit('join',data);
    }

    newUserJoined()
    {
        let observable=new Observable<{user:String,message:String}>(observer=>{
            this.socket.on("new user joined",(data)=>{
                observer.next(data);
            })
           return()=>
           {
               this.socket.disconnect();
           } 
        })
        return observable;
    }

    leaveRoom(data)
    {
        this.socket.emit('leave',data);
    }
    
    userLeft()
    {
        let observable = new Observable<{ user: String, message: String }>(observer => {
            this.socket.on("user left", (data) => {
                observer.next(data);
            })
            return () => {
                this.socket.disconnect();
            }
        })
        return observable;
    }

}