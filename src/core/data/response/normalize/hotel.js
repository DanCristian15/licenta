import isEmpty from 'lodash/isEmpty';
import { differenceInDays } from '@core/utils/dateUtils';
import {
    parseDateString as dateUtilsParseDateString
} from '@core/utils/dateUtils';
import normalizeResponsiveImage from './responsiveImage';
import normalizeAddress from './address';

export default function normalize( data ) {
    const address = data.address || {};
    const accommodation = normalizeAccommodation( data );

    return {
        id: data.propertyId || null,
        name: data.hotelName || '',
        description: data.hotelDescription || '',
        latitude: data.latitude || 0,
        longitude: data.longitude || 0,
        distance: data.distance || 0,
        address: normalizeAddress( {
            address: address.addressLine || '',
            cityName: address.cityName || '',
            countryCode: address.countryName || null,
            stateCode: address.stateCode || null,
            zipCode: address.postalCode || null,
        } ),
        cancelPenalty: normalizeHotelCancelPenalty( data.cancelPenalty ),
        email: data.email || null,
        policy: normalizeHotelPolicy( data ),
        image: normalizeResponsiveImage( data.image ),
        images: Array.isArray( data.images ) ? data.images.map( normalizeResponsiveImage ) : [],
        feePolicies: Array.isArray( data.feePolicies ) ? data.feePolicies.map( normalizeHotelFeePolicy ) : [],
        rooms: Array.isArray( data.guestRooms ) ? data.guestRooms.map( item => normalizeHotelRoom( item, accommodation ) ) : [],
        attractions: Array.isArray( data.attractions ) ? data.attractions.map( normalizeHotelAttraction ) : [],
        awards: Array.isArray( data.awards ) ? data.awards.map( normalizeHotelAward ) : [],
        publicTransportation: Array.isArray( data.publicTransportation ) ? data.publicTransportation.map( normalizeHotelPublicTransportation ) : [],
        refPoints: Array.isArray( data.refPoints ) ? data.refPoints.map( normalizeHotelRefPoint ) : [],
        restaurants: Array.isArray( data.restaurants ) ? data.restaurants.map( normalizeHotelRestaurant ) : [],
        services: Array.isArray( data.services ) ? data.services.map( normalizeHotelService ) : [],
        terminals: Array.isArray( data.terminals ) ? data.terminals.map( normalizeHotelTerminal ) : [],
    };
}

const normalizeHotelAttraction = ( data ) => {
    return {
        name: data.attractionName || '',
        distance: data.distance || null,
    };
};

const normalizeHotelAward = ( data ) => {
    return {
        rating: Number( data.rating ) || null,
        ratingSymbol: data.ratingSymbol || null,
    };
};

const normalizeHotelCancelPenalty = ( data ) => {
    return {
        absoluteDeadline: Number( data.absoluteDeadline ) || null,
        penaltyDescription: data.absoluteDeadline || '',
    };
};

const normalizeHotelFeePolicy = ( data ) => {
    return {
        name: data.policyName || '',
        amount: Number( data.amount ) || null,
        percent: data.percent || null,
    };
};


const normalizeHotelRoom = ( data, accommodation ) => {
    const amountBeforeTax = data.amountBeforeTax ? [ ...data.amountBeforeTax ] : [ 0 ];

    return {
        id: data.roomCode,
        name: data.roomType || '',
        bedTypeCode: data.bedTypeCode || null,
        standardNumBeds: data.standardNumBeds || null,
        nonSmoking: data.nonSmoking || null,
        rate: {
            id: data.rateId || null,
            currency: data.currency || null,
            inventory: data.inventory || null,
            amountBeforeTax: amountBeforeTax,
            amountAfterTax: data.amountAfterTax ? [ ...data.amountAfterTax ] : amountBeforeTax,
            mealPlan: data.mealPlan || null,
            fees: Array.isArray( data.fees ) ? data.fees.map( normalizeHotelRoomRateFee ) : [],
            type: data.rateType || null,
            paymentType: data.paymentType || null,
            cancellationPolicies: Array.isArray( data.cancellationPolicies ) ? data.cancellationPolicies.map( normalizeHotelCancellationPolicy ) : [ ],
            totals: {
                basePrice: amountBeforeTax.reduce( ( item, acc ) => acc + item, 0 )
            },
            packageOffer: !isEmpty( data.packageOffer ) ? normalizeHotelRoomRatePackageOffer( data.packageOffer ) : null,
        },
        amenities: Array.isArray( data.amenities ) ? data.amenities.map( normalizeHotelRoomAmenity ) : [],
        images: Array.isArray( data.images ) ? data.images.map( normalizeResponsiveImage ) : [],
        accommodation : accommodation || {},
    };
};

