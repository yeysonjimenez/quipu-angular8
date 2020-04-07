import {Component, OnInit, SimpleChanges} from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
    ) { }

  public email = '';
  public password = '';
  public mensaje = '';
  public tokens: number = null;
  public users = [];
  public id = '';
  ngOnInit() {
    console.log('This is a init !');
  }
  onLogin(): void {
    //this.onCreateUser();
    this.checkProfile();
  }
 getUsers(){
   this.firebaseService.getUsers().subscribe((userSnapshot) => {
     this.users = [];
     userSnapshot.forEach((userData: any) => {
       this.users.push({
         id: userData.payload.doc.id,
         data: userData.payload.doc.data()
       });
     });
   });
 }

  private checkProfile() {
    console.log(this.email);
    this.firebaseService.example(this.email,this.users).subscribe((data) => {
      console.log(data);
      if(data.length > 0){
        console.log('find');
        data.forEach((userData: any) => {
          console.log(userData.payload.doc.id,"id");
          this.sendHome(userData.payload.doc.id);
        });
      }
      else {
        console.log('not found');
        this.onCreateUser();
      }
    });
  }

  onCreateUser(){
    var data = {
      user: this.email,
      pass: Md5.hashStr(this.password),
      tokens: 100,
      purchased_price: 1,
      sold_price: 0,
    };
    this.firebaseService.createUser(data).then((datos) => {
      this.mensaje = 'Usuario creado exitósamente!';
      this.id = datos.id;
      console.log(datos,this.mensaje);
      this.router.navigate(['/home'],
        { state: { example: data, ejemplo2: this.id } });
    }, (error) => {
      this.email = error;
      console.error(error);
    });
  }


  onLogout() {
  //  this.authService.logoutUser();
  }
  onLoginRedirect(): void {
    this.email = 'ya';
  }

  private sendHome(id) {
    this.router.navigate(['/home'],
      { state: {  ejemplo2: id } });
  }
}
