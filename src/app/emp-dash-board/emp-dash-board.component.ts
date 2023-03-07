import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employeeDashBoard.model';
@Component({
  selector: 'app-emp-dash-board',
  templateUrl: './emp-dash-board.component.html',
  styleUrls: ['./emp-dash-board.component.css']
})
export class EmpDashBoardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!:any
  showAdd !:boolean;
  showUpdate !:boolean
  constructor(private formBulider: FormBuilder, private api: ApiService) {

  }


  ngOnInit(): void {
    this.formValue = this.formBulider.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phno: [''],
      salary: [''],
    })
    this.getAllEmployee()
  }

  postEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.phno = this.formValue.value.phno;
    this.employeeModelObj.salary = this.formValue.value.salary;
  
    // Get all employees to check if the id already exists
    this.api.getEmployee().subscribe({
      next: (res) => {
        // Check if the new employee id already exists
        if (res.find((emp: any) => emp.id === this.employeeModelObj.id)) {
          alert('Employee with this ID already exists. Please choose a different ID.');
          return;
        }
        
        // Insert the new employee
        this.api.postEmpoylee(this.employeeModelObj).subscribe({
          next: (res) => {
            console.log(res);
            alert('Employee Added Successfully');
            let ref = document.getElementById('cancel');
            ref?.click();
            this.formValue.reset();
            this.getAllEmployee();
          },
          error: (err) => {
            console.error(err);
            alert('Something went wrong');
          },
          complete: () => {
            console.log('API request completed.');
          }
        });
      },
      error: (err) => {
        console.error(err);
        alert('Something went wrong');
      }
    });
  }

  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;
    })
  }

  deleteEmployee(row:any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee data has been deleted succefully")
      this.getAllEmployee();
    })
  }

  editEmployee(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.employeeModelObj.id =row.id
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['phno'].setValue(row.phno);
    this.formValue.controls['salary'].setValue(row.salary);

  }

  updateEmployeeDetails(){
    
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.phno = this.formValue.value.phno;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("EMPLOYEE DATA IS UPDATED SUCESSFULLY");
      let ref = document.getElementById('cancel')
      ref?.click()
      this.formValue.reset()
      this.getAllEmployee();
    })
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd =true;
    this.showUpdate=false
  }
}
