<template>
    <div class="gst-star-rating">
        <StarIcon
            v-for="(item, key) in starsRating"
            :key="key"
            alt="" />
    </div>
</template>

<script>
    import StarIcon from '@core/shared/assets/icons/star.svg';

    export default {
        components: {
            StarIcon
        },
        props: {
            value: {
                type: Number,
                default: 0,
            },
            length: {
                type: Number,
                default: 5
            },
            rateType: {
                type: String,
                default: 'star'
            }
        },
        computed: {
            starsRating( ) {
                return Array( Math.floor( this.value )  ).fill( );
            },
        }
    };
</script>
