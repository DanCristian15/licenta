<template>
    <InfiniteCardList
        :data="itemsView"
        :config="eventAtractionCardConfig"
        :loading="false"
        :all-data-loaded="items.length <= itemsView.length"
        :has-load-button="$vuetify.breakpoint.mdAndUp"
        :prefill="true"
        item-classes="gst-event-info-modal__atraction-list__list-item py-2 px-0 mr-4 px-md-2 mr-md-0 col-md-3"
        :list-classes="listClasses"
        class="gst-event-info-modal__atraction-list d-flex flex-grow-1 flex-column mx-md-n2"
        @load-more="loadPage">
        <template slot="inner-scroll-header">
            <h6 class="gst-event-info-modal__atraction-list__header pt-3 ml-0 pb-1 mr-2 ml-md-2">
                {{ $t('attractions.title') }}
            </h6>
        </template>
        <template slot="empty-list">
            <EventInfoModalNoData 
                class="mt-4 mb-6" 
                :icon="'$vuetify.icons.starBordered'" 
                :content="$t( 'attractions.messages.noData' )" />
        </template>
    </InfiniteCardList>
</template>

<script>
    import AttractionCardVariant4 from '@shared/components/attraction/AttractionCardVariant4';
    import InfiniteCardList from '@core/shared/components/lists/InfiniteCardList';
    import EventInfoModalNoData from './EventInfoModalNoData.vue';

    export default {
        name: 'EventInfoModalAttractionList',
        components: {
            InfiniteCardList,
            // eslint-disable-next-line vue/no-unused-components
            AttractionCardVariant4,
            EventInfoModalNoData
        },
        props: {
            items: {
                type: Array,
                required: true
            }
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.event.eventInfoModal.details'
        },
        data( ) {
            return {
                itemsView: [ ],
            };
        },
        computed: {
            eventAtractionCardConfig( ) {
                return { 
                    card: AttractionCardVariant4,
                    cardClasses: 'u-width-100 u-background-transparent',
                    propsToBind: ( item ) => {
                        return {
                            item: item, 
                            withTo: true,
                            width: this.$vuetify.breakpoint.mdAndUp ? '100%' : '138px',
                            height: this.$vuetify.breakpoint.mdAndUp ? '114px' : '138px'
                        };
                    }
                };
            },
            listClasses() {
                let commonClasses = 'pt-0 d-flex';

                return this.$vuetify.breakpoint.mdAndUp ?  `${commonClasses} flex-wrap` : `${commonClasses} overflow-y-auto`;
            }
        },
        methods: {
            loadPage( ) {
                if ( this.$vuetify.breakpoint.mdAndUp ) {
                    const itemsToAppend = [ ...this.items ].splice( this.itemsView.length, 8 );

                    this.itemsView = [
                        ...this.itemsView,
                        ...itemsToAppend
                    ];
                } else {
                    this.itemsView = [ ...this.items ];
                }
            }
        },
        mounted( ) {
            this.loadPage( );
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-event-info-modal__atraction-list {
        min-width: 100%;

        ::v-deep .gst-event-info-modal__atraction-list__list-item {
            @include mobile-only {
                width: auto;
                flex-basis: auto;
                flex-grow: 0;
            }
        }

        ::v-deep .gst-load-more-container {
            margin: 8px 0 !important;

            .gst-btn--see-more {
                margin-top: 0 !important;
            }
        }
    }
</style>