import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { Student } from '../entities/model.student';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  studentList:AngularFireList<any>;
  student:AngularFireObject<any>;
  public choixmenu:number=1;
  public studentForm:FormGroup;
  

  constructor(private db:AngularFireDatabase) { 
    this.studentList=db.list('students')
  }
  AddStudent(info:Student){
    this.studentList.push(
      {
      mat:info.mat,
      nom:info.nom,
      classe:info.classe,
      tel:info.tel,
      email:info.email
      }
    );
  }
  getStudent(id:string){
    this.student=this.db.object('students/'+id);
    return this.student;
  }
  getStudentsList(){
    this.studentList=this.db.list('students');
    return this.studentList;
  }
  updateStudent(info:Student){
    this.studentList.update(info.$key,
      {
      mat: info.mat,
      nom: info.nom,
      classe:info.classe,
      email:info.email,
      tel:info.tel,
    

    });
  }
  DeleteStudent(id:string){
    this.student=this.db.object('students/'+id);
    this.student.remove();
  }
}
