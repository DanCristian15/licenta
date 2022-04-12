<template>
    <v-app-bar
        height="60"
        app
        flat
        class="gst-header-with-count-down">
        <div class="d-flex align-center mr-5">
            <TenantLogo class="gst-header-with-count-down__logo" />
        </div>
        <v-spacer />
        <v-flex
            d-flex
            flex-row
            align-center
            shrink
            class="gst-header-with-count-down__count-down tertiary-text">
            {{ $t('labels.countDown' ) }}
            <v-flex
                d-flex
                flex-row
                align-center
                shrink
                class="ml-1 u-alpha-background">
                <IconClockFull />
                <CountDown v-if="dateTimeTill" :date-time-till="dateTimeTill" format="mm:ss" @finish="$emit( 'finish' )" />
            </v-flex>
        </v-flex>
    </v-app-bar>
</template>
<script>
    import IconClockFull from '@core/shared/assets/icons/clock_full.svg';
    import CountDown from '@core/shared/components/misc/CountDown.vue';

    export default {
        name: 'HeaderWithCountDown',
        components: {
            IconClockFull,
            CountDown
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckoutWizard._components.headerWithCountDown'
        },
        props: {
            dateTimeTill: {
                type: Date,
                default: ( ) => { return new Date( ); }
            }
        },
    };
</script>
<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-header-with-count-down {
        background-color: theme-color( 'white' ) !important;
        border-bottom: none !important;

        .gst-header-with-count-down__count-down {
            color: theme-color( 'tertiary' );
            font-size: font-size( 'xxs' );
            font-weight: font-weight( 'regular' );

            div {
                position: relative;
                height: 40px;
                padding: 5px;
                border: 1px solid theme-color( 'primary-lighten-2' );
                font-size: font-size( 'xl' );
                font-weight: font-weight( 'medium' );
                border-radius: border-radius( 'm' ) !important;

                &::after {
                    background: theme-color( 'background-timer' );
                    opacity: 0.08;
                }

                svg {
                    .gst-svg-icon {
                        fill: theme-color( 'primary' );
                    }
                }
            }
        }
    }
</style>

<style lang="scss">
    @import "@scssMixins";

    .gst-header-with-count-down {
        .gst-header-with-count-down__logo {
            svg {
                @include mobile-only {
                    max-width: 158px;
                }
            }
        }
    }
</style>