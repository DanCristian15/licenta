<template>
    <v-btn
        text
        icon
        :data-test-is-favorite="`${isFavorite}`"
        @click="$emit('click', $event)"
        @mouseenter="hover=true"
        @mouseleave="hover=false">
        <v-fade-transition leave-absolute>
            <v-icon v-show="showFavoriteIcon" v-text="'$vuetify.icons.heartFull'" />
        </v-fade-transition>
        <v-fade-transition leave-absolute>
            <v-icon v-show="showFavoriteHoverIcon" v-text="'$vuetify.icons.heartFullBroken'" />
        </v-fade-transition>
        <v-fade-transition leave-absolute>
            <v-icon v-show="showNoFavoriteIcon" v-text="'$vuetify.icons.heartStroke'" />
        </v-fade-transition>
        <v-fade-transition leave-absolute>
            <v-icon v-show="showNoFavoriteHoverIcon" class="active" v-text="'$vuetify.icons.heartStroke'" />
        </v-fade-transition>
    </v-btn>
</template>
<script>
    export default {
        name: 'FavoriteIconButton',
        props: {
            isFavorite: {
                type: Boolean,
                default: false
            }
        },
        data( ) {
            return {
                hover: false
            };
        },
        computed: {
            showFavoriteIcon() {
                return this.isFavorite && ( !this.hover || this.$device.hasTouch );
            },
            showNoFavoriteIcon() {
                return !this.isFavorite && ( !this.hover || this.$device.hasTouch );
            },
            showFavoriteHoverIcon() {
                return this.isFavorite && this.hover && !this.$device.hasTouch;
            },
            showNoFavoriteHoverIcon() {
                return !this.isFavorite && this.hover && !this.$device.hasTouch;
            }
        }
    };
</script>