const normalizeHotelRoomAmenity = ( data ) => {
    return {
        name: data.name || '',
        quantity: data.quantity || 0
    };
};

const normalizeHotelRoomRateFee = ( data ) => {
    return {
        dateRange: {
            startDate: data.dateRange.startDate || null,
            endDate: data.dateRange.endDate || null
        },
        fee: {
            name: data.fee.name || '',
            type: data.fee.type || null,
            typeIncluded: data.fee.included || false,
            amount: data.fee.amount || 0,
            amountType: data.fee.amountType || null,
            chargeType: data.fee.chargeType || null,
            effectivePerson: data.fee.effectivePerson || null
        },
    };
};

const normalizeHotelRoomRatePackageOffer = ( data ) => {
    return {
        basePrice: data.basePrice || 0,
        id: data.id || null,
        ticketTypeId: data.ticketTypeId || null,
    };
};

const normalizeHotelCancellationPolicy = ( data ) => {
    return {
        amount: data.amount || 0,
        fromAt: data.from ? new Date( data.from ) : null,
        percent: data.percent || 0,
        numberOfNights: data.numberOfNights || 0
    };
};

const normalizeHotelPublicTransportation = ( data ) => {
    return {
        name: data.transportationDescription || '',
        distance: data.distance || 0,
    };
};

const normalizeHotelRefPoint = ( data ) => {
    return {
        name: data.refPointName || '',
        distance: data.distance || 0,
    };
};

const normalizeHotelRestaurant = ( data ) => {
    return {
        type: data.type || null,
        cuisine: data.cuisine || null,
    };
};

const normalizeAccommodation = ( data ) => {
    const stayRange = data.stayRange || { };
    const roomCriteria = data.roomCriteria || { };

    const ret = {
        startDateTime: stayRange.checkin ? dateUtilsParseDateString( stayRange.checkin ) : null,
        endDateTime: stayRange.checkout ? dateUtilsParseDateString( stayRange.checkout ) : null,
        guests: {
            adultsCount: roomCriteria.adultCount || 0,
            childrenCount: roomCriteria.childCount || 0,
            childAges: roomCriteria.childAge || [ ],
        },
        roomsCount: roomCriteria.quantity || 0,

    };
    ret.nights = differenceInDays( ret.endDateTime, ret.startDateTime );

    return ret;
};

const normalizeHotelPolicy = ( data ) => {
    const policyInfo = data.policyInfo;
    const { stayRange } = data;

    let checkInDateTime, checkOutDateTime;

    if ( policyInfo.checkInTime ) {
        checkInDateTime = dateUtilsParseDateString( `${stayRange.checkin}T${policyInfo.checkInTime}` );
    }
    if ( policyInfo.checkOutTime ) {
        checkOutDateTime = dateUtilsParseDateString( `${stayRange.checkout}T${policyInfo.checkOutTime}` );
    }

    return {
        checkInDateTime: checkInDateTime,
        checkOutDateTime: checkOutDateTime
    };
};

const normalizeHotelService = ( data ) => {
    return {
        id: data.code || null,
        name: data.serviceName || '',
        quantity: data.quantity || 0,
        amount: data.amount || 0,
        currency: data.currency || null,
        timeFrom: data.timeFrom || null,
        timeTo: data.timeTo || null,
    };
};

const normalizeHotelTerminal = ( data ) => {
    return {
        name: data.terminalName || '',
        distance: data.distance || 0,
    };
};