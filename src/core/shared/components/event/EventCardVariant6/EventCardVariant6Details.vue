<template>
    <v-flex class="gst-event-card-variant-6__details d-flex flex-wrap px-2 pb-2 pb-md-0 justify-center">
        <v-divider v-if="!isMobile" />
        <DataLoading v-if="loading" class="mt-5 mb-5 pt-5 pb-5" />
        <v-flex v-else class="d-flex flex-wrap">
            <v-flex xs12 md5 class="pl-8 pr-2 pb-md-4">
                <InfiniteCardList
                    :data="itemsView"
                    :loading="false"
                    :config="eventAtractionCardConfig"
                    :all-data-loaded="true"
                    :has-load-button="false"
                    :prefill="true"
                    item-classes="gst-event-atraction-list__list-item px-0 mr-4 mr-md-0"
                    :list-classes="listClasses"
                    class="gst-event-card-variant-6__atraction-list u-height-100 u-width-100">
                    <template slot="inner-scroll-header">
                        <SectionTitleSmall class="pt-4 pb-2">
                            {{ $t('titles.lineUp') }}
                        </SectionTitleSmall>
                    </template>
                    <template slot="inner-scroll-footer">
                        <v-btn v-if="showPlusMoreButton"
                            text
                            small
                            class="text-none gst-btn--more px-0 mt-1"
                            color="primary"
                            @click="openEventInfoModal">
                            {{ plusMoreButtonText }}
                        </v-btn>
                    </template>
                </InfiniteCardList>
            </v-flex>
            <v-flex xs12 md7 class="pb-4 pl-8 pl-md-0">
                <SectionTitleSmall class="pb-2 pt-2 pt-md-4">
                    {{ $t('titles.venue') }}
                </SectionTitleSmall>
                <v-flex>
                    <v-list-item class="pa-0" :to="toVenue">
                        <VenueCardSmall :venue="venue" :full-address="true" class="u-background-transparent u-width-100 pa-0" />
                    </v-list-item>
                </v-flex>
            </v-flex>
            <BaseButton
                :placeholder="$t('buttons.seeTickets')"
                :to="toEvent"
                class="gst-btn--see-tickets d-flex flex-grow-1 mx-md-n2" />
        </v-flex>
    </v-flex>
</template>

<script>
    import InfiniteCardList from '@core/shared/components/lists/InfiniteCardList';
    import AttractionCardVariant4 from '@shared/components/attraction/AttractionCardVariant4';
    import AttractionCardVariant8 from '@shared/components/attraction/AttractionCardVariant8';
    import DataLoading from '@core/shared/components/loading/DataLoading';
    import BaseButton from '@core/shared/components/buttons/BaseButton';
    import VenueCardSmall from '@core/shared/components/venue/VenueCardSmall.vue';
    import SectionTitleSmall from '@core/shared/components/misc/SectionTitleSmall.vue';

    export default {
        name: 'EventCardVariant6Details',
        components: {
            SectionTitleSmall,
            InfiniteCardList,
            DataLoading,
            VenueCardSmall,
            BaseButton,
            // eslint-disable-next-line vue/no-unused-components
            AttractionCardVariant4,
            // eslint-disable-next-line vue/no-unused-components
            AttractionCardVariant8
        },
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.event.eventCardVariant6._components.eventCardVariant6Details'
        },
        props: {
            event: {
                type: Object,
                required: true
            },
            items: {
                type: Array,
                required: true
            },
            maxItemsView: {
                type: Number,
                default: 3
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            toEvent( ) {
                return { name: 'event', params: { id: this.event.id } };
            },
            toVenue( ) {
                return { name: 'venue', params: { id: this.event.venueId } };
            },
            eventAtractionCardConfig( ) {
                return { 
                    card: !this.isMobile ? AttractionCardVariant8 : AttractionCardVariant4,
                    cardClasses: 'u-width-100 u-background-transparent',
                    propsToBind: ( item ) => {
                        return {
                            item: item, 
                            withTo: true,
                            width: !this.isMobile ? null : '134px',
                            height: !this.isMobile ? null : '134px'
                        };
                    }
                };
            },
            listClasses() {
                return !this.isMobile ?  'py-0' : 'pt-0 pb-3 d-flex overflow-y-auto u-background-transparent';
            },
            venue( ) {
                const { venueId, venueName, venueStreet, venueCity, venueState, venueCountry } = this.event;

                return {
                    id: venueId,
                    name: venueName,
                    street: venueStreet,
                    cityName: venueCity,
                    stateCode: venueState,
                    countryCode: venueCountry
                };
            },
            showPlusMoreButton( ) {
                return !this.isMobile && ( this.items.length > this.maxItemsView );
            },
            plusMoreButtonText( ) {
                const count = this.items.length - this.itemsView.length;
                return this.$t( 'buttons.plusMore', { count: count } );
            },
            isMobile() {
                return !this.$vuetify.breakpoint.mdAndUp;
            },
            itemsView() {
                return ( !this.isMobile ) ? [ ...this.items ].splice( 0, this.maxItemsView ) : [ ...this.items ];
            }
        },
        methods: {
            openEventInfoModal( ) {
                this.$router.push( {
                    name: 'eventInfo',
                    params: {
                        id: this.event.id
                    }
                } );
            },
        }
    };
</script>

<style lang="scss" scoped>
@import "@scssVariables";
@import "@scssMixins";

.gst-event-card-variant-6__details {
    .v-divider {
        flex-basis: 100%;
        border-color: rgba( theme-color-hex( 'tertiary' ), 0.2 );
    }

    .gst-btn--see-tickets {
        border-top-left-radius: 0 !important;
        border-top-right-radius: 0 !important;
    }

    ::v-deep .gst-venue-card {
        h5 {
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
        }
    }

    .gst-event-card-variant-6__atraction-list {
        ::v-deep .gst-event-atraction-list__list-item {
            .gst-attraction-card-variant-8 {
                h5 {
                    font-weight: font-weight( 'regular' );
                }
            }
        }
    }
}

@include mobile-only {
    .gst-event-card-variant-6__details {
        .gst-btn--see-tickets {
            border-top-left-radius: 10px !important;
            border-top-right-radius: 10px !important;
        }

        .gst-event-card-variant-6__atraction-list {
            min-width: 100%;

            ::v-deep .gst-event-atraction-list__list-item {
                width: auto;
                flex-basis: auto;
                flex-grow: 0;
            }

            ::v-deep .gst-event-atraction-list__list-item:last-child {
                margin-right: 0 !important;
            }
        }
    }
}
</style>