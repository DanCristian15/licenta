<template>
    <InfiniteCardList
        :data="ticketsWithOffers"
        :config="eventTicketCardConfig"
        :loading="loadingTickets"
        :all-data-loaded="tickets.length >= totalTickets"
        :has-load-button="false"
        :prefill="true"
        item-classes="gst-event__list-item px-0"
        list-classes="pt-0"
        class="gst-event__list u-height-100 u-width-100 px-0"
        @mouse-enter-item="$emit('hightlight-ticket', $event )"
        @mouse-leave-item="$emit('hightlight-ticket', null )"
        @click-item="$emit('click-item', $event)"
        @load-more="$emit('load-more')">
        <template slot="loading">
            <DataLoading v-if="loadingTickets" class="mt-5 mb-5 pt-5 pb-5" />
        </template>
        <template slot="header">
            <EventTicketListSort v-if="loadingTickets || ticketsWithOffers.length" :sort="sort" />
        </template>
        <template slot="empty-list">
            <EventTicketListEmpty v-if="!loadingTickets && !ticketsWithOffers.length" />
        </template>
    </InfiniteCardList>
</template>

<script>
    import DataLoading from '@core/shared/components/loading/DataLoading';
    import InfiniteCardList from '@core/shared/components/lists/InfiniteCardList';
    import TicketCardVariant1 from '@tenant/app/components/cards/TicketCardVariant1';
    import EventTicketListSort from './EventTicketListSort';
    import EventTicketListEmpty from './EventTicketListEmpty';

    export default {
        name: 'EventTicketList',
        components: {
            DataLoading,
            InfiniteCardList,
            EventTicketListSort,
            // eslint-disable-next-line vue/no-unused-components
            TicketCardVariant1,
            EventTicketListEmpty
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
            busEventParent: {
                type: Object,
                required: true
            }
        },
        computed: {
            eventTicketCardConfig( ) {
                return { 
                    card: TicketCardVariant1,
                    cardClasses: 'u-width-100 u-background-transparent pt-2 pb-1',
                    propsToBind: ( item ) => {
                        return {
                            ticket: item, 
                            offers: item.offers,
                        };
                    }
                };
            },
            noTickets( ) {
                return '';
            }
        }
    };
</script>