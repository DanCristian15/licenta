<template>
    <div>
        <!-- <v-row justify="space-around">
            <v-icon @click="model--">
                mdi-minus
            </v-icon>
            {{ model }}
            <v-icon @click="model++">
                mdi-plus
            </v-icon>
        </v-row> -->
        <v-carousel class="carousel" progress-color="red" :light="true" :show-arrows-on-hover="true">
            <v-carousel-item
                v-for="image in images"
                :key="image.id">
                <v-sheet
                    height="100%"
                    tile>
                    <v-row
                        class="fill-height"
                        align="center"
                        justify="center">
                        <!-- <div class="text-h2">
                            {{ image.name }}
                        </div> -->
                        <img class="swiper-image" :src="image.src" alt="" />
                    </v-row>
                </v-sheet>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>
<script>
    import { images } from '@core/shared/mockdata/images.js';


    export default {
        data () {
            return {
                images: images,
                colors: [
                    'indigo',
                    'warning',
                    'pink darken-2',
                    'red lighten-1',
                    'deep-purple accent-4',
                ],
                slides: [
                    'First',
                    'Second',
                    'Third',
                    'Fourth',
                    'Fifth',
                ],
            };
        },
    };
</script>

<style lang="scss" scoped>
.v-window__prev .v-btn__content,
.v-window__next .v-btn__content {
    color: red;
}

.carousel {
    width: 93%;
    border: 1px rgb( 5, 5, 5 ) solid;
    margin: auto;

    .swiper-image {
        height: 100%;
        width: 100%;
        margin-bottom: 60px;
    }
}

</style>