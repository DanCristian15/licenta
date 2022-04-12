<template>
    <InfiniteCardList
        :data="itemsView"
        :config="eventAtractionCardConfig"
        :loading="false"
        :all-data-loaded="items.length <= itemsView.length"
        :has-load-button="true"
        :prefill="true"
        item-classes="gst-event-info-modal__atraction-list__list-item col-md-3"
        :list-classes="listClasses"
        class="gst-event-info-modal__atraction-list d-flex flex-grow-1 flex-column px-md-2"
        @load-more="loadPage">
        <template slot="header">
            <h5 class="gst-event-info-modal__atraction-list__header pt-0 ml-0 pb-1 mr-2 ml-md-0">
                {{ $t('attractions.title') }}
            </h5>
        </template>
        <template slot="empty-list">
            <EventInfoModalNoData
                type="star"
                :content="$t( 'attractions.messages.noData' )" />
        </template>
        <template slot="see-more-button">
            <a class="gst-load-more-container__button pa-0" @click="loadPage"> {{ $t('shared:components.buttons.seeMore') }}...</a>
        </template>
    </InfiniteCardList>
</template>

<script>
    import AttractionCardVariant1 from '@tenant/app/components/cards/AttractionCardVariant1';
    import InfiniteCardList from '@core/shared/components//lists/InfiniteCardList';
    import EventInfoModalNoData from './EventInfoModalNoData.vue';

    export default {
        name: 'EventInfoModalAttractionList',
        components: {
            InfiniteCardList,
            EventInfoModalNoData
        },
        props: {
            items: {
                type: Array,
                required: true
            }
        },
        data( ) {
            return {
                itemsView: [ ],
            };
        },
        computed: {
            eventAtractionCardConfig( ) {
                return {
                    card: AttractionCardVariant1,
                    cardClasses: 'u-width-100 u-background-transparent',
                    propsToBind: ( item ) => {
                        return {
                            item: item,
                            withTo: true,
                            width: this.$vuetify.breakpoint.mdAndUp ? '146px' : '138px',
                            height: this.$vuetify.breakpoint.mdAndUp ? '81px' : '138px'
                        };
                    }
                };
            },
            listClasses() {
                let commonClasses = 'pt-0 d-flex col-md-10';

                return this.$vuetify.breakpoint.mdAndUp ?  `${commonClasses} flex-wrap` : `${commonClasses} overflow-y-auto`;
            }
        },
        methods: {
            loadPage( ) {
                if ( this.$vuetify.breakpoint.mdAndUp ) {
                    const itemsToAppend = [ ...this.items ].splice( this.itemsView.length, 6 );

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

        .gst-event-info-modal__atraction-list__header {
            font-size: font-size( 'l' );
        }

        ::v-deep .gst-event-info-modal__atraction-list__list-item {
            padding: 2px 8px 8px 0;
            align-items: normal;
            column-count: 3;
            max-width: 33.33%;

            @include mobile-only {
                width: auto;
                flex-basis: auto;
                flex-grow: 0;
                max-width: unset;
            }
        }

        ::v-deep .gst-load-more-container {
            margin: 0 !important;

            .gst-btn--see-more {
                margin-top: 0 !important;
                color: theme-color( 'primary' );
            }
        }
    }

    @include mobile-only {
        .gst-event-info-modal__atraction-list {
            .gst-event-info-modal__atraction-list__header {
                font-size: font-size( 's' );
            }
        }
    }
</style>
