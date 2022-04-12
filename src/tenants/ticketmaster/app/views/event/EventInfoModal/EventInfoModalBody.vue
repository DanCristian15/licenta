<template>
    <v-card-text class="gst-event-info-modal-body flex-grow-1 content-max-width pl-4 pr-0 pb-2 pt-0" :style="{ color:'inherit'}">
        <div
            v-if="!!event.healthCheck"
            class="ml-n4 ml-md-n6 mt-0 mb-4">
            <EventHealthCheckWarningCardVariant1
                :health-check="event.healthCheck"
                class="gst-event-info-modal-body__health-check-warning-card pl-4" />
        </div>
        <DataLoading v-if="loading" class="mt-5 mb-5 pt-5 pb-5" />
        <template v-else>
            <div v-if="!showNoData" class="u-width-100 gst-event-info-modal-body__content">
                <div
                    v-if="details && details.info"
                    class="pr-4 pl-md-2 pr-md-6">
                    <h5>
                        {{ $t('labels.info') }}
                    </h5>
                    <p>
                        {{ details.info }}
                    </p>
                </div>
                <EventInfoModalAttractionList class="gst-event-info-modal__lineup" :items="attractions" />
                <div v-for="(detailGroup, i) in detailGroupsFiltered"
                    :key="i"
                    class="pr-4 pl-md-2 pr-md-6">
                    <h5 class="d-flex">
                        <IconAccessibility v-if="showAccessibilityIcon(detailGroup)" class="gst-accessibility-icon pt-1" />
                        {{ $t(`labels.${detailGroup}`) }}
                    </h5>

                    <div v-if="detailGroupHasMoreDetails(detailGroup)" class="pr-4 pr-md-0 mb-2 mb-md-4">
                        <div
                            v-for="(detailGroupChild, j) in getDetailGroupMoreDetails(detailGroup)"
                            :key="j"
                            :class="{ 'mt-2': j > 0 }">
                            <h6>{{ $t(`labels.${detailGroupChild}`) }}</h6>
                            <p class="mb-0">
                                {{ details[detailGroup][detailGroupChild] }}
                            </p>
                        </div>
                    </div>
                    <p v-else>
                        {{ details[detailGroup] }}
                    </p>
                </div>
            </div>
            <EventInfoModalNoData v-else type="info" :content="$t( 'messages.noData' )" />
            <span v-if="event.currency && !showNoData" class="gst-event-info-modal__price-notification">
                {{ $t( 'labels.pricesLabel') }} {{ event.currency | currencyAbbr }}
            </span>
        </template>
    </v-card-text>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import DataLoading from '@core/shared/components/loading/DataLoading';
    import EventHealthCheckWarningCardVariant1 from '@tenant/app/components/notifications/EventHealthCheckWarningCardVariant1.vue';
    import asyncParallel from '@core/utils/asyncParallel';
    import IconAccessibility from '@core/shared/assets/icons/accessibility.svg';
    import EventInfoModalAttractionList from './EventInfoModalAttractionList.vue';
    import EventInfoModalNoData from './EventInfoModalNoData.vue';

    export default {
        name: 'EventInfoModalBody',
        components: {
            EventInfoModalAttractionList,
            EventInfoModalNoData,
            EventHealthCheckWarningCardVariant1,
            DataLoading,
            IconAccessibility
        },
        props: {
            event: {
                type: Object,
                required: true
            },
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.event.theEvent._components.eventInfoModal.details'
        },
        data() {
            return {
                loading: false,
                attractions: [ ]
            };
        },
        computed: {
            ...mapState( {
                details: state => state.events.informationDetails
            } ),
            detailGroups( ) {
                return Object.keys( this.details );
            },
            detailGroupsFiltered( ) {
                return this.detailGroups.filter( value => value !== 'info' );
            },
            hasDetails( ) {
                return !!this.detailGroupsFiltered.length;
            },
            showNoData( ) {
                return !this.hasDetails && !this.attractions.length;
            }
        },
        methods: {
            ...mapActions( {
                loadInformationDetails: 'events/informationDetails',
                loadAttractions: 'attractions/searchByEvent'
            } ),
            detailGroupHasMoreDetails( item ) {
                const values = this.detailGroups.filter( value => typeof this.details[value] === 'object' );
                return values ? values.includes( item ) : false;
            },
            getDetailGroupMoreDetails( item ) {
                return Object.keys( this.details[item] );
            },
            showAccessibilityIcon( detailGroupName ) {
                return detailGroupName === 'accessibleSeatingDetail';
            }
        },
        async mounted() {
            this.loading = true;
            await asyncParallel( [
                async ( ) => { await this.loadInformationDetails( this.event.id ); },
                async ( ) => {
                    const response = await this.loadAttractions( { eventId: this.event.id } );

                    if ( response.success ) {
                        this.attractions = [ ...response.data.list ];
                    }
                },
            ], 2 );
            this.loading = false;
        }
    };
</script>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-event-info-modal-body .v-divider {
        border-color: rgba( theme-color-hex( 'tertiary' ), 0.2 );
    }

    .gst-event-info-modal-body {
        .gst-event-info-modal-body__health-check-warning-card {
            background-color: rgba( theme-color-hex( 'event-health-check' ), 0.1 );
            box-shadow: none !important;
            border-radius: 0 !important;
            border-left: none !important;
        }

        .gst-event-info-modal-body__content {
            h5 {
                line-height: 30px;
            }

            .gst-accessibility-icon {
                color: theme-color( 'primary' );

                .gst-svg-icon {
                    fill: theme-color( 'primary' );
                }
            }
        }

        .gst-event-info-modal__price-notification {
            position: absolute;
            left: 24px;
            bottom: 24px;
            line-height: 15px;
            color: theme-color( 'tertiary' );
            font-size: font-size( 'xxs' );
        }
    }

    @include mobile-only {
        .gst-event-info-modal-body {
            .gst-event-info-modal__price-notification {
                left: 16px;
                bottom: 16px;
            }
        }
    }
</style>
