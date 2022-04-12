<template>
    <div class="gst-hotel-details-modal-header__location">
        <IconLocation />
        <p class="pl-3">
            {{ item.address | fullLocation }} -
            <a
                class="text-none gst-location-directions-btn px-0"
                v-bind="$attrs"
                target="_blank"
                :href="locationDirectionUrl">
                {{ highlightText && `${highlightText} -` }} {{ $t('showOnMap') }}
            </a>
            <span v-if="accessibilityText">
                {{ `- ${accessibilityText}` }}
            </span>
        </p>
    </div>
</template>

<script>
    import { getRouteBetweenTwoPoints } from '@core/utils/locationMapUtils';
    import IconLocation from '../../../assets/svg/location.svg';

    export default {
        name: 'HotelDetailsAddressBar',
        components: {
            IconLocation
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'modules.hotel.modal._components._components.hotelDetailsAddressBar'
        },
        props: {
            item: {
                type: Object,
                required: true
            },
            bundleProducts: {
                type: Object,
                required: true
            }
        },
        computed: {
            locationDirectionUrl() {
                const { venueStreet, venueCity, venueState, venueCountry } = this.bundleProducts.eventTicket.event;

                const originAddress = {
                    street:        venueStreet,
                    city:          venueCity,
                    stateCode:     venueState,
                    countryCode:   venueCountry
                };

                const { countryName, cityName, stateCode, address } = this.item.address;
                const destinationAddress = {
                    street:        address,
                    city:          cityName,
                    stateCode:     stateCode,
                    countryCode:   countryName
                };

                return getRouteBetweenTwoPoints( originAddress, destinationAddress );
            },
            accessibilityText() {
                return this.item.accessibility.map( key => this.$t( `accessibility.${key}` ) ).join( ', ' );
            },
            highlightText() {
                return this.item.highlights.map( key => this.$t( `highlights.${key}` ) ).join( ', ' );
            }
        }
    };
</script>

<style lang="scss" scoped>
@import "@scssVariables";
@import "@scssMixins";

.gst-hotel-details-modal-header__location {
    display: flex;
    width: 100%;
    color: theme-color( 'tertiary' );
    font-size: font-size( 'm' );
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
}

@include mobile-only {
    .gst-hotel-details-modal-header__location {
        padding: theme-spacing( 0, 4, 4 );
        align-items: center;

        svg {
            margin-right: 4px;
        }

        p {
            width: calc( 100% - 20px );
            margin-bottom: 0;
            font-size: font-size( 's' );

            span {
                display: inline-block;
                width: 100%;
            }
        }
    }
}
</style>
