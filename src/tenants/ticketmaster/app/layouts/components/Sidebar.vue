<template>
    <v-navigation-drawer
        v-model="show"
        fixed
        left
        temporary
        overlay-opacity="0.8"
        v-bind="$attrs"
        class="gst-sidebar">
        <v-btn icon class="mt-2 ml-2 mr-2 float-right float-md-none float-lg-none" @click="show = false">
            <img src="@tenant/app/assets/icons/close.png" alt="ticketmaster" />
        </v-btn>
        <div class="px-4 u-float-clear">
            <form @submit="onSubmitSearchFormDo">
                <v-text-field
                    v-model="search"
                    label="Search for things">
                    <template slot="append">
                        <v-btn
                            v-show="!!search"
                            icon
                            @click="search = ''">
                            <img src="@tenant/app/assets/icons/close_round.png" alt="ticketmaster" />
                        </v-btn>
                        <img src="@tenant/app/assets/icons/divider.png" alt="ticketmaster" class="my-2" />
                        <v-btn
                            type="submit"
                            icon>
                            <img src="@tenant/app/assets/icons/search.png" alt="ticketmaster" />
                        </v-btn>
                    </template>
                </v-text-field>
            </form>
            <div class="gst-sidebar__navigation">
                <router-link class="gst-sidebar__link" :to="{ name: 'how-it-work' }" target="_blank">
                    How it Works
                </router-link>
                <router-link class="gst-sidebar__link" :to="{ name: 'faq' }" target="_blank">
                    FAQ
                </router-link>
                <router-link class="gst-sidebar__link" :to="{ name: 'about' }" target="_blank">
                    About Ticketmaster Events & Experiences
                </router-link>
            </div>
        </div>
    </v-navigation-drawer>
</template>

<script>
    import { redirectToSearch as tenantRedirectToSearch } from '@tenant/app/utils/tenantUrlslUtils';

    export default {
        data() {
            return {
                search: '',
                show: true
            };
        },
        watch: {
            'show': function ( value ) {
                if ( !value ) {
                    this.$emit( 'close' );
                }
            }
        },
        methods: {
            onSubmitSearchFormDo( e ) {
                const search = this.search;

                if ( e ) {
                    e.preventDefault();
                }
                if ( search.trim() ) {
                    tenantRedirectToSearch( search );
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssMixins";
    @import "@scssVariables";

    .gst-sidebar {
        background-color: theme-color( 'quinary' );
        min-width: 320px !important;

        .gst-sidebar__navigation {
            display: flex;
            flex-direction: column;

            .gst-sidebar__link {
                line-height: 17.3px;
                padding: 12px 0;
                color: theme-color( 'home-banner-gradient-end' );
                font-size: 14px;
            }
        }
    }

    @include mobile-only {
        .gst-sidebar {
            width: 100% !important;

            .gst-sidebar__navigation {
                text-align: center;
            }
        }
    }
</style>
