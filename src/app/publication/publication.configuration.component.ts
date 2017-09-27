import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'publication-configuration',
  styleUrls: ['publication.configuration.component.scss'],
  templateUrl: 'publication.configuration.component.html'
})
export class PublicationConfigurationComponent {

  @Input()
  public configurationGroup: FormGroup;
}