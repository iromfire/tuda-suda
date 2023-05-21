import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-form',
  templateUrl: 'main-form.component.html',
  styleUrls: ['main-form.component.scss'],
})
export class MainFormComponent {
  @Output()
  onChange = new EventEmitter();

  minDate: Date;
  minTime: string;

  formGroup: FormGroup;
  constructor() {
    this.minDate = new Date();
    this.minTime =
      this.minDate.getHours().toString() +
      ':' +
      this.minDate.getMinutes().toString();
    console.log(this.minTime);
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
