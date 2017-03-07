/**
 * Created by juanleyba on 3/1/17.
 */
/**
 * Created by juanleyba on 3/1/17.
 */
import '../../../public/css/styles.css';

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {RouterModule, Router} from '@angular/router';


@Component({
    selector: 'sign-up-app',
    templateUrl: '../templates/signup.component.html',
})
export class SignUpComponent {
    myForm: FormGroup;
    selectedClass = 0;
    showSpinner: boolean = false;
    showToast: boolean = false;
    toastMessage: string;
    toastType: string;
    classes = [
        {value: 0, display: 'A'},
        {value: 1, display: 'B'},
        {value: 2, display: 'C'},
        {value: 3, display: 'No Socio'}
    ];

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private router: Router) {
        this.myForm = this.fb.group({
            email: ['', Validators.required],
            name: ['', Validators.required],
            phone: ['', Validators.required],
            class: [''],
            password: ['', Validators.required],
        });
    }


    onSignup() {
        this.showSpinner = true;
        this.authService.signupUser(this.myForm.value).then((user: any) => {
            this.authService.registerUser(user.uid, this.myForm.value).then((snapshot: any) => {
                this.showSpinner = false;
                this.router.navigate(["torneos"]);
            }).catch((error: any) => {
                console.log(error);
                this.showSpinner = false;
                alert(error.message)
            })
        }).catch((error: any) => {
            this.showSpinner = false;
            console.log(error);
            alert(error.message);
        })
    }
}
