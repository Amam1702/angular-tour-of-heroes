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
import { OpenaiService } from '../services/openai';
import { DatePipe } from '@angular/common';

import { Router, ActivatedRoute } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {textResponse} from '../model/textResponse'

@Component({
  selector: 'app-chatGPT',
  templateUrl: './chatgpt.component.html',
  styles: []
})
export class chatGPTComponent implements OnInit {
    textList:textResponse[]=[{sno:1,text:'',response:''}];
    constructor(private openaiservice:OpenaiService)
    {
    }
ngOnInit(): void {
    
}

generateText(data:textResponse) {
    this.openaiservice.generateText(data.text).then(text => {
      data.response = text;
      if(this.textList.length===data.sno){
        this.textList.push({sno:1,text:'',response:''});
      }
    });
}
}