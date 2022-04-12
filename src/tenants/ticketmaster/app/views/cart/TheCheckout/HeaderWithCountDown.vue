<template>
    <div class="gst-header-with-count-down d-flex flex-row items-center">
        <div class="flex-grow-1 d-flex align-center mr-5 u-mouse-pointer">
            <LogoIcon class="gst-header-with-count-down__logo" @click.native="$emit('click-logo')" />
        </div>
        <div
            v-if="$vuetify.breakpoint.mdAndUp"
            class="gst-header-with-count-down__title flex-grow-1 text-center">
            {{ $t('title') }}
        </div>
        <div
            class="gst-header-with-count-down__count-down flex-grow-1 d-flex flex-row align-center justify-end">
            <span>{{ $t('label' ) }}</span>
            <CountDown
                v-if="dateTimeTill"
                :date-time-till="dateTimeTill"
                format="mm:ss"
                class="gst-count-down"
                @finish="$emit( 'finish' )" />
            <BaseTooltip
                bottom
                :text="$t('tooltip')"
                class-content="gst-header-with-count-down__tooltip"
                class-activator="d-flex flex-row align-center">
                <HelpIcon />
            </BaseTooltip>
        </div>
    </div>
</template>
<script>
    import HelpIcon from '@tenant/app/assets/icons/help.svg';
    import LogoIcon from '@tenant/app/components/LogoIcon';
    import CountDown from '@core/shared/components/misc/CountDown.vue';
    import BaseTooltip from '@core/shared/components/tooltips/BaseTooltip.vue';


    export default {
        name: 'HeaderWithCountDown',
        components: {
            CountDown,
            LogoIcon,
            HelpIcon,
            BaseTooltip
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckout._components.headerWithCountDown'
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
        padding: theme-spacing( 3, 6, 3, 6 );
        background: linear-gradient( 91.84deg, #012DA1 1.55%, #1574DE 50%, #012DA1 95.92% );
        color: theme-color( 'white' );
        border-bottom: none !important;

        .gst-header-with-count-down__title {
            @include font-weight('regular');

            line-height: font-size( 'xxxxl' );
            font-size: font-size( 'xxxl' );
        }

        .gst-header-with-count-down__count-down {
            @include font-weight( 'large' );

            font-size: font-size( 'l' );

            .gst-count-down {
                margin-right: 8px;
                letter-spacing: 1.1;
                margin-left: 8px;
                min-width: 45px;
            }
        }
    }

    @include mobile-only {
        .gst-header-with-count-down {
            padding: theme-spacing( 4, 4, 4, 4 );

            .gst-header-with-count-down__count-down {
                font-size: font-size( 's' );
            }
        }
    }
</style>

<style lang="scss">
    @import "@scssMixins";
    @import "@scssVariables";

    .gst-header-with-count-down__count-down span.gst-count-down {
        color: theme-color( 'white' ) !important;
    }

    .gst-header-with-count-down__tooltip.v-tooltip__content {
        line-height: font-size( 'l' );
        padding: theme-spacing( 4 );
        background: theme-color( 'white' ) !important;
        color: theme-color( 'quaternary' );
        font-size: font-size( 's' );
        max-width: 350px;
        box-shadow: 0 2px 6px rgba( theme-color-hex( 'black' ), 0.25 );
        opacity: 1 !important;
    }
</style>