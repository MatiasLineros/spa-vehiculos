import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { User } from '../Models/user';

@Injectable()
export class UserService {
	public url:string;
	public identity:any;
	public token:any; 
	constructor(
		public _http: HttpClient
	) {
		this.url = GLOBAL.url;
		this.identity = '';
		this.token = '';
	}

	pruebas(){
		return 'hola mundo';
	}

	register(user:User): Observable<any>{
		let json = JSON.stringify(user); //let para declarar en TS
		let params = 'json='+json;

		//cabecera
		let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');

		return this._http.post(this.url+'register', params, {headers: headers});
	}

	signup(user:User, gettoken?:boolean): Observable<any>{
		if(gettoken!=null){
			user.gettoken = 'true';
		}

		let json = JSON.stringify(user); //let para declarar en TS
		let params = 'json='+json;

		//cabecera
		let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');

		return this._http.post(this.url+'login', params, {headers: headers});
	}

	getIdentity(){ //para consultar al localStorage
		let lsi:any = localStorage.getItem('identity');
		let identity = JSON.parse(lsi);
		if(identity != 'undefined'){
			this.identity = identity;
		}else{
			this.identity = null;
		}
		return this.identity;
	}

	getToken(){ //para consultar al localStorage
		let lst:any = localStorage.getItem('token');
		let token = lst;
		if(token != 'undefined'){
			this.token = token;
		}else{
			this.token = null;
		}
		return this.token;
	}


}