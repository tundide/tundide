import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PublicationService } from './publication.service';
import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Publication } from './publication.model';
import { Property } from './property/property.model';
import { Service } from './service/service.model';
import { ControlsService } from './controls.service';
import { WizardComponent } from '../shared/components/wizard/wizard.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as $S from 'scriptjs';
import * as _ from 'lodash';
import * as json from '../../../config/publication.json';

declare var $: JQueryStatic;
declare var CKEDITOR;

@Component({
  selector: 'publication',
  styleUrls: ['publication.new.component.scss'],
  templateUrl: 'publication.new.component.html'
})
export class PublicationNewComponent implements OnInit {

  public whatType;
  public publication: Publication;
  public publicationValid: boolean;
  @ViewChild('confirmNewPublicationModal') modal: NgbModal;
  @ViewChild('wizard') wizard: WizardComponent;

  private formNew: FormGroup;

  constructor(
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private controlsService: ControlsService,
    private publicationService: PublicationService) {
    this.publicationValid = false;
    $S('//cdn.ckeditor.com/4.7.1/basic/ckeditor.js', null);
    this.toastyConfig.theme = 'bootstrap';
  }

  ngOnInit() {
    // TODO: Si existe en localStorage cargarlo en el formNew
    // let publication = this.publicationService.getFromStorage();
    this.formNew = this.controlsService.initControls();
    this.loadValidators();
  }

  validDetails() {
    if (this.formNew.controls.property) {
      return true;
      // return this.formNew.controls.property.valid;
    }
  }
  /**
   * Load validator for fields of publication
   */
  loadValidators() {
    this.formNew.valueChanges.subscribe((form) => {
      // Save model to LocalStorage to reload after page close.
      this.publicationService.saveToStorage(form);
    });

    this.formNew.get('configuration.category').valueChanges.subscribe((value) => {
      let pubType = (<any>_.find((<any>json), { type: 'Property' }));

      let cat = (<any>_.find(pubType.categories, { id: value }));

      if (cat.subcategories) {
        this.formNew.get('configuration.subcategory').enable();
      } else {
        this.formNew.get('configuration.subcategory').disable();
        this.loadPublication();
      }
    });

    this.formNew.get('configuration.subcategory').valueChanges.subscribe((value) => {
      this.loadPublication();
    });

    // this.formNew.get('configuration.category').valueChanges.subscribe((value) => {
    //   this.publication.configuration.category = value;
    // });
  }

  loadPublication() {
    switch (this.formNew.get('configuration.type').value) {
      case 'Property':
      this.formNew = this.controlsService.initPropertyControls(this.formNew.get('configuration.category').value,
          this.formNew.get('configuration.subcategory').value);
        this.publication = new Property();
        break;
      case 'Service':
        this.publication = new Service();
        break;
      case 'Entreteniment':
        this.publication = new Property();
        break;
      case 'Others':
        this.publication = new Property();
        break;
    }
  }

  /**
   * Remove Publication from localStorage and reinitialize the actual publication
   */
  onResetPublication() {
    this.modalService.open(this.modal).result.then((result) => {
      if (result) {
        this.publicationService.deleteInStorage();

        let whatStep = this.wizard.steps[0];
        this.wizard.goToStep(whatStep);

        this.toastyService.success({
          msg: 'Perfecto, empecemos de nuevo',
          showClose: true,
          theme: 'bootstrap',
          timeout: 5000,
          title: 'Publicacion eliminada.'
        });
      }
    });
  }

  /**
   * After select 'What' publish, this method redirect to selected Type of publication
   */
  onStepWhat() {
    let toastOptions: ToastOptions = {
      msg: 'Se recupero una publicaci&oacute;n que fue iniciada anteriormente.<br /><br /> ',
      showClose: true,
      theme: 'bootstrap',
      timeout: 5000,
      title: 'Publicacion recuperada'
    };

    // let sameType = false;
    // let inStorage = false;
    // if (this.publicationService.existsInStorage()) {
    //   inStorage = true;
    //   this.publication = this.publicationService.getFromStorage();

    //   if (this.publication.type === this.whatType.type) {
    //     sameType = true;
    //   }
    // }

    // if (inStorage && sameType) {
    //   this.toastyService.info(toastOptions);
    // } else {
    //   switch (this.whatType.type) {
    //     case 'Property':
    //       this.publication = new Property();
    //       break;
    //     case 'Service':
    //       this.publication = new Service();
    //       break;
    //     case 'Entreteniment':
    //       this.publication = new Property();
    //       break;
    //     case 'Others':
    //       this.publication = new Property();
    //       break;
    //   }
    //   this.publication.configuration.category = this.whatType.category;
    //   this.publication.configuration.subcategory = this.whatType.subcategory;
    // }
  }

  /**
   * Save publication on database and redirect to view publication
   */
  onStepFinish() {
    this.publicationService.saveToDatabase(this.formNew.value).subscribe(
      res => {
        this.publicationService.deleteInStorage();

        this.router.navigate(['/publication/view', res.data._id]);
      }
    );
  }
}