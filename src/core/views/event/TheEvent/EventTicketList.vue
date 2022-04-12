<template>
    <div class="u-width-100">
        <v-slide-x-transition>
            <v-flex
                v-if="$vuetify.breakpoint.mdAndUp && selectedTicket"
                class="u-width-100 u-height-100 u-pull-front u-position-absolute">
                <EventTicketDetailSidebar
                    :ticket="selectedTicketDetailInfo.ticket"
                    :offers="selectedTicketDetailInfo.offers"
                    :event="selectedTicketDetailInfo.event"
                    :quantity="selectedTicketDetailInfo.quantity"
                    :bus-event-parent="busEventParent"
                    @cancel="$emit('close-ticket' )" />
            </v-flex>
        </v-slide-x-transition>
        <InfiniteCardList
            :data="ticketsWithOffers"
            :config="eventTicketCardConfig"
            :loading="loadingTickets"
            :all-data-loaded="tickets.length >= totalTickets"
            :has-load-button="false"
            :prefill="true"
            item-classes="pl-0 pr-0 mr-4 gst-event__list-item"
            class="u-height-100 u-width-100 pl-4"
            @mouse-enter-item="$emit('hightlight-ticket', $event )"
            @mouse-leave-item="$emit('hightlight-ticket', null )"
            @click-item="$emit('click-item', $event)"
            @load-more="$emit('load-more')">
            <template slot="loading">
                <DataLoading v-if="loadingTickets" class="mt-5 mb-5 pt-5 pb-5" />
            </template>
            <template slot="empty-list">
                <TicketNoData v-if="!loadingTickets && !ticketsWithOffers.length"
                    align="start"
                    justify="center">
                    <img :src="noTickets" width="50px" />
                    <p>
                        {{ $t('_common:messages.noTickets') }}
                    </p>
                </TicketNoData>
            </template>
            <template v-if="ticketsWithOffers.length" slot="inner-scroll-header">
                <div class="py-2">
                    <DropDown
                        v-model="sort.value"
                        :clearable="false"
                        :items="sort.options"
                        value-prop="value"
                        :render-item-fn="( item ) => item.display"
                        :data-test-id="$testId('sort')" />
                </div>
                <EventHealthCheckWarningCardVariant1
                    v-if="hasHealthCheck && $vuetify.breakpoint.mdAndUp"
                    :health-check="event.healthCheck"
                    class="my-2 mr-4" />
                <EventHealthCheckWarningCardVariant2
                    v-if="hasHealthCheck && !$vuetify.breakpoint.mdAndUp"
                    :health-check="event.healthCheck"
                    class="my-2 mr-4"
                    :class="{
                        'mb-4': showTicketsFewAvailableWarning
                    }" />
                <v-fade-transition v-if="!$vuetify.breakpoint.mdAndUp">
                    <EventTicketStatusFewAvailableWarningCard
                        v-if="showTicketsFewAvailableWarning"
                        class="my-2 mr-4"
                        @close="$emit('close-tickets-few-available-warning')" />
                </v-fade-transition>
            </template>
        </InfiniteCardList>
        <div v-if="!$vuetify.breakpoint.mdAndUp"
            class="gst-event__filter-btn">
            <v-btn
                bottom
                width="120"
                class="text-capitalize"
                @click="$emit('open-filter-modal') ">
                <IconFilters class="mr-2" />{{ $t('_common:buttons.filters') }}
            </v-btn>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import DataLoading from '@core/shared/components/loading/DataLoading';
    import DropDown from '@core/shared/components/input/DropDown';
    import InfiniteCardList from '@core/shared/components/lists/InfiniteCardList';
    import TicketNoData from '@core/shared/components/ticket/TicketNoData';
    import TicketCardVariantOne from '@core/shared/components/ticket/TicketCardVariantOne';
    import imageConstants from '@core/utils/constants/imagePaths';
    import IconFilters from '@core/shared/assets/icons/filters.svg';
    import EventHealthCheckWarningCardVariant1 from '@core/shared/components/notifications/EventHealthCheckWarningCardVariant1.vue';
    import EventHealthCheckWarningCardVariant2 from '@core/shared/components/notifications/EventHealthCheckWarningCardVariant2.vue';
    import EventTicketDetailSidebar from './EventTicketDetailSidebar';
    import EventTicketStatusFewAvailableWarningCard from './components/notifications/EventTicketStatusFewAvailableWarningCard';

    export default {
        name: 'EventTicketList',
        components: {
            DataLoading,
            EventTicketDetailSidebar,
            InfiniteCardList,
            IconFilters,
            TicketNoData,
            DropDown,
            // eslint-disable-next-line vue/no-unused-components
            TicketCardVariantOne,
            EventTicketStatusFewAvailableWarningCard,
            EventHealthCheckWarningCardVariant1,
            EventHealthCheckWarningCardVariant2,
        },
        testIdOptions: {
            keyPrefix: 'event'
        },
        props: {
            event: {
                type: Object,
                required: true
            },
            tickets: {
                type: Array,
                default: null,
            },
            totalTickets: {
                type:Number,
                default: 0
            },
            ticketsWithOffers: {
                type: Array,
                default: null
            },
            loadingTickets: {
                type: Boolean,
                default: false
            },
            selectedTicket: {
                type: Object,
                default: null,
            },
            selectedTicketDetailInfo: {
                type: Object,
                default: null
            },
            sort: {
                type: Object,
                default: null
            },
            showTicketsFewAvailableWarning: {
                type: Boolean,
                default: false
            },
            busEventParent: {
                type: Object,
                required: true
            }
        },
        computed: {
            ...mapGetters( {
                isLoyaltyCurrencyTypeMoney: 'appTenant/isLoyaltyCurrencyTypeMoney'
            } ),
            eventTicketCardConfig( ) {
                return {
                    card: TicketCardVariantOne,
                    cardClasses: 'u-width-100 u-background-transparent pt-2 pb-1',
                    propsToBind: ( item ) => {
                        return {
                            ticket: item,
                            offers: item.offers,
                            isLoyaltyCurrencyTypeMoney: this.isLoyaltyCurrencyTypeMoney
                        };
                    }
                };
            },
            noTickets() {
                return imageConstants.FALLBACKS.NO_TICKETS;
            },
            hasHealthCheck( ) {
                return !!this.event.healthCheck;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-event-mobile.gst-event .gst-event__filter-btn {
        position: fixed;
        left: 50%;
        right: 50%;
        bottom: 20px;
        width: 120px;
        text-align: center;
        margin-left: -60px;

        .v-btn {
            background-color: theme-color( 'white' );
            color: theme-color( 'primary' );
            border-radius: border-radius( 'l' ) !important;

            svg .gst-svg-icon {
                fill: theme-color( 'primary' );
            }
        }
    }
</style>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-event {
        .gst-event__list-item {
            border-bottom: 1px solid theme-color( 'quinary' );
        }
    }
</style>