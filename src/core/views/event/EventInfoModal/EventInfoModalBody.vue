<template>
    <v-card-text class="gst-event-info-modal__body flex-grow-1 content-max-width px-4 pb-2 pt-0" :style="{ color:'inherit'}">
        <div
            v-if="!!event.healthCheck"
            class="mx-n4 mt-4 mb-1">
            <EventHealthCheckWarningCardVariant1
                :health-check="event.healthCheck"
                class="gst-event-info-modal__body-health-check-warning-card pl-4" />
        </div>
        <DataLoading v-if="loading" class="mt-5 mb-5 pt-5 pb-5" />
        <template v-else>
            <v-expansion-panels v-if="!showNoData" class="u-width-100" accordion>
                <v-flex v-if="details && details.info">
                    <ExpansionPanel>
                        <template slot="header">
                            {{ $t('labels.info') }}
                        </template>
                        <template slot="content">
                            <p class="mb-0">
                                {{ details.info }}
                            </p>
                        </template>
                    </ExpansionPanel>
                    <v-divider />
                </v-flex>
                <EventInfoModalAttractionList :items="attractions" />
                <ExpansionPanel
                    v-for="(detailGroup, i) in detailGroupsFiltered"
                    :key="i">
                    <template slot="header">
                        {{ $t(`labels.${detailGroup}`) }}
                    </template>
                    <template slot="content">
                        <div v-if="detailGroupHasMoreDetails(detailGroup)">
                            <div
                                v-for="(detailGroupChild, j) in getDetailGroupMoreDetails(detailGroup)"
                                :key="j"
                                :class="{ 'mt-4': j > 0 }">
                                <h6>{{ $t(`labels.${detailGroupChild}`) }}</h6>
                                <p class="mb-0">
                                    {{ details[detailGroup][detailGroupChild] }}
                                </p>
                            </div>
                        </div>
                        <p v-else class="mb-0">
                            {{ details[detailGroup] }}
                        </p>
                    </template>
                </ExpansionPanel>
            </v-expansion-panels>
            <EventInfoModalNoData v-else class="u-height-100" :icon="'$vuetify.icons.infoBordered'" :content="$t( 'messages.noData' )" />
        </template>
    </v-card-text>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import DataLoading from '@core/shared/components/loading/DataLoading';
    import ExpansionPanel from '@core/shared/components/misc/ExpansionPanel';
    import asyncParallel from '@core/utils/asyncParallel';
    import EventHealthCheckWarningCardVariant1 from '@core/shared/components/notifications/EventHealthCheckWarningCardVariant1.vue';
    import EventInfoModalAttractionList from './EventInfoModalAttractionList.vue';
    import EventInfoModalNoData from './EventInfoModalNoData.vue';


    export default {
        name: 'EventInfoModalBody',
        components: {
            ExpansionPanel,
            EventInfoModalAttractionList,
            EventInfoModalNoData,
            EventHealthCheckWarningCardVariant1,
            DataLoading,
        },
        props: {
            event: {
                type: Object,
                required: true
            },
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.event.eventInfoModal.details'
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

    .gst-event-info-modal__body .v-divider {
        border-color: rgba( theme-color-hex( 'tertiary' ), 0.2 );
    }

    .gst-event-info-modal__body {
        .gst-event-info-modal__body-health-check-warning-card {
            background-color: rgba( theme-color-hex( 'event-health-check' ), 0.1 );
            box-shadow: none !important;
            border-radius: border-radius( 'none' ) !important;
            border-left: none !important;
        }
    }
</style>