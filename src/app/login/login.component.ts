import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account';
import {ToastrService} from 'ngx-toastr'
import { User } from '../model/user';
import { AuthGuard } from '../gaurds/auth.gaurd';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
  
  providers:[AuthGuard]
})
export class loginComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;
    districtList:any=[]

    constructor(
        private formBuilder: FormBuilder,
        private toastrService:ToastrService,
        private route: ActivatedRoute,
        private router: Router,
         private accountService: AccountService,
        // private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            user_name: ['', Validators.required],
             password: ['', Validators.required],
          //  district: ['', Validators.required]

        });
        
this.got=[  
  {  
    "id": 1,  
    "name": "Jack",  
    "email": "jack@gmail.com",  
    "gender": "male"  
  },  
  {  
    "id": 2,  
    "name": "Peter",  
    "email": "peter@gmail.com",  
    "gender": "male"  
  },  
  {  
    "id": 3,  
    "name": "Mary",  
    "email": "mary@gmail.com",  
    "gender": "female"  
  },  
  {  
    "id": 4,  
    "name": "Smith",  
    "email": "smith@gmail.com",  
    "gender": "male"  
  },  
  {  
    "id": 5,  
    "name": "John",  
    "email": "john@gmail.com",  
    "gender": "male"  
  }  
]  
//         this.itemList=[{"mov_id": 902,
// "mov_title": "The Innocents",
// "mov_year": 1958,
// "mov_time": 128,
// "mov_lang": "English",
// "mov_dt_rel": "1958 - 08 - 24",
// "mov_rel_country": "UK"}]

        this.districtList=[{id:1,name:'movie_name'},{id:1,name:'actor_name'},{id:1,name:'director_name'}]
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
    user:User

    listView:any=[]
    itemList:any=[]
    got:any=[]
    onSubmit(dat) {
        debugger;
        this.submitted = true;

        // reset alerts on submit
        //this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
            debugger
            
        var value=    dat.user_name
        var ddlName=    dat.district

       

        
//             this.accountService.getMovieDetail(value,ddlName).pipe(first()).subscribe(res=>{
//                 debugger
// this.listView=res;

     
    
//     for(var i=0;i<res.length;i++)
//     {
       
//         var item={



//             "mov_id": res[i].mov_id,
//             "mov_title": res[i].mov_title,
//             "mov_year": res[i].mov_year,
//             "mov_time": res[i].mov_time,
//             "mov_lang": res[i].mov_lang,
//             "mov_dt_rel": res[i].mov_dt_rel,
//             "mov_rel_country": res[i].mov_rel_country
//         }
//       this.itemList.push(item)
//     }

        //   })

    //         this.accountService.getMovieDetail(value,ddlName)    .pipe(first())
    //             .subscribe({
    //                 next: (res) => {
    //                         for(var i=0;i<res.length;i++)
    // {
       
    //     var item={



    //         "mov_id": res[i].mov_id,
    //         "mov_title": res[i].mov_title,
    //         "mov_year": res[i].mov_year,
    //         "mov_time": res[i].mov_time,
    //         "mov_lang": res[i].mov_lang,
    //         "mov_dt_rel": res[i].mov_dt_rel,
    //         "mov_rel_country": res[i].mov_rel_country
    //     }
    //    this.listView.push(item)
    // }
                        
    //                   //  var storage=localStorage.getItem('user')
    //                     debugger
    //                   //var object=  JSON.parse(storage);
                      
    //                  // this.toastrService.success('Sucessfully login',object[0].user_name);
    //                 // this.router.navigate(['/detail'])
    //                  setTimeout(() => {      
    //                   }, 1000); 
    
    //                 },
    //                 error: error => {
    //                    // this.alertService.error(error);
    //                     this.loading = false;
    //                 }
    //             });
            this.accountService.login(dat)    .pipe(first())
                .subscribe({
                    next: () => {
                        var storage=localStorage.getItem('user')
                        debugger
                      var object=  JSON.parse(storage);
                      
                      this.toastrService.success('Sucessfully login',object[0].user_name);
                     this.router.navigate(['/detail'])
                     setTimeout(() => {      
                      }, 1000); 
    
                    },
                    error: error => {
                       // this.alertService.error(error);
                        this.loading = false;
                    }
                });
        // this.accountService.loginFor(this.f.user_name.value, this.f.password.value)
        //     .pipe(first())
        //     .subscribe({
        //         next: () => {
        //             var storage=localStorage.getItem('user')
        //             debugger
        //           var object=  JSON.parse(storage);
                  
        //           this.toastrService.success('Sucessfully login',object[0].user_name);
        //          this.router.navigate(['/detail'])
        //          setTimeout(() => {      
        //           }, 1000); 

        //         },
        //         error: error => {
        //            // this.alertService.error(error);
        //             this.loading = false;
        //         }
        //     });
    }

    getSomeDetailfromjavaspring()
{

  this.accountService.getAppSetting().subscribe(res=>{
    debugger;
    console.log(res)
  })
}
}