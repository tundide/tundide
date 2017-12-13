import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';

import 'bootstrap/dist/js/bootstrap.js';

// RxJS
import 'rxjs';

import 'lodash';

import * as moment from 'moment';

let locale = window.navigator.language;
moment.locale(locale);