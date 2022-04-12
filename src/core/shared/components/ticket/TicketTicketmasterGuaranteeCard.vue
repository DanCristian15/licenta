<template>
    <v-card class="py-3 px-3 gst-ticket-guarantee u-alpha-background" flat>
        <v-layout align-center>
            <v-flex xs="4" class="pr-4 pr-md-2">
                <component :is="logoIcon" class="d-inline-block u-vertical-middle" />
            </v-flex>
            <v-flex xs="8">
                <p color="primary" class="mb-0 gst-ticket-guarantee__description">
                    {{ $t("ticketGuarantee.description") }}
                </p>
            </v-flex>
        </v-layout>
    </v-card>
</template>
<script>
    import { isStandard as ticketUtilsIsStandard } from '@core/utils/ticketUtils';
    import LogoTicketmaster from '@core/shared/assets/logo_ticketmaster.svg';
    import LogoTicketmasterVerifiedTickets from '@core/shared/assets/logo_ticketmaster_verified_tickets.svg';

    export default {
        name: 'TicketTicketmasterGuaranteeCard',
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.ticket'
        },
        components: {
            /* eslint-disable vue/no-unused-components */
            LogoTicketmaster,
            LogoTicketmasterVerifiedTickets
            /* eslint-enable vue/no-unused-components */
        },
        props: {
            ticket: {
                type: Object,
                required: true
            }
        },
        computed: {
            logoIcon( ) {
                return ticketUtilsIsStandard( this.ticket.selection ) ? 'LogoTicketmaster' : 'LogoTicketmasterVerifiedTickets';
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-ticket-guarantee {
        position: relative;
        border: 1px solid theme-color( 'quinary' );
        background: theme-color( 'transparent' );
        color: theme-color( 'primary' );
        border-radius: border-radius( 'm' ) !important;
        z-index: 0;
    }

    .gst-ticket-guarantee__description {
        line-height: line-height( 'l' );
        font-size: font-size( 'xxs' );
        font-family: 'Roboto', sans-serif;
        letter-spacing: -0.21px;
    }
</style>
