<template>
    <v-card class="gst-search-modal d-flex flex-column">
        <HeaderVariant2 class="mb-3" @close="$emit('close')">
            <TenantLogo :with-redirect="false" class="gst-search-modal__logo" />
        </HeaderVariant2>
        <v-card-title class="py-0 px-4 flex-grow-0">
            <v-flex>
                <v-row>
                    <v-col class="pt-0">
                        <v-text-field
                            ref="keyword"
                            v-model="keyword"
                            color="primary"
                            :placeholder="$t('shared:components.search.searchFieldBanner.placeholder')"
                            class="pb-0 mb-0 gst-search-input search-event-modal__keyword"
                            height="33"
                            outlined
                            hide-details
                            rounded
                            data-hj-allow
                            @focus="isFocusInputSearchKeyword = true"
                            @blur="isFocusInputSearchKeyword = false">
                            <template slot="prepend-inner" class="text-primary">
                                <IconSearch
                                    class="gst-search-icon-svg"
                                    :class="{
                                        'gst-search-icon-svg-focused': isFocusInputSearchKeyword
                                    }" />
                            </template>
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="pr-0">
                        <SearchCity
                            v-model="city"
                            :input-search-attrs="{ 'single-line': true, 'hide-details': true, color: 'primary', height: 33 }"
                            :clearable="false" />
                    </v-col>
                    <v-col class="pl-0">
                        <v-text-field
                            :value="date | period"
                            :placeholder="$t('shared:components.date.datePicker.placeholder')"
                            class="mx-1 pt-0 gst-search-input"
                            single-line
                            hide-details
                            color="primary"
                            height="33"
                            readonly
                            data-hj-allow
                            @click="onClickDate"
                            @focus="isFocusInputSearchDate = true"
                            @blur="isFocusInputSearchDate = false">
                            <template slot="prepend-inner" class="text-primary">
                                <IconDate
                                    class="gst-search-icon-svg"
                                    :class="{
                                        'gst-search-icon-svg-focused': isFocusInputSearchDate
                                    }" />
                            </template>
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-flex>
        </v-card-title>
        <v-card-text>
            <SearchResultList v-if="hasAtLeastOneSearchParam" class="pt-2" :see-all-button-route="seeAllButtonRoute" />
        </v-card-text>
    </v-card>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import IconSearch from '@core/shared/assets/icons/search.svg';
    import IconDate from '@core/shared/assets/icons/date.svg';
    import SearchCity from '@core/shared/components/search/SearchCity.vue';
    import CloseModalOnRouteChangeMixin from '@core/mixins/modals/CloseModalOnRouteChange';
    import SearchResultList from '@core/shared/components/search/SearchResultList.vue';
    import DatePicker from '@shared/components/date/DatePicker.vue';
    import HeaderVariant2 from '@core/shared/components/modals/layout/HeaderVariant2.vue';

    export default {
        name: 'SearchEventModal',
        components: {
            IconSearch,
            SearchCity,
            SearchResultList,
            IconDate,
            HeaderVariant2
        },
        mixins: [ CloseModalOnRouteChangeMixin ],
        data () {
            return {
                dialog: false,
                isFocusInputSearchKeyword: false,
                isFocusInputSearchDate: false,
                isConfirmed: false
            };
        },
        computed: {
            ...mapGetters( {
                currentQueryObject: 'searchState/currentQueryObject',
                isEmptyCurrentSearchParams: 'searchState/isEmptyCurrentSearchParams',
                currentQueryObjectHasOnlyKeyword: 'searchState/currentQueryObjectHasOnlyKeyword',
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
                set( value ) {
                    this.updateSearch( { startDate: value.startDate, endDate: value.endDate } );
                }
            },
            hasAtLeastOneSearchParam() {
                return !this.isEmptyCurrentSearchParams( );
            },
            seeAllButtonRoute() {
                const routeName = this.currentQueryObjectHasOnlyKeyword ? 'search' : 'search.events';
                return { name: routeName, query: this.currentQueryObject };
            }
        },
        methods: {
            ...mapActions( {
                updateSearch: 'searchState/update'
            } ),
            onClickDate( ) {
                if ( this.$vuetify.breakpoint.smAndDown ) {
                    this.$modal.showBottom(
                        DatePicker,
                        {
                            value: this.date,
                            isConfirmed: this.isConfirmed,
                            onConfirmDo: ( dates ) => {
                                this.updateSearch( { startDate: dates.startDate, endDate: dates.endDate } );
                                this.isConfirmed = true;
                            }
                        },
                        {
                            'retain-focus': false,
                            scrollable: true,
                            fullscreen: false,
                            'hide-overlay': false,
                            transition: 'dialog-bottom-transition'
                        }
                    );
                }
            }
        },
        mounted() {
            setTimeout( ( ) => {
                this.$refs.keyword.focus( );
            }, 100 );
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";

    .search-event-modal__keyword .v-input__slot:hover {
        fieldset {
            border-radius: border-radius( 'm' ) !important;
            border-width: 1px !important;
        }
    }
</style>
<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .search-event-modal__keyword {
        .v-text-field__slot input::placeholder {
            opacity: 0.4;
        }
    }

    .gst-search-modal {
        .gst-search-modal__logo {
            svg {
                @include mobile-only {
                    max-width: 158px;
                }
            }
        }

        .gst-search-icon-svg-focused {
            .gst-svg-icon {
                fill: theme-color( 'primary' );
            }
        }
    }
</style>
