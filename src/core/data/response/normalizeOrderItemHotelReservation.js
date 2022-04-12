
import { differenceInDays } from '@core/utils/dateUtils';
import {
    parseDateString as dateUtilsParseDateString
} from '@core/utils/dateUtils';
import { normalizeCharge } from '@/core/data/response/normalizeCharge';
import normalizeAddress from './normalize/address';
import normalizeResponsiveImage from './normalize/responsiveImage';

export function normalizeOrderItemHotelReservation( data ) {
    data = {
        ...data,
        stayRange: {
            checkin: '2021-02-02',
            checkout: '2021-02-03',
        }
    };

    return {
        price:          data.price,
        basePrice:      data.basePrice,
        fees:           data.fees,
        cartItemId:     data.cartItemId,
        orderNumber:    data.orderNumber,
        orderToken:     data.orderToken,
        totalAmount:    data.totalPrice,
        productTypeId:  data.productTypeId,
        paymentId:      data.paymentOptionId,
        charges:        Array.isArray( data.charges ) ? data.charges.map( normalizeCharge ) : [],
        accommodation:  normalizeAccommodation( data ),
        hotel:          normalizeHotelInfo( data ),
    };
}

const normalizeAccommodation = ( data ) => {
    const stayRange = data.stayRange || { };
    const item = data.items ? data.items[ 0 ] : { };

    const ret = {
        startDateTime: dateUtilsParseDateString( stayRange.checkin ),
        endDateTime: dateUtilsParseDateString( stayRange.checkout ),
        guests: {
            adultsCount: item.adultCount || 0,
            childrenCount: item.childCount || 0,
            childAges: item.childAge || [ ],
        },
        roomsCount: item.quantity || 0,

    };
    ret.nights = differenceInDays( ret.endDateTime, ret.startDateTime );

    return ret;
};

const normalizeHotelInfo = ( data ) => {
    const hotelRoomInfo = data.hotelRoomInfo;
    const address = hotelRoomInfo.address || { };

    return {
        name: hotelRoomInfo.hotelName,
        address: normalizeAddress( {
            address: address.addressLine,
            cityName: address.cityName,
            countryCode: address.countryName,
            stateCode: address.stateCode,
            zipCode: address.postalCode,
        } ),
        policy: normalizeHotelInfoPolicy( data ),
        image: normalizeResponsiveImage( hotelRoomInfo.image ),
        room: normalizeHotelRoom( data ),
        award: normalizeHotelAward( hotelRoomInfo.award ),
    };
};

const normalizeHotelAward = ( data ) => {
    return {
        rating: Number( data.rating ),
        ratingSymbol: data.ratingSymbol,
    };
};

const normalizeHotelRoom = ( data ) => {
    const { hotelRoomInfo } = data;
    const { cancellationPolicies } = hotelRoomInfo;

    return {
        name: hotelRoomInfo.roomType,
        amenities: hotelRoomInfo.roomAmenities ? hotelRoomInfo.roomAmenities.map( normalizeHotelRoomAmenity ) : [ ],
        rate: {
            mealPlan: hotelRoomInfo.mealPlan,
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
    const hotelRoomInfo = data.hotelRoomInfo;
    const { stayRange } = data;

    let checkInDateTime, checkOutDateTime;

    if ( hotelRoomInfo.checkInTime ) {
        checkInDateTime = dateUtilsParseDateString( `${stayRange.checkin}T${hotelRoomInfo.checkInTime}` );
    }
    if ( hotelRoomInfo.checkOutTime ) {
        checkOutDateTime = dateUtilsParseDateString( `${stayRange.checkout}T${hotelRoomInfo.checkOutTime}` );
    }

    return {
        checkInDateTime: checkInDateTime,
        checkOutDateTime: checkOutDateTime,
        description: hotelRoomInfo.hotelPolicyDetails
    };
};