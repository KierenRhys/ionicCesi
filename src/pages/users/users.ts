import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  public token;
  public users;
  public headersGet : Headers;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    this.token = sessionStorage.getItem('token');
    this.headersGet = new Headers();
    this.headersGet.append('token', this.token);
  }

  ionViewDidLoad() {
    this.getUsers();
  }

  getUsers() {
    this.http.get('http://cesi.cleverapps.io/users', {headers: this.headersGet}).subscribe(res=> {
      this.users = res.json();
    }, (err) => {
      console.log(err);
      alert('Authentication error');
    })
  };

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getUsers();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
