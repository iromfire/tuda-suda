import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-form',
  templateUrl: 'main-form.component.html',
  styleUrls: ['main-form.component.css'],
})
export class MainFormComponent {
  @Output()
  onChange = new EventEmitter();

  formGroup: FormGroup;
  constructor(private builder: FormBuilder) {
    this.formGroup = builder.group({
      date: ['', [Validators.required]],
      clientName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      comment: ['', [Validators.required]],
    });
    this.formGroup.valueChanges.subscribe((data) => this.onChange.emit(data));
  }
}
