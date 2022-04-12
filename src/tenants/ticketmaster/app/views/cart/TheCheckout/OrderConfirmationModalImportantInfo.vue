<template>
    <div class="gst-order-confirmation-modal__important-details">
        <div class="title-container">
            <InfoRound />
            <span>{{ $t('importantDetails') }}</span>
        </div>
        <div class="info-container">
            <span class="subtitle"><strong>{{ $t('schedulingNote.title') }}</strong></span>
            <span class="message mt-2 mb-3">{{ $t('schedulingNote.message') }}</span>
            <span class="subtitle"><strong>{{ $t('nflClearBarPolicy.title') }}</strong></span>
            <span class="message mt-1">{{ $t('nflClearBarPolicy.subtitle') }}</span>
            <ul>
                <li class="message mt-3">
                    {{ $t('nflClearBarPolicy.rule1') }}
                </li>
                <li class="message mt-1">
                    {{ $t('nflClearBarPolicy.rule2') }}
                </li>
                <li class="message mt-1">
                    {{ $t('nflClearBarPolicy.rule3') }}
                </li>
            </ul>
            <span class="message mt-2">{{ $t('nflClearBarPolicy.exception') }}</span>
            <span class="message mt-2">{{ $t('nflClearBarPolicy.manageAccount') }}</span>
            <span v-if="isPackageOffer" class="message mt-2">{{ $t('nflClearBarPolicy.refund') }}</span>
        </div>
    </div>
</template>

<script>
    import InfoRound from '@tenants/ticketmaster/app/assets/icons/info_round.svg';


    export default {
        name: 'OrderConfirmationModalImportantInfo',
        components: {
            InfoRound
        },
        props: {
            isPackageOffer: {
                type: Boolean,
                default: false
            }
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.cart.theCheckout._components.orderConfirmationModal'
        },
    };
</script>

<style lang="scss">
@import "@scssMixins";
@import "@scssVariables";

.gst-order-confirmation-modal__important-details {
    width: 80%;
    border: 1px solid theme-color( 'primary' );
    margin-top: theme-spacing( 8 );
    background: #EBF5FF;
    border-radius: 1px;

    .title-container {
        display: flex;
        padding: theme-spacing( 8 ) theme-spacing( 6 ) 0;
        align-items: center;

        svg {
            path {
                fill: theme-color( 'primary' );
            }
        }

        span {
            line-height: line-height( 'xxs' );
            font-size: font-size( 'xxs' );
            font-weight: font-weight( 'bold' );
            margin-left: theme-spacing( 2 );
        }
    }

    .info-container {
        display: flex;
        padding: theme-spacing( 3 ) theme-spacing( 13 );
        flex-direction: column;

        .subtitle {
            line-height: line-height( 'xs' );
            color: theme-color( 'primary' );
            font-size: font-size( 'xxxs' );
        }

        .message {
            line-height: line-height( 'xs' );
            font-size: font-size( 'xxxs' );
        }
    }

    @include mobile-only {
        width: 100%;
    }
}
</style>