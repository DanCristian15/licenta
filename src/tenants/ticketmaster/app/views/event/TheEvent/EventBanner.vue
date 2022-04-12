<template>
    <div class="gst-event-banner">
        <v-flex d-flex flex-row class="u-height-100 ml-0 ml-md-4 mr-2">
            <v-flex v-if="!$vuetify.breakpoint.mdAndUp" d-flex align-center shrink justify-center>
                <v-btn icon @click="$emit( 'click-back' )">
                    <ChevronDown class="gst-event-banner__back-button-icon" />
                </v-btn>
            </v-flex>
            <v-flex d-flex align-center shrink justify-center>
                <BaseImage
                    ref="image"
                    :src="item.imageUrl"
                    :height="$vuetify.breakpoint.mdAndUp ? 85 : 42"
                    :width="$vuetify.breakpoint.mdAndUp ? 151 : 42"
                    class="gst-event-banner__image"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                    <template v-slot:fallback>
                        <div class="fallback-image"></div>
                    </template>
                </BaseImage>
            </v-flex>
            <v-flex d-flex flex-column flex-grow class="ml-2 mt-auto mb-auto">
                <v-flex d-flex flex-row align-center class="mb-1">
                    <VClamp autoresize :max-lines="1" class="hyphens clamp gst-event-banner__name">
                        {{ item.name }}
                    </VClamp>
                    <v-btn v-if="$vuetify.breakpoint.mdAndUp" outlined color="white" class="gst-event-banner__info-button ml-2" @click="openEventInfoModal">
                        {{ $t('buttons.moreInfo') }}
                    </v-btn>
                </v-flex>
                <div class="gst-event-banner__info">
                    {{ eventDate }}
                </div>
                <VenueInfo v-if="$vuetify.breakpoint.mdAndUp" :max-lines="1" class="hyphens clamp gst-event-banner__info" :item="venueInfoLocation" />
            </v-flex>
            <v-flex v-if="!$vuetify.breakpoint.mdAndUp" d-flex align-center shrink justify-center class="pl-2">
                <v-btn icon color="white" class="gst-event-banner__info-button-icon ml-2" @click="openEventInfoModal">
                    <InfoRoundIcon />
                </v-btn>
            </v-flex>
            <v-flex v-if="!$vuetify.breakpoint.mdAndUp" d-flex align-center shrink justify-center class="pl-2">
                <v-btn icon @click="menuExpanded = !menuExpanded">
                    <img src="@tenant/app/assets/icons/burger.png" alt="ticketmaster" />
                </v-btn>
            </v-flex>
            <component :is="sidebarMenuComponent" v-if="menuExpanded" right @close="menuExpanded = false" />
        </v-flex>
    </div>
</template>

<script>
    import VClamp from 'vue-clamp';
    import VenueInfo from '@core/shared/components/containerInfo/VenueInfo';
    import InfoRoundIcon from '@tenant/app/assets/icons/info_round.svg';
    import BaseImage from '@tenants/ticketmaster/app/components/BaseImage';
    import ChevronDown from '@core/shared/assets/icons/chevron_down.svg';

    export default {
        name: 'EventBanner',
        components: {
            BaseImage,
            VClamp,
            VenueInfo,
            InfoRoundIcon,
            ChevronDown
        },
        props: {
            item: {
                type: Object,
                default: null
            }
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.event.theEvent._components.eventBanner'
        },
        data() {
            return {
                menuExpanded: false,
            };
        },
        computed: {
            eventId( ) {
                return this.item.id;
            },
            eventDate( ) {
                const event = this.item;

                return event && event.startDateTime ? this.$options.filters.datePeriod( event.startDateTime, event.endDateTime ) : this.$t( '_common:terms.dateAndTimeToBeDetermined' );
            },
            venueInfoLocation( ) {
                const { venueName, venueStreet, venueCity, venueState, venueCountry } = this.item;

                return {
                    name:          venueName,
                    street:        venueStreet,
                    city:          venueCity,
                    stateCode:     venueState,
                    countryCode:   venueCountry
                };
            },
            sidebarMenuComponent( ) {
                return ( ) => import ( '@tenant/app/layouts/components/Sidebar.vue' );
            }
        },
        methods: {
            openEventInfoModal( ) {
                this.$router.push( {
                    name: 'eventInfo',
                    params: {
                        id: this.eventId
                    }
                } );
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-event-banner {
        @include font-size('s');

        height: 100px;
        background: theme-color( 'primary-darken-1' );
        color: theme-color( 'white' );

        .fallback-image {
            height: 85px;
            width: 151px;
            background: url( '~@tenants/ticketmaster/app/assets/icons/image.png' ) no-repeat center center, rgba( theme-color-hex( 'quaternary' ), 0.6 );
        }

        .gst-event-banner__back-button-icon {
            transform: rotate( 90deg );

            .gst-svg-icon {
                fill: theme-color( 'white' );
            }
        }

        .gst-event-banner__name {
            @include font-size('xxl');
            @include font-weight('regular');

            line-height: 22px;
            color: theme-color( 'white' );
        }

        .gst-event-banner__info {
            @include font-size('s');
            @include line-height('xl');

            color: theme-color( 'white' );
        }

        .gst-event-banner__info:last-of-type {
            margin-top: 2px;
        }

        .gst-event-banner__info-button {
            @include font-size('xxs');

            height: 20px;
            padding: 8px;
            border: 1px solid theme-color( 'white' );
            background-color: theme-color( 'transparent' ) !important;
            border-radius: 20px;
            text-transform: unset !important;
        }

        @include mobile-only {
            height: 50px;
            background: linear-gradient( 91.84deg, #012DA1 1.55%, #1574DE 50%, #012DA1 95.92% );

            .fallback-image {
                height: 42px;
                width: 42px;
            }

            .gst-event-banner__name {
                @include font-size('s');
                @include line-height('l');
                @include font-weight('medium');
            }

            .gst-event-banner__info {
                @include font-size('xxs');
                @include line-height('s');
                @include font-weight('regular');
            }
        }
    }
</style>
