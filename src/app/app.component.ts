import { Component } from '@angular/core';
import { AppService } from './app.service';
import { element } from '../../node_modules/protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  message:String;
  user:String;
  room:String;
  messageArray:Array<{user:String,message:String}>=[];

  constructor(private appServ:AppService)
  {
    this.appServ.messageSent().subscribe((data)=>
    {
      console.log(data);
      this.messageArray.push(data);
    });

    this.appServ.newUserJoined().subscribe((data)=>
      {
        console.log(data);
        this.messageArray.push(data);
      });

    this.appServ.userLeft().subscribe(data => {
      console.log(data);
      this.messageArray.push(data);
    });
  }

  send()
  {
    this.appServ.sendMessage({ user: this.user,room:this.room, message:this.message});
    this.message='';
  }

  join()
  {
    this.appServ.joinRoom({user:this.user,room:this.room});
  }

  leave()
  {
    this.appServ.leaveRoom({ user: this.user, room: this.room});
  }
  
}

