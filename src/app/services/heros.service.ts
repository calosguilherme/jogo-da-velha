import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Md5} from 'ts-md5/dist/md5';

@Injectable()
export class HeroService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  private options;
  private publicKey : string = '83998f5e523c50cab125ed1686b1d745';
  private privateKey : string = 'be3a6def183b20057e45e34d8e9038279012a2d6';
  

  constructor(
    private http: HttpClient,
  ) {
    this.options = { headers: this.getHeaders() };
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return headers;
  }

  getHero(nameHero: string):any{
    let timestamp = new Date().getTime();
    let md5 = new Md5().appendAsciiStr(timestamp+this.privateKey+this.publicKey);
    return this.http.get<any>('http://gateway.marvel.com/v1/public/characters?name='+nameHero+'&ts='+timestamp+'&apikey='+this.publicKey+'&hash='+md5.end());
  }


}