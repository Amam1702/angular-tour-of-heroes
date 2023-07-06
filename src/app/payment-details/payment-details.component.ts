import { Component,HostListener,ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user';
import{CreateRequest} from 'src/app/model/reader';
import {FileToUpload} from 'src/app/model/file';
import { first } from 'rxjs/operators';
import{ToastrService} from  'ngx-toastr';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';




@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  form!: FormGroup;
    loading = false;
@ViewChild(BsDatepickerDirective, { static: false }) datepicker: BsDatepickerDirective;
@HostListener('window:scroll')
onScrollEvent() {
  this.datepicker.hide();
}

    submitted = false;
    stateList:any=[]
userName:any;
getUSer:any;
role_id:any;
getLoginId:any;
userType:any;
  constructor(

    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toaster :ToastrService,
     private accountService: AccountService,
     
  ) {
    debugger
    this.userName=JSON.parse(localStorage.getItem('user'))
   this.getUSer= this.userName[0].user_name
   this.role_id= this.userName[0].role_id
   this.getLoginId=this.userName[0].user_id
   if(this.role_id==2)
   {
    this.userType="Cityzen"
   }
   else{
    this.userType='Authority'
   }


   }
   get f() { return this.form.controls; }
   fileToUpload: File | null = null;
   districtList:any=[]
  ngOnInit(): void {
    

    this.form = this.formBuilder.group({
      child_name: ['', Validators.required],
      father_name: ['', Validators.required],
      mother_name: ['', Validators.required],
      sex: ['', Validators.required],

      birth_place: ['', Validators.required],
      birth_date: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required],
      house_detail: ['', Validators.required],
      
      address_proof: ['', Validators.required]
      

  });
  this.getAllState();
  
  }
  
goPaymentStatus()
{
  this.router.navigate(['/status']);


}
goPaymentDetail()
{
  this.router.navigate(['/detail']);
  
}
  getAllState()
  {
    this.accountService.getStateAll().subscribe(x=>{
      console.log(x)
      var abc=x
      debugger
      this.stateList=x

    
    });

  }
  getAlldestrictbyStateId(e)
  {
    debugger
    var id=  this.stateList.filter(x=>x.state_name==e)
    this.accountService.getDestrictAll(id[0].state_id).subscribe(x=>{
      console.log(x)
      this.districtList=x
      debugger
    });
  }
  theFiles:any=[]
  fileinbyte:any=[]

  
  handleFileInput(event) {
    debugger;

      

    // if (event.target.files.length > 0) {
    //   this.form.patchValue({
    //     fileSource: file
    //   });
    // }
   // this.fileToUpload = event.item(0);
    this.theFiles = [];
    // Any file(s) selected from the input?
    if (event.target.files && event.target.files.length > 0) {
        for (let index = 0; index < event.target.files.length; index++) {
            let file = event.target.files[index];
            // Don't allow file sizes over 1MB
           
                // Add file to list of files
                this.theFiles.push(file);
                
                for (let index = 0; index < this.theFiles.length; index++) {
                  debugger
                  //this.readAndUploadFile(this.theFiles[index]);
                  
   // this.fileToUpload=this.fileToByteArray(event.target.files[0])

    let reader = new FileReader();
    let fileByteArray = [];
    reader.readAsArrayBuffer(event.target.files[0]);
    reader.onloadend = (evt) => {
        if (evt.target.readyState == FileReader.DONE) {
          debugger
            let arrays = evt.target.result
            debugger
            // var filearray =new ArrayBuffer(ev)
            // var buffer=new Uint8Array()
            // var filereader=new FileReader()
           var array  = new Uint8Array(<ArrayBuffer>(arrays))

            for (var byte of array) {
                fileByteArray.push(byte);
            }
            console.log(fileByteArray)
            this.fileinbyte=fileByteArray
        }
        // const file = event.target.files[0];

        // let fileToUpload = <File>event.target.files[0];
        // const formData = new FormData();


        // formData.append('name',  event.target.files[0].name);
        // formData.append('lastModified', event.target.files[0].lastModified);
        // formData.append('size', event.target.files[0].size);
        // formData.append('lastModifiedDate', event.target.files[0].lastModifiedDate);




        // formData.append('fileAsBase64',this.fileinbyte);
        // formData.append('title',this.form.value.Title);
        // formData.append('description',this.form.value.Description);

        
        // s

              }
        }
    }
//  //   this.readAndUploadFile(this.fileToUpload);
    
//     if (this.fileToUpload) {
//       // this.accountService.uploadfile(this.fileToUpload).subscribe(resp => {
//       //   alert("Uploaded")
//       // })
//     } else {
//       alert("Please select a file first")
//     }
  }
}
 readAndUploadFiles(theFiles: any) {
  debugger
  let file = new FileToUpload();
  
  file.fileName = theFiles.name;
  file.fileSize = theFiles.size;
  file.fileType = theFiles.type;
  file.lastModifiedTime = theFiles.lastModified;
  file.lastModifiedDate = theFiles.lastModifiedDate;
  file.fileUserId=this.getLoginId;
  
  
  let reader = new FileReader();
  
  reader.onload = () => {
      file.fileAsBase64 = reader.result.toString();
      debugger;
      this.accountService.uploadFiles(file).subscribe(resp => { 
        debugger
         });
  }
  
  reader.readAsDataURL(theFiles);
}
 
fileDataArray:any=[]
public file: File;

getfile(e: any) {
  debugger;

  const fileList: FileList = e.target.files;
        this.file = fileList[0];
        this.fileDataArray = this.fileToByteArray(this.file)

}
  // Setup onload event for reader
 // reader.onload = () => {
      // Store base64 encoded representation of file
      
      // POST to server
    
//}

// saveByteArray(bytes, type) {
//   var blob = new Blob([bytes],{type:type});
//   var link = document.createElement('a');
//   link.href = window.URL.createObjectURL(blob);
//   link.download = "fileName";
//   link.click();
// }
// reader :any= new FileReader();  

// buildRequest(): CreateRequest { 
//      return {
//        create: {
//          fileData: this.reader.readAsArrayBuffer(this.fileToUpload)        
//        }
//      };
//    }
 fileToByteArray(file) {
  debugger
  return new Promise((resolve, reject) => {
          let reader = new FileReader();
          let fileByteArray = [];
          reader.readAsArrayBuffer(file);
          reader.onloadend = (evt) => {
              if (evt.target.readyState == FileReader.DONE) {
                debugger
                  let arrays = evt.target.result
                  debugger
                  // var filearray =new ArrayBuffer(ev)
                  // var buffer=new Uint8Array()
                  // var filereader=new FileReader()
                 var array  = new Uint8Array(<ArrayBuffer>(arrays))

                  for (var byte of array) {
                      fileByteArray.push(byte);
                  }
                  console.log(fileByteArray)
              }
              resolve(fileByteArray);
          }
      })
}

onChange(id)
{
  debugger
this.getAlldestrictbyStateId(id)
}
sexStatus:any=false;
getStatus()
{
  this.form.reset();
}
birthStatus:any=false
lastRecord:any;
  onSubmit(data)
  {
    debugger
    this.submitted = true;
this.birthStatus=false;
this.sexStatus=false;
    // reset alerts on submit
    //this.alertService.clear();

    // stop here if form is invalid
    if(this.f.birth_date.status== "INVALID")
    {
     this.birthStatus=true;
    }
    if(this.f.sex.status== "INVALID")
    {
      debugger
     this.sexStatus=true;
    }
    if (this.form.invalid) {
        return;
    }
    
    this.loading = true;
    // if(this.f.username.value=="san" && this.f.password.value=="123")
    // {
    //          this.router.navigate(['/detail'])
    // }
    var status=3;
    var fileToUploads="pp"

  //   let formData: FormData = new FormData();
  //  formData.append("address_proof",this.fileDataArray);
  //   formData.append('child_name', this.f.child_name.value);
  //   formData.append("father_name", this.f.father_name.value);
  //   formData.append('mother_name', this.f.mother_name.value);
  //   formData.append('birth_place', this.f.birth_place.value);
  //   formData.append('birth_date', this.f.birth_date.value);
  //   formData.append('sex', this.f.sex.value);
  //   formData.append('state', this.f.state.value);
  //   formData.append('District', this.f.district.value);
  //   formData.append('house_detail', this.f.house_detail.value);
  //   formData.append('uploadAddressProof', this.f.uploadAddressProof.value);

  // const formData = new FormData();
  // formData.append('file', this.file.get('fileSource').value);
  //this.readAndUploadFiles(this.theFiles[0]);
  let file = new FileToUpload();
  
  // Set File Information
  file.fileName = this.theFiles[0].name;
  file.fileSize = this.theFiles[0].size;
  file.fileType = this.theFiles[0].type;
  file.lastModifiedTime = this.theFiles[0].lastModified;
  file.lastModifiedDate = this.theFiles[0].lastModifiedDate;
  file.fileUserId=this.getLoginId;
  
  
  // Use FileReader() object to get file to upload
  // NOTE: FileReader only works with newer browsers
  let reader = new FileReader();
  
  // Setup onload event for reader
  reader.onload = () => {
      // Store base64 encoded representation of file
      file.fileAsBase64 = reader.result.toString();
      debugger;
      // POST to server

      this.accountService.saveCertificatebypost(this.f.child_name.value,this.f.father_name.value,this.f.mother_name.value,this.f.birth_place.value,this.f.birth_date.value,this.f.sex.value,this.f.state.value,this.f.district.value,this.f.house_detail.value,this.fileinbyte,status,this.role_id,this.getLoginId).pipe(first())
      .subscribe({
          next: () => {
              debugger
  this.accountService.getLastRecordUserId().subscribe(res=>{
    debugger
    this.lastRecord=res[0].user_id
    file.fileUserId=this.lastRecord;
    

    this.accountService.uploadFiles(file).subscribe(resp => { 
      debugger
        //this.messages.push("Upload complete");
       
       this.router.navigate(['/status'])
      })
    res
    //var userRecord=JSON.parse()
  })

              
              var object=JSON.parse(localStorage.getItem('user'))
             this.toaster.success('Saved Data sucessfully', object[0].user_name);
          
  
              // get return url from query parameters or default to home page
              //const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            //  this.router.navigateByUrl(returnUrl);
          },
          error: error => {
             // this.alertService.error(error);
              this.loading = false;
          }
      });
     
  
  // Read the file
  }
 reader.readAsDataURL(this.theFiles[0]);
    
    

    // this.accountService.saveCertificate(this.f.child_name.value,this.f.father_name.value,this.f.mother_name.value,this.f.sex.value,this.f.birth_place.value,this.f.birth_date.value,this.f.state.value,this.f.district.value,this.f.house_detail.value,status,this.fileinbyte,this.role_id,this.getLoginId).pipe(first())
    // .subscribe({
    //     next: () => {
    //         debugger
    //         var object=JSON.parse(localStorage.getItem('user'))
    //        this.toaster.success('Saved Data sucessfully', object[0].user_name);
    //      this.router.navigate(['/status'])

    //         // get return url from query parameters or default to home page
    //         //const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    //       //  this.router.navigateByUrl(returnUrl);
    //     },
    //     error: error => {
    //        // this.alertService.error(error);
    //         this.loading = false;
    //     }
    // });
    // .pipe(first())
    // .subscribe({
    //     next: () => {
    //         this.alertService.success('Registration successful', { keepAfterRouteChange: true });
    //         this.router.navigate(['../login'], { relativeTo: this.route });
    //     },
    //     error: error => {
    //         this.alertService.error(error);
    //         this.loading = false;
    //     }
    // });
  }

  logOut()
  {
    this.accountService.logout()
  }
}
