import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from '../environments/environment.prod';
import { LocalStorageService } from 'angular-2-local-storage';
import * as CryptoJS from 'crypto-js';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  
  @ViewChild('f',{static : false}) searchForm: NgForm;
  
  
  token = 'jvbfihbe';
  baseURL = 'https://api.spotify.com/v1/audio-features/';
  trackURL = 'https://api.spotify.com/v1/tracks/';
  notLoggedIn = false;

  
  constructor(
    private http: HttpClient, 
    private router: Router,
    private storage: LocalStorageService,
    private activatedRoute: ActivatedRoute
    ){
  }


goToLoginPage() {
  const state = this.strRandom(40);
  const codeVerifier = this.strRandom(128);
  this.storage.set('state', state);
  this.storage.set('codeVerifier', codeVerifier);
  const codeVerifierHash = CryptoJS.SHA256(codeVerifier).toString(CryptoJS.enc.Base64);
  const codeChallenge = codeVerifierHash
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  const params = [
      'response_type=code',
      'state=' + state,
      'client_id=' + environment.oauthClientId,
      'code_challenge=' + codeChallenge,
      'code_challenge_method=S256',
      'redirect_uri=' + environment.oauthCallbackUrl,
  ];
  window.location.href = environment.oauthLoginUrl + '?' + params.join('&');
  this.notLoggedIn = false;
}
private strRandom(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
  ngOnInit(){
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.code) {
          this.getAccessToken(params.code, params.state);
      }
  });
  }
  getAccessToken(code: string, state: string) {
    if (state !== this.storage.get('state')) {
        alert('Invalid state');
        return;
    }}
  onSearch(buttonType){
    const id = this.searchForm.value.search;
    this.storage.remove('data');
    const headers = new HttpHeaders({
      'Content-type' : 'application/json',
      'Authorization' : `Bearer ${this.storage.get('token')}`
    });
    //get data about a track
    //get() recieves an observable, need to do subscribe
    this.http.get(this.trackURL + id, {headers: headers}).subscribe((res) => {
      let track =  res['name'];
      let artist = res['artists'];
      let trackInfo = track + ' by '+ artist[0].name;
      this.storage.set('trackInfo', trackInfo);
      
    });
    if(buttonType==="Radar Chart"){
     return this.http.get(this.baseURL + id, {headers: headers}).subscribe((res) => {
       var data = [res['acousticness'],res['danceability'],res['energy'], res['instrumentalness'],res['liveness'],res['loudness']+8,res['speechiness']];
       this.storage.set('data', data);
       console.log(data);
       this.router.navigate(['/radar']).then(() => {
        window.location.reload(true);
      });
    })
  }
  else{
    return this.http.get(this.baseURL + id, {headers: headers}).subscribe((res) => {
      var data = [res['acousticness'],res['danceability'],res['energy'], res['instrumentalness'],res['liveness'],res['loudness']+8,res['speechiness']];
      this.storage.set('data', data);
      console.log(data);
      this.router.navigate(['/bar']).then(() => {
       window.location.reload(true);
     });
   })
  }

  }

}
