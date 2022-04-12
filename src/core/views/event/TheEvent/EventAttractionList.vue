<template>
    <InfiniteCardList
        :data="itemsView"
        :config="eventAtractionCardConfig"
        :loading="loading"
        :all-data-loaded="items.length <= itemsView.length"
        :has-load-button="true"
        :prefill="true"
        item-classes="gst-event-atraction-list__list-item px-0 ml-n2 mr-2"
        class="u-height-100 u-width-100 pl-4"
        @load-more="loadPage">
        <template slot="loading">
            <DataLoading v-if="loading" class="mt-5 mb-5 pt-5 pb-5" />
        </template>
        <template slot="inner-scroll-header">
            <EventNotificationContainer :event="event" class="mt-4 mr-3" />
            <h5 v-if="items.length" class="gst-event-atraction-list__header mt-4">
                {{ $t('title') }}
            </h5>
        </template>
    </InfiniteCardList>
</template>

<script>
    import { mapActions } from 'vuex';
    import AttractionCardVariant8 from '@shared/components/attraction/AttractionCardVariant8';
    import InfiniteCardList from '@core/shared/components/lists/InfiniteCardList';
    import DataLoading from '@core/shared/components/loading/DataLoading';
    import EventNotificationContainer from './components/EventNotificationContainer';

    export default {
        name: 'EventAttractionList',
        components: {
            DataLoading,
            InfiniteCardList,
            // eslint-disable-next-line vue/no-unused-components
            AttractionCardVariant8,
            EventNotificationContainer
        },
        props: {
            event: {
                type: Object,
                required: true
            }
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.event.theEvent._components.eventAttractionList'
        },
        data( ) {
            return {
                items: [ ],
                itemsView: [ ],
                loading: true,
            };
        },
        computed: {
            eventAtractionCardConfig( ) {
                return { 
                    card: AttractionCardVariant8,
                    cardClasses: 'u-width-100 u-background-transparent pt-2 pb-1',
                    propsToBind: ( item ) => {
                        return {
                            item: item, 
                            withTo: true
                        };
                    }
                };
            }
        },
        methods: {
            ...mapActions( 'attractions', {
                searchByEvent: 'searchByEvent'
            } ),
            async load( ) {
                this.loading = true;
                const response = await this.searchByEvent( {
                    eventId: this.event.id, 
                } );
                if ( response.success ) {
                    this.items = [ ...response.data.list ];
                    this.loadPage( );
                }
                this.loading = false;

            }, 
            loadPage( ) {
                const itemsToAppend = [ ...this.items ].splice( this.itemsView.length, 8 );

                this.itemsView = [
                    ...this.itemsView,
                    ...itemsToAppend
                ];
            }
        },
        mounted( ) {
            this.load( );
        }
    };
</script>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-event {
        .gst-event-atraction-list__header {
            font-size: font-size( 's' );
            font-weight: font-weight( 'medium' );
            letter-spacing: -0.41px;
        }

        .gst-event-atraction-list__list-item {
            border-bottom: 1px solid theme-color( 'quinary' );

            a > div {
                padding-bottom: 8px;
                padding-left: 8px;
            }
        }
    }
</style>