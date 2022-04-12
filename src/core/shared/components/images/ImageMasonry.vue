<template>
    <div class="image-masonry">
        <div v-for="i in images" :key="i.id" class="image">
            <v-hover>
                <template v-slot:default="{ hover }">
                    <v-card
                        class="mx-auto">
                        <v-img class="img" :src="i.src" />
                        <v-fade-transition>
                            <v-overlay
                                v-if="hover"
                                absolute
                                opacity=".7"
                                color="#808888">
                                <v-btn class="category-name" @click="por(i)">
                                    {{ i.name }}
                                </v-btn>
                            </v-overlay>
                        </v-fade-transition>
                    </v-card>
                </template>
            </v-hover>
        </div>
    </div>
</template>

<script>


    export default ( {
        data: () => {
            return {
                category: '',
                images: [
                    {
                        id: 1,
                        name: 'coins',
                        src: require( '@/core/shared/components/images/coins.webp' )
                    },
                    {
                        id: 2,
                        name: 'arts',
                        src: require( '@/core/shared/components/images/arts.jpeg' )
                    },
                    {
                        id: 3,
                        name: 'wines',
                        src: require( '@/core/shared/components/images/wines.webp' )
                    },
                    {
                        id: 4,
                        name: 'jewellery',
                        src: require( '@/core/shared/components/images/jewellery.jpeg' )
                    },
                    {
                        id: 5,
                        name: 'weapons',
                        src: require( '@/core/shared/components/images/weapons.jpeg' )
                    },
                    {
                        id: 6,
                        name: 'stamps',
                        src: require( '@/core/shared/components/images/stamps.png' )
                    },
                    {
                        id: 7,
                        name: 'books',
                        src: require( '@/core/shared/components/images/books.jpg' )
                    },
                    {
                        id: 8,
                        name: 'toys',
                        src: require( '@/core/shared/components/images/toys.jpeg' )
                    },
                    {
                        id: 9,
                        name: 'cars',
                        src: require( '@/core/shared/components/images/cars.jpeg' )
                    }
                ]
            };
        },
        methods: {
            por( i ) {
                this.category = i.name;
                this.$router.push( { name: 'productsList', params: { category: this.category } } );

                // console.log( this.category );
            }
        }
    } );
</script>

<style scoped lang="scss">
    .image-masonry {
        display: flex;
        height: 100%;
        width: 93%;
        margin: auto;
        background: black;
        flex-wrap: wrap;
    }

    .image {
        display: flex;
        position: relative;
        height: 200px;
        width: 33.3%;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        z-index: 2;
    }

    .img {
        display: flex;
        height: 200px;
        width: 100%;
        border: 1px solid black;
        transition: transform 0.5s ease;
    }

    .image:hover {
        .img {
            transform: scale( 1.15 );
        }
    }

    .name {
        position: absolute;
        color: white;
    }

    .category-name {
        font-size: 20px;
        font-weight: 500;
    }

</style>