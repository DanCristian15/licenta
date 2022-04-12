<template>
    <div class="gst-event-ticket-container d-flex d-md-block">
        <div class="gst-event-ticket-container__carousel u-position-relative d-flex flex-column justify-center d-md-block">
            <template v-if="$vuetify.breakpoint.mdAndUp">
                <v-carousel
                    v-model="activeSlide"
                    :continuous="false"
                    :hide-delimiters="true"
                    :show-arrows="false"
                    height="180px"
                    class="gst-event-ticket-container__carousel">
                    <v-carousel-item v-if="mapUrl" class="pa-3 mb-4">
                        <BaseImage
                            :src="mapUrl"
                            max-height="160"
                            contain
                            class="gst-carousel-image" />
                    </v-carousel-item>
                    <v-carousel-item>
                        <BaseImage
                            :src="bannerImage"
                            :cover="true"
                            class="gst-carousel-image" />
                    </v-carousel-item>
                </v-carousel>
                <div v-if="mapUrl" class="gst-event-ticket-container__controllers">
                    <BaseButton
                        v-if="activeSlide === 1"
                        class="gst-image-gallery__carousel-navigation-prev"
                        fab
                        small
                        text
                        :data-test-id="$testId('button.image-gallery-carousel-navigation-prev')"
                        @click="onClickPrevDo">
                        <ChevronDownIcon class="u-rotate-90 icon" />
                    </BaseButton>
                    <BaseButton
                        v-if="activeSlide === 0"
                        class="gst-image-gallery__carousel-navigation-next"
                        fab
                        small
                        text
                        :data-test-id="$testId('button.image-gallery-carousel-navigation-next')"
                        @click="onClickNextDo">
                        <ChevronDownIcon class="u-rotate-90-n icon" />
                    </BaseButton>
                </div>
            </template>
            <BaseImage
                v-else
                :src="bannerImage"
                max-height="100%"
                contain
                class="gst-carousel-image" />
        </div>

        <div class="gst-event-ticket-container_details d-flex flex-column justify-center">
            <h5>{{ eventName }}</h5>
            <p>{{ eventDateFormatted }}</p>
            <p>{{ locationFormatted }}</p>
            <p>{{ ticketInformationFormatted }}</p>
        </div>
    </div>
</template>

<script>
    import BaseButton from '@core/shared/components/buttons/BaseButton';
    import BaseImage from '@tenants/ticketmaster/app/components/BaseImage';
    import ChevronDownIcon from '@core/shared/assets/icons/chevron_down.svg';

    export default {
        name: 'EventTicketContainer',
        components: {
            BaseImage,
            BaseButton,
            ChevronDownIcon
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckout._components.containers.eventTicketContainer'
        },
        testIdOptions: {
            keyPrefix: 'checkout.containers.eventTicketContainer'
        },
        props: {
            ticketItem: {
                type: Object,
                required: true
            },
            eventName: {
                type: String,
                required: true
            },
            eventAddress: {
                type: Object,
                required: true
            },
            eventStartDate: {
                type: Date,
                required: true
            },
            eventEndDate: {
                type: Date,
                default: false
            },
            bannerImage: {
                type: String,
                required: true
            },
            venueSeatMapUrl: {
                type: String,
                default: ''
            },
            venueMapUrl: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                activeSlide: 0,
                stateName: ''
            };
        },
        computed: {
            eventDateFormatted() {
                return this.$options.filters.datePeriod( this.eventStartDate, this.eventEndDate );
            },
            locationFormatted() {
                return `${this.eventAddress.venueName}, ${this.eventAddress.city}, ${this.eventAddress.stateCode}`;
            },
            ticketInformationFormatted() {
                const { ticketItem } = this;
                const seatLocation = this.$options.filters.seatFullLocation( ticketItem );

                if ( seatLocation ) {
                    return `${ticketItem.quantity} ${this.$t( '_common:terms.ticket_plural' )} - ${ seatLocation }`;
                } else {
                    return `${ticketItem.quantity}`;
                }
            },
            mapUrl( ) {
                return this.venueSeatMapUrl || this.venueMapUrl;
            }
        },
        methods: {
            onClickPrevDo() {
                this.activeSlide && this.activeSlide--;
            },
            onClickNextDo() {
                this.activeSlide === 0 && this.activeSlide++;
            }
        }
    };
</script>

<style lang="scss">
@import "@scssVariables";
@import "@scssMixins";

.gst-event-ticket-container {
    @include border-radius('xs');

    border: 1px solid theme-color( 'septenary' );

    .gst-event-ticket-container__carousel {
        .gst-carousel-image {
            max-height: 180px;
        }
    }

    .gst-event-ticket-container__controllers {
        .gst-image-gallery__carousel-navigation-next,
        .gst-image-gallery__carousel-navigation-prev {
            svg {
                height: 40px;
                width: 40px;

                .gst-svg-icon {
                    fill: theme-color( 'tertiary' );
                }
            }
        }

        .gst-image-gallery__carousel-navigation-prev {
            position: absolute;
            top: calc( 50% - 20px );
        }

        .gst-image-gallery__carousel-navigation-next {
            position: absolute;
            top: calc( 50% - 20px );
            right: 0;
        }
    }

    .gst-event-ticket-container_details {
        padding: theme-spacing( 4 );
        border-top: 1px solid theme-color( 'septenary' );

        h5 {
            line-height: line-height( 'xxxl' );
            margin-bottom: theme-spacing( 2 );
            font-size: font-size( 'l' );
            font-weight: font-weight( 'large' );
        }

        p {
            line-height: line-height( 'xl' );
            margin-bottom: theme-spacing( 1 );
            color: theme-color( 'tertiary' );
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
        }
    }

    @include mobile-only {
        padding: theme-spacing( 2 );

        .gst-event-ticket-container__carousel {
            margin: theme-spacing( 1 );
            min-width: 80px;
            max-width: 30%;

            .fallback-image {
                max-height: 60px;
            }
        }

        .gst-event-ticket-container_details {
            border-top: 0;
            max-width: 70%;

            h5 {
                line-height: line-height( 'xl' );
                margin-bottom: theme-spacing( 1 );
                font-size: font-size( 's' );
                font-weight: font-weight( 'large' );
            }

            p {
                line-height: line-height( 'm' );
                font-size: font-size( 'xxs' );
                font-weight: font-weight( 'regular' );
            }
        }
    }
}
</style>
