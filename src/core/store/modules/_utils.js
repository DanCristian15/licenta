import searchConstants from '@core/utils/constants/search';
import {
    hasCustomCityLocation as searchObjectUtilsHasCustomCityLocation,
    updateSearchWithCityLocationRange as searchObjectUtilsUpdateSearchWithCityLocationRange
} from '@core/utils/searchObjectUtils';

const self = { 
    getItemsWithCityLocationFallback: async ( fn, { state, commit }, filter, options ) => {
        if ( searchObjectUtilsHasCustomCityLocation( filter ) ) {
            if ( !filter.offset ) {
                commit( 'setFilterLocationRange', searchConstants.DEFAULT.LOCATION.RANGE.DEFAULT );
                const response = await fn( searchObjectUtilsUpdateSearchWithCityLocationRange( filter, state.filterLocationRange ), options );
                if ( response.success && response.data.list.length ) {
                    return response;
                }
                commit( 'setFilterLocationRange', searchConstants.DEFAULT.LOCATION.RANGE.FALLBACK );
                return fn( searchObjectUtilsUpdateSearchWithCityLocationRange( filter, state.filterLocationRange ), options );
            }
            
            return fn( searchObjectUtilsUpdateSearchWithCityLocationRange( filter, state.filterLocationRange ), options );
        }

        return fn( filter, options );
    }
};

export default self;
