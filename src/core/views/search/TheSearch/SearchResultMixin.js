import { mapActions } from 'vuex';
import searchConstants from '@core/utils/constants/search';
import entityConstants from '@core/utils/constants/entity';
import {
    normalizeSearchQuery as searchUtilsNormalizeSearchQuery,
    buildSearchQueryObject as searchUtilsBuildSearchQueryObject
} from '@core/utils/searchUtils';
import {
    isEmpty as searchObjectUtilsIsEmpty,
} from '@core/utils/searchObjectUtils';
import { normalizeForFilter as cityObjectUtilsNormalizeForFilter } from '@utils/cityObjectUtils';

let mixin = {
    computed: {
        searchParams() {
            const search = searchUtilsNormalizeSearchQuery( this.$route.query );
            
            if ( searchObjectUtilsIsEmpty( search ) ) {
                return null;
            }

            return {
                ...search,
                limit: searchConstants.DEFAULT.LIMIT
            };
        },
        filterSearchParams() {
            const filter = {
                startDate: this.searchParams && this.searchParams.startDate ? this.searchParams.startDate : null,
                endDate: this.searchParams && this.searchParams.endDate ? this.searchParams.endDate : null,
                city: this.searchParams && this.searchParams.city ? cityObjectUtilsNormalizeForFilter( this.searchParams.city ) : null
            };
            
            return filter;
        }
    },
    methods: {
        ...mapActions( {
            updateEventsFilter:       `events/updateFilter`,
            updateAttractionsFilter:  `attractions/updateFilter`,
            updateVenuesFilter:       `venues/updateFilter`,
        } ),
        updateFilter( { filter = null, entityType = null } ) {
            if ( !entityType || !filter ) {
                return;
            }

            if ( entityType === entityConstants.TYPES.ATTRACTION ) {
                this.updateAttractionsFilter( filter );
            }
            if ( entityType === entityConstants.TYPES.EVENT ) {
                this.updateEventsFilter( filter );
            }
            if ( entityType === entityConstants.TYPES.VENUE ) {
                this.updateVenuesFilter( filter );
            }
        },
        changeRouteQuery( { queryParams = null } ) {
            if ( !queryParams ) {
                return;
            }

            const currentRoute = this.$router.currentRoute;
            const queryObject = searchUtilsBuildSearchQueryObject( { ...currentRoute.query, ...queryParams } );
            delete queryObject.cityExistsInApi;
            
            return this.$router.replace( {
                name: currentRoute.name,
                params: currentRoute.params,
                query: queryObject
            } );
        },
    }
};

export default mixin;
