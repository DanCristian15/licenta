import Vue from 'vue';
import capitalizeFirst from '@core/filters/capitalizeFirst';
import city from '@core/filters/city';
import venueInfoLocation from '@core/filters/venueInfoLocation';
import seat from '@core/filters/seat';
import seatLocation from '@core/filters/seatLocation';
import currency from '@core/filters/currency';
import currencyFull from '@core/filters/currencyFull';
import date from '@core/filters/date';
import distance from '@core/filters/distance';
import distanceFrom from '@core/filters/distanceFrom';
import cancellationPolicy from './cancellationPolicy';
import currencyAbbr from './currencyAbbr';
import datePeriod from './datePeriod';
import seatFullLocation from './seatFullLocation';

Vue.filter( 'cancellationPolicy', cancellationPolicy );
Vue.filter( 'capitalizeFirst', capitalizeFirst );
Vue.filter( 'city', city );
Vue.filter( 'currency', currency );
Vue.filter( 'currencyAbbr', currencyAbbr );
Vue.filter( 'currencyFull', currencyFull );
Vue.filter( 'date', date );
Vue.filter( 'datePeriod', datePeriod );
Vue.filter( 'distance', distance );
Vue.filter( 'distanceFrom', distanceFrom );
Vue.filter( 'seat', seat );
Vue.filter( 'seatFullLocation', seatFullLocation );
Vue.filter( 'seatLocation', seatLocation );
Vue.filter( 'venueInfoLocation', venueInfoLocation );
