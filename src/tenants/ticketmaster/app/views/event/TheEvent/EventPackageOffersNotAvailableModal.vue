<template>
    <div class="gst-event-package-offers-not-available-modal">
        <h5>
            {{ $t( 'message' ) }}
        </h5>
        <div class="gst-event-package-offers-not-available-modal__actions d-flex flex-row justify-end">
            <BaseButton
                color="primary"
                class="btn text-capitalize"
                :data-test-id="$testId('button.close')"
                @click="$emit('close')">
                {{ $t( 'buttons.close' ) }}
            </BaseButton>
        </div>
    </div>
</template>

<script>
    import BaseButton from '@core/shared/components/buttons/BaseButton.vue';

    export default {
        name: 'EventPackageOffersNotAvailableModal',
        components: {
            BaseButton
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.event.theEvent._components.EventPackageOffersNotAvailableModal'
        },
        testIdOptions: {
            keyPrefix: 'event._components.EventPackageOffersNotAvailableModal'
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-event-package-offers-not-available-modal {
        padding-top: theme-spacing( 4 );
        padding-bottom: theme-spacing( 4 );
        background-color: theme-color( 'white' );

        h5 {
            line-height: line-height( 'xxxxxl' );
            padding: theme-spacing( 0, 3, 0, 6 );
            margin-bottom: theme-spacing( 6 );
            color: #262626;
            font-size: font-size( 'xxxxl' );
            font-weight: font-weight( 'large' );
        }

        .gst-event-package-offers-not-available-modal__actions {
            padding: theme-spacing( 3, 3, 0, 6 );
            border-top: 1px solid #E3E4E5;

            .btn {
                line-height: line-height( 'xl' );
                font-size: font-size( 's' );
                font-weight: font-weight( 'bold' );
                letter-spacing: normal;
            }
        }
    }

    @include mobile-only {
        .gst-event-package-offers-not-available-modal {
            h5 {
                line-height: line-height( 'xxxl' );
                color: theme-color( 'quaternary' );
                font-size: font-size( 'l' );
            }

            .gst-event-package-offers-not-available-modal__actions {
                border-top: none;
            }
        }
    }
</style>
