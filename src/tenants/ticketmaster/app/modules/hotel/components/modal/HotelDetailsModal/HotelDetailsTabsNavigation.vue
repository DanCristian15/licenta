<template>
    <v-tabs :value="tab" class="gst-hotel-details-tabs-navigation mx-0 px-md-4">
        <v-tab v-for="(key, index) in navigationTabs" :key="index" class="ml-0 px-0 mr-5" :ripple="false" @click="sendActiveTab(index)">
            {{ $t(key) }}
        </v-tab>
    </v-tabs>
</template>

<script>
    export default {
        name: 'HotelDetailsTabsNavigation',
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'modules.hotel.modal._components._components.hotelDetailsTabsNavigation'
        },
        props: {
            tab: {
                type: Number,
                default: 1
            },
            navigationTabs: {
                type: Array,
                default: new Array()
            }
        },
        methods: {
            sendActiveTab( id ) {
                this.$emit( 'change', id );
            }
        }
    };
</script>

<style lang="scss">
@import "@scssVariables";
@import "@scssMixins";

.theme--light.v-tabs > .v-tabs-bar .v-tab {
    @include font-size('l');
    @include font-weight('regular');

    line-height: 20px;
    color: theme-color( 'quaternary' ) !important;
}

.gst-hotel-details-tabs-navigation {
    position: sticky;
    top: 66px;
    width: auto;
    background: theme-color( 'white' );
    z-index: 20;

    .v-tabs-bar {
        border-bottom: 1px solid theme-color-hex( 'senary-darken-2' );
    }

    .v-tab,
    .v-tab--active {
        padding: theme-spacing( 0 );
        background-color: theme-color( 'white' );
        color: theme-color( 'quaternary' ) !important;
        text-transform: capitalize !important;
    }

    .v-tab {
        margin: theme-spacing( 0, 4 );
    }

    .v-tab--active {
        border-bottom: 3px solid theme-color( 'primary' );
    }

    @include mobile-only {
        .v-tabs-bar {
            margin: theme-spacing( 0, 4 );

            .v-tab {
                font-size: font-size( 's' ) !important;
            }

            .v-slide-group__prev--disabled,
            .v-slide-group__next--disabled {
                display: none !important;
            }
        }
    }
}

</style >
