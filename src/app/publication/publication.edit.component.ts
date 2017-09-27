import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PublicationService } from './publication.service';
import { ControlsService } from './controls.service';
import { Publication } from './publication.model';
import { ToastyService, ToastyConfig } from 'ng2-toasty';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MinImages } from '../shared/customValidators/image.validator';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as $S from 'scriptjs';
import * as _ from 'lodash';

@Component({
  selector: 'publication-edit',
  styleUrls: ['publication.edit.component.scss'],
  templateUrl: 'publication.edit.component.html'
})
export class PublicationEditComponent implements OnInit, OnDestroy {
  whatType = '';
  private sub: any;
  private changeDetected = false;
  private formEdit: FormGroup;
  private ckeditorLoaded = false;
  private publication;

  constructor(
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private route: ActivatedRoute,
    private router: Router,
    private controlsService: ControlsService,
    private formBuilder: FormBuilder,
    private location: Location,
    private modalService: NgbModal,
    private publicationService: PublicationService) {
    // Si cambia algo de la publicacion tengo que actualizar el modelo local
    $S('//cdn.ckeditor.com/4.7.1/basic/ckeditor.js', () => {
      this.ckeditorLoaded = true;
    });
  }

  publicationChange(event) {
    // this.publicationService.saveToStorage(this.publication);
    this.changeDetected = true;
  }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.formEdit = this.controlsService.initControls();

    this.formEdit.valueChanges.subscribe((form) => {
      // Save model to LocalStorage to reload after page close.
      this.publicationService.saveToStorage(form);
    });

    this.sub = this.route.params.subscribe(params => {
      this.publicationService.getFromDatabase(params['id']).subscribe(
        res => {
          this.whatType = res.data._type;
          this.publication = res.data;
          this.formEdit = this.controlsService.initDataControls(res.data);
        }
      );
    });
  }

  /**
   * Save changes of the publication on database and redirect to view publication
   */
  onSaveChanges() {
    let publication = this.publicationService.getFromStorage();

    this.publicationService.updateToDatabase(publication).subscribe(
      res => {
        this.publicationService.deleteInStorage();

        this.router.navigate(['/publication/view', res.data._id]);
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}