import cloneDeep from 'lodash/cloneDeep';
import Guests from './GuestsModel';
import HotelReservationModel from './HotelReservationModel';


export default class BundleProductsHotelReservationModel {
    hotel = null
    quantity = {
        roomsCount: 0,
        guests: new Guests( ),
        nights: 0,
    }
    startDateTime = new Date( );
    endDateTime = new Date( );
    totals = {
        basePrice: 0,
        basePriceWithoutDiscount: 0
    }

    constructor( hotel = new HotelReservationModel( ) ) {
        this.hotel = hotel;
        if ( this.hotel && this.hotel.rooms.length ) {
            const accommodation = this.hotel.rooms[ 0 ].accommodation;

            this.quantity.roomsCount = accommodation.roomsCount;
            this.quantity.guests = accommodation.guests;
            this.startDateTime = accommodation.startDateTime;
            this.endDateTime = accommodation.endDateTime;
            this.quantity.nights = accommodation.nights;
        }

        this.totals.basePrice = 0;
        this.totals.basePriceWithoutDiscount = 0;

        this.updateTotal( );
    }

    setSelectedRoom( room ) {
        this.hotel.selectedRoom = room;
        this.updateTotal( );
    }

    updateTotal( ) {
        if ( this.hasValue( ) && this.hotel.selectedRoom ) {
            const roomBasePrice = this.hotel.selectedRoom.rate.totals.basePrice;
            const roomsCount = this.quantity.roomsCount;
            const packageOffer = this.getPackageOffer( );

            if ( packageOffer ) {
                this.totals.basePrice = packageOffer.basePrice;
                this.totals.basePriceWithoutDiscount = packageOffer.basePrice;
            } else {
                this.totals.basePrice = roomBasePrice *  roomsCount;
                this.totals.basePriceWithoutDiscount = roomBasePrice * roomsCount;

            }
        }
    }

    isPackageOffer( ) {
        return this.hasValue( ) && this.hotel.selectedRoom && this.hotel.selectedRoom.rate.packageOffer && this.hotel.selectedRoom.rate.packageOffer.id;
    }

    getPackageOffer( ) {
        if ( this.isPackageOffer( ) ) {
            return this.hotel.selectedRoom.rate.packageOffer;
        }
        else false;
    }

    hasValue( ) {
        return this.hotel && this.hotel.id !== null;
    }

    _clone( ) {
        return new BundleProductsHotelReservationModel(
            cloneDeep( this.hotel ),
            this.quantity.roomsCount,
            this.quantity.guests,
            this.startDateTime || new Date( ),
            this.endDateTime || new Date( ),
        );
    }
}
