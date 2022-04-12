<template>
    <InfiniteCardList
        :data="items"
        :config="hotelCardConfig"
        :loading="loading"
        :all-data-loaded="allDataLoaded"
        :has-load-button="true"
        :prefill="true"
        :bus-events-parent="busEventsParent"
        item-classes="gst-add-hotel-reservation-hotel-list px-0"
        class="gst-add-hotel-reservation-hotel-list u-height-100 u-width-100"
        @load-more="loadNextPage">
        <template slot="loading">
            <DataLoading class="mt-5 mb-5 pt-5 pb-5" />
        </template>
        <template slot="empty-list">
            <HotelsNoData @reset-filters="resetFilters" />
        </template>
        <template slot="see-more-button">
            <BaseButton
                :placeholder="$t('_common:buttons.loadMore')"
                outlined
                color="primary"
                class="gst-add-hotel-reservation-hotel-list__load-more-btn mx-auto d-flex mt-4"
                :loading="loading"
                @click="loadNextPage" />
        </template>
    </InfiniteCardList>
</template>

<script>
    import debounce from 'lodash/debounce';
    import isEqual from 'lodash/isEqual';
    import { mapActions, mapState } from 'vuex';
    import BundleProductsModel from '@tenant/app/models/BundleProductsModel';
    import BundleProductsHotelReservationModel from '@tenant/app/models/BundleProductsHotelReservationModel';
    import DataLoading from '@shared/components/loading/DataLoading';
    import InfiniteCardList from '@shared/components/lists/InfiniteCardList';
    import listConstants from '@core/utils/constants/list';
    import BaseButton from '@shared/components/buttons/BaseButton.vue';
    import DynamicStoreModule from '@core/mixins/DynamicStoreModule';
    import HotelsListCard from '../common/HotelsListCard.vue';
    import HotelsNoData from '../common/HotelsNoData';

    const STORE_NAME = 'addHotelReservationState';

    export default {
        name: 'HotelsList',
        components: {
            InfiniteCardList,
            DataLoading,
            BaseButton,
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
                loading: state => state[ STORE_NAME ].hotels.loading,
                allDataLoaded: state => state[ STORE_NAME ].hotels.allItemsLoaded,
                listFilters: state => state[ STORE_NAME].hotels.filters,
                filters: state => state[ STORE_NAME].filters
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
                            bundleProducts: this.getFinalBundleProdutsForHotelRoom( item ),
                            withTo: true,
                            width: this.$vuetify.breakpoint.mdAndUp ? '146px' : '138px',
                            height: this.$vuetify.breakpoint.mdAndUp ? '81px' : '138px',
                            addButtonLabel: this.$t( '_common:buttons.add' )
                        };
                    }
                };
            },
        },
        watch: {
            'filters.startDateTime': function ( ) {
                this.loadNextPage( );
            },
            'filters.endDateTime': function ( ) {
                this.loadNextPage( );
            }
        },
        methods: {
            ...mapActions( {
                loadPage: `${STORE_NAME}/hotels/loadPage`,
                selectRoom: `${STORE_NAME}/hotels/selectRoom`,
                resetFilters: `${STORE_NAME}/resetFilters`
            } ),
            loadNextPage: debounce( function( ) {
                this.loadPage( {
                    filters: this.filters,
                } );
            }, listConstants.DEBOUNCE_DELAY ),

            getFinalBundleProdutsForHotelRoom( item ) {
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
            }
        },
        mounted( ) {
            if ( !this.list.length || !isEqual( this.filters, this.listFilters ) ) {
                this.loadPage( {
                    refresh: true,
                    filters: this.filters,
                } );
            }
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
