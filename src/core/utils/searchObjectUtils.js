import {
    isCity as cityObjectUtilsIsCity,
    hasCustomLocation as cityObjectUtilsHasCustomLocation,
    hasLocation as cityObjectUtilsHasLocation
} from './cityObjectUtils';

export function isEmpty ( search ) {
    return !search || ( !search.keyword && !hasCity( search ) && !search.startDate );
}

export function hasCity ( { city } ) {
    return cityObjectUtilsIsCity( city ); 
}
    
export function hasCityLocation ( { city } ) {
    return city && cityObjectUtilsHasLocation( city );
}

export function hasCustomCityLocation ( { city } ) {
    return city && cityObjectUtilsHasCustomLocation( city );
}
    
export function updateSearchWithCityLocationRange ( search, value ) {
    const ret = { ...search };
    if ( hasCityLocation( ret ) ) {
        ret.city.location.range = value;
    }

    return search;
}
