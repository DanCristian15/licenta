import { differenceInDays } from '@core/utils/dateUtils';
import GuestsModel from './GuestsModel';

export default class AccommodationModel {
    startDateTime = null;
    endDateTime = null;
    guests = new GuestsModel( );
    roomsCount = 0;
    nights = 0;

    transform( { startDateTime, endDateTime, guests, roomsCount } ) {
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.guests = guests;
        this.roomsCount = roomsCount;
        if ( startDateTime && endDateTime ) {
            this.nights = differenceInDays( endDateTime, startDateTime );
        }

        return this;
    }
}