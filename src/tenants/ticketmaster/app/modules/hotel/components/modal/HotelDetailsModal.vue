<template>
    <v-card class="gst-hotel-details-modal d-flex flex-column rounded">
        <HotelDetailsModalHeader class="flex-grow-0" :item="item" @close="$emit('close')">
            <template v-if="$vuetify.breakpoint.mdAndUp" v-slot:addressBar>
                <HotelDetailsAddressBar :item="item" :bundle-products="bundleProducts" />
            </template>
        </HotelDetailsModalHeader>
        <HotelDetailsModalGallery :images="item.images" />
        <HotelDetailsAddressBar v-if="!$vuetify.breakpoint.mdAndUp" :item="hotelData" :bundle-products="bundleProducts" />
        <HotelDetailsTabsNavigation :item="hotelData" :tab="tab" :navigation-tabs="navigationTabs" @change="changeTab" />
        <HotelDetailsModalBody :bundle-products="bundleProducts"
            :item="hotelData"
            :loading="!!loadingCounter"
            :tab="tab"
            :navigation-tabs="navigationTabs"
            :has-value="hasValue"
            :bus-events-parent="busEventsParent"
            @close="$emit('close')"
            @updateHotelData="loadHotel" />
    </v-card>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import isEqual from 'lodash/isEqual';
    import debounce from 'lodash/debounce';
    import CloseModalOnRouteChangeMixin from '@core/mixins/modals/CloseModalOnRouteChange';
    import CloseModalOnBreakpointChangeMixin from '@core/mixins/modals/CloseModalOnBreakpointChange';
    import HotelDetailsModalHeader from './HotelDetailsModal/HotelDetailsModalHeader';
    import HotelDetailsAddressBar from './HotelDetailsModal/HotelDetailsAddressBar';
    import HotelDetailsModalGallery from './HotelDetailsModal/HotelDetailsModalGallery';
    import HotelDetailsModalBody from './HotelDetailsModal/HotelDetailsModalBody';
    import HotelDetailsTabsNavigation from './HotelDetailsModal/HotelDetailsTabsNavigation';

    const STORE_NAME_GLOBAL = 'addHotelReservationState';
    const STORE_NAME_MODAL = `${STORE_NAME_GLOBAL}/modalFilters`;

    export default {
        name: 'HotelDetailsModal',
        components: {
            HotelDetailsModalHeader,
            HotelDetailsModalGallery,
            HotelDetailsModalBody,
            HotelDetailsTabsNavigation,
            HotelDetailsAddressBar
        },
        mixins: [ CloseModalOnRouteChangeMixin, CloseModalOnBreakpointChangeMixin ],
        props: {
            item: {
                type: Object,
                default: null
            },
            bundleProducts: {
                type: Object,
                default: null
            },
            busEventsParent: {
                type: Object,
                default: null
            },
            hasValue: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                navigationTabs: [ 'overview', 'rooms', 'whatsNearby' ],
                tab: 1,
                hotelData: this.item,
                loadingCounter: 0
            };
        },
        computed: {
            ...mapState( {
                filters: state => state[ STORE_NAME_GLOBAL ].filters,
                modalFilters: state => state[STORE_NAME_GLOBAL].modalFilters
            } )
        },
        watch: {
            'filters.startDateTime': function ( ) {
                this.loadHotel();
            },
            'filters.endDateTime': function ( ) {
                this.loadHotel();
            },
            'modalFilters': {
                handler: function ( ) {
                    this.loadHotel();
                },
                deep: true
            }
        },
        methods: {
            ...mapActions( {
                loadOne: `${STORE_NAME_GLOBAL}/hotels/loadOne`,
                updateFiltersModal: `${STORE_NAME_MODAL}/update`,
            } ),
            changeTab( id ) {
                this.tab = id;
            },
            loadHotel: debounce( async function ( ) {
                this.loadingCounter++;
                const item = await this.loadOne( {
                    filters: {
                        ...this.filters, ...this.modalFilters
                    },
                    id: this.item.id,
                    dataProvider: this.item.dataProvider
                } );

                if ( item ) {
                    this.hotelData = {
                        ...this.hotelData,
                        rooms: item.rooms,
                    };
                } else {
                    this.hotelData = {
                        ...this.hotelData,
                        rooms: [ ]
                    };
                }
                this.loadingCounter--;
            }, 50 ),
        },
        mounted() {
            const { guests, roomsCount } = this.filters;
            if( !isEqual( { guests, roomsCount }, this.modalFilters ) ) {
                //TODO check if this is the correct requirement
                this.loadHotel();
            }
        }
    };
</script>

<style lang="scss">
@import "@scssVariables";
@import "@scssMixins";

.gst-hotel-details-modal {
    position: relative;
    padding-bottom: 16px;
    background-color: theme-color( 'white' ) !important;
    color: theme-color( 'quaternary' );
    overflow-x: hidden;
    overflow-y: scroll;
}
</style>
