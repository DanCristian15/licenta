<template>
    <form>
        <v-layout
            :class="{'gst-search-field-banner--overlay': showOverlay}"
            align-center
            class="gst-search-field-banner flex">
            <v-flex>
                <v-row @click="throttleTooltipWarningSearchClose">
                    <v-col v-if="!$vuetify.breakpoint.mdAndUp" cols="12" class="pa-0">
                        <v-text-field
                            v-model="keyword"
                            :placeholder="$t('placeholder')"
                            class="mx-5 gst-search-input gst-search-field-banner__keyword"
                            single-line
                            solo
                            hide-details
                            flat
                            data-hj-allow
                            @click="$router.push( { name: 'modalSearch' } )">
                            <template slot="prepend-inner" class="text-primary">
                                <IconSearch class="gst-search-icon-svg" />
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="5" class="pa-0 pl-1">
                        <SearchKeywordWithAutocomplete
                            ref="searchKeywordAutocomplete"
                            v-model="keyword"
                            :input-search-attrs="{
                                'single-line': true,
                                solo: true,
                                'hide-details': true,
                                flat: true,
                                rounded: true
                            }"
                            :redirect-to-attraction="false"
                            :redirect-to-event="true"
                            :redirect-to-venue="false"
                            :result-list-see-all-button-route="resultListSeeAllButtonRoute"
                            @tab-keydown="onSearchKeywordWithAutocompleteTabKeyDownDo" />
                        <v-tooltip
                            v-model="tooltipWarningSearch.show"
                            top
                            left
                            :position-x="tooltipWarningSearch.positionX"
                            :position-y="tooltipWarningSearch.positionY"
                            content-class="gst-search-field-banner__tooltip-warning-search">
                            <span>{{ $t('_common:messages.searchWarning') }}</span>
                        </v-tooltip>
                    </v-col>
                    <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="3" class="pa-0">
                        <SearchCity
                            ref="searchCity"
                            v-model="city"
                            class="gst-search-field-banner__search-city"
                            @tab-keydown="onSearchCityTabKeyDownDo" />
                    </v-col>
                    <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="4" class="pa-0">
                        <SearchDateDropdown
                            ref="searchDate"
                            v-model="date"
                            class="gst-search-field-banner__search-city"
                            @tab-keydown="onSearchDateDropdownTabKeyDownDo" />
                    </v-col>
                </v-row>
            </v-flex>
            <v-flex
                v-if="$vuetify.breakpoint.mdAndUp"
                fill-height
                shrink>
                <SearchButton class="gst-search-field-banner__submit" type="submit" @click.native="submit" />
            </v-flex>
        </v-layout>
    </form>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex';
    import throttle from 'lodash/throttle';
    import SearchButton from '@core/shared/components/buttons/SearchButton.vue';
    import SearchCity from '@core/shared/components/search/SearchCity.vue';
    import SearchKeywordWithAutocomplete from '@core/shared/components/search/SearchKeywordWithAutocomplete.vue';
    import SearchDateDropdown from '@core/shared/components/search/SearchDateDropdown.vue';
    import IconSearch from '@core/shared/assets/icons/search.svg';

    export default {
        name: 'SearchFieldBanner',
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.search.searchFieldBanner'
        },
        components: {
            SearchButton,
            IconSearch,
            SearchCity,
            SearchKeywordWithAutocomplete,
            SearchDateDropdown
        },
        props: {
            showOverlay: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                tooltipWarningSearch: {
                    show: false,
                    positionX: 0,
                    positionY: 0
                }
            };
        },
        computed: {
            ...mapGetters( {
                currentQueryObject: 'searchState/currentQueryObject',
                currentQueryObjectHasOnlyKeyword: 'searchState/currentQueryObjectHasOnlyKeyword',
                isEmptyCurrentSearchParams: 'searchState/isEmptyCurrentSearchParams'
            } ),
            keyword: {
                get( ) {
                    return this.$store.state.searchState.current.keyword;
                },
                set( value ) {
                    this.updateSearch( { keyword : value } );
                }
            },
            city: {
                get( ) {
                    return this.$store.state.searchState.current.city;
                },
                set( value ) {
                    this.updateSearch( { city : value } );
                }
            },
            date: {
                get( ) {
                    return {
                        startDate: this.$store.state.searchState.current.startDate,
                        endDate: this.$store.state.searchState.current.endDate
                    };
                },
                set ( value ) {
                    this.updateSearch( { startDate: value.startDate, endDate: value.endDate } );
                }
            },
            resultListSeeAllButtonRoute() {
                const routeName = this.currentQueryObjectHasOnlyKeyword ? 'search' : 'search.events';
                return { name: routeName, query: this.currentQueryObject };
            }
        },
        watch: {
            'currentQueryObject': function ( ) {
                this.tooltipWarningSearch.show = false;
            }
        },
        methods: {
            ...mapActions( {
                updateSearch: 'searchState/update'
            } ),
            submit( event ) {
                event.preventDefault( );
                event.stopPropagation( );

                const isEnter = this.isFormSubmitOnEnter( event );

                if ( this.isEmptyCurrentSearchParams( ) ) {

                    const pos = this.$refs.searchKeywordAutocomplete.$el.getBoundingClientRect( );

                    this.tooltipWarningSearch.positionX = pos.x + 135;
                    this.tooltipWarningSearch.positionY = pos.y + pos.height + 45;
                    this.tooltipWarningSearch.show = true;
                } else {
                    if ( isEnter || ( !isEnter && this.currentQueryObjectHasOnlyKeyword ) ) {
                        this.$router.push( { name: 'search', query: this.currentQueryObject } );
                    } else {
                        this.$router.push( { name: 'search.events', query: this.currentQueryObject } );
                    }
                }
            },
            throttleTooltipWarningSearchClose: throttle( function ( ) {
                this.tooltipWarningSearch.show = false;
            }, 20 ),
            isFormSubmitOnEnter( event ) {
                return event.offsetX <= 0 && event.offsetY <= 0;
            },
            onSearchKeywordWithAutocompleteTabKeyDownDo( ) {
                setTimeout( () => {
                    this.$refs.searchCity.$refs.inputSearch.$refs.input.click();
                }, 50 );
            },
            onSearchCityTabKeyDownDo( ) {
                setTimeout( () => {
                    this.$refs.searchDate.$refs.inputSearch.$refs.input.click();
                }, 50 );
            },
            onSearchDateDropdownTabKeyDownDo( ) {
                setTimeout( () => {
                    this.$refs.searchDate.$refs.inputSearch.$refs.input.blur();
                    this.$refs.searchDate.closeMenu();
                }, 50 );
            }
        },
        mounted( ) {
            window.addEventListener( 'resize', this.throttleTooltipWarningSearchClose );
        },
        destroyed( ) {
            window.removeEventListener( 'resize', this.throttleTooltipWarningSearchClose );
        }
    };
</script>
<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-search-field-banner {
        border: 2px solid theme-color( 'white' );
        margin: 0 auto;
        background-color: theme-color( 'white' );
        border-radius: border-radius( 'xl' ) !important;
        max-width: 784px;

        @include mobile-only {
            padding: 0 12px;
            margin: 0 12px;
            max-width: 959px;
        }

        .gst-search-field-banner__tooltip-warning-search {
            width: 300px;
            background-color: theme-color( 'white' ) !important;
            color: theme-color( 'error' );
            max-width: 300px;
            opacity: 1 !important;
        }

        .gst-search-field-banner__submit {
            margin: 1px 1px 1px 0;
        }
    }

    .gst-search-field-banner--overlay {
        position: relative;
        font-size: font-size( 'xxs' );
        font-weight: font-weight( 'regular' );
        z-index: $z-index-header + 2;
    }

</style>

<style lang="scss">
    @import "@scssVariables";

    .gst-search-field-banner__search-city {
        .gst-search-city-menu__input-search > .v-input__control > .v-input__slot {
            padding-left: 0;
        }
    }

    .gst-search-field-banner .gst-search-input {
        > .v-input__control > .v-input__slot {
            padding: 0 !important;

            input {
                caret-color: theme-color( 'primary' );
            }
        }
    }

    .gst-search-field-banner__keyword {
        .v-text-field__slot input::placeholder {
            opacity: 0.4;
        }
    }

    .gst-search-field-banner .gst-search-icon-svg-focused {
        .gst-svg-icon {
            fill: theme-color( 'primary' );
        }
    }
</style>
