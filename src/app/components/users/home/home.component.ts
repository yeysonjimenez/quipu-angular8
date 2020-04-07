import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from '../../../services/firebase.service';
import {Md5} from 'ts-md5';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public data ;
  public sell: number = null;
  public newtokens: number = null;
  public price: number = null;
  public id = '';
  public currentStatus = 1;
  public congratulations: boolean = true;
  public user = '';
  public tokens = '';
  public buy: number = null;
  constructor(private router: Router, private firebaseService: FirebaseService) {
    this.data = this.router.getCurrentNavigation().extras.state.example;
    this.id = this.router.getCurrentNavigation().extras.state.ejemplo2;
  }

  ngOnInit() {
   // console.log(this.data['tokens'] - this.sell);
    console.log(this.id);
   // console.log(this.data);
    this.getUSer(this.id);
  }

  onClickMe() {
   this.congratulations = false;
    this.updateUserFunc(this.id);
  }

  updateUserFunc(documentId){
    this.newtokens = this.data['tokens'] - this.sell;
    console.log(this.data['tokens'],this.sell);
   this.data['tokens'] = this.newtokens;
   this.data['sold_price'] = this.price;
    this.updateData(this.id);
  }
  onLoOut(){
    this.router.navigate(['/login']);
  }
  buyTokens(){
    this.newtokens = ( this.data['tokens'] + +this.buy);
    this.data['tokens'] = this.newtokens;
    console.log(this.data['tokens']);
    this.updateData(this.id);
  }

  private getUSer(id: string) {
    console.log(id , ' is in home ');
    this.firebaseService.getuser(id).subscribe((data) => {
      this.data = data.payload.data();
      this.user = this.data['user'];
      this.tokens = this.data['tokens'];
    });
  }

  private updateData(id: string) {
    this.firebaseService.updateUser(id, this.data).then((user) => {
      this.currentStatus = 1;
      console.log('Documento editado exitósamente');
      this.sell = null;
      this.price = null;
      this.buy = null;
    }, (error) => {
      console.log(error);
    });
  }
}
