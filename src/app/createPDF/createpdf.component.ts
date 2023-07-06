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
import { DatePipe } from '@angular/common';

import { Router, ActivatedRoute } from '@angular/router';
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-createPDF',
  templateUrl: './createpdf.component.html',
  styles: []
})
export class createpdfComponent implements OnInit {
  //  @Input('app-wheels') inData: any;
  userName:any;
  getUSer:any;
  userRole:any;
  role_id:any
userType:any
  constructor(
    private router: Router,
    private datepipe :DatePipe,
    private toasterService:ToastrService,
    private service: PaymentDetailService,private accountService:AccountService) { 
    var item=JSON.parse(localStorage.getItem('user'))
this.userName=JSON.parse(localStorage.getItem('user'))
this.getUSer= this.userName[0].user_name;
this.userRole=this.userName[0].role_id;

if(this.userRole==2)
{
 this.userType="Cityzen"
}
else{
 this.userType='Authority'
}
this.getDetailBaseOnRoleid(this.userName[0].user_id,this.userName[0].role_id)

  }
    listView:any=[]
    goPaymentStatus()
{
  this.router.navigate(['/status']);

}

ViewPdf(data)
{
  this.accountService.getFileDetail(data).subscribe(res=>{
    console.log(res)
var blob =this.base64ImageToBlob(res[0])
let objectURL = URL.createObjectURL(blob);  
debugger
var url= window.URL.createObjectURL(blob);
  window.open(url);

  })
debugger
}

urls:any=[]
base64ImageToBlob(str) {
  debugger
  // extract content type and base64 payload from original string
  // var pos = str.indexOf(';base64,');
  // var type = str.substring(5, pos);
  // var b64 = str.substr(pos + 8);
  var type=str.fileType

var base64FromDatabase=str.fileAsBase64
  // decode base64
  var imageContent = atob(base64FromDatabase);
  const reader = new FileReader();
  //reader.readAsBinaryString(str);

const addPreview = (base64FromDatabase) => {
  this.urls.push(`data:${type};base64,${btoa(base64FromDatabase)}`);
};
reader.onload = function (e) {
  debugger
  addPreview(e.target.result);
};

  // create an ArrayBuffer and a view (as unsigned 8-bit)
  var buffer = new ArrayBuffer(imageContent.length);
  var view = new Uint8Array(buffer);

  // fill the view, using the decoded base64
  for(var n = 0; n < imageContent.length; n++) {
    view[n] = imageContent.charCodeAt(n);
  }

  // convert ArrayBuffer to Blob
  var blob = new Blob([buffer], { type: type });

  return blob;

}
goPaymentDetail()
{
  this.router.navigate(['/detail']);

  
}
logOut()
  {
    this.accountService.logout()
  }
    ngOnInit() {
    //   this.listView= [
    //     {
    //       "sr":'1',
    //       "name": "Professional JavaScript",
    //       "date": "05/01/1987",
    //       "status":"pending"
    //   },
    //   {
    //     "sr":'2',

    //     "name": "joginder ",
    //     "date": "05/01/1989",
    //     "status":"approve"
    // }
    //     ]
    }
    approved(id,role_id)
    {
      if(this.userRole==2)
      {
  var object =JSON.parse(localStorage.getItem('user'))

  this.toasterService.success('you can not take action',object[0].user_name)

      }
      else{

      
this.accountService.approved(id,1,this.userRole).subscribe(res=>{
  debugger;
  var object =JSON.parse(localStorage.getItem('user'))
  this.toasterService.success('Action take by and update it sucessfully',object[0].user_name)
  
})
      }
    }
    rejected(id,role_id)
    {
      if(this.userRole==2)
      {
        var object =JSON.parse(localStorage.getItem('user'))

  this.toasterService.success('you can not take action only admin can modify',object[0].user_name)
      }
else{
  this.accountService.rejected(id,2,this.userRole).subscribe(res=>{
    debugger;
    var object =JSON.parse(localStorage.getItem('user'))
    this.toasterService.success('Action take by and update it sucessfully ',object[0].user_name)
  })
}
     
    }
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
    getDetailBaseOnRoleid(userid,roleid)
    {
      debugger
this.accountService.getCertificateDetail(userid,roleid).subscribe(res=>{
  debugger;
  this.listView=res
})
    }
    @ViewChild('htmlData') htmlData!: ElementRef;
    
    USERS = [
      {
        id: 1,
        name: 'Leanne Graham',
        email: 'sincere@april.biz',
        phone: '1-770-736-8031 x56442',
      },
      {
        id: 2,
        name: 'Ervin Howell',
        email: 'shanna@melissa.tv',
        phone: '010-692-6593 x09125',
      },
      {
        id: 3,
        name: 'Clementine Bauch',
        email: 'nathan@yesenia.net',
        phone: '1-463-123-4447',
      },
      {
        id: 4,
        name: 'Patricia Lebsack',
        email: 'julianne@kory.org',
        phone: '493-170-9623 x156',
      },
      {
        id: 5,
        name: 'Chelsey Dietrich',
        email: 'lucio@annie.ca',
        phone: '(254)954-1289',
      },
      {
        id: 6,
        name: 'Mrs. Dennis',
        email: 'karley@jasper.info',
        phone: '1-477-935-8478 x6430',
      },
    ];
    
    // convenience getter for easy access to form fields

createPdf()
{
  var iDiv = document.createElement('div');
iDiv.id = 'block';
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
  }