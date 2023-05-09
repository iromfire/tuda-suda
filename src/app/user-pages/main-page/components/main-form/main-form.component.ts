import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-form',
  templateUrl: 'main-form.component.html',
  styleUrls: ['main-form.component.css'],
})
export class MainFormComponent {
  @Output()
  onChange = new EventEmitter();

  formGroup: FormGroup;
  constructor() {
    this.formGroup = new FormGroup({
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', Validators.required),
      clientName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required]),
    });
    this.formGroup.valueChanges.subscribe((data) => this.onChange.emit(data));
  }
}
