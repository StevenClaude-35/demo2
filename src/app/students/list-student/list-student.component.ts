import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/service/student.service';
import { Student } from 'src/app/entities/model.student';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})
export class ListStudentComponent implements OnInit {
  studentList:Student[];
  p:number=1;

  constructor(public crudApi:StudentService,public toastr:ToastrService,
    private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.getStudentList();
  }

  getStudentList(){
    var x=this.crudApi.getStudentsList();
    x.snapshotChanges().subscribe(item=>{
      this.studentList=[];
      item.forEach(element=>{
        var y=element.payload.toJSON();
        y["$key"]=element.key;
        this.studentList.push(y as Student);
      });
    });
  }
  selectStudent(student:Student){
    this.crudApi.choixmenu=2;
    this.crudApi.studentForm=this.fb.group(Object.assign({},student));
    this.router.navigate(['/student']);
  }
  deleteStudent(student){
    if(window.confirm('Are you sure you want to delete this student?')){
      this.crudApi.DeleteStudent(student.$key)
      this.toastr.success(student.nom + 'successfully deleted!');
    }
  }


}
