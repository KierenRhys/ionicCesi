import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public username : string;
  public pwd : string;
  public urlPhoto : string;
  public headers : Headers;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  createAccount() {
    let body = 'username='+this.username+'&pwd='+this.pwd+'&urlPhoto='+this.urlPhoto;

    this.http.post('http://cesi.cleverapps.io/signup', body, {headers: this.headers}).subscribe(res=> {
      console.log('create account succeed');
      this.gotoConnect();
    }, (err) => {
      console.log(err);
      alert('Authentication error');
    })
  }

  gotoConnect() {
    this.navCtrl.push(HomePage, {});
  }
}
