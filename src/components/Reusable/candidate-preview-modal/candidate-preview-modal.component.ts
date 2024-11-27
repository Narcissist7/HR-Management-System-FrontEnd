import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-candidate-preview-modal',
  standalone: true,
  imports: [
    NgIf,
    MatButton
  ],
  templateUrl: './candidate-preview-modal.component.html',
  styleUrl: './candidate-preview-modal.component.css'
})
export class CandidatePreviewModalComponent {
  content: SafeResourceUrl;
  title: string;
  isImage: boolean;
  fileName: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CandidatePreviewModalComponent>,
    private sanitizer: DomSanitizer
  ) {
    this.content = this.sanitizer.bypassSecurityTrustResourceUrl(data.content);
    this.title = data.title;
    this.isImage = data.isImage;
    this.fileName = data.fileName;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onDownload(): void {
    const link = document.createElement('a');
    link.href = this.data.content;
    link.download = this.fileName;
    link.click();
    this.onClose();
  }

}
