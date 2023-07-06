import { PaymentDetailService } from './../shared/payment-detail.service';
import { Component, OnInit ,ElementRef,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import jsdf from 'jspdf';  
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




@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: []
})
export class PaymentDetailFormComponent implements OnInit {
  listView:any=[]
  getUSer:any;
userName:any;
role_id:any;
userType:any;
userRole:any
  constructor(
    private router: Router,
    private datepipe:DatePipe,
    private service: PaymentDetailService,private accountService:AccountService) { 
    var item=JSON.parse(localStorage.getItem('user'))
this.userName=JSON.parse(localStorage.getItem('user'))

this.getUSer= this.userName[0].user_name
this.userRole= this.userName[0].role_id
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
 this.listView= [
  {
    "name": "Professional JavaScript",
    "date": "05/01/1987",
    "status":"pending"
}
   
  ]

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
ChangeDateFormat(date)
{
  debugger
  if(date !=undefined)
  {
    var dateby=new Date(date)
    var datep= this.datepipe.transform(dateby,'dd/MM/yyyy')

  }
  else 
  {
    this.datepipe.transform(new Date(),'dd/mm/yyyy');
  }
  return datep
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


generatePDF(id) {  
  this.accountService.getCertificateDetail(id,this.userRole).subscribe(res=>{
    console.log(res)
    debugger
    this.listView=res
    var abc=this.listView.filter(x=>x.user_id==id)
    var list=abc[0]

    var date =this.datepipe.transform(list.birth_date,'dd/MM/yyyy')
    this.childName=list.child_name
    this.fatherName=list.father_name;
    this.motherName=list.mother_name;
    this.dateofbirth=date
    this.localAddress=list.birth_place;
    this.approvedby=list.created_by;
    let docDefinition = {  
      // header: 'C#Corner PDF Header',  
        content: [  
         {  
           text: 'Birth Certificate',  
           fontSize: 16,  
           alignment: 'center',  
           color: '#047886'  ,
           style:"margin:100px:100px:100px:100px"
         },  
         {  
           text: 'This is certify that',  
           fontSize: 20,  
           bold: true,  
           alignment: 'center',  
           decoration: 'underline',  
           color: 'skyblue'  
         }   ,
   
         {  
           text: this.childName,  
           bold: true ,
           alignment: 'center',  
       decoration: 'underline',  
       color: 'black' 
       },  
       {  
         columns: [  
             [  
                 {  
                   text: '',  
                   bold: true ,
                   alignment: 'center',  
              // decoration: 'underline',  
               color: 'black',
                
   
                 },  
                 
             ],  
           ]
           },
       {  
         columns: [  
             [  
                 {  
                   text: this.fatherName,  
                   bold: true ,
                   alignment: 'left',  
              // decoration: 'underline',  
               color: 'black' 
   
                 },  
                 
             ],  
             [  
                 {  
                     text: this.motherName,  
                     alignment: 'right'  
                 },  
                 
             ]  
         ]  
       },
       
         
         
          
   
       
   
         {  
           text: 'Was born to',  
           bold: true ,
           alignment: 'center',  
       decoration: 'underline',  
       color: 'black' 
       },  
   
         {  
           text: this.dateofbirth,  
           bold: true ,
           alignment: 'center',  
       decoration: 'underline',  
       color: 'black' 
       },  
   
       {  
         text: this.localAddress,  
         bold: true ,
         alignment: 'center',  
     decoration: 'underline',  
     color: 'black' 
     },  
    
    
   
   {  
     text: this.approvedby,  
     bold: true ,
     alignment: 'right',  
   decoration: 'underline',  
   color: 'black' 
   },  
   {  
     text: 'approvedby',  
     bold: true ,
     alignment: 'right',  
   decoration: 'underline',  
   color: 'black' 
   },  
       ]
       
     }
    
     pdfMake.createPdf(docDefinition).open(); 
  })

  
}  
public captureScreen()  
{  
  this.showpdf=true
  var data = document.getElementById('htmlData');  //Id of the table
  html2canvas(data).then(canvas => {  
    // Few necessary setting options  
    let imgWidth = 208;   
    let pageHeight = 295;    
    let imgHeight = canvas.height * imgWidth / canvas.width;  
    let heightLeft = imgHeight;  

    const contentDataURL = canvas.toDataURL('image/png')  
    let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
    let position = 0;  
this.showpdf=false

    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
    pdf.save('MYPdf.pdf'); // Generated PDF  
  });  
}  
createPdf()
{

  var data = document.getElementById('htmlData');  //Id of the table
  html2canvas(data).then(canvas => {  
    // Few necessary setting options  
    let imgWidth = 208;   
    let pageHeight = 295;    
    let imgHeight = canvas.height * imgWidth / canvas.width;  
    let heightLeft = imgHeight;  

    const contentDataURL = canvas.toDataURL('image/png')  
    let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
    let position = 0;  
this.showpdf=false

    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
    pdf.save('MYPdf.pdf'); // Generated PDF  
  });  
  var iDiv = document.createElement('div');
iDiv.id = 'htmlData';
iDiv.className = 'block';
document.getElementsByTagName('body')[0].appendChild(iDiv);

iDiv.innerHTML = "BirthCertificate";

// Now create and append to iDiv
var innerDiv = document.createElement('div');
innerDiv.className = 'block-2';

// The variable iDiv is still good... Just append to it.
iDiv.appendChild(innerDiv);
innerDiv.innerHTML = "This is to Certify that";
var innerDiv2=document.createElement('div');

innerDiv2.className = 'block-3';

// The variable iDiv is still good... Just append to it.
innerDiv.appendChild(innerDiv2);
innerDiv2.innerHTML="child Name";
var innerDiv3=document.createElement('div');
innerDiv2.appendChild(innerDiv3);
innerDiv3.innerHTML="FatherNAMe";
var innerDiv4=document.createElement('div');
innerDiv3.appendChild(innerDiv4)
innerDiv4.innerHTML="mothername";

}
Download()
{
  debugger;
  // const link = document.createElement('a');
  // link.setAttribute('target', '_blank');
  // link.setAttribute('href', 'abc.net/files/test.ino');
  // link.setAttribute('download', `products.csv`);
  // document.body.appendChild(link);
  // link.click();
  // link.remove();

  // Your existing code unmodified...
var iDiv = document.createElement('div');
iDiv.id = 'block';
iDiv.className = 'block';
document.getElementsByTagName('body')[0].appendChild(iDiv);

// Now create and append to iDiv
var innerDiv = document.createElement('div');
innerDiv.className = 'block-2';

// The variable iDiv is still good... Just append to it.
iDiv.appendChild(innerDiv);
}

}
