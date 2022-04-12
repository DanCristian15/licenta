<template>
    <div>
        <v-card
            class="gst-event-info-modal d-flex flex-column u-height-100 overflow-y-hidden"
            :class="{
                'rounded-t-1': $vuetify.breakpoint.mdAndUp,
                'rounded-t-lg': !$vuetify.breakpoint.mdAndUp,
            }"
            color="text">
            <HeaderVariant1
                class="flex-grow-0 header"
                :title="$t( 'title' )"
                @close="$emit('close')" />
            <template v-if="isPackageFlow">
                <div class="mx-4 mx-md-6">
                    <v-tabs
                        v-model="activeTab"
                        slider-size="3"
                        :show-arrows="false"
                        class="gst-event-info-modal__tabs">
                        <v-tab
                            v-for="tab in tabs"
                            :key="tab.id"
                            class="gst-event-info-modal__tab">
                            {{ tab.title }}
                        </v-tab>
                    </v-tabs>
                </div>
                <v-tabs-items
                    v-model="activeTab"
                    class="flex-grow-1 u-width-100 u-height-100">
                    <v-tab-item
                        :key="tabs[0].id"
                        transition="none"
                        class="u-height-100">
                        <div class="u-height-100 d-flex flex-column">
                            <DataLoading v-if="loading" class="mt-5 mb-5 pt-5 pb-5" />
                            <template v-else>
                                <EventInfoModalSubHeader :event="event" />
                                <EventInfoModalBody style="overflow: scroll;" :event="event" />
                            </template>
                        </div>
                    </v-tab-item>
                    <v-tab-item
                        :key="tabs[1].id"
                        transition="none"
                        class="tab-item-hotel">
                        <div v-if="packageInfo !== null" class="mx-4 mx-md-6">
                            <p class="tab-item-hotel__title">
                                {{ $t( 'hotelDetails.title' ) }}
                            </p>
                            <!-- eslint-disable-next-line vue/no-v-html -->
                            <div class="tab-item-hotel__content" v-html="packageInfo">
                            </div>
                        </div>
                        <div v-else class="tab-item-hotel__empty">
                            <p class="tab-item-hotel__empty-content">
                                {{ $t( 'hotelDetails.messages.noData' ) }}
                            </p>
                        </div>
                    </v-tab-item>
                </v-tabs-items>
            </template>
            <div v-else
                :class="{
                    'gst-event-info-modal--no-tabs': !isPackageFlow
                }"
                class="gst-event-info-modal d-flex flex-column u-height-100">
                <div class="u-height-100 d-flex flex-column">
                    <DataLoading v-if="loading" class="mt-5 mb-5 pt-5 pb-5" />
                    <template v-else>
                        <EventInfoModalSubHeader :event="event" />
                        <EventInfoModalBody
                            class="eventInfoBody"
                            style="overflow: scroll;"
                            :event="event" />
                    </template>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
    import { mapActions, mapState, mapGetters } from 'vuex';
    import HeaderVariant1 from '@tenant/app/components/modals/HeaderVariant1';
    import CloseModalOnRouteChangeMixin from '@core/mixins/modals/CloseModalOnRouteChange';
    import CloseModalOnBreakpointChangeMixin from '@core/mixins/modals/CloseModalOnBreakpointChange';
    import DataLoading from '@core/shared/components/loading/DataLoading.vue';
    import EventInfoModalSubHeader from './EventInfoModal/EventInfoModalSubHeader.vue';
    import EventInfoModalBody from './EventInfoModal/EventInfoModalBody.vue';

    const STORE_EVENT_NAME = 'events';
    const STORE_PACKAGES_NAME = 'packageOffers';

    export default {
        name: 'EventInfoModal',
        components: {
            HeaderVariant1,
            EventInfoModalSubHeader,
            EventInfoModalBody,
            DataLoading
        },
        mixins: [ CloseModalOnRouteChangeMixin, CloseModalOnBreakpointChangeMixin ],
        props: {
            id: {
                type: [ String, Number ],
                default: null
            }
        },
        data( ) {
            return {
                loading: true,
                activeTab: null,
                isPackageFlow: false,
                packageInfo: null
            };
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.event.theEvent._components.eventInfoModal'
        },
        computed: {
            ...mapState( {
                event: state => state[STORE_EVENT_NAME].detail,
                packageDetails: state => state[STORE_PACKAGES_NAME].packageDetails
            } ),
            ...mapGetters( {
                getPackageDetailsByEventId: `${STORE_PACKAGES_NAME}/getDetailsByEventId`,
                hasPackageByEventId: `${STORE_PACKAGES_NAME}/hasByEventId`
            } ),
            tabs() {
                return  [
                    {
                        id: 0,
                        title: this.$t( 'tabs.titles.eventInfo' ),
                    },
                    {
                        id: 1,
                        title: this.$t( 'tabs.titles.hotelPackageInfo' )
                    }
                ];
            }
        },
        watch: {
            'packageDetails': {
                handler: function ( ) {
                    this.isPackageFlow = this.hasPackageByEventId( this.id );
                    this.packageInfo = this.getPackageDetailsByEventId( );
                },
                deep: true,
                immediate: true
            }
        },
        methods: {
            ...mapActions( {
                loadOne: `${STORE_EVENT_NAME}/one`,
            } )
        },
        async mounted( ) {
            this.loading = true;
            if ( this.event.id !== this.id ) {
                await this.loadOne( this.id );
            }
            this.loading = false;
        }
    };
</script>

<style  lang="scss" scoped>
@import "@scssVariables";
@import "@scssMixins";

.gst-event-info-modal {
    border-radius: 0 !important;

    .gst-event-info-modal--no-tabs {
        padding-bottom: 43px;
    }

    .gst-event-info-modal-body {
        margin-bottom: theme-spacing( 15 );
    }

    .gst-event-info-modal__tabs {
        border-bottom: 1px solid rgba( theme-color-hex( 'tertiary' ), 0.2 );
    }

    .gst-event-info-modal__tab {
        color: theme-color( 'quaternary' ) !important;
        letter-spacing: 1px;
        text-transform: capitalize;
    }

    .gst-event-info-modal__tab.v-tab--active {
        color: theme-color( 'quaternary' );
    }

    .tab-item-hotel__title {
        line-height: line-height( 'xxxxxl' );
        padding-top: theme-spacing( 4 );
        padding-bottom: theme-spacing( 6 );
        margin-bottom: 0;
        font-size: font-size( 'xxxxl' );
        font-weight: font-weight( 'large' );
        border-bottom: 1px solid rgba( theme-color-hex( 'tertiary' ), 0.2 );
    }

    .tab-item-hotel__subtitle {
        line-height: line-height( 'xxxl' );
        margin-top: theme-spacing( 4 );
        margin-bottom: theme-spacing( 2 );
        font-size: font-size( 'l' );
        font-weight: font-weight( 'large' );
    }

    .tab-item-hotel__content {
        line-height: line-height( 'xxxl' );
        font-size: font-size( 's' );
        font-weight: font-weight( 'regular' );
    }

    .tab-item-hotel__empty {
        text-align: center;
    }

    .tab-item-hotel__empty-content {
        padding-top: 72px;
        font-size: font-size( 'xxxl' );
        font-weight: font-weight( 'large' );
    }

    @include mobile-only {
        .tab-item-hotel__title {
            line-height: line-height( 'xxxxl' );
            padding-top: theme-spacing( 4 );
            padding-bottom: theme-spacing( 4 );
            margin-bottom: 0;
            font-size: font-size( 'xxxl' );
            font-weight: font-weight( 'large' );
            border-bottom: none;
        }

        .tab-item-hotel__subtitle {
            margin-top: theme-spacing( 0 );
            margin-bottom: theme-spacing( 2 );
        }
    }
}
</style>
