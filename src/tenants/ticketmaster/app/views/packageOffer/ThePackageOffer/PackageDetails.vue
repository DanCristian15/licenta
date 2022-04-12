<template>
    <div class="package-offer__package-details d-flex">
        <div class="icons d-flex align-center">
            <TicketIcon /> <p>+</p> <BedIcon />
        </div>
        <div class="details">
            <p>{{ $t('packageDetails.title') }}</p>
            <p>{{ $t('packageDetails.subtitle') }}</p>
        </div>
    </div>
</template>

<script>
    import TicketIcon from '@tenants/ticketmaster/app/assets/icons/ticket.svg';
    import BedIcon from '@tenants/ticketmaster/app/assets/icons/bed.svg';

    export default {
        name: 'PackageDetails',
        components: {
            TicketIcon,
            BedIcon
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

    .package-offer__package-details {
        padding: theme-spacing( 6 );
        border: 1px solid theme-color( 'septenary' );
        border-radius: border-radius( 'xs' );

        .icons {
            height: 34px;
            padding: theme-spacing( 2 );
            background: #026CDF;
            border-radius: 2px;

            p {
                padding: 0 theme-spacing( 1 );
                margin-bottom: 2px;
                color: white;
                font-size: font-size( 'l' );
            }

            svg:last-child {
                .gst-svg-icon {
                    fill: white;
                }
            }
        }

        .details {
            padding: 0 10px 0 theme-spacing( 6 );

            p {
                line-height: line-height( 'xxxl' );
                color: #1F262D;
                font-size: font-size( 'l' );
                font-weight: font-weight( 'large' );
            }

            p:last-child {
                line-height: line-height( 'xxxl' );
                color: #000000;
                font-size: font-size( 's' );
                font-weight: unset;
            }
        }
    }

    @include mobile-only {
        .package-offer__package-details {
            padding: theme-spacing( 3 ) theme-spacing( 3 ) theme-spacing( 0 ) theme-spacing( 3 );
            flex-direction: column;
            align-items: flex-start;

            .details {
                padding: theme-spacing( 3 ) theme-spacing( 3 ) theme-spacing( 0 ) theme-spacing( 0 );
            }
        }
    }
</style>