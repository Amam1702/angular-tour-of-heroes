import { PaymentDetailService } from './../shared/payment-detail.service';
import { Component, OnInit ,ElementRef,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import jsdf from 'jspdf';  

import { FormBuilder,FormArray,FormGroup } from '@angular/forms'
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'
import {jsPDF} from 'jspdf';
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
import { style } from '@angular/animations';
pdfMake.vfs = pdfFonts.pdfMake.vfs;  
import { AccountService } from 'src/app/services/account';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import {FileToUpload} from 'src/app/model/file';





@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styles: []
})
export class ExpenseComponent implements OnInit {
  listView:any=[]
  getUSer:any;
userName:any;
role_id:any;
userType:any;
userRole:any;
user_id:any;
  constructor(
    private fb:FormBuilder,
    private router: Router,
    private datepipe:DatePipe,
    private service: PaymentDetailService,private accountService:AccountService) { 
    var item=JSON.parse(localStorage.getItem('user'))
this.userName=JSON.parse(localStorage.getItem('user'))

this.getUSer= this.userName[0].user_name
this.userRole= this.userName[0].role_id
this.user_id=this.userName[0].user_id
if(this.userRole==2)
{
 this.userType="Cityzen"
}
else{
 this.userType='Authority'
}
  }
showpdf:boolean=false;

ngOnInit(): void {
  this.certifacteDeatil(this.userName[0].user_id,this.userName[0].role_id)
  this.showpdf=false
  //this.listView=["{'name':'Birth Certificate','date':'05/01/1988','status':'reject'}"]


}
goPaymentStatus()
{
  this.router.navigate(['/create']);

}
goPaymentDetail()
{
  this.router.navigate(['/detail']);

  
}
logOut()
  {
    this.accountService.logout()
  }
@ViewChild('htmlData') htmlData!: ElementRef;
childName:any
fatherName:any
motherName:any
dateofbirth:any;
localAddress:any;
approvedby:any
ListView:any=[] 
contact = {
   // firstName: 'Harry',
    //lastName: 'Potter',
    contacts: [{ expenseType: '', money: '' ,address_proof:""}]
  }

form: FormGroup = this.fb.group({
  //  firstName: this.contact.firstName,
   // lastName: this.contact.lastName,
    contacts: this.buildContacts(this.contact.contacts)
  });

  get contacts(): FormArray {
    return this.form.get('contacts') as FormArray;
  }

  buildContacts(contacts: {expenseType: string; money: string,address_proof:string }[] = []) {
    debugger
    return this.fb.array(contacts.map(contact => this.fb.group(contact)));
  }

  readAndUploadFiles(theFiles: any) {
    debugger
    let file = new FileToUpload();
    
    // Set File Information
    file.fileName = theFiles.name;
    file.fileSize = theFiles.size;
    file.fileType = theFiles.type;
    file.lastModifiedTime = theFiles.lastModified;
    file.lastModifiedDate = theFiles.lastModifiedDate;
    //file.fileUserId=this.getLoginId;
    
    
    // Use FileReader() object to get file to upload
    // NOTE: FileReader only works with newer browsers
    let reader = new FileReader();
    
    // Setup onload event for reader
    reader.onload = () => {
        // Store base64 encoded representation of file
        file.fileAsBase64 = reader.result.toString();
        debugger;
        // POST to server
       // this.accountService.uploadFiles(file).subscribe(resp => { 
          debugger
            //this.messages.push("Upload complete");
          // });
    }
    
    // Read the file
    reader.readAsDataURL(theFiles);
  }
  fileinbyte:any=[]
  theFiles:any=[]
  imagePreview:any=[]
  fileData:any=[]
  fileBase64String:any
  fileDetailbase64StringwithFormControlValue:any=[]
  handleFileInput(event,val,filename) {
    debugger;

    let reader = new FileReader();
    
    // Setup onload event for reader
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = () => {
        // Store base64 encoded representation of file
        this.fileBase64String= reader.result.toString();
        debugger;
        var item={
          "name":event.target.files[0].name,
          "base64":this.fileBase64String,
          "indexValue":val
        }
        if(this.fileDetailbase64StringwithFormControlValue.length==0)
        {
          this.fileDetailbase64StringwithFormControlValue.push(item)

        }
        else{
          if(this.fileDetailbase64StringwithFormControlValue.length==val)
          {
            this.fileDetailbase64StringwithFormControlValue.push(item)
          }
          else{
            for(var i=0;i<this.fileDetailbase64StringwithFormControlValue.length;i++)
            {
              if(i==val)
              {
                this.fileDetailbase64StringwithFormControlValue[i].name=event.target.files[0].name;
                this.fileDetailbase64StringwithFormControlValue[i].base64=this.fileBase64String;
                this.fileDetailbase64StringwithFormControlValue[i].indexValue=val
  
              }
  
            }
          }
         
        }
        // POST to server
       // this.accountService.uploadFiles(file).subscribe(resp => { 
          debugger
            //this.messages.push("Upload complete");
          // });
    }
    // Read the file
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
       // this.fileData.push(this.fileinbyte);

        var items={
          "name":event.target.files[0].name,
          "base64":this.fileinbyte,
          "indexValue":val
        }
        if(this.fileData.length==0)
        {
          this.fileData.push(items)

        }
        else{
          if(this.fileData.length==val)
          {
            this.fileData.push(items)
          }
          else{
            for(var i=0;i<this.fileData.length;i++)
            {
              if(i==val)
              {
                this.fileData[i].name=event.target.files[0].name;
                this.fileData[i].base64=this.fileBase64String;
                this.fileData[i].indexValue=val
  
              }
  
            }
          }
         
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

  addContactField() {
    debugger
    this.contacts.push(this.fb.group({expenseType: null, money: null,address_proof:null}))
  }

  removeContactField(index: number): void {
    if (this.contacts.length > 1) this.contacts.removeAt(index);
    else this.contacts.patchValue([{phoneNo: null, emailAddr: null}]);
  }
  currentInput:any;
  newArray:any=[]
  file:any
  createBase64Array:any=[]
  exactArray:any=[]
  submit(value: any): void {
    console.log(this.currentInput,'check currentinput');
    debugger
    console.log(value)
    //var fafa=(<HTMLInputElement>document.getElementById('file' + i)).files;

    let file = new FileToUpload();
  
    // Set File Information
    file.fileName = this.theFiles[0].name;
    file.fileSize = this.theFiles[0].size;
    file.fileType = this.theFiles[0].type;
    file.lastModifiedTime = this.theFiles[0].lastModified;
    file.lastModifiedDate = this.theFiles[0].lastModifiedDate;
    file.fileUserId=this.userName[0].user_id;
//     for(var i=0;i<value.contacts.length;i++)
//     {
//         debugger
// value.contacts[i].address_proof=this.fileData[i]
// value.contacts[i].user_id=this.userName[0].user_id


//     }

//     let reader = new FileReader();
  
//   // Setup onload event for reader
//   reader.onload = () => {
//       // Store base64 encoded representation of file
//       file.fileAsBase64 = reader.result.toString();
//       debugger;

//   }
//  reader.readAsDataURL(this.theFiles[0]);

 

if(file.fileAsBase64 !=='')
{

}
    for(var i=0;i<value.contacts.length;i++)
    {
        debugger
        var data={'expenseType':value.contacts[i].expenseType,'money':value.contacts[i].money,'expensePdf':value.contacts[i].address_proof,'user_id':this.user_id}
//         this.newArray[i].expenseType=value.contacts[i].expenseType;
// this.newArray[i].money=value.contacts[i].money;
// this.newArray[i].address_proof=value.contacts[i].address_proof;
// this.newArray[i].user_id=value.contacts[i].user_id
this.newArray.push(data);
    }
  
  //   for(var i=0;i<this.fileDetailbase64StringwithFormControlValue.length;i++)
  //   {
  //      debugger;
  //  for(var j=0;j<this.newArray.length;j++)
  //  {
  //   debugger

   

  //   if(j===i)
  //   {
  //     this.newArray[j].expensePdf=this.fileDetailbase64StringwithFormControlValue[i].base64
  //   }
  //  }
  //   }

    for(var i=0;i<this.fileData.length;i++)
    {
       debugger;
   for(var j=0;j<this.newArray.length;j++)
   {
    debugger

   

    if(j===i)
    {
      this.newArray[j].expensePdf=this.fileData[i].base64
    }
   }
    }
    const formData = new FormData();
  // formData.append('name', 'Document');
    for (let i = 0; i < value.contacts.length; i++) {
        
        if (value.contacts[i].address_proof !== '' && value.contacts[i].user_id !== '' && value.contacts[i].expenseType!=='' && value.contacts[i].money !='') {
          formData.append('contacts[' + i + '][expenseType]', value.contacts[i].expenseType);
          formData.append('contacts[' + i + '][money]', value.contacts[i].money);
          formData.append('contacts[' + i + '][address_proof]', value.contacts[i].address_proof);
          formData.append('contacts[' + i + '][user_id]', value.contacts[i].user_id);

        }
      }
      console.log(formData,'formData');
      console.log(value,'valuedata')
    console.log(this.newArray,'this.newAra')
    this.accountService.postExpenseDetail(this.newArray).subscribe(res=>{
        debugger
        this.newArray=[]
        console.log(res)
    })
  }

  reset(): void {
    this.form.reset();
    this.contacts.clear();
    this.addContactField();
  }


certifacteDeatil(id,roleid)
{
debugger
this.accountService.getCertificateDetail(id,roleid).subscribe(res=>{
console.log(res)
debugger
this.listView=res
var list=res[0]
var date =this.datepipe.transform(list.birth_date,'dd/MM/yyyy')
this.childName=list.child_name
this.fatherName=list.father_name;
this.motherName=list.mother_name;
this.dateofbirth=date
this.localAddress=list.birth_place;
this.approvedby=list.created_by;


})
}




}
