import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
//import { AccountService } from 'src/app/services/accountService';
@Component({
  selector: 'app-toase',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class toastComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
       // private toastrService:ToastrService,
        private route: ActivatedRoute,
        private router: Router,
       //  private accountService: AccountService,
        // private alertService: AlertService
    ) { }
    toastMessage = 'This is a toast'; // This is the string the template is already bound to  
    showsToast = true; // This is what toggles the component to show or hide  ﻿
    ngOnInit() {
      
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

}