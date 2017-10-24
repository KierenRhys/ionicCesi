import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  public token;
  public messages;
  public sendingMessage;
  public headers : Headers;
  public headersGet : Headers;
  public element;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    this.token = sessionStorage.getItem('token');
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.headers.append('token', this.token);
    this.headersGet = new Headers();
    this.headersGet.append('token', this.token);
  }

  getMessages() {
    this.http.get('http://cesi.cleverapps.io/messages', {headers: this.headersGet}).subscribe(res=> {
      this.messages = res.json().sort((a, b) => b.date - a.date);
    }, (err) => {
      console.log(err);
      alert('Authentication error');
    })
  };

  sendMessage() {
    let body = 'message='+this.sendingMessage;
    
    this.http.post('http://cesi.cleverapps.io/messages', body, {headers: this.headers}).subscribe(res=> {
      console.log('Message send');
      this.refreshAfterSending();
    }, (err) => {
      console.log(err);
      alert('Error message');
    })
  }

  ionViewDidLoad() {
    this.getMessages();
  }

  refreshAfterSending() {
    this.getMessages();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getMessages();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}
