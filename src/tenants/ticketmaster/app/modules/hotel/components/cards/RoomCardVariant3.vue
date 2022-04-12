<template>
    <div class="room-card-variant-3 d-flex flex-column">
        <div v-if="hotelPackage.likelyToSellOut" class="room-card-variant-3__sell-out-label">
            {{ $t( '_common:terms.likelyToSellOut' ) }}
        </div>
        <v-img :src="hotelPackage.hotelImage" />
        <div class="room-card-variant-3__hotel-info">
            <div class="hotel-name d-flex align-center">
                <p>
                    {{ hotelPackage.name }}
                </p>
                <StarRating :value="3" class="d-flex align-center" />
            </div>
            <p class="distance-estimation">
                {{ estimatedWalkDistance }}
            </p>
            <div class="d-flex align-center mb-3">
                <Bed class="mr-2" />
                <p class="mb-0">
                    {{ $t('_common:terms.oneNightStayInDoubleRoom') }}
                </p>
            </div>
            <div class="d-flex align-center mb-3">
                <Tickets class="mr-2" />
                <p class="mb-0">
                    {{ $t('_common:terms.twoStandardTickets') }}
                </p>
            </div>
            <div class="price-info d-flex justify-space-between align-center">
                <div class="d-flex flex-column">
                    <p>
                        {{ hotelPackagePrice }}
                    </p>
                    <p class="mb-0">
                        {{ $t( '_common:terms.perPackage' ) }}
                    </p>
                </div>
                <BaseButton
                    placeholder="Select Package"
                    class="select-package-button"
                    color="primary"
                    outlined
                    @click="$emit('select-package', hotelPackage.id)" />
            </div>
        </div>
    </div>
</template>

<script>
    import BaseButton from '@shared/components/buttons/BaseButton';
    import Bed from '@tenants/ticketmaster/app/assets/icons/bed.svg';
    import Tickets from '@tenants/ticketmaster/app/assets/icons/tickets.svg';
    import StarRating from '@shared/components/misc/StarRating.vue';
    import HotelImage from '@tenants/ticketmaster/app/assets/safetix.png';

    export default {
        name: 'RoomCardVariant3',
        components: {
            Bed,
            Tickets,
            StarRating,
            BaseButton
        },
        computed: {
            hotelPackage() {
                return {
                    currency: 'USD',
                    id: 123,
                    hotelImage: HotelImage,
                    likelyToSellOut: true,
                    name: 'Arbonne Hotel',
                    price: 350,
                    venueLocation: `Barclay's Center`,
                    walkDuration: 15
                };
            },
            hotelPackagePrice() {
                return this.$options.filters.currencyFull( this.hotelPackage.price, this.hotelPackage.currency );
            },
            estimatedWalkDistance() {
                return this.$t( '_common:terms.estimatedWalkDistance', { duration:  this.hotelPackage.walkDuration, location: this.hotelPackage.venueLocation } );
            }
        }
    };
</script>

<style lang="scss">
@import "@scssVariables";
@import "@scssMixins";

.room-card-variant-3 {
    position: relative;
    width: 375px;
    padding: theme-spacing( 1 ) !important;
    background-color: theme-color( 'primary' );
    min-width: 375px;

    .v-image {
        flex: 0.55;
        min-height: 200px;
    }

    .room-card-variant-3__sell-out-label {
        @include border-radius( 'xs' );

        position: absolute;
        top: 12px;
        left: 12px;
        line-height: line-height( 'm' );
        padding: theme-spacing( 1, 2 );
        background: #962D94;
        color: theme-color( 'white' );
        font-size: font-size( 'xxs' );
        font-weight: font-weight( 'large' );
        z-index: 1;
        text-transform: uppercase;
    }

    .room-card-variant-3__hotel-info {
        padding: theme-spacing( 3, 2 );
        color: theme-color( 'white' );
        flex: 0.45;

        .hotel-name {
            margin-bottom: theme-spacing( 1 );

            p {
                line-height: line-height( 'xxxxl' );
                margin-bottom: theme-spacing( 0 );
                margin-right: theme-spacing( 1 );
                font-size: font-size( 'xxxl' );
                font-weight: font-weight( 'large' );
            }

            svg path {
                fill: theme-color( 'warning' );
            }
        }

        .distance-estimation {
            line-height: line-height( 'm' );
            margin-bottom: theme-spacing( 3 );
            font-size: font-size( 'xxs' );
            opacity: 0.8;
        }

        svg path {
            fill: theme-color( 'white' );
        }

        .price-info {
            width: 100%;

            p:nth-child(1) {
                line-height: line-height( 'xxxxxl' );
                margin-bottom: theme-spacing( 1 );
                font-size: font-size( 'xxxxl' );
                font-weight: font-weight( 'large' );
            }

            p:nth-child(2) {
                line-height: line-height( 'm' );
                margin-bottom: theme-spacing( 0 );
                font-size: font-size( 'xxs' );
            }

            .select-package-button {
                @include border-radius( 'xs' );

                padding: theme-spacing( 2, 3 );
                background: theme-color( 'white' );
                color: theme-color( 'primary' );
                font-weight: font-weight( 'large' );
                letter-spacing: normal;
                box-shadow: 0 1px 2px rgba( 0, 0, 0, 0.05 );
                text-transform: none;
            }
        }
    }
}

@include mobile-only {
    .room-card-variant-3 {
        width: unset;
        min-width: unset;
    }
}
</style>