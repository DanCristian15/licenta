<template>
    <div>
        <h5 class="gst-event-not-available__title">
            {{ $t( 'title' ) }}
        </h5>
        <h5 class="gst-event-not-available__title d-inline-block">
            {{ $t( 'subtitle' ) }}
            <BaseButton
                color="info"
                :ripple="false"
                text
                link
                :data-test-id="$testId('button.back')"
                class="gst-event-not-available__back-btn d-inline-block"
                @click="onClickBackButtonDo">
                {{ $t( 'button' ) }}.
            </BaseButton>
        </h5>
    </div>
</template>

<script>
    import BaseButton from '@core/shared/components/buttons/BaseButton';
    import { redirectToReferrerUrl } from '@tenant/app/utils/tenantUrlslUtils';

    export default {
        name: 'EventPackageOffersNotAvailableWarningCard',
        components: {
            BaseButton
        },
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'messages.eventPackageOffersStatus.notAvailable'
        },
        methods: {
            onClickBackButtonDo( ) {
                redirectToReferrerUrl( );
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-event-not-available__title:nth-child(1) {
        margin-bottom: theme-spacing( 0 ) !important;
    }

    .gst-event-not-available__back-btn {
        height: auto !important;
        padding: theme-spacing( 0 ) !important;
        font-size: inherit;
        letter-spacing: inherit;
        min-width: unset !important;
        text-transform: none;
        vertical-align: baseline;
    }

    .gst-event-not-available__back-btn:focus::before {
        opacity: 0;
    }
</style>