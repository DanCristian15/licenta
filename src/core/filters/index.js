import Vue from 'vue';
import bonusPoints from './bonusPoints';
import city from './city';
import cityHTML from './cityHTML';
import dateDay from './dateDay';
import dateMonth from './dateMonth';
import dateDayOfWeek from './dateDayOfWeek';
import dateFull from './dateFull';
import datePeriod from './datePeriod';
import time from './time';
import currencyFull from './currencyFull';
import date from './date';
import number from './number';
import percent from './percent';
import period from './period';
import priceFull from './priceFull';
import seat from './seat';
import seatLocation from './seatLocation';
import venueInfoLocation from './venueInfoLocation';

Vue.filter( 'bonusPoints', bonusPoints );
Vue.filter( 'city', city );
Vue.filter( 'cityHTML', cityHTML );
Vue.filter( 'currencyFull', currencyFull );
Vue.filter( 'date', date );
Vue.filter( 'dateDay', dateDay );
Vue.filter( 'dateMonth', dateMonth );
Vue.filter( 'dateDayOfWeek', dateDayOfWeek );
Vue.filter( 'dateFull', dateFull );
Vue.filter( 'datePeriod', datePeriod );
Vue.filter( 'time', time );
Vue.filter( 'number', number );
Vue.filter( 'percent', percent );
Vue.filter( 'period', period );
Vue.filter( 'priceFull', priceFull );
Vue.filter( 'seat', seat );
Vue.filter( 'seatLocation', seatLocation );
Vue.filter( 'venueInfoLocation', venueInfoLocation );
