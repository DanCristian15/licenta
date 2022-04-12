<template>
    <v-btn
        class="text-none gst-location-directions-btn px-0"
        v-bind="$attrs"
        text
        color="primary"
        target="_blank"
        height="auto"
        :href="locationDirectionsUrl">
        {{ textButton }}
    </v-btn>
</template>

<script>
    export default {
        name: 'LocationDirectionsButton',
        props: {
            location: {
                type: Object,
                required: true
            },
            text: {
                type: String,
                default: ''
            }
        },
        computed: {
            textButton() {
                return this.text ? this.text : this.$t( '_common:buttons.getDirections' );
            },
            locationDirectionsUrl() {
                const { street, city, stateCode, countryCode } = this.location;
                const query = encodeURIComponent( [ street, city, stateCode, countryCode ].filter( value => value ).join( ',' ) );
                return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
            }
        },
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-location-directions-btn {
        letter-spacing: -0.2px;
    }

    .gst-location-directions-btn.v-btn::before {
        background-color: transparent;
    }

    .gst-location-directions-btn.v-size--default {
        font-size: font-size( 'l' );
    }

    .gst-location-directions-btn.v-size--small {
        font-size: font-size( 's' );
    }
</style>
