<template>
    <v-tooltip
        :value="hover && !isFavorite"
        :open-on-click="false"
        :open-on-focus="false"
        :open-on-hover="false"
        content-class="gst-favorite-icon-button-variant-2"
        bottom>
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                text
                icon
                v-bind="attrs"
                :data-test-is-favorite="`${isFavorite}`"
                v-on="on"
                @mouseenter="hover=true"
                @mouseleave="hover=false"
                @click="$emit('click', $event)">
                <v-fade-transition leave-absolute>
                    <v-icon v-show="showFavoriteIcon" v-text="'$vuetify.icons.heartFull'" />
                </v-fade-transition>
                <v-fade-transition leave-absolute>
                    <v-icon v-show="showFavoriteHoverIcon" v-text="'$vuetify.icons.heartFullBroken'" />
                </v-fade-transition>
                <v-fade-transition leave-absolute>
                    <v-icon v-show="!isFavorite" v-text="'$vuetify.icons.undo'" />
                </v-fade-transition>
            </v-btn>
        </template>
        <span v-show="showFavoriteUndoText">
            {{ $t('_common:terms:undo') }}
        </span>
    </v-tooltip>
</template>
<script>
    export default {
        name: 'FavoriteIconButtonVariant2',
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
            showFavoriteHoverIcon() {
                return this.isFavorite && this.hover && !this.$device.hasTouch;
            },
            showFavoriteUndoText() {
                return !this.isFavorite && this.hover && !this.$device.hasTouch;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-favorite-icon-button-variant-2.v-tooltip__content {
        line-height: line-height( 'xxs' );
        padding: 8px !important;
        margin-top: -15px;
        background: transparent !important;
        color: theme-color( 'primary' );
        font-size: font-size( "xxs" );
        font-weight: font-weight( 'medium' );
        max-width: 250px;
    }
</style>
