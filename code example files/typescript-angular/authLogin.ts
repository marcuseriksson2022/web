import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "./authService";

@Component({
        templateUrl: "authLogin.html",
        selector: 'authLogin',
        styleUrls: ["authLogin.css"]
})

export class AuthLogin { 
    public username: string;
    public password: string;
    public errorMsg: string;

    constructor(private router: Router, private authService: LoginService) { }
    
    login(form: NgForm) {
        if (form.valid) { 
         this.authService.authenticate(this.username, this.password).subscribe(response => {
                if (response) {
                    this.router.navigateByUrl("/admin/products");
                }
                else {
                    this.errorMsg = "Authentication Failed";
                }
            })
        } 
        else {
            this.errorMsg = "Enter username and password";
        }
    }

    logout() {
        this.authService.clear();
        this.router.navigateByUrl("/shop");
    }


}