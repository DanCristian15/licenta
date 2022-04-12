<template>
    <p class="gst-venue-info mb-1">
        {{ venueName }}
        <br />
        {{ venueCityLocation | city }}
        <br />
    </p>
</template>

<script>
    export default {
        name: 'VenueInfo',
        props: {
            item: {
                type: Object,
                required: true
            },
            maxLines: {
                type: Number,
                default: 0
            }
        },
        computed: {
            venueName() {
                return `${( this.item.name || '' ).trim()}` ;
            },
            venueCityLocation() {
                const { city: cityName, stateCode, countryCode } = this.item;

                return  { name: cityName, stateCode, countryCode };
            }
        }
    };
</script>
