<template>
    <InfiniteCardList
        :data="items"
        :config="hotelCardConfig"
        :loading="loading"
        :all-data-loaded="true"
        :has-load-button="false"
        :prefill="true"
        :bus-events-parent="busEventsParent"
        item-classes="gst-add-hotel-reservation-hotel-list px-0"
        class="gst-add-hotel-reservation-hotel-list u-height-100 u-width-100">
        <template slot="loading">
            <DataLoading class="mt-5 mb-5 pt-5 pb-5" />
        </template>
        <template slot="empty-list">
            <!-- TODO: add HotelsNoData action  -->
            <HotelsNoData @reset-filters="onResetFilterDo" />
        </template>
    </InfiniteCardList>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import BundleProductsModel from '@tenant/app/models/BundleProductsModel';
    import BundleProductsHotelReservationModel from '@tenant/app/models/BundleProductsHotelReservationModel';
    import DataLoading from '@core/shared/components/loading/DataLoading';
    import InfiniteCardList from '@core/shared/components/lists/InfiniteCardList';
    import DynamicStoreModule from '@core/mixins/DynamicStoreModule';
    import HotelsListCard from '../common/HotelsListCard.vue';
    import HotelsNoData from '../common/HotelsNoData';

    const STORE_NAME = 'packageOffers';

    export default {
        name: 'HotelsList',
        components: {
            InfiniteCardList,
            DataLoading,
            // eslint-disable-next-line vue/no-unused-components
            HotelsListCard,
            HotelsNoData
        },
        mixins: [
            DynamicStoreModule
        ],
        props: {
            bundleProducts: {
                type: Object,
                required: true,
                default: function( ) {
                    return new BundleProductsModel( );
                }
            },
            distanceUnitOfMeasure: {
                type: String,
                default: 'km'
            },
            inLocation: {
                type: Object,
                required: true
            },
            busEventsParent: {
                type: Object,
                required: true
            }
        },
        computed: {
            ...mapState( {
                list: state => state[ STORE_NAME ].hotels.list,
                loading: state =>  state[ STORE_NAME ].hotels.loading
            } ),
            items( ) {
                return this.list;
            },
            hotelCardConfig( ) {
                return {
                    card: HotelsListCard,
                    cardClasses: 'u-width-100 u-background-transparent',
                    propsToBind: ( item ) => {
                        return {
                            item: item,
                            distanceUnitOfMeasure: this.distanceUnitOfMeasure,
                            inLocation: this.inLocation,
                            bundleProducts: this.getFinalBundleProductsForHotelRoom( item ),
                            withTo: true,
                            width: this.$vuetify.breakpoint.mdAndUp ? '146px' : '138px',
                            height: this.$vuetify.breakpoint.mdAndUp ? '81px' : '138px',
                            addButtonLabel: this.$t( '_common:buttons.select' )
                        };
                    }
                };
            },
        },
        methods: {
            ...mapActions( {
                selectRoom: `${STORE_NAME}/hotels/selectRoom`,
            } ),

            getFinalBundleProductsForHotelRoom( item ) {
                const ret = this.bundleProducts._clone( );

                ret.setHotelReservation(
                    new BundleProductsHotelReservationModel (
                        item
                    )
                );

                return ret;
            },
            onChangeHotelRoomDo( { id, value } ) {
                this.selectRoom( { id, value } );
            },
            onResetFilterDo() {
                return null;
            }
        },
        mounted( ) {
            this.busEventsParent.$on( 'change-room', this.onChangeHotelRoomDo );
        },
        destroyed( ) {
            this.busEventsParent.$off( 'change-room', this.onChangeHotelRoomDo );
        }
    };
</script>


<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-add-hotel-reservation-hotel-list {
        .v-list {
            padding-top: 0 !important;

            .v-list-item:hover {
                background-color: theme-color( 'primary-lighten-1' );
            }
        }

        .gst-add-hotel-reservation-hotel-list__load-more-btn {
            text-transform: capitalize;
        }
    }
</style>
