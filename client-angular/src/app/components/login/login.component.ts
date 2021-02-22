import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { User } from '../../Models/user';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	providers: [UserService]
})
export class LoginComponent implements OnInit {
	public title: string;
	public user:User;
	public token:any;
	public identity:any;
	public status:any;
	
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService
	){
		this.title = 'Identificate';
		this.user = new User(1,'ROLE_USER','','','','','');
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	//metodo que se ejecuta inmediatamente al cargar el componente
	ngOnInit(){
		console.log('login cargado');
		this.logout();
	}

	onSubmit(form:any){
		console.log(this.user);
		this._userService.signup(this.user).subscribe(
			response => {
				if(response.status != 'error'){	
					this.status = 'success';
					this.token = response; //obtener token
					localStorage.setItem('token', this.token); //guardar token (solo guarda string o number)
					console.log(response); //conseguir token o error

					//objeto - usuario identificado
					this._userService.signup(this.user, true).subscribe(
						response => {
							this.identity = response;
							localStorage.setItem('identity', JSON.stringify(this.identity));

							//redirección
							this._router.navigate(['home']);
						},
						error => {
							console.log(<any>error);
						}
					);
				}else{
					this.status = 'error';
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	logout(){
		this._route.params.subscribe(params=>{
			let logout = +params['sure'];
			if(logout==1){
				//borra datos de local storage
				localStorage.removeItem('identity');
				localStorage.removeItem('token');

				this.identity = null;
				this.token = null;

				//redirección
				this._router.navigate(['home']);
			}
		});
	}
}

//para dar de alta el componente, debe registrarse en app.module.ts