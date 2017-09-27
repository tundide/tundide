import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as _ from 'lodash';
import * as json from '../../../config/publication.json';

@Component({
  selector: 'publication-what',
  styleUrls: ['publication.what.component.scss'],
  templateUrl: 'publication.what.component.html'
})
export class PublicationWhatComponent {
  public whatSelected;
  public publicationTypes = (<any>json);
  public categories;
  public subcategories;

  @Input()
  public whatGroup: FormGroup;

  onTypeClick(typeSelected) {
    this.whatGroup.get('type').setValue(typeSelected);

    if (!this.whatSelected) {
      this.whatSelected = typeSelected;
      let cat = (<any>_.find((<any>json), { type: this.whatSelected }));
      this.categories = cat.categories;
    } else {
      this.whatSelected = null;
      this.categories = null;
    }
  }

  onCategorySelected() {
    let cat = (<any>_.find(this.categories, { id: this.whatGroup.get('category').value }));
    if (cat) {
      this.subcategories = cat.subcategories;
    }
  }
}