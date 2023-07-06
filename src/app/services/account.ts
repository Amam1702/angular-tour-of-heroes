import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { tb_birthDetail, User } from 'src/app/model/user';
import { HttpHeaders } from '@angular/common/http';

import { Component, Inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
//import { Http, Response, Headers } from '@angular/http';
import {  ActivatedRoute } from '@angular/router';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { DatePipe } from '@angular/common';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import {FileToUpload} from 'src/app/model/file'
import {ToastrService} from 'ngx-toastr'

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     //Authorization: 'my-auth-token',
//     'accept': 'text/plain',
//     'Access-Control-Allow-Origin': '*'
//   })
// };
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({ providedIn: 'root' })

export class AccountService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private datePipe: DatePipe,
        private ToastrService:ToastrService
    ) {
        debugger
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

     public get userValue() {
         return this.userSubject.value;
     }
 approved(id,status=1,role_id)
 {
    debugger
    return this.http.get<User[]>(`${environment.apiUrl}/api/GetDetailBaseRole/getDetailOnRole/${id}/${status}/${role_id}`);

 }
 rejected(id,status=2,role_id)
 {
    return this.http.get<User[]>(`${environment.apiUrl}/api/GetDetailBaseRole/getDetailOnRole/${id}/${status}/${role_id}`);

 }

 getDetailListByRoleId(id,roleid)
 {
    return this.http.get<User[]>(`${environment.apiUrl}/api/GetDetailBaseRole/getDetailListBaseOnRole/${id}/${roleid}`);

 }
 url:any='https://localhost:44346/api'
    login(dat) {
        debugger




        // return this.http.post<any>(`${environment.apiUrl}/Login/authenticate`, { username, password })
        //     .pipe(map(user => {
        //         debugger
        //         localStorage.setItem('user', JSON.stringify(user));
        //        this.userSubject.next(user);
        //         return user;
        //     }));
        // var body = "user_name=" + user.username + "&password=" + user.password+"phone_no=" +'9996132048' + "&birth_date=" + '05/01/1988'+"email=" + 'mail' + "&gender=" +'sanjip'+"address=" + 'ss' + "&role_id=" + '2';
        // this.http.post("https://localhost:44346/api/Login/authenticateFor/", body).subscribe((data) => {
        //     debugger
        // });
         this.http.post('https://localhost:44346/api/' + "Login/login/", dat).pipe(map(token=>
                {
                    localStorage.setItem('token',JSON.stringify(token))


                })
                )
            return this.http.post('https://localhost:44346/api/' + "Login/authenticateFor/", dat).pipe(map(user=>{
               
            localStorage.setItem('user',JSON.stringify(user))

                debugger
                console.log(user)
                //this.userSubject.next(user);
                return user;
            }))
    }
loginFor(username,password)
{
    debugger;
    return this.http.get<any>(`${environment.apiUrl}/api/Login/getForLogin/${username}/${password}`).pipe(map(user=>{
        localStorage.setItem('user',JSON.stringify(user))
        debugger
        console.log(user)
        this.userSubject.next(user);
        return user;
    }))
}
    logout() {
        debugger;
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
        this.ToastrService.success('you are going to logout', 'log out')
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    getDestrictAll(id)
    {
        debugger
        return this.http.get<User[]>(`${environment.apiUrl}/api/getDestrictList/getDestrictNamebyid/${id}`);


    }
    getStateAll() {
        debugger
        return this.http.get<User[]>(`${environment.apiUrl}/api/getStateList/getStateList`);
      //  https://localhost:44346/api/getStateList/getStateList
    }

    getFileDetail(id)
    {
        debugger
       // return this.http.get<User[]>(`${environment.apiUrl}/api/BirthDetail/download/${data}`);
        return this.http.get<User[]>(`${environment.apiUrl}/api/BirthDetail/download/${id}`);


    }

    getLastRecordUserId() {
        debugger
        return this.http.get<User[]>(`${environment.apiUrl}/api/BirthDetail/FindSaveBirthUserid`);
      //  https://localhost:44346/api/getStateList/getStateList
    }

    getCertificateDetail(id,roleid) {
        debugger
        return this.http.get<any>(`${environment.apiUrl}/api/BirthDetail/getBirthCertificate/${id}/${roleid}`);
      //  https://localhost:44346/api/getStateList/getStateList
    }

    getCertificateDetailForticular(id,roleid) {
        debugger
        return this.http.get<any>(`${environment.apiUrl}/api/BirthDetail/getBirthCertificateForParticular/${id}/${roleid}`);
      //  https://localhost:44346/api/getStateList/getStateList
    }

postExpenseDetail(value)
{
    debugger
return this.http.post<any>(`${environment.apiUrl}/api/ExpenseDetail/postExpenseDetail`, value,httpOptions)


}

getMovieDetail(data,name)
{


    if(name=='actor_name')
    {

        return this.http.get<any>(`${environment.apiUrl}/api/MovieDetail/getMovieDetailByMovieName/${data}`);

    }
    if(name =='movie_name')
    {
        debugger
        return this.http.get<any>(`${environment.apiUrl}/api/MovieDetail/getMovieDetailByActorName/${data}`);

    }

    if(name =='director_name')

    {
        return this.http.get<any>(`${environment.apiUrl}/api/MovieDetail/getMovieDetailByDriactorName/${data}`);

    }
}
getAppSetting() {
        debugger
        return this.http.get<any>(`http://localhost:8080/api/BatchEmployeeTech/getBatchAssessment/`);
      //  https://localhost:44346/api/getStateList/getStateList
    }


    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }
    uploadFile(fileName,fileSize,fileType,lastModifiedDate,lastModifiedTime)  {
        debugger

        var date=new Date(lastModifiedDate).toISOString();
     //   return this.http.get<FileToUpload>(`${environment.apiUrl}/api/BirthDetail/GetFileAfterSave`, theFile, httpOptions);
    
    return this.http.get<User[]>(`${environment.apiUrl}/api/BirthDetail/GetDetailAfterSave/${fileName}/${fileSize}/${fileType}/${lastModifiedDate}/${lastModifiedTime}`);
    
    
    }
    // public uploadfile(file: File) {
    //     let formParams = new FormData();
    //     formParams.append('file', file)
    //     return this.http.post('http://localhost:3000/uploadFile', formParams)
    //   }

    baseurl = 'https://localhost:44346/api';
    birth:any;
    saveCertificate(child_name,father_name,mother_name,genderControl,birth_place,birth_date,state,district,houseAddress,status=3,uploadAddressProof,role_id,u_user_id)
    {
        debugger;
        var created_by="sanjip"
        var created_date=new Date().toISOString()
        var deleted_by="jogidner"
        var deleted_date=new Date().toISOString()
         var uploadAddressProofs="ss"
         this.birth=new Date(birth_date).toISOString();
         var birth_date=this.birth;
         
         
       // return this.http.get<User[]>(`${environment.apiUrl}/api/BirthDetail/getSaveBirthDetail/${child_name}/${father_name}/${mother_name}/${genderControl}/${birth_place}/${birth_date}/${state}/${district}/${houseAddress}/${uploadAddressProof}/${created_date}/${created_by}/${deleted_by}/${deleted_date}`);
        //return this.http.get<User[]>(`${environment.apiUrl}/api/BirthDetail/GetDetailAfterSave/${child_name}/${father_name}/${mother_name}/${genderControl}/${birth_place}/${birth_date}`);
        return this.http.get<User[]>(`${environment.apiUrl}/api/BirthDetail/getSaveDetailWithoutAddress/${child_name}/${father_name}/${mother_name}/${birth_place}/${birth_date}/${genderControl}/${state}/${district}/${houseAddress}/${created_date}/${created_by}/${deleted_by}/${deleted_date}/${status}/${uploadAddressProofs}/${role_id}/${u_user_id}`);
        //return this.http.get<User[]>(`${environment.apiUrl}/api/BirthDetail/getSaveBirthDetail/${child_name}/${father_name}/${mother_name}/${genderControl}/${birth_place}/${birth_date}/${state}/${district}/${houseAddress}/${created_date}/${created_by}/${deleted_by}/${deleted_date}/${status}/${uploadAddressProof}`);
        
    }
    filePost(FileAsByteArray)
    {
debugger
var headers = new HttpHeaders({
    "Content-Type": "multipart/form-data",
    "Accept": "application/json"
});

// this.http.post(`${environment.apiUrl}/api/Birth_Detail/FileLoader`,data, {
//     headers: headers
// })

// const uploadReq = new HttpRequest('POST',"https://localhost:44346/api/BirthDetail/upload" , formData, {
//     reportProgress: true,
//   });

//   this.http.request(uploadReq).subscribe(event => {
//     debugger
//     if (event.type === HttpEventType.UploadProgress) {
//       this.progress = Math.round(100 * event.loaded / event.total);
//     };
//   });
         return this.http.post(`${environment.apiUrl}/api/BirthDetail/Upload`, FileAsByteArray, {reportProgress: true, observe: 'events'});
        
    }
  
    uploadFiles(theFile: FileToUpload) : Observable<any> {
        var fileName =theFile.fileName;
        var fileSize=theFile.fileSize;
        var fileType=theFile.fileType;

        var lastModifiedTime=theFile.lastModifiedTime;

        var  lastModifiedDate=theFile.lastModifiedDate;
        var fileAsBase64=theFile.fileAsBase64
        return this.http.post<FileToUpload>(`${environment.apiUrl}/api/BirthDetail/upl`, theFile, httpOptions);
       // return this.http.post<FileToUpload>(`${environment.apiUrl}/api/BirthDetail/Upload`, {fileName,fileSize,fileType,lastModifiedTime,lastModifiedDate,fileAsBase64}, httpOptions);
   
   
    }
      saveCertificatebypost(child_name,father_name,mother_name,birth_place,birth_date,sex,state,district,house_detail,address_proof,status=3,role_id,u_user_id)
      {
debugger
        // let headers = new HttpHeaders({
        //     'Content-Type': 'application/json'
        //     //'Authorization': this.basic
        
        // });
        // let options = { headers: new HttpHeaders({
        //     'Content-Type': 'application/json'
        //     //'Authorization': this.basic
        
        // }) };
        // //post data missing(here you pass email and password)
        // debugger
        // return this.http.post('https://localhost:44346/api/BirthDetail/saveBirthDetail',save,options)
        //     .subscribe(
        //         res =>{
        //             debugger
        //             console.log(res);
        //         },
        //         err => {
        //             console.log(err.message);
        //         }
        //     )
        var created_by="sanjip"
        var create_date=new Date().toISOString()
        var deleted_by="jogidner"
        var deleted_date=new Date().toISOString()
         var uploadAddressProofs="ss"

     return this.http.post('https://localhost:44346/api/' + "BirthDetail/saveBirthDetail/",{child_name,father_name,mother_name,birth_place,birth_date,sex,state,district,house_detail,create_date,created_by,deleted_by,deleted_date,address_proof,status,role_id,u_user_id}).pipe(map(user=>{
          
     //   return this.http.post('https://localhost:44346/api/' + "BirthDetail/saveBirthDetail/",{child_name,father_name,mother_name,birth_place,birth_date,sex,state,district,house_detail,address_proof,status,role_id,u_user_id}).pipe(map(user=>{

        
        
        // localStorage.setItem('user',JSON.stringify(user))
            // debugger
            // console.log(user)
            //this.userSubject.next(user);
            return user;
        }))
        debugger
        // const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
        // const body = { title: 'Angular POST Request Example' };
        // this.http.post<any>('https://localhost:44346/api/BirthDetail/saveBirthDetail', body, { headers }).subscribe(data => {
        //      console.log(data+'abcde')
        // });


        //return this.http.post(`${environment.apiUrl}/api/birthDetail/saveBirthDetail`, save,httpOptions);

      }
    //   addHero(hero: Certificate): Observable<Certificate> {
        
    //     return this.http.post<Certificate>(this.heroesUrl, hero, httpOptions)
    //       .pipe(
    //         catchError(this.handleError('addHero', hero))
    //       );
    //   }
    // update(id: string, params: any) {
    //     return this.http.put(`${environment.apiUrl}/users/${id}`, params)
    //         .pipe(map(x => {
    //             // update stored user if the logged in user updated their own record
    //             if (id == this.userValue?.id) {
    //                 // update local storage
    //                 const user = { ...this.userValue, ...params };
    //                 localStorage.setItem('user', JSON.stringify(user));

    //                 // publish updated user to subscribers
    //                 this.userSubject.next(user);
    //             }
    //             return x;
    //         }));
    // }

//     delete(id: string) {
//         return this.http.delete(`${environment.apiUrl}/users/${id}`)
//             .pipe(map(x => {
//                 // auto logout if the logged in user deleted their own record
//                 if (id == this.userValue?.id) {
//                     this.logout();
//                 }
//                 return x;
//             }));
//     }
 }