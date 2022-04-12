<template>
    <v-flex class="gst-ticket-no-seats-available d-flex flex-column align-center justify-center u-height-100">
        <IconNoSeatsAvailable class="gst-ticket-no-seats-available__image mb-2" :width="width" :height="height" />
        <template v-if="$slots.default">
            <slot></slot>
        </template>
        <div v-else class="gst-ticket-no-seats-available__content text-center">
            <h5 class="font-weight-medium mb-2">
                {{ $t('_common:messages.noSeats.title') }}
            </h5>
            <p class="mb-0 tertiary--text">
                {{ $t('_common:messages.noSeats.text') }}
            </p>
        </div>
    </v-flex>
</template>

<script>
    import IconNoSeatsAvailable from '@core/shared/assets/icons/no_seats_available.svg';

    export default {
        name: 'TicketNoSeatsAvailable',
        components: {
            IconNoSeatsAvailable
        },
        props: {
            width: {
                type: [ String, Number ],
                default: null
            },
            height: {
                type: [ String, Number ],
                default: null
            }
        }
    };
</script>

<style lang="scss" scoped>
@import "@scssVariables";
@import "@scssMixins";

.gst-ticket-no-seats-available {
    .gst-ticket-no-seats-available__image {
        .gst-svg-icon {
            fill: theme-color( 'primary' );
        }
    }

    .gst-ticket-no-seats-available__content {
        h5,
        p {
            line-height: line-height( 'l' );
            letter-spacing: -0.41px;
        }

        h5 {
            font-size: font-size( 's' );
        }

        p {
            font-size: font-size( 'xxs' );
        }
    }
}
</style>