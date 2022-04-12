import isEmpty from 'lodash/isEmpty';
import {
    parseDateString as dateUtilsParseDateString
} from '@core/utils/dateUtils';
import { ResponsiveImageModel } from '@tenants/ticketmaster/app/models/ImageModel';
import AccommodationModel from './AccommodationModel';

export default class HotelReservationRoomModel {
    constructor( ) {
        this.id                     = '';
        this.name                   = '';
        this.bedTypeCode            = '';
        this.standardNumBeds        = 0;
        this.nonSmoking             = true;
        this.rate                   = { };
        this.amenities              = [ ];
        this.images                 = [ ];

        return this;
    }

    transform( obj, accommodation ) {
        this.id                     = obj.roomCode;
        this.name                   = obj.roomType;
        this.bedTypeCode            = obj.bedTypeCode;
        this.standardNumBeds        = obj.standardNumBeds;
        this.nonSmoking             = obj.nonSmoking;
        this.rate                   = new RoomRate( obj.roomRates[ 0 ] );
        this.amenities              = obj.amenities ? obj.amenities.map( item => new RoomAmenity( item ) ) : [ ] ;
        this.images                 = obj.images.map( item => new ResponsiveImageModel(  ).transform( item ) );
        this.accommodation          = new AccommodationModel( ).transform( accommodation );

        return this;
    }
}

class RoomAmenity {
    constructor( obj ) {
        this.name                   = obj.name;
        this.quantity               = obj.quantity;
    }
}

class RoomRate {
    constructor( obj ) {
        this.id                     = obj.rateId;
        this.currency               = obj.currency;
        this.inventory              = obj.inventory;
        this.amountBeforeTax        = obj.amountBeforeTax ? [ ...obj.amountBeforeTax ] : [ 0 ];
        this.amountAfterTax         = obj.amountAfterTax ? [ ...obj.amountAfterTax ] : this.amountBeforeTax ;
        this.mealPlan               = obj.mealPlan;
        this.fees = obj.fees.map( item => new RoomRateFee( item ) );
        this.type = obj.rateType || null;
        this.paymentType = obj.paymentType || null;
        this.cancellationPolicies     = obj.cancellationPolicies ? obj.cancellationPolicies.map( item => new RoomRateCancellationPolicy( item ) ) : null;
        this.totals                 = {
            basePrice: this.amountBeforeTax.reduce( ( item, acc ) => acc + item, 0 )
        };
        this.packageOffer = !isEmpty( obj.packageOffer ) ? new RoomRatePackageOffer( obj.packageOffer ) : null;
    }
}

class RoomRateFee {
    constructor( obj ) {
        this.dateRange = {
            startDate: obj.dateRange.startDate,
            endDate: obj.dateRange.endDate
        };
        this.fee = {
            name: obj.fee.name,
            type: obj.fee.type,
            typeIncluded: obj.fee.included,
            amount: obj.fee.amount,
            amountType: obj.fee.amountType,
            chargeType: obj.fee.chargeType,
            effectivePerson: obj.fee.effectivePerson
        };
    }
}

class RoomRateCancellationPolicy {
    constructor( obj ) {
        this.amount = obj.amount;
        this.fromAt = obj.from ? dateUtilsParseDateString( obj.from ) : null;
        this.percent = obj.percent;
        this.numberOfNights = obj.numberOfNights;
        this._originalFromAt = obj.from;
    }
}

class RoomRatePackageOffer {
    constructor( obj ) {
        this.basePrice      = obj.basePrice;
        this.id             = obj.id;
        this.ticketTypeId   = obj.ticketTypeId;
    }
}
