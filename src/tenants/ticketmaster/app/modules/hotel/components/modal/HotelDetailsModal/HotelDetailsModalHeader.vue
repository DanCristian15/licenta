<template>
    <v-toolbar
        flat
        pa-0
        min-height="66"
        height="66"
        class="gst-hotel-details-modal-header">
        <div class="gst-hotel-details-modal-header__first-row">
            <h5 class="gst-hotel-details-modal-header__title mr-2 mr-sm-0">
                {{ item.name }}
            </h5>
            <div v-if="rating" class="gst-hotel-details-modal-header__rating d-flex pl-1">
                <IconStar v-for="n in rating" :key="n" class="mt-n1" />
            </div>
            <v-spacer v-if="$vuetify.breakpoint.mdAndUp" />
            <v-btn
                fab
                text
                x-small
                class="gst-hotel-details-modal-header__icon-close text-capitalize gst-btn--cancel px-0"
                @click="$emit('close')">
                <IconClose />
            </v-btn>
        </div>

        <slot name="addressBar"></slot>
    </v-toolbar>
</template>

<script>
    import CloseModalOnRouteChangeMixin from '@core/mixins/modals/CloseModalOnRouteChange';
    import IconClose from '@core/shared/assets/icons/close.svg';
    import IconStar from '../../../assets/svg/star.svg';


    export default {
        name: 'HotelDetailsModalHeaderDesktop',
        components: {
            IconStar,
            IconClose,
        },
        mixins: [
            CloseModalOnRouteChangeMixin
        ],
        props: {
            item: {
                type: Object,
                required: true
            }
        },
        computed: {
            rating( ) {
                return Array.isArray( this.item.awards ) && this.item.awards.length ? this.item?.awards[0].rating : 0;
            }
        }
    };
</script>

<style lang="scss">
@import "@scssVariables";
@import "@scssMixins";

.gst-hotel-details-modal-header {
    position: sticky;
    top: 0;
    height: 80px;
    width: 100%;
    background-color: theme-color( 'white' ) !important;
    color: theme-color( 'quaternary' );
    z-index: 20;
    flex-direction: column;

    .v-toolbar__content {
        flex-direction: column;
    }

    .gst-hotel-details-modal-header__icon-close {
        fill: theme-color( 'tertiary' );
    }

    .gst-hotel-details-modal-header__first-row {
        display: flex;
        width: 100%;

        .gst-hotel-details-modal-header__title {
            @include font-size('xxl');
            @include font-weight('large');

            letter-spacing: -0.1px;
            text-transform: capitalize;
        }

        .gst-hotel-details-modal-header__rating svg {
            display: flex;
            align-self: center;
        }
    }

    .gst-hotel-details-modal-header__divider {
        border-color: theme-color( 'quinary' );
    }
}

@include mobile-only {
    .gst-hotel-details-modal-header {
        height: auto;
        flex-direction: column;

        .v-toolbar__content {
            height: auto;
            padding: 0;
        }

        .gst-hotel-details-modal-header__first-row {
            height: 69px;
            width: 100%;
            background-color: theme-color( 'primary' ) !important;
            text-align: center;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .gst-hotel-details-modal-header__title {
                display: flex;
                margin-bottom: theme-spacing( 1 );
                color: theme-color( 'white' );
                font-size: font-size( 'l' );
            }

            .gst-hotel-details-modal-header__rating {
                justify-content: center;
                align-items: center;
            }

            .gst-hotel-details-modal-header__icon-close {
                position: absolute;
                top: calc( 50% - 14px );
                right: 0;

                .gst-svg-icon {
                    fill: theme-color( 'white' ) !important;
                }
            }
        }
    }
}
</style>
