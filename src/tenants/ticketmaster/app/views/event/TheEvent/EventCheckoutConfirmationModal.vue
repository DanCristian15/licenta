<template>
    <div class="gst-event-checkout-confirmation-modal py-4">
        <h5 class="mb-6 pl-6 pr-3">
            {{ $t( 'message' ) }}
        </h5>
        <div class="gst-event-checkout-confirmation-modal__actions d-flex flex-row justify-end pt-3 pl-6 pr-3">
            <BaseButton
                text
                color="primary"
                class="continue-btn"
                @click="$emit('close'); onConfirmFn();">
                {{ $t( 'buttons.continueToCheckout' ) }}
            </BaseButton>
            <BaseButton
                color="primary"
                class="add-hotel-btn text-capitalize"
                @click="$emit('close')">
                {{ $t( 'buttons.addHotel' ) }}
            </BaseButton>
        </div>
    </div>
</template>

<script>
    import BaseButton from '@core/shared/components/buttons/BaseButton.vue';

    export default {
        name: 'EventCheckoutConfirmationModal',
        components: {
            BaseButton
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.event.theEvent._components.eventCheckoutConfirmationModal'
        },
        props: {
            onConfirmFn: {
                type: Function,
                required: true
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-event-checkout-confirmation-modal {
        background-color: theme-color( 'white' );

        h5 {
            @include line-height('xxxxxl');

            color: #262626;
            font-size: font-size( 'xxxxl' );
            font-weight: font-weight( 'large' );
        }

        .gst-event-checkout-confirmation-modal__actions {
            border-top: 1px solid #E3E4E5;

            .continue-btn,
            .add-hotel-btn {
                @include line-height('xl');

                font-size: font-size( 's' );
                letter-spacing: normal;
            }

            .continue-btn {
                font-weight: font-weight( 'large' );
            }

            .add-hotel-btn {
                font-weight: font-weight( 'bold' );
            }
        }
    }

    @include mobile-only {
        .gst-event-checkout-confirmation-modal {
            h5 {
                @include line-height('xxxl');

                color: theme-color( 'quaternary' );
                font-size: font-size( 'l' );
            }

            .gst-event-checkout-confirmation-modal__actions {
                border-top: none;

                .continue-btn {
                    max-width: 215px;
                }

                .add-hotel-btn {
                    width: 95px;
                }
            }
        }
    }
</style>
