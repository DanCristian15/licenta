<template>
    <InfiniteCardList
        :data="sections"
        :config="eventSectionCardConfig"
        :loading="loadingSections"
        :all-data-loaded="true"
        :has-load-button="false"
        :prefill="true"
        item-classes="gst-event__list-item px-0"
        list-classes="pt-0"
        class="gst-event__list u-width-100 px-0 u-height-100"
        @mouse-enter-item="$emit('hightlight-section', $event )"
        @mouse-leave-item="$emit('hightlight-section', null )"
        @click-item="$emit('select-section', $event)"
        @load-more="$emit('load-more')">
        <template v-if="$vuetify.breakpoint.mdAndUp" slot="header">
            <div class="gst-event-ticket-list-sort u-width-100 d-flex flex-row">
                <div
                    v-ripple
                    class="gst-event-ticket-list-sort__item u-mouse-pointer flex-grow-1 text-center">
                    {{ $t('_common:entities.seat.section') }}
                </div>
            </div>
        </template>
        <template slot="loading">
            <DataLoading v-if="loadingSections" class="mt-5 mb-5 pt-5 pb-5" />
        </template>
        <template slot="empty-list">
            <EventTicketListEmpty v-if="!loadingSections && !sections.length" />
        </template>
    </InfiniteCardList>
</template>

<script>
    import DataLoading from '@shared/components/loading/DataLoading';
    import InfiniteCardList from '@shared/components/lists/InfiniteCardList';
    import SectionCardVariant1 from '@tenant/app/components/cards/SectionCardVariant1';
    import EventTicketListEmpty from './EventTicketListEmpty';

    export default {
        name: 'SectionsList',
        components: {
            DataLoading,
            InfiniteCardList,
            // eslint-disable-next-line vue/no-unused-components
            SectionCardVariant1,
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
            sections: {
                type: Array,
                default: null,
            },
            loadingSections: {
                type: Boolean,
                default: false
            },
            selectedSection: {
                type: Object,
                default: null,
            }
        },
        computed: {
            eventSectionCardConfig( ) {
                return {
                    card: SectionCardVariant1,
                    cardClasses: 'u-width-100 u-background-transparent pt-2 pb-1',
                    propsToBind: ( item ) => ( {
                        item: item
                    } )
                };
            }
        }
    };
</script>


<style lang="scss" scoped>
@import '@scssVariables';
@import '@scssMixins';

.gst-event-ticket-list-sort {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    background-color: theme-color( 'white' );
    z-index: 1;

    .gst-event-ticket-list-sort__item {
        height: 46px;
        padding-top: 12px;
        color: theme-color( 'quaternary' );
        font-size: font-size( 's' );
        font-weight: font-weight( 'large' );
        border-bottom: 1px solid theme-color-hex( 'senary-darken-2' );
        border-bottom: 3px solid theme-color( 'primary' );
    }
}
</style>
