<template>
    <v-expansion-panel 
        class="gst-expansion-panel pt-0 elevation-0"
        :class="{
            'gst-expansion-panel--hover': $vuetify.breakpoint.mdAndUp
        }">
        <v-expansion-panel-header class="px-0 py-2">
            <slot name="header"></slot>
            <template v-slot:actions>
                <i class="gst-icon-svg">
                    <IconDropDownArrow class="gst-dropdown-icon-svg" />
                </i>
            </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="px-0">
            <slot name="content"></slot>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>
<script>
    import IconDropDownArrow from '@core/shared/assets/icons/dropdown_arrow.svg';

    export default {
        name: 'ExpansionPanel',
        components: {
            IconDropDownArrow
        }
    };
</script>
<style lang="scss">
@import "@scssVariables";

.gst-expansion-panel {
    margin-top: 0 !important;

    .v-expansion-panel-header,
    .v-expansion-panel-content {
        line-height: line-height( 'xxxl' );
        color: theme-color( 'quaternary' );
        font-size: font-size( 's' );
    }

    .v-expansion-panel-header {
        font-weight: font-weight( 'bold' );

        .gst-svg-icon {
            fill: theme-color( 'tertiary' );
        }
    }

    .v-expansion-panel-content__wrap {
        padding-right: 0;
        padding-bottom: 15px;
        padding-left: 0;
    }
}

.gst-expansion-panel.v-expansion-panel::before {
    box-shadow: none;
}

.gst-expansion-panel.v-expansion-panel::after {
    border-color: rgba( theme-color-hex( 'tertiary' ), 0.2 ) !important;
    opacity: 1 !important;
}

.gst-expansion-panel.v-expansion-panel--active {
    .v-expansion-panel-header {
        min-height: 48px;

        .gst-icon-svg {
            transform: rotate( 180deg );
        }
    }
}

.gst-expansion-panel.gst-expansion-panel--hover {
    .v-expansion-panel-header:hover {
        color: theme-color( 'primary' ) !important;

        .gst-svg-icon {
            fill: theme-color( 'primary' );
        }
    }

    .v-expansion-panel-header:hover .v-expansion-panel-header__icon .v-icon {
        color: theme-color( 'primary' ) !important;
    }
}
</style>
