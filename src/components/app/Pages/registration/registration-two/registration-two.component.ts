import { Component } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-registration-two',
  standalone: true,
  imports: [
    FormsModule ,NgFor , HttpClientModule , NgIf
  ],
  templateUrl: './registration-two.component.html',
  styleUrls: ['./registration-two.component.css']
})
export class RegistrationTwoComponent {
  selectedFile: File | null = null;
  ocrData: any = {};
  isLoading: boolean = false;



  // Form fields
  name: string = '';
  phone: string = '';
  gender: string = '';
  dob: string = '';
  birthPlace: string = '';
  militaryStatus: string = '';
  egyptianId: string = '';
  address: string = '';
  maritalStatus: string = '';

  constructor(private http: HttpClient) {
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
    // Check if OCR data is available and valid
    if (this.ocrData) {
      if (Array.isArray(this.ocrData)) {
        // Assuming the first item is the one to use

        this.name = `${this.ocrData[0]} ${this.ocrData[1]}`;
        this.egyptianId = this.ocrData[3]
        this.address = this.ocrData[2]
        this.dob = this.ocrData[4]
        this.gender = this.ocrData[5]
        this.birthPlace = this.ocrData[6]
      } else {
        // If it's an object
        this.name = `${this.ocrData[0]} ${this.ocrData[1]}`;
        this.egyptianId = this.ocrData[3]
        this.address = this.ocrData[2]
        this.dob = this.ocrData[4]
        this.gender = this.ocrData[5]
        this.birthPlace = this.ocrData[6]
      }
    }
  }

  // Additional function to handle form submission or navigation
  onNext() {
    // Implement navigation to the next registration step here
    console.log("Next Step with filled data:", {
      firstname: this.name,
      phone: this.phone,
      gender: this.gender,
      dob: this.dob,
      birthPlace: this.birthPlace,
      militaryStatus: this.militaryStatus,
      egyptianId: this.egyptianId,
      address: this.address,
      maritalStatus: this.maritalStatus
    });

  }


}
