import Vue from 'vue';
import date from '@core/filters/date';
import reservationDatePeriod from './reservationDatePeriod';
import bundleProductsQuantity from './bundleProductsQuantity';
import roomAmenity from './roomAmenity';
import roomName from './roomName';
import roomRateFee from './roomRateFee';
import fullLocation from './fullLocation';

Vue.filter( 'bundleProductsQuantity', bundleProductsQuantity );
Vue.filter( 'reservationDatePeriod', reservationDatePeriod );
Vue.filter( 'roomName', roomName );
Vue.filter( 'roomAmenity', roomAmenity );
Vue.filter( 'date', date );
Vue.filter( 'roomRateFee', roomRateFee );
Vue.filter( 'fullLocation', fullLocation );
