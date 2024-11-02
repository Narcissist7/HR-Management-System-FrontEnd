import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-registration-two',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule, NgFor, HttpClientModule, NgIf
  ],
  templateUrl: './registration-two.component.html',
  styleUrls: ['./registration-two.component.css']
})
export class RegistrationTwoComponent {
  selectedFile: File | null = null;
  ocrData: any = {};
  isLoading: boolean = false;

  // OCR form fields
  name: string = '';
  phone: string = '';
  gender: string = '';
  dob: string = '';
  birthPlace: string = '';
  militaryStatus: string = '';
  egyptianId: string = '';
  address: string = '';
  maritalStatus: string = '';

  // Work experience and education form
  registrationForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    // Initialize the form for work experience and education
    this.registrationForm = this.fb.group({
      workExperiences: this.fb.array([]),  // Initialize workExperiences as a FormArray
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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload() {
    this.isLoading = true;
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post('http://127.0.0.1:5000/cashout', formData).subscribe(
        (response: any) => {
          this.ocrData = response.ocr_data;
          this.populateFormWithOCRData();
          this.isLoading = false; // Stop loading
        },
        (error) => {
          console.error('Error uploading file:', error);
          this.isLoading = false; // Stop loading in case of error
        }
      );
    } else {
      alert('Please select an image file first.');
    }
  }

  populateFormWithOCRData() {
    if (this.ocrData) {
      if (Array.isArray(this.ocrData)) {
        this.name = `${this.ocrData[0]} ${this.ocrData[1]}`;
        this.egyptianId = this.ocrData[3];
        this.address = this.ocrData[2];
        this.dob = this.ocrData[4];
        this.gender = this.ocrData[5];
        this.birthPlace = this.ocrData[6];
      } else {
        this.name = `${this.ocrData[0]} ${this.ocrData[1]}`;
        this.egyptianId = this.ocrData[3];
        this.address = this.ocrData[2];
        this.dob = this.ocrData[4];
        this.gender = this.ocrData[5];
        this.birthPlace = this.ocrData[6];
      }
    }
  }

  onSubmit() {
    console.log("OCR Data and Form Data:", {
      firstname: this.name,
      phone: this.phone,
      gender: this.gender,
      dob: this.dob,
      birthPlace: this.birthPlace,
      militaryStatus: this.militaryStatus,
      egyptianId: this.egyptianId,
      address: this.address,
      maritalStatus: this.maritalStatus,
      workExperiences: this.registrationForm.value.workExperiences,
      education: {
        university: this.registrationForm.value.university,
        degree: this.registrationForm.value.degree,
        grade: this.registrationForm.value.grade,
        major: this.registrationForm.value.major,
        uniDate: this.registrationForm.value.uniDate
      }
    });
  }
}
