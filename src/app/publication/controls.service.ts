import { Injectable, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MinImages } from '../shared/customValidators/image.validator';
import * as json from './property/categories.json';
import * as _ from 'lodash';

/**
 * Manage controls
 * @module ControlsService
 */
@Injectable()
export class ControlsService {
    private formGroup: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    /**
     * Get facilities for property
     * @param  {number} category The id for the category
     * @param  {number} subcategory The id for the subcategory
     */
    getFacilities(category, subcategory) {
        let propertyConfiguration = (<any>json);

        let facilitiesTypes: Array<IFacility>;

        // Get facilities of the category
        let categoryConfiguration = (<ICategory>_.find(propertyConfiguration, { id: category }));
        facilitiesTypes = _.clone(categoryConfiguration.facilities);

        // Get facilities of the subcategory
        let subcategoryConfiguration = (<ICategory>_.find(categoryConfiguration.subcategories, { id: subcategory }));

        if (subcategoryConfiguration) {
            _.each(subcategoryConfiguration.facilities, (value, key, obj) => {
                facilitiesTypes.push(value);
            });
        }

        return facilitiesTypes;
    }

    initControls() {
        let publication = this.formBuilder.group({
            billing: this.formBuilder.group({
                price: this.formBuilder.control('', [Validators.required, Validators.minLength(1)])
            }),
            configuration: this.formBuilder.group({
                category: this.formBuilder.control('', [Validators.required]),
                showCalendar: this.formBuilder.control(''),
                showContactInformation: this.formBuilder.control(''),
                subcategory: this.formBuilder.control('', [Validators.required]),
                type: this.formBuilder.control('', [Validators.required])
            })
        });

        this.formGroup = publication;

        return this.formGroup;
    }

    initPropertyControls(category, subcategory) {
        let propertyGroup = this.formBuilder.group({
            description: this.formBuilder.control(null, [Validators.required]),
            images: this.formBuilder.control(null, [MinImages]),
            location: this.formBuilder.group({
                latitude: this.formBuilder.control(null),
                longitude: this.formBuilder.control(null),
                number: this.formBuilder.control(null, [Validators.required,
                Validators.pattern('[0-9]*'),
                Validators.minLength(2),
                Validators.maxLength(10)]),
                place: this.formBuilder.control(null, Validators.required),
                province: this.formBuilder.control(null, Validators.required),
                street: this.formBuilder.control(null, [Validators.required,
                Validators.minLength(2),
                Validators.maxLength(20)]),
            }),
            title: this.formBuilder.control(null, [Validators.required, Validators.minLength(5),
            Validators.maxLength(50)])
        });

        let facilitiesGroup = new FormGroup({});

        let facilitiesTypes = this.getFacilities(category, subcategory);

        _.each(facilitiesTypes, (value, key, obj) => {
            facilitiesGroup.addControl(value.model, this.formBuilder.control(false));
        });


        propertyGroup.addControl('facilities', facilitiesGroup);

        let details = this.formBuilder.group({
            bathrooms: this.formBuilder.control(null, Validators.pattern('[0-9]*')),
            capacity: this.formBuilder.control(null, Validators.pattern('[0-9]*')),
            coveredarea: this.formBuilder.control(null, Validators.pattern('[0-9]*')),
            floor: this.formBuilder.control(null, Validators.pattern('[0-9]*'))
        });

        propertyGroup.addControl('details', details);

        this.formGroup.addControl('property', propertyGroup);

        return this.formGroup;
    }

    initDataControls(publication) {
        this.initPropertyControls(publication.configuration.category, publication.configuration.subcategory);

        this.formGroup.get('configuration.category').setValue(publication.configuration.category);
        this.formGroup.get('configuration.subcategory').setValue(publication.configuration.subcategory);
        this.formGroup.get('property.title').setValue(publication.title);
        this.formGroup.get('property.description').setValue(publication.description);
        this.formGroup.get('property.location.province').setValue(publication.location.province);
        this.formGroup.get('property.location.place').setValue(publication.location.place);
        this.formGroup.get('property.location.street').setValue(publication.location.street);
        this.formGroup.get('property.location.number').setValue(publication.location.number);

        return this.formGroup;
    }
}