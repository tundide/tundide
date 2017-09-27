import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { Property } from './property.model';
import { MapService } from '../../shared/map.service';
import { LocationService } from '../../shared/location.service';
import { PropertyService } from './property.service';
import { PublicationService } from '../publication.service';
import { LatLngLiteral, GoogleMapsAPIWrapper, MarkerManager } from '@agm/core';
import { ToastyService, ToastyConfig } from 'ng2-toasty';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import * as _ from 'lodash';

@Component({
    selector: 'edit-property',
    styleUrls: ['edit.component.scss'],
    templateUrl: 'edit.component.html'
})
export class PropertyEditComponent implements OnInit {
    public starsCount: number;

    @Input()
    public publicationGroup: FormGroup;

    public propertyGroup: FormGroup;

    @Output()
    public status: EventEmitter<Boolean> = new EventEmitter<Boolean>();

    public provinces = [];
    public locations = [];
    public latitude;
    public longitude;

    private detailsTypes;
    private facilitiesTypes;

    markerDragEnd($event: any) {
        this.mapService.getGeocodeFromLatLon($event.coords.lat, $event.coords.lng).subscribe(
            res => {
                if (res.status === 'OK') {
                    this.latitude = res.results[0].geometry.location.lat;
                    this.longitude = res.results[0].geometry.location.lng;
                    let street = _.find(res.results[0].address_components, function (o: any) {
                        return o.types[0] === 'route';
                    });
                    let number = _.find(res.results[0].address_components, function (o: any) {
                        return o.types[0] === 'street_number';
                    });
                    this.propertyGroup.get('location.street').setValue(street.long_name);
                    this.propertyGroup.get('location.number').setValue(number.long_name);
                } else if (res.status === 'ZERO_RESULTS') {
                    this.toastyService.warning({
                        msg: 'No se encontraron resultados para la direcci&oacute;n indicada',
                        showClose: true,
                        theme: 'bootstrap',
                        timeout: 5000,
                        title: 'Direcci&oacute;n no encontrada.'
                    });
                }
            });
    }

    positioningMap() {
        let prov = _.find(this.provinces, (o: any) => {
            return o.code === this.propertyGroup.get('location.province').value;
        });
        console.log(this.propertyGroup.get('location.place').value);
        let place = _.find(prov.locations, (o: any) => {
            return o.code === this.propertyGroup.get('location.place').value;
        });

        this.mapService.getGeocodeFromAddress(prov.description + ' ' +
            this.propertyGroup.get('location.place').value.description + ' ' +
            '(' + this.propertyGroup.get('location.place').value.zip + ') ' +
            this.propertyGroup.get('location.street').value + ' ' +
            this.propertyGroup.get('location.number').value).subscribe(
            res => {
                if (res.status === 'OK') {
                    this.propertyGroup.get('location.latitude').setValue(res.results[0].geometry.location.lat);
                    this.propertyGroup.get('location.longitude').setValue(res.results[0].geometry.location.lng);
                    let street = _.find(res.results[0].address_components, function (o: any) {
                        return o.types[0] === 'route';
                    });
                    this.propertyGroup.get('location.street').setValue(street.long_name);

                    this.toastyService.success({
                        msg: 'Direcci&oacute;n encontrada, posicionando en el mapa.',
                        showClose: true,
                        theme: 'bootstrap',
                        timeout: 5000,
                        title: 'Direcci&oacute;n encontrada.'
                    });
                } else if (res.status === 'ZERO_RESULTS') {
                    this.toastyService.warning({
                        msg: 'No se encontraron resultados para la direcci&oacute;n indicada',
                        showClose: true,
                        theme: 'bootstrap',
                        timeout: 5000,
                        title: 'Direcci&oacute;n no encontrada.'
                    });
                }
            }
            );
    }

    constructor(
        private config: NgbPopoverConfig,
        private googleMapsWrapper: GoogleMapsAPIWrapper,
        private toastyService: ToastyService,
        private toastyConfig: ToastyConfig,
        private mapService: MapService,
        private locationService: LocationService,
        private publicationService: PublicationService,
        private propertyService: PropertyService,
        private markerManager: MarkerManager,
        private formBuilder: FormBuilder) {
        this.toastyConfig.theme = 'bootstrap';
        config.placement = 'right';
        config.triggers = 'hover';
    }

    load() {
        let publication;

        let pub = localStorage.getItem('publication');

        publication = JSON.parse(pub);


        this.propertyGroup.get('location.province').setValue(publication.property.location.province);

        this.propertyGroup.get('location.street').setValue(publication.property.location.street);
        this.propertyGroup.get('location.number').setValue(publication.property.location.number);

        _.each(publication.property.facilities, (value, facility) => {
            this.propertyGroup.get('facilities.' + facility).setValue(value);
        });

        _.each(publication.property.details, (value, detail) => {
            this.propertyGroup.get('details.' + detail).setValue(value);
        });
    }

    ngOnInit() {
        let category = this.publicationGroup.get('configuration.category').value;
        let subcategory = this.publicationGroup.get('configuration.subcategory').value;
        this.propertyGroup = this.publicationGroup.get('property') as FormGroup;

        this.propertyGroup.get('location.province').valueChanges.subscribe((value) => {
            if (value) {
                this.locations = _.find(this.provinces, { code: value }).locations;
                this.positioningMap();
            }
        });

        this.propertyGroup.get('location.number').valueChanges.subscribe((value) => {
            if (value) {
                this.positioningMap();
            }
        });

        this.locationService.list().subscribe(
            res => {
                this.provinces = res.data;
                navigator.geolocation.getCurrentPosition((e) => {
                    this.propertyGroup.get('location.latitude').setValue(e.coords.latitude);
                    this.propertyGroup.get('location.longitude').setValue(e.coords.longitude);
                }, (err) => {
                    console.log(err);
                });
            }
        );
    }
}