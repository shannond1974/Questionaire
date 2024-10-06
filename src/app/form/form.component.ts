import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ApiService } from '../rest/api.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import dayjs from 'dayjs';

import { FormDefinition } from './form.interfaces';

import countriessubset from '../../countriessubset.json';
import countriessubsetnz from '../../countriessubsetnz.json';
import countries from '../../countries.json';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  public page1Valid=false;
  public page2Valid=false;
  public page3Valid=false;
  public page4Valid=false;
  public formSubmitted=false;

  formDefinition: FormDefinition = {
    pages: [
      {
        fields: [
          {
            key: 'date_of_birth',
            label: 'Enter your date of birth',
            type: 'date'
          },
          {
            key: 'nationality',
            label: 'What country is your passport from?',
            type: 'select',
            options: countriessubset
          },
          {
            key: 'country_of_residence',
            label: 'Which country do you currently live in?',
            type: 'select',
            options: countriessubsetnz
          }
        ]
      },
      {
        fields: [
          {
            key: 'length_of_stay',
            label: 'How long do you intend to stay in New Zealand? This includes time you have already spent in New Zealand before.',
            type: 'select',
            options: [
              {
                label: 'Less than 6 months',
                value: 'Less than 6 months'
              },
              {
                label: '6-12 months',
                value: '6-12 months'
              },
              {
                label: '12-24 months',
                value: '12-24 months'
              },
              {
                label: 'More than 24 months',
                value: 'More than 24 months'
              }
            ],
            visible: (model: any) => dayjs().diff(model.date_of_birth, 'years') > 20
          },
          {
            key: 'other_countries',
            label: 'Have you lived in any other countries for more than 5 years since turning 17 years old?',
            type: 'multiselect',
            options: countries,
            visible: (model: any) => (dayjs().diff(model.date_of_birth, 'years') > 20 && ['6-12 months', '12-24 months', 'More than 24 months'].includes(model.length_of_stay))
          },
          {
            key: 'long_visits',
            label: 'List all countries you have visited for more than 3 months in the last 5 years?',
            type: 'multiselect',
            options: countries,
            visible: (model: any) => (dayjs().diff(model.date_of_birth, 'years') > 11 && model.country_of_residence === 'NZ')
          },
          {
            key: 'visa_type',
            label: 'What type of visa do you currently hold that allows you to be in New Zealand?',
            type: 'select',
            options: [
              {
                label: 'Visitor Visa',
                value: 'VisitorVisa'
              },
              {
                label: 'Student Visa',
                value: 'StudentVisa'
              },
              {
                label: 'Work Visa',
                value: 'WorkVisa'
              }
            ],
            visible: (model: any) => model.country_of_residence === 'NZ'
          },
        ]
      },
      {
        fields: [
          {
            key: 'study_level',
            label: 'What level of study are you intending to undertake in New Zealand?',
            type: 'select',
            options: [
              {
                label: 'Less than high school',
                value: 'LessThanHighSchool'
              },
              {
                label: 'High school',
                value: 'HighSchool'
              },
              {
                label: 'Undergraduate',
                value: 'Undergraduate'
              },
              {
                label: 'Postgraduate',
                value: 'Postgraduate'
              },
              {
                label: 'PhD or MFAT scholarship',
                value: 'PhDOrMFATScholarship'
              },
              {
                label: 'Tonga/Samoa citizen',
                value: 'TongaOrSamoaCitizen'
              }
            ]
          },
          {
            key: 'extra_info',
            label: 'Choose the answer that is relevant to you',
            type: 'select',
            options: [
              {
                label: 'I have an MFAT scholarship',
                value: 'MFATScholarship'
              },
              {
                label: 'I am a Tonga/Samoa citizen',
                value: 'TongaOrSamoaCitizen'
              },
              {
                label: 'None of the above',
                value: 'NoneOfTheAbove'
              }
            ]
          }
        ]
      },
      {fields:[
        
          {
            key: 'first_name',
            label: 'Enter your first name',
            type: 'text'
          },
          {
            key: 'email',
            label: 'Enter your email',
            type: 'text'
          }
        
      ]}
    ]
  }

  form: FormGroup;
  currentPage = 0;

  constructor(private fb: FormBuilder,private http: HttpClient,private apiService: ApiService) {
    this.form = this.createForm();
    this.form.valueChanges.subscribe(values => {
      if(values.other_countries==''){
        values.other_countries=[''];
        
      }
      if(values.date_of_birth!='' && values.country_of_residence!='' && values.nationality!=''){
        this.page1Valid=true;    
      }else{
        this.page1Valid=false;
      }
      if(values.length_of_stay!='' && values.other_countries!='' && values.long_visits!='' && values.visa_type!=''){
        this.page2Valid=true;
      }else{
        this.page2Valid=false;
      }
      if(values.study_level!='' && values.extra_info!=''){
        this.page3Valid=true;
      }else{
        this.page3Valid=false;
      }
      if(values.first_name!='' && values.email!=''){
        this.page4Valid=true;
      }else{
        this.page4Valid=false;
      }
    });
    
  }

  createForm() {
    const group: any = {};
    this.formDefinition.pages.forEach((page: any) => {
      page.fields.forEach((field: any) => {
        group[field.key] = ['', Validators.required];
      });
    });
    return this.fb.group(group);
  }

  onSubmit() {
    this.apiService.saveAnswers(this.form.value).subscribe(data => {console.log(data);});
    this.formSubmitted = true;  
    
    if (this.form.valid) {

      console.log(this.form.value);
      // Handle form submission
      this.apiService.saveAnswers(this.form.value);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        control!.markAsTouched();
      });
    }
  }

  nextPage() {
    
    if (this.isCurrentPageValid(this.currentPage)) {
      if (!this.formDefinition.pages[this.currentPage + 1].fields.some((field: any) => field.visible && field.visible(this.form.value)) && this.currentPage < this.formDefinition.pages.length - 2) {
        
        this.currentPage = this.currentPage + 2;
      } else {
        
        if (this.currentPage < this.formDefinition.pages.length - 1) {
          
          this.currentPage++;
        }
      }
    } else {
      
      this.markCurrentPageAsTouched();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  isFieldVisible(field: any): boolean {
    if (field.visible && typeof field.visible === 'function') {
      return field.visible(this.form.value);
    }
    return true;
  }

  isCurrentPageValid(currentPage:number): boolean {
    let result:boolean=false;
    
    if(currentPage==0 && this.page1Valid){
      
      result=true;
    }
    if(currentPage==1){
      result=true;
    }
    if(currentPage==2){
      result=true;
    }
    if(currentPage==3){
      result=true;
    }
    return result;
    //return true;
  }

  markCurrentPageAsTouched() {
    const currentPageFields = this.formDefinition.pages[this.currentPage].fields;
    currentPageFields.forEach(field => {
      this.form.get(field.key)!.markAsTouched();
    });
  }
  markPreviousPageAsTouched(currentPage:number) {
    currentPage--;
    const currentPageFields = this.formDefinition.pages[this.currentPage].fields;
    currentPageFields.forEach(field => {
      this.form.get(field.key)!.markAsTouched();
    });
  }

  getFieldError(fieldKey: string): string {
    const control = this.form.get(fieldKey);
    if (control!.hasError('required')) {
      return 'This field is required';
    }
    // Put conditionals for other errors here
    return '';
  }
}
