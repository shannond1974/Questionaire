import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterOutlet,ActivatedRoute  } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { ApiService} from './rest/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sample';
  public onForm:boolean=false;
  public answerSet:string='';
  public reportOnlyView:boolean=false;
  public processedReport:string='';
  ngOnInit() {
  
    
  }
  constructor(private route: ActivatedRoute,private http: HttpClient,private apiService: ApiService) {

  }
  gotoForm() {
    this.onForm = true;
  }

}
