<template>
    <v-card class="py-4 pl-3 pr-4 gst-notification-warning-card" v-bind="$attrs">
        <v-flex d-flex flex-row>
            <v-flex d-flex flex-column align-center shrink class="pr-2">
                <IconWarning />
            </v-flex>
            <slot v-if="hasDefaultSlot"></slot>
            <v-flex v-else d-flex flex-column>
                <span class="gst-notification-warning-card__title pb-2">
                    {{ title }}
                </span>
                <span class="gst-notification-warning-card__message tertiary--text">
                    {{ message }}
                </span>
            </v-flex>
        </v-flex>
    </v-card>
</template>

<script>
    import IconWarning from '@core/shared/assets/icons/alert/warning.svg';

    export default {
        name: 'NotificationWarningCard',
        components: {
            IconWarning
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            message: {
                type: String,
                default: ''
            }
        },
        computed: {
            hasDefaultSlot () {
                return !!this.$slots.default;
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-notification-warning-card {
        border-left: 4px solid theme-color( 'warning' );
        
        svg .gst-svg-icon {
            fill: theme-color( 'warning' );
        }

        .gst-notification-warning-card__title {
            font-size: font-size( 'l' );
            font-weight: font-weight( 'medium' );
        }

        .gst-notification-warning-card__message {
            font-size: font-size( 's' );
            font-weight: font-weight( 'medium' );
        }
    }

    .gst-notification-warning-card.v-card:not(.v-sheet--outlined) {
        box-shadow: 0 1px 4px 1px rgba( theme-color-hex( 'tertiary' ), 0.35 );
    }

</style>
