<template>
    <div class="package-offer__marketing-points d-flex flex-column align-start">
        <p class="title">
            {{ $t('marketingPoints.title') }}
        </p>
        <div class="point d-flex align-center">
            <TicketsIcon />   {{ $t('marketingPoints.eventTickets') }}
        </div>
        <div class="point d-flex align-center">
            <BedIcon />   {{ $t('marketingPoints.hotelReservation') }}
        </div>
        <div class="point d-flex align-center">
            <WineIcon />   {{ $t('marketingPoints.extra') }}
        </div>
    </div>
</template>

<script>
    import TicketsIcon from '@tenants/ticketmaster/app/assets/icons/tickets.svg';
    import BedIcon from '@tenants/ticketmaster/app/assets/icons/bed.svg';
    import WineIcon from '@tenants/ticketmaster/app/assets/icons/wine.svg';

    export default {
        name: 'MarketingPoints',
        components: {
            TicketsIcon,
            BedIcon,
            WineIcon
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.event.thePackage._components'
        },
    };
</script>

<style lang="scss">
    @import '@scssVariables';
    @import '@scssMixins';

    .package-offer__marketing-points {
        width: 100%;
        margin: theme-spacing( 6 ) 0;

        .title {
            line-height: line-height( 'xxxl' );
            margin-bottom: theme-spacing( 4 );
            color: theme-color( 'quaternary' );
            font-size: font-size( 'l' );
            font-weight: font-weight( 'large' );
            font-family: unset !important;
        }

        .point {
            line-height: line-height( 'xl' );
            margin-bottom: 14px;
            margin-bottom: theme-spacing( 3 );
            color: theme-color( 'primary' );
            font-size: font-size( 's' );

            svg {
                position: relative;
                width: 24px;
                margin-right: theme-spacing( 1 );
            }

            path {
                fill: theme-color( 'tertiary' );
            }
        }

        .point:first-of-type {
            svg {
                left: theme-spacing( 1 );
                transform: scale( 1.3 );
            }
        }

        .point:last-child {
            position: relative;
            bottom: 3px;

            svg {
                right: 2px;
            }

            path {
                fill: unset;
            }
        }
    }

    @include mobile-only {
        .package-offer__marketing-points {
            .point {
                padding-left: theme-spacing( 1 );
            }
        }
    }
</style>