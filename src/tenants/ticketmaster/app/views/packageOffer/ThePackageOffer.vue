<template>
    <div class="gs-package-offer content-max-width">
        <DataLoading v-if="loading" />
        <div v-else-if="isPackage" class="d-flex flex-column align-center justify-center">
            <EventDetails :event="eventProps" />
            <MarketingPoints />
            <HotelDetails :hotel="hotelProps" />
            <PackageDetails />
            <PriceDetails :prices="formattedPrices" />
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import { getDistanceUnitOfMeasureForCountry } from '@core/utils/measureUtils';
    import DataLoading from '@/core/shared/components/loading/DataLoading.vue';
    import EntityNotFoundRedirect404 from '@core/mixins/EntityNotFoundRedirect404';
    import EventDetails from './ThePackageOffer/EventDetails.vue';
    import MarketingPoints from './ThePackageOffer/MarketingPoints.vue';
    import HotelDetails from './ThePackageOffer/HotelDetails.vue';
    import PackageDetails from './ThePackageOffer/PackageDetails.vue';
    import PriceDetails from './ThePackageOffer/PriceDetails.vue';

    const STORE_NAME = 'packageOffers';

    export default {
        name: 'PackageOffer',
        components: {
            EventDetails,
            MarketingPoints,
            HotelDetails,
            PackageDetails,
            PriceDetails,
            DataLoading
        },
        mixins: [
            EntityNotFoundRedirect404
        ],
        data() {
            return {
                loading: false,
                event: null,
                hotel: null,
                currency: null,
                totals: {
                    totalPrice: 0,
                    basePrice: 0,
                }
            };
        },
        computed: {
            routeId( ) {
                return this.$route.params.id;
            },
            eventLocation() {
                return this.event ? this.$options.filters.venueInfoLocation( {
                    city: this.event.venueCity,
                    countryCode: this.event.venueCountry,
                    stateCode: this.event.venueState,
                    street: this.event.venueStreet,
                    name: this.event.venueName
                } ) : null;
            },
            venueLocation( ) {
                const { venueCity, venueCountry, venueName, venueState, venueStreet, venueLatitude, venueLongitude } = this.event;

                return {
                    name: venueName,
                    stateCode: venueState,
                    countryCode: venueCountry,
                    city: venueCity,
                    street: venueStreet,
                    latitude: venueLatitude,
                    longitude: venueLongitude
                };
            },
            venueDistance() {
                if ( !this.hotel ) {
                    return 0;
                }
                return this.$options.filters.distanceFrom(
                    this.hotel.distance,
                    this.distanceUnitOfMeasure,
                    this.$t( '_common:terms.venueThe' )
                );
            },
            distanceUnitOfMeasure( ) {
                return getDistanceUnitOfMeasureForCountry ( this.venueLocation.countryCode );
            },
            formattedPrices() {
                return {
                    basePrice: this.$options.filters.currencyFull( this.totals.basePrice, this.currency ),
                    totalPrice: this.$options.filters.currencyFull( this.totals.totalPrice, this.currency ),
                };
            },
            eventProps() {
                return this.event ? { ...this.event, location: this.eventLocation } : { };
            },
            hotelProps() {
                return this.hotel ? { ...this.hotel, venueDistance: this.venueDistance } : { };
            },
            isPackage( ) {
                return this.event || this.hotel;
            }
        },
        methods: {
            ...mapActions( {
                'loadOneByExternalId': `${STORE_NAME}/oneByExternalId`
            } ),
            async loadData( ) {
                this.loading = true;
                const response = await this.loadOneByExternalId( this.routeId );
                this.loading = false;

                if ( !response.data ) {
                    this._goToNotFoundPage( );
                    return;
                }

                const { data } = response;
                this.event = data.event;
                this.hotel = data.hotel;
                this.totals = data.totals;
                this.currency = data.currency;
            }
        },
        async created( ) {
            await this.loadData();
        }
    };
</script>