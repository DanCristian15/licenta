<template>
    <div class="package-offer__price-details d-flex align-center justify-space-between">
        <div class="stay d-flex align-center flex-wrap">
            <TicketIcon /> {{ $t('priceDetails.twoTickets') }}  + <BedIcon /> {{ $t('priceDetails.oneNightStay') }}
        </div>
        <div class="cost d-flex flex-column align-end">
            <div class="d-flex align-center justify-end">
                <p class="main">
                    {{ prices.basePrice }}
                </p><p class="subtitle">
                    {{ $t('priceDetails.perPerson') }}
                </p>
            </div>
            <p class="total">
                {{ prices.totalPrice }} {{ $t('priceDetails.totalPlusTaxes') }}
            </p>
        </div>
    </div>
</template>

<script>
    import TicketIcon from '@tenants/ticketmaster/app/assets/icons/ticket.svg';
    import BedIcon from '@tenants/ticketmaster/app/assets/icons/bed.svg';

    export default {
        name: 'PriceDetails',
        components: {
            TicketIcon,
            BedIcon
        },
        props: {
            prices: {
                type: Object,
                required: true
            }
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.event.thePackage._components'
        }
    };
</script>

<style lang="scss">
    @import '@scssVariables';
    @import '@scssMixins';

    .package-offer__price-details {
        height: 88px;
        width: 100%;
        padding: 0 theme-spacing( 8 );
        margin-top: theme-spacing( 6 );
        background: theme-color( 'primary' );
        color: white;
        box-shadow: 0 0 0 1px rgba( 0, 0, 0, 0.05 ), 0 40px 34px -16px rgba( 0, 0, 0, 0.08 ), 0 6px 4px -4px rgba( 0, 0, 0, 0.06 ), 0 16px 16px -8px rgba( 0, 0, 0, 0.12 );
        border-radius: 2px;

        .stay {
            flex: 1;

            svg {
                margin-right: theme-spacing( 1 );
            }

            svg:last-child {
                margin-left: theme-spacing( 1 );

                .gst-svg-icon {
                    fill: white;
                }
            }
        }

        .cost {
            flex: 1;

            div {
                width: 100%;
            }

            .main {
                line-height: line-height( 'xxxxxl' );
                font-size: font-size( 'xxxxl' );
                font-weight: font-weight( 'large' );
            }

            .subtitle {
                line-height: line-height( 'm' );
                font-size: font-size( 'xxs' );
                margin-left: theme-spacing( 1 );
            }

            .total {
                line-height: line-height( 'm' );
                margin-right: 3px;
                color: #AFD5FE;
                font-size: font-size( 'xxs' );
                font-weight: font-weight( 'large' );
            }

            p {
                margin-bottom: theme-spacing( 0 );
            }
        }
    }

    @include mobile-only {
        .package-offer__price-details {
            width: 100vw;
            padding: theme-spacing( 3 ) theme-spacing( 2 );
            margin-top: theme-spacing( 3 );
            flex-direction: column;
            min-height: 140px;

            .stay {
                width: unset;
                font-size: font-size( 's' );
            }
        }
    }
</style>