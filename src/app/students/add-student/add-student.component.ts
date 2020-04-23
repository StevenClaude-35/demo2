import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from 'src/app/service/student.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  public studentForm:FormGroup;

  constructor(public crudApi:StudentService,
    public fb:FormBuilder,public toastr:ToastrService,
    public router:Router) { }

  ngOnInit(): void {
    if(this.crudApi.choixmenu==1)
    {
      this.studenForm();

    }
  }

  studenForm(){
  this.crudApi.studentForm=this.fb.group({
    $key:null,
    mat: ['',[Validators.required,Validators.minLength(2)]],
    nom: ['',[Validators.required,Validators.minLength(2)]],
    adresse: [''],
    classe: [''],
    email: ['',[Validators.required,Validators.pattern(/(0-9a-zA-Z){6,}/)]],
    tel: ['',[Validators.required,Validators.pattern('^[0-9]+$')]]

  })
  }
  resetForm(){
    this.crudApi.studentForm.reset();
  }
  addStudent(){
    if(this.crudApi.studentForm.get('$key').value == null)
    {
    this.crudApi.AddStudent(this.crudApi.studentForm.value);
    this.toastr.success(this.crudApi.studentForm.controls['nom'].value + 'successfull added');
    this.resetForm();
    }
    else
    {
      this.crudApi.updateStudent(this.crudApi.studentForm.value);
      this.toastr.success(this.crudApi.studentForm.controls['nom'].value + 'successfully modified');
    }
    this.resetForm();
    this.router.navigate(['/students']);
  };

}
