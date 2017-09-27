import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicationService } from '../publication.service';
import { ReservationService } from '../reservation.service';
import { MapService } from '../../shared/map.service';
import { LocationService } from '../../shared/location.service';
import { AuthService } from '../../auth/auth.service';
import { AdvertiserService } from '../../advertiser/advertiser.service';
import { FavoriteService } from '../favorite.service';
import { Property } from './property.model';
import { CeiboShare } from 'ng2-social-share';
import * as json from './categories.json';
import * as _ from 'lodash';

@Component({
  selector: 'view-property',
  styleUrls: ['view.component.scss'],
  templateUrl: 'view.component.html'
})
export class PropertyViewComponent implements OnInit {
  public publicationUrl: string = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port
  + '/#/publication/view/';

  @Input()
  public favorite: Boolean = false;
  @Input()
  public user;
  @Input()
  public property: Property;
  @Input()
  publicationAverage: any;

  @Output()
  onRequestReservation: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onFavoriteChange: EventEmitter<any> = new EventEmitter<any>();

  public propertyConfiguration = (<any>json);

  private myPublication: Boolean = false;
  private address: string;
  private propertyFacilities: Array<IFacility>;

  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private mapService: MapService,
    private locationService: LocationService,
    private advertiserService: AdvertiserService,
    private publicationService: PublicationService,
    private reservationService: ReservationService,
    private favoriteService: FavoriteService) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    if (this.user) {
      this.myPublication = (this.user.id === this.property.user);
    }

    this.locationService.list().subscribe(
      res => {
        let prov = _.find(res.data, (o: any) => {
          return o.code === this.property.location.province;
        });
        this.property.location.provinceDescription = prov.description;
        let place = _.find(prov.locations, (o: any) => {
          return o.code === this.property.location.place;
        });
        this.property.location.placeDescription = place.description;
      }
    );

    this.propertyFacilities = this.loadPropertyFacilities();
  }

  loadPropertyFacilities() {
    let ret = new Array();

    let facilitiesTypes: Array<IFacility>;

    // Get facilities of the category
    let categoryConfiguration = (<ICategory>_.find(this.propertyConfiguration, { id: this.property.configuration.category }));
    facilitiesTypes = categoryConfiguration.facilities;

    // Get facilities of the subcategory
    let subcategoryConfiguration = (<ICategory>_.find(categoryConfiguration.subcategories,
      { id: this.property.configuration.subcategory }));

    if (subcategoryConfiguration) {
      _.each(subcategoryConfiguration.facilities, (value, key, obj) => {
        facilitiesTypes.push(value);
      });
    }

    if (facilitiesTypes) {
      _.each(facilitiesTypes, (f) => {
        _.each(<Array<IFacility>>this.property.facilities, (value, key, obj) => {
          if (f.model === value.model) {
            ret.push({
              'description': f.description,
              'status': value
            });
          }
        });
      });
      return ret;
    }

    return;
  }

  favoriteChange(added: Boolean) {
    this.favorite = !added;
    this.onFavoriteChange.emit(added);
  }

  Reserve() {
    this.onRequestReservation.emit(false);
  }

  onContactAdvertiser() {
    this.advertiserService.onContactAdvertiser.emit();
  }
}