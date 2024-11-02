import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration-three',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registration-three.component.html',
  styleUrls: ['./registration-three.component.css']
})
export class RegistrationThreeComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      workExperiences: this.fb.array([]),  // Initialize the workExperiences as a FormArray
      university: ['', Validators.required],
      degree: ['', Validators.required],
      grade: ['', Validators.required],
      major: ['', Validators.required],
      uniDate: ['', Validators.required]
    });
  }

  get workExperiences(): FormArray {
    return this.registrationForm.get('workExperiences') as FormArray;
  }

  addWorkExperience() {
    const workExperienceForm = this.fb.group({
      company: ['', Validators.required],
      position: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      reason: ['']
    });

    this.workExperiences.push(workExperienceForm);
  }

  removeWorkExperience(index: number) {
    this.workExperiences.removeAt(index);
  }

  onSubmit() {
    console.log(this.registrationForm.value);
  }
}
