import BundleProductsEventTicketModel from './BundleProductsEventTicketModel';
import BundleProductsHotelReservationModel from './BundleProductsHotelReservationModel';

export default class BundleProducts {
    eventTicket = new BundleProductsEventTicketModel( );
    hotelReservation = new BundleProductsHotelReservationModel( );

    constructor ( eventTicket = new BundleProductsEventTicketModel( ), hotelReservation = new BundleProductsHotelReservationModel( ) ) {
        this.eventTicket = eventTicket;
        this.hotelReservation = hotelReservation;
    }

    getTotalsForOthers( type ) {
        if ( type === 'hotel' ) {
            return this.hotelReservation.totals;
        }
        return this.eventTicket.totals;
    }

    getQuantity( ) {
        return {
            ...this.eventTicket.quantity,
            ...this.hotelReservation.quantity
        };
    }

    getTotals( ) {
        const totalsEventTicket = this.eventTicket.totals;
        const totalsHotelReservation = this.hotelReservation.totals;

        return {
            basePrice: totalsEventTicket.basePrice + totalsHotelReservation.basePrice,
            basePriceWithoutDiscount: totalsEventTicket.basePriceWithoutDiscount + totalsHotelReservation.basePriceWithoutDiscount
        };
    }

    hasHotelReservation( ) {
        return this.hotelReservation.hasValue( );
    }

    setHotelReservation( hotelReservation = new BundleProductsHotelReservationModel( ) ) {
        this.hotelReservation = hotelReservation;
    }

    setHotelReservationSelectRoom( selectRoom ) {
        if ( this.hotelReservation ) {
            this.hotelReservation.setSelectedRoom( selectRoom );
        }
    }

    _clone( ) {
        return new BundleProducts (
            this.eventTicket._clone( ),
            this.hotelReservation._clone( )
        );
    }
}
