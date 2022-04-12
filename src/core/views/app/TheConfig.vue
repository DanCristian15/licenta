<template>
    <div>
        <h1>Config</h1>
        <p class="mb-0">
            Version: {{ version }} {{ buildDateTime }}
        </p>
        <p>
            VueVersion: {{ vueVersion }}
        </p>
        <v-flex class="mt-2">
            <v-label>Api Search</v-label>
            <v-btn-toggle
                :value="apiPartnersMap[apiPartner]"
                class="ml-2"
                @change="onChangeApipartner">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn value="null" v-on="on">
                            None
                        </v-btn>
                    </template>
                    <span>UI will not drive the api selection between database and partner api</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn value="0" v-on="on">
                            Database
                        </v-btn>
                    </template>
                    <span>Searches will be done ONLY on the Database</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn value="1" v-on="on">
                            External Api
                        </v-btn>
                    </template>
                    <span>Searches will be done ONLY on the Partner API</span>
                </v-tooltip>
            </v-btn-toggle>
        </v-flex>
        <v-flex class="mt-4 d-flex flex-row align-center">
            <v-label>Mock Data</v-label>
            <v-switch v-model="apiMockData" class="my-0 ml-4 mr-0" inset hide-details />
            Persistent into local storage until user login or log out
        </v-flex>
    </div>
</template>
<script>
    import Vue from 'vue';
    import { mapState, mapActions } from 'vuex';
    import appConstants from '@core/utils/constants/app';

    export default {
        name: 'TheUserProfile',
        data( ) {
            return {
                apiPartnersMap: {
                    null: 'null',
                    0: '0',
                    1: '1'
                }
            };
        },
        computed: {
            ...mapState ( {
                apiPartner: state => state.appState.api.partner
            } ),
            version() {
                return appConstants.VERSION;
            },
            buildDateTime( ) {
                const buildTimetamp = appConstants.BUILD_TIMESTAMP;

                if ( !buildTimetamp )
                    return '';

                return `( Build Time: ${ this.$options.filters.date( new Date( buildTimetamp ), 'yyyy-MM-dd HH:mm:ss' ) } )`;

            },
            vueVersion( ) {
                return Vue.version;
            },
            apiMockData: {
                get() {
                    return this.$store.state.appState.api.mockData;
                },
                set( value ) {
                    this.setApiMockData( value );
                }
            }
        },
        methods: {
            ...mapActions ( {
                setApiPartner: 'appState/setApiPartner',
                setApiMockData: 'appState/setApiMockData',
            } ),
            onChangeApipartner( value ) {
                this.setApiPartner( value === 'null' ? null : parseInt( value ) );
            }
        }
    };
</script>
