<template>
    <div class="gst-attraction-music-links d-flex flex-row align-end">
        <h6>{{ $t('title') }}</h6>
        <div class="d-flex">
            <v-btn v-for="(button, index) in buttons"
                :key="index"
                class="ml-2 w-auto" 
                icon 
                small
                :ripple="false"
                target="_blank"
                height="auto"
                :href="button.url">
                <component :is="button.icon" />
            </v-btn>
        </div>
    </div>
</template>

<script>
    import IconSpotify from '@core/shared/assets/icons/spotify.svg';
    import IconAppleMusic from '@core/shared/assets/icons/apple_music.svg';

    export default {
        name: 'MusicLinks',
        components: {
            /* eslint-disable vue/no-unused-components */
            IconSpotify,
            IconAppleMusic
            /* eslint-enable vue/no-unused-components */
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.attraction.theAttraction._components.musicLinks',
        },
        props: {
            item: {
                type: Object,
                required: true
            }
        },
        computed: {
            buttons( ) {
                const { item } = this;
                return [
                    {
                        url: `https://open.spotify.com/search/${item.name}`,
                        icon: 'IconSpotify'
                    },
                    {
                        url: `https://music.apple.com/us/search?term=${item.name}`,
                        icon: 'IconAppleMusic'
                    }
                ];
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";
    
    .gst-attraction-music-links {
        h6 {
            line-height: line-height( 'xxl' );
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
        }
    }
</style>