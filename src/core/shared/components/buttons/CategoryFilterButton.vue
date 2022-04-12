<template>
    <v-btn
        :class="['gst-btn gst-btn-clasification', $vuetify.breakpoint.lgAndUp && 'gst-btn-clasification-hover']"
        depressed
        v-bind="$attrs"
        @click="$emit('click')">
        <component
            :is="icon"
            v-if="icon"
            class="gst-btn-icon" />
        {{ text }}
    </v-btn>
</template>
<script>
    import IconArts from '@core/shared/assets/icons/arts.svg';
    import IconSports from '@core/shared/assets/icons/sports.svg';
    import IconConcerts from '@core/shared/assets/icons/concerts.svg';
    import IconFamily from '@core/shared/assets/icons/family.svg';
    import IconOtherEvents from '@core/shared/assets/icons/other_category_events.svg';

    export default {
        name: 'CategoryFilterButton',
        components: {
            /* eslint-disable vue/no-unused-components */
            IconArts,
            IconSports,
            IconConcerts,
            IconFamily,
            IconOtherEvents
            /* eslint-enable vue/no-unused-components */
        },
        inheritAttrs: true,
        props: {
            icon: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssMixins";
    @import "@scssVariables";

    .gst-btn.v-btn.gst-btn-clasification {
        height: 60px !important;
        background-color: theme-color( 'quinary' ) !important;
        color: theme-color( 'tertiary' );
        border-color: theme-color( 'septenary' ) !important;
        opacity: 1 !important;

        svg .gst-svg-icon {
            transition: all 0.5s ease;
        }

        &.v-item--active {
            background-color: theme-color( 'primary' ) !important;
            color: theme-color( 'white' );
            border-color: theme-color( 'primary' ) !important;

            svg .gst-svg-icon {
                fill: theme-color( 'white' );
            }
        }
    }

    .gst-btn.v-btn.gst-btn-clasification-hover:hover {
        background-color: theme-color( 'primary' ) !important;
        color: theme-color( 'white' );
        border-color: theme-color( 'primary' ) !important;

        svg .gst-svg-icon {
            fill: theme-color( 'white' );
        }
    }
</style>
