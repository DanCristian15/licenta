<template>
    <div class="gst-event-ticket-detail-sidebar-header">
        <div v-if="$vuetify.breakpoint.mdAndUp" class="gst-event-ticket-detail-sidebar-header__toolbar py-3">
            <h5>{{ ticket | seatLocation }}</h5>
            <v-btn
                icon
                small
                class="gst-event-ticket-detail-sidebar-header__button"
                @click="$emit( 'close' )">
                <IconClose />
            </v-btn>
        </div>
        <p class="gst-event-ticket-detail-sidebar-header__title my-2 ml-2">
            {{ $t( 'titleWithCount', { count: quantity} ) }}
        </p>
    </div>
</template>

<script>
    import IconClose from '@core/shared/assets/icons/close.svg';

    export default {
        name:  'EventTicketDetailSidebarHeader',
        components: {
            IconClose
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.event.theEvent._components.eventTicketDetailSidebar._components.eventTicketDetailSidebarHeader'
        },
        props: {
            ticket: {
                type: Object,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    };
</script>

<style lang="scss">
    @import '@scssVariables';
    @import '@scssMixins';
    
    .gst-event-ticket-detail-sidebar-header {
        h5 {
            @include font-size('xxl');
            @include font-weight('large');
            @include line-height('xxxl');
        }

        p {
            @include font-size('xxs');
            @include font-weight('regular');
            @include line-height('m');

            color: theme-color( 'quaternary' );
        }

        .gst-event-ticket-detail-sidebar-header__toolbar {
            position: relative;
            background: theme-color( 'senary' );
            text-align: center;
        }

        .gst-event-ticket-detail-sidebar-header__button {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY( -50% );

            svg {
                height: 24px;
                width: 24px;

                .gst-svg-icon {
                    fill: theme-color( 'tertiary' );
                }
            }
        }
    }
</style>