<template>
    <div>
        <v-app-bar
            height="50"
            app
            flat
            class="gst-header">
            <v-btn
                icon
                @click="menuExpanded = !menuExpanded">
                <img src="@tenant/app/assets/icons/burger.png" alt="ticketmaster" />
            </v-btn>
            <a :href="ticketsMasterUrl">
                <LogoIcon />
            </a>
        </v-app-bar>
        <component :is="sidebarMenuComponent" v-if="menuExpanded" @close="menuExpanded = false" />
    </div>
</template>
<script>
    import LogoIcon from '@tenant/app/components/LogoIcon';
    import tenantUrlsConstants from '@tenant/app/utils/constants/tenantUrls';

    export default {
        name: 'TheHeader',
        components: {
            LogoIcon
        },
        testIdOptions: {
            keyPrefix: 'layout.default.theHeader'
        },
        data: () => ( {
            menuExpanded: false,
        } ),
        computed: {
            sidebarMenuComponent( ) {
                return ( ) => import ( './Sidebar.vue' );
            },
            ticketsMasterUrl () {
                return tenantUrlsConstants.home;
            }
        }
    };
</script>
<style lang="scss">
    @import "@scssMixins";
    @import "@scssVariables";

    .gst-header {
        background: linear-gradient( 91.84deg, #012DA1 1.55%, #1574DE 50%, #012DA1 95.92% );

        .gst-header__logo {
            svg {
                @include mobile-only {
                    max-width: 158px;
                }
            }
        }

        .gst-header__search-keyword-with-autocomplete {
            .v-text-field--solo > .v-input__control {
                @include border-radius('m');

                min-height: 40px;
            }

            .v-text-field--solo > .v-input__control > .v-input__slot {
                background-color: theme-color( 'quinary' );
            }
        }
    }
</style>
