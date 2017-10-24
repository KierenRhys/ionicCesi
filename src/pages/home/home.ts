import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { SignupPage } from '../signup/signup';
import { MessagesPage } from '../messages/messages';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  public username : string;
  public pwd : string;
  public token;
  public headers : Headers;

  constructor(public navCtrl: NavController, public http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  connect() {
    let body = 'username='+this.username+'&pwd='+this.pwd;

    this.http.post('http://cesi.cleverapps.io/signin', body, {headers: this.headers}).subscribe(res=>{
      this.token = res.json();
      console.log('connected');
      sessionStorage.setItem('token', this.token.token);
      this.gotoTabs();
    }, (err) => {
      console.log(err);
      alert('error calling HTTP signin'+ err);
    })
  }

  gotoTabs() {
    this.navCtrl.push(TabsPage, {});
  }

  gotoSignup() {
    this.navCtrl.push(SignupPage, {});
  }

}
