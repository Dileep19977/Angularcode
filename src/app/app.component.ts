import { Component } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  studentList:any;
  studentForm:FormGroup;
  constructor(private http:HttpClient,private fb:FormBuilder){
      this.http.get('http://localhost:8080/student').subscribe((res)=>{this.studentList=res;
      
      
    },(error)=>{
       console.log(error)
    }
    
    );
      this.studentForm=this.fb.group({
        'studentId':['',[Validators.required,Validators.max(99999999)]],
        'studentName':['',[Validators.required,Validators.maxLength(50),Validators.pattern('[A-Za-z ]+')]],
        'studentGpa':['',[Validators.max(4),Validators.min(0)]],
        'studentphone':['',[Validators.required]],
        'studentEmail':['',[Validators.required]]
      })
  }

  addStudent(){
    console.log(this.studentForm)
    this.http.post('http://localhost:8080/student',this.studentForm.value,{observe : 'response'})
    .subscribe(res=>{
      console.log(res.status)
      if(res.status == 200)
      {
        this.http.get('http://localhost:8080/student').subscribe((res)=>{this.studentList=res;
      });
      }
    
    
    },
   );

   
  }

  delete(){
    
    

  }


}
