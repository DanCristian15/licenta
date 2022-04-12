import isEmpty from 'lodash/isEmpty';
import { parseDateString as dateUtilsParseDateString } from '@core/utils/dateUtils';
import utils from './_utils';

export function normalizeEvent( data ) {
    return {
        id: data.id || null,
        name: data.name || '',
        partnerId: data.partnerId || null,
        active: data.active || false,
        imageUrl: data.imageUrl || '',
        ticketsStatus: data.ticketsStatus || null,
        eventStatus: data.eventStatus || null,
        minPrice: data.minPrice || 0,
        maxPrice: data.maxPrice || 0,
        venueId: data.venueId || null,
        venueName: data.venueName || '',
        venueStreet: data.venueStreet || null,
        venueCity: data.venueCity || null,
        venueState: data.venueState || null,
        venueCountry: data.venueCountry || null,
        venueLatitude: data.venueLatitude || null,
        venueLongitude: data.venueLongitude || null,
        countryArea: data.countryArea || null,
        classificationSegmentId: data.classificationSegmentId || null,
        classificationSegment: data.classificationSegment || null,
        classificationGenre: data.classificationGenre || null,
        classificationSubGenre: data.classificationSubGenre || null,
        upcomingEvents: data.upcomingEvents || 0,
        currency: data.currency || null,
        loyaltyCurrency: data.loyaltyCurrency || null,
        bonusPoints: data.pointsEarned || 0,
        redeemPoints: data.redeemPoints || 0,
        pointsEarned: data.pointsEarned || 0,
        earnRate: data.earnRate || 0,
        healthCheck: !isEmpty( data.healthCheck ) ? data.healthCheck : null,
        source: data.source || null,
        startDateTimeUtc: data.startDateTimeUtc || null,
        onsaleStartDateTimeUtc: data.onsaleStartDateTimeUtc || null,
        onsaleEndDateTimeUtc: data.onsaleEndDateTimeUtc || null,
        onSaleStartDateTimeAt: utils.getOnSaleDateTimeUtc( data.onsaleStartDateTimeUtc ),
        onSaleEndDateTimeAt: utils.getOnSaleDateTimeUtc( data.onsaleEndDateTimeUtc ),
        ...utils.getEventDates( {
            startDateTime: dateUtilsParseDateString( data.startDateTime ),
            startDateTimeAt: dateUtilsParseDateString( data.startDateTimeUtc ),
            endDateTime: dateUtilsParseDateString( data.endDateTime ),
            endDateTimeAt: dateUtilsParseDateString( data.endDateTimeUtc ),
            timeOffset: data.timeOffset,
            hasStartTime: utils.hasStartTime( data.startDateTime )
        } ),
    };
}