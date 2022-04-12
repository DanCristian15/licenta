<template>
    <v-card flat class="gst-venue-card gst-venue-card--small px-0" :title="venue.name">
        <v-layout align-center>
            <v-flex shrink>
                <CardIconContainer :outlined="true" class="gst-venue-card__icon-container">
                    <IconLocation class="gst-venue-card__icon-location" />
                </CardIconContainer>
            </v-flex>
            <v-flex class="pl-4" xs10>
                <h5>
                    <VClamp
                        autoresize
                        :max-lines="1"
                        class="hyphens clamp gst-venue-card__title">
                        {{ venue.name }}
                    </VClamp>
                </h5>
                <VenueInfo
                    :max-lines="1"
                    class="hyphens clamp gst-venue-card__location"
                    :item="location" />
            </v-flex>
        </v-layout>
    </v-card>
</template>
<script>
    import VClamp from 'vue-clamp';
    import CardIconContainer from '@core/shared/components/misc/CardIconContainer.vue';
    import IconLocation from '@core/shared/assets/icons/location.svg';
    import VenueInfo from '@core/shared/components/containerInfo/VenueInfo.vue';

    export default {
        name: 'VenueCardSmall',
        components: {
            VClamp,
            CardIconContainer,
            IconLocation,
            VenueInfo
        },
        props: {
            venue: {
                type: Object,
                required: true
            },
            fullAddress: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            location( ) {
                const { venue, fullAddress } = this;
                let ret = {
                    city:          venue.cityName,
                    stateCode:     venue.stateCode,
                    countryCode:   venue.countryCode
                };
                ret = fullAddress ? { ...ret,  street: venue.street } : ret;

                return ret;
            }
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";

.gst-venue-card {
    position: relative;
    max-width: 100%;

    .gst-venue-card__icon-container {
        padding-top: 7px;
        padding-bottom: 3px;
        border-radius: border-radius( 'm' ) !important;
    }

    .gst-venue-card__icon-location {
        .gst-svg-icon {
            fill: theme-color( 'primary' );
        }
    }

    .gst-venue-card__location {
        color: theme-color( 'tertiary' );
        font-size: font-size( 's' );
    }
}
</style>
