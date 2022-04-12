<template>
    <div>
        <DataLoading v-if="loading && !events.length" class="mt-5 mb-5 pt-5 pb-5" />
        <template v-else>
            <div v-if="!noData">
                <v-list class="pt-0">
                    <v-list-item
                        v-for="(event, index) in events"
                        :key="index"
                        class="px-0 gst-tabs-item_item"
                        :class="{
                            'py-2': !expandableCard,
                            'py-1': expandableCard
                        }"
                        :to="!expandableCard ? { name:'event', params: { id: event.id } } : null">
                        <EventCardVariant1 
                            v-if="!expandableCard"
                            :with-price-icon="true"
                            :event="event"
                            :is-loyalty-currency-type-money="isLoyaltyCurrencyTypeMoney"
                            class="u-background-transparent u-width-100" />
                        <EventCardVariant6 
                            v-else
                            :with-price-icon="true"
                            :event="event"
                            :is-loyalty-currency-type-money="isLoyaltyCurrencyTypeMoney"
                            class="u-background-transparent u-width-100" />
                    </v-list-item>
                </v-list>
                <SeeMoreButton
                    v-if="!isAllItemsLoaded"
                    :data-test-id="$testId('buttons.seeMore')"
                    class="mx-auto d-flex mt-4"
                    :loading="loading"
                    @click="loadNextPage()" />
            </div>
            <div v-else class="d-flex justify-center">
                <slot v-if="$slots['empty-list']" name="empty-list"></slot>
                <SearchResultNoData v-else>
                    {{ $t("messages.noData") }}
                </SearchResultNoData>
            </div>
        </template>
    </div>
</template>
<script>
    import debounce from 'lodash/debounce';
    import { mapActions, mapState, mapGetters } from 'vuex';
    import EventCardVariant1 from '@core/shared/components/event/EventCardVariant1.vue';
    import EventCardVariant6 from '@core/shared/components/event/EventCardVariant6.vue';
    import SearchResultNoData from '@core/shared/components/search/common/SearchResultNoData.vue';
    import SeeMoreButton from '@core/shared/components/buttons/SeeMoreButton.vue';
    import DataLoading from '@core/shared/components/loading/DataLoading.vue';

    const STORE_NAME = 'events';

    export default {
        name: 'EventsSearchBy',
        components: {
            DataLoading,
            EventCardVariant1,
            EventCardVariant6,
            SearchResultNoData,
            SeeMoreButton
        },
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.search.eventsSearchBy'
        },
        testIdOptions: {
            keyPrefix: 'search.eventsTab'
        },
        props: {
            search: {
                type: Object,
                required: true
            },
            withUserAnalytics: {
                type: Boolean,
                default: false
            },
            expandableCard: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...mapState( {
                searchState:             state => state.searchState.current,
                events:                  state => state[STORE_NAME].list,
                loading:                 state => state[STORE_NAME].loading
            } ),
            ...mapGetters( {
                isAllItemsLoaded:  `${ STORE_NAME }/isAllItemsLoaded`,
                isLoyaltyCurrencyTypeMoney: 'appTenant/isLoyaltyCurrencyTypeMoney'
            } ),
            noData() {
                return !this.events.length;
            },
            searchParam( ) {
                return {
                    limit: 6,
                    ...this.search
                };
            }
        },
        watch: {
            'search': {
                handler: function ( ) {
                    this.loadDataDebouced( );
                },
                deep: true
            }
        },
        methods: {
            ...mapActions( {
                get:    `${ STORE_NAME }/get`
            } ),
            loadNextPage ( ) {
                this.get( { refresh: false, loadNextPage: true, search: this.searchParam, userAnalytics: this.withUserAnalytics } );
            },
            loadDataDebouced: debounce( function ( ) {
                this.load( );
            }, 500 ),
            load( ) {
                this.get( { refresh: true, loadNextPage: false, search: { ...this.searchParam, count: true } } );
            }
        },
        mounted() {
            this.load( );
        }
    };
</script>
