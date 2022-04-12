<template>
    <div class="gst-order-confirmation-modal__tickets-info">
        <div class="image-container">
            <img :src="event.image" />
        </div>
        <div class="info-container">
            <span class="event-title">{{ event.name }}</span>
            <div class="mb-2">
                <div class="info-container__wrapper-icon d-flex justify-center">
                    <CalendarIcon />
                </div>
                <span class="ml-2">
                    {{ eventPeriod }}
                </span>
            </div>
            <div class="mb-0">
                <div class=" info-container__wrapper-icon d-flex justify-center">
                    <LocationIcon />
                </div>
                <span class="ml-2">
                    {{ event.venueName }},
                    {{ event.location | fullLocation }}
                </span>
            </div>
            <a :href="event.directionsUrl" target="_blank" class="directions"><strong>{{ $t('getDirections') }}</strong></a>
            <div class="mt-2 mb-3">
                <div class=" info-container__wrapper-icon d-flex justify-center">
                    <TicketsIcon />
                </div>
                <span class="ml-2">
                    {{ ticket.seat | seatFullLocation }}
                </span>
            </div>
            <button @click="onClickDo">
                {{ $t('claimTickets') }}
            </button>
        </div>
    </div>
</template>

<script>
    import CalendarIcon from '@tenants/ticketmaster/app/assets/icons/calendar.svg';
    import LocationIcon from '@tenants/ticketmaster/app/assets/icons/location.svg';
    import TicketsIcon from '@tenants/ticketmaster/app/assets/icons/tickets.svg';

    export default {
        name: 'OrderConfirmationModalTicketsInfo',
        components: {
            TicketsIcon,
            CalendarIcon,
            LocationIcon,
        },
        props: {
            ticket: {
                type: Object,
                required: true
            },
            event: {
                type: Object,
                required: true
            },
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckout._components.orderConfirmationModal'
        },
        computed: {
            eventPeriod( ) {
                const { startDateTime, endDateTime } = this.event;


                return this.$options.filters.datePeriod( startDateTime, endDateTime );
            }
        },
        methods: {
            onClickDo() {
                window.open( this.ticket.redemptionUrl, '_blank' ).focus();
            },

        }
    };
</script>

<style lang="scss">
    @import "@scssMixins";
    @import "@scssVariables";

    .gst-order-confirmation-modal__tickets-info {
        display: flex;
        width: 80%;
        margin-top: theme-spacing( 8 );
        align-items: center;
        justify-content: center;

        .image-container,
        .info-container {
            flex: 1;
        }

        .image-container {
            img {
                min-height: 200px;
                object-fit: cover;
            }
        }

        .info-container {
            display: flex;
            flex-direction: column;
            margin-left: theme-spacing( 4 );

            div {
                display: flex;
                line-height: line-height( 'm' );
                color: theme-color( 'quaternary' );
                font-size: font-size( 'xxs' );
                align-items: center;

                .info-container__wrapper-icon {
                    width: 15px;

                    svg {
                        width: 15px;
                    }
                }
            }

            .event-title {
                line-height: line-height( 'xxl' );
                margin-bottom: theme-spacing( 2 );
                font-size: font-size( 'm' );
                font-weight: font-weight( 'bold' );
            }

            button {
                width: 220px;
                padding: theme-spacing( 2 ) theme-spacing( 9 );
                margin-bottom: theme-spacing( 2 );
                background: theme-color( 'primary' );
                color: white;
                font-weight: font-weight( 'large' );
                border-radius: 4px;
            }

            .directions {
                width: fit-content;
                line-height: line-height( 'm' );
                margin-top: theme-spacing( 1 );
                color: theme-color( 'primary' );
                font-size: font-size( 'xxs' );
                margin-left: theme-spacing( 6 );
                cursor: pointer;
            }
        }

        @include mobile-only {
            width: 90% !important;
            flex-direction: column;

            .info-container {
                width: 100% !important;
            }
        }
    }
</style>