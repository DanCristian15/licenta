import { differenceInDays } from '@core/utils/dateUtils';
import {
    parseDateString as dateUtilsParseDateString
} from '@core/utils/dateUtils';
import { normalizeCharge } from '@/core/data/response/normalizeCharge';
import normalizeResponsiveImage from './normalize/responsiveImage';
import normalizeAddress from './normalize/address';

export function normalizeCartItemHotelReservation( data ) {
    return {
        id: data.id,
        productId: data.productId,
        price: {
            basePrice: data.price || 0,
            fee: data.fee || 0
        },
        currency: data.currency,
        totalPrice: data.totalPrice || 0,
        bonusPoints: data.pointsEarn || 0,
        bonusPointsRedeem: data.pointsRedeem || 0,
        partnerCartId: data.partnerCartId || null,
        partnerProductId: data.partnerProductId || null,
        productTypeId: data.productTypeId || '',
        loyaltyCurrency: data.loyaltyCurrency || '',
        hotel: normalizeHotelInfo( data ),
        accommodation: normalizeAccommodation( data ),
        charges: Array.isArray( data.charges ) ? data.charges.map( normalizeCharge ) : [ ],
    };
}

const normalizeAccommodation = ( data ) => {
    const { stayRange } = data;
    const details = data.details ? data.details[ 0 ] : { };

    const ret = {
        startDateTime: dateUtilsParseDateString( stayRange.checkin ),
        endDateTime: dateUtilsParseDateString( stayRange.checkout ),
        guests: {
            adultsCount: details.adultCount || 0,
            childrenCount: details.childCount || 0,
            childAges: details.childAge || [ ],
        },
        roomsCount: details.quantity || 0,

    };
    ret.nights = differenceInDays( ret.endDateTime, ret.startDateTime );

    return ret;
};

const normalizeHotelInfo = ( data ) => {
    const { hotelInfo } = data;
    const { address } = hotelInfo;

    return {
        id: hotelInfo.id,
        name: hotelInfo.hotelName,
        address: normalizeAddress( {
            address: address.addressLine,
            cityName: address.cityName,
            zipCode: address.zipCode,
            stateCode: address.stateCode,
            countryCode: address.countryCode,
        } ),
        policy: normalizeHotelInfoPolicy( data ),
        image: normalizeResponsiveImage( hotelInfo.image ),
        room: normalizeHotelRoom( data )
    };
};

const normalizeHotelRoom = ( data ) => {
    const { hotelInfo } = data;
    const { cancellationPolicies } = hotelInfo;

    return {
        name: hotelInfo.roomType,
        amenities: hotelInfo.roomAmenities ? hotelInfo.roomAmenities.map( normalizeHotelRoomAmenity ) : [ ],
        rate: {
            mealPlan: hotelInfo.mealPlan,
            cancellationPolicies: cancellationPolicies ? cancellationPolicies.map( item => normalizeHotelInfoCancellationPolicy( item ) ) : null
        }
    };
};

const normalizeHotelRoomAmenity = ( data ) => {
    return {
        name: data,
        quantity: null
    };
};

const normalizeHotelInfoCancellationPolicy = ( cancellationPolicy ) => {
    return {
        amount: cancellationPolicy.amount,
        fromAt: cancellationPolicy.from ? new Date( cancellationPolicy.from ) : null,
        percent: cancellationPolicy.percent,
        numberOfNights: cancellationPolicy.numberOfNights
    };
};

const normalizeHotelInfoPolicy = ( data ) => {
    const { hotelInfo, stayRange } = data;

    let checkInDateTime, checkOutDateTime;

    if ( hotelInfo.checkInTime ) {
        checkInDateTime = dateUtilsParseDateString( `${stayRange.checkin}T${hotelInfo.checkInTime}` );
    }
    if ( hotelInfo.checkOutTime ) {
        checkOutDateTime = dateUtilsParseDateString( `${stayRange.checkout}T${hotelInfo.checkOutTime}` );
    }

    return {
        checkInDateTime: checkInDateTime,
        checkOutDateTime: checkOutDateTime,
        description: hotelInfo.hotelPolicyDetails
    };
};