import {Component} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-main-form',
  templateUrl: 'main-form.component.html',
  styleUrls: ['main-form.component.css'],
})
export class MainFormComponent {
  formGroup: FormGroup;
  constructor(private builder: FormBuilder) {
      this.formGroup = builder.group({
        date: [new Date(), [Validators.required]],
        name: ['', [Validators.required]],
        number: ['', [Validators.required]],
        comment: ['', [Validators.required]],
      })
    this.formGroup.valueChanges.subscribe(console.log);
  }

  
}
