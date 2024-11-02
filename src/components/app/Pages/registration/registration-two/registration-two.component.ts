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

  // Registration form with nested arrays for work experiences and education fields
  registrationForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      egyptianId: ['', Validators.required],
      email:['', Validators.required],
      firstname: ['', Validators.required],
      secondname: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      birthPlace: ['', Validators.required],
      address: ['', Validators.required],
      militaryStatus: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      workExperiences: this.fb.array([]),
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
      endDate: ['', Validators.required],
      reason: ['', Validators.required]
    });
    this.workExperiences.push(workExperienceForm);
  }

  removeWorkExperience(index: number) {
    this.workExperiences.removeAt(index);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onUpload() {
    if (!this.selectedFile) {
      alert('Please select a file to upload.');
      return;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.isLoading = true;

    this.http.post<any>('http://127.0.0.1:5000/cashout', formData).subscribe(
      (response) => {
        console.log(response); // Check the response structure here
        const ocrDataArray = response.ocr_data;

        // Ensure fields are populated from the specific array indices
        this.registrationForm.patchValue({
          firstname: ocrDataArray[0] || '',
          secondname: ocrDataArray[1] || '',
          egyptianId: ocrDataArray[2] || '',
          dob: ocrDataArray[3] || '',
          address: ocrDataArray[4] || '',
          gender: ocrDataArray[5] || '',
          birthPlace: ocrDataArray[6] || ''
        });
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }




  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;

      // Mapping form data to match the required JSON format
      const requestData = {
        name: `${formData.firstname} ${formData.secondname}`,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        gender: formData.gender,
        pob: formData.birthPlace,
        military_status: formData.militaryStatus,
        ssn: formData.egyptianId,
        address: formData.address,
        martial_status: formData.maritalStatus,
        educations: [
          {
            university: formData.university,
            degree: formData.degree,
            grade: formData.grade,
            major: formData.major,
            date: formData.uniDate,
          }
        ],
        experiences: formData.workExperiences.map((experience: any) => ({
          postion: experience.position,
          reason: experience.reason,
          company_name: experience.company,
          start_date: experience.startDate,
          end_date: experience.endDate
        }))
      };

      console.log(requestData)
      this.http.post('https://da4d-102-41-23-184.ngrok-free.app/api/userDetails', requestData)
        .subscribe(
          (response) => {
            console.log('Form successfully submitted:', response);
          },
          (error) => {
            console.error('Error submitting form:', error);
            console.error('Error details:', error.message);
          }
        );
    } else {
      console.log('Form is invalid. Please fill all required fields.');
    }
  }


}
