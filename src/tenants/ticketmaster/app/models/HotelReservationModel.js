import {
    parseDateString as dateUtilsParseDateString
} from '@core/utils/dateUtils';
import { ResponsiveImageModel } from '@tenants/ticketmaster/app/models/ImageModel';
import GuestsModel from './GuestsModel';
import HotelReservationRoomModel from './HotelReservationRoomModel';

export default class HotelReservationModel {
    constructor( ) {
        this.id                     = null;
        this.name                   = '';
        this.shortName              = '';
        this.description            = '';
        this.highlights             = [];
        this.latitude               = 0;
        this.longitude              = 0;
        this.distance               = 0;
        this.image                  = { };
        this.images                 = [ ];
        this.accessibility          = [ ];
        this.rooms                  = [ ];
        this.feePolicies            = [ ];
        this.awards                 = [ ];
        this.address                = { };
        this.restaurants            = [ ];
        this.services               = [ ];
        this.dataProvider           = '';

        return this;
    }

    transform( obj ) {
        const { roomCriteria, stayRange } = obj;
        const accommodation = {
            startDateTime: dateUtilsParseDateString( stayRange.checkin ),
            endDateTime: dateUtilsParseDateString( stayRange.checkout ),
            roomsCount: roomCriteria.roomCount,
            guests: new GuestsModel( roomCriteria.adultCount, roomCriteria.childCount, roomCriteria.childAges )
        };

        this.id                   = obj.propertyId;
        this.name                 = obj.hotelName;
        this.shortName            = obj.hotelShortName;
        this.description          = obj.hotelDescription;
        this.latitude             = obj.latitude;
        this.longitude            = obj.longitude;
        this.distance             = obj.distance;
        this.image                = new ResponsiveImageModel().transform( obj.image );
        this.images               = obj.images.map( item => new ResponsiveImageModel(  ).transform( item ) );
        this.rooms                = obj.guestRooms.map( item => {
            return new HotelReservationRoomModel( ).transform( item, accommodation );
        } );
        this.feePolicies          = obj.feePolicies.map ( item => new HotelFeePolicy( item ) );
        this.awards               = obj.awards.map( item => new HotelAward( item ) );
        this.address              = new HotelAddress( obj.address );
        this.restaurants          = obj.restaurants.map( item => new Restaurant( item ) );
        this.attractions          = obj.attractions.map( item => new Attraction( item ) );
        this.refPoints            = obj.refPoints.map( item => new RefPoint( item ) );
        this.terminals            = obj.terminals.map( item => new Terminal( item ) );
        this.publicTransportation = obj.publicTransportation.map( item => new PublicTransportation( item ) );
        this.services             = obj.services.map( item => new HotelService( item ) );
        this.dataProvider         = obj.externalSystem;



        return this;
    }
}


class HotelAward {
    constructor( obj ) {
        this.provider       = obj.provider;
        this.rating         = obj.rating * 1;
        this.ratingSymbol   = obj.ratingSymbol;
    }
}

class HotelAddress {
    constructor( obj ) {
        this.cityName       = obj.cityName;
        this.zipCode        = obj.zipCode;
        this.stateCode      = obj.stateCode;
        this.countryCode    = obj.countryCode;
        this.address        = obj.addressLine;
    }
}

class HotelFeePolicy {
    constructor( obj ) {
        this.name = obj.policyName;
        this.amount = obj.amount;
        this.percent = obj.percent;
    }
}

class HotelService {
    constructor( obj ) {
        this.id         = obj.code;
        this.name       = obj.serviceName;
        this.quantity   = obj.quantity;
        this.amount     = obj.amount;
        this.currency   = obj.currency;
        this.timeFrom   = obj.timeFrom;
        this.timeTo     = obj.timeTo;
    }
}
class Restaurant {
    constructor( obj ) {
        this.type       = obj.type;
        this.cuisine    = obj.cuisine;
    }
}


class Attraction {
    constructor( obj ) {
        this.name           = obj.attractionName;
        this.distance       = obj.distance;
    }
}

class RefPoint {
    constructor( obj ) {
        this.name       = obj.refPointName;
        this.distance   = obj.distance;
    }
}

class Terminal {
    constructor( obj ) {
        this.name       = obj.terminalName;
        this.distance   = obj.distance;
    }
}

class PublicTransportation {
    constructor( obj ) {
        this.name       = obj.transportationDescription;
        this.distance   = obj.distance;
    }
}
