import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //public baseURL="https://localhost:44381/";
  public baseURL="https://airiesample555.azurewebsites.net/";
  

  constructor(private httpClient: HttpClient) { }

  public saveAnswers(answers:any){
    console.log(answers);    
    let answerRequest: any =answers;
    return this.httpClient.post<any>(this.baseURL + 'Airie/SubmitAnswers', answerRequest);
  }

  public getPublishedReport(uniqueLink:string){
    const options = {
      'responseType': 'application/json'
    }
    let reportRequest: any = {ReportKey:uniqueLink, options };
    return this.httpClient.post<any>(this.baseURL + 'Airie/GetPublishedReport', reportRequest);
  }

  public sendEmail(email:Email){
    const options = {
      'responseType': 'text'
    }
    let emailRequest: any = { email:email.email, internal:email.internalEmail,AnswerSetId:email.AnswerSetId,options };
    return this.httpClient.post<any>(this.baseURL + 'Airie/EmailReport', emailRequest);
  }

}
interface Email{
  email:string;
  internalEmail:boolean;
  AnswerSetId:number;
}
