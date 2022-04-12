<template>
    <div
        v-if="$vuetify.breakpoint.mdAndUp"
        class="gst-event-ticket-addional-filters-sidebar d-flex flex-column">
        <div class="flex-grow-1 pa-4">
            <h5 class="gst-event-ticket-addional-filters-sidebar__title">
                {{ $t('_common:terms.moreFilters' ) }}
            </h5>
            <div class="pt-5">
                <AccessibilityToggleFormInput
                    v-model="accessibility"
                    :disabled="!options.accessibilityEnabled" />
            </div>
        </div>
        <div class="gst-event-ticket-addional-filters-sidebar__footer d-flex flex-row align-center px-4">
            <v-btn
                text
                class="gst-event-ticket-addional-filters-sidebar__btn"
                color="primary"
                @click="onResetDo">
                {{ $t( '_common:buttons.reset' ) }}
            </v-btn>
            <div class="flex-grow-1"></div>
            <v-btn
                class="gst-event-ticket-addional-filters-sidebar__btn"
                color="primary"
                depressed
                @click="onSubmitDo">
                {{ $t( '_common:buttons.applyFilters' ) }}
            </v-btn>
        </div>
    </div>
</template>

<script>
    import AccessibilityToggleFormInput from './components/formInputs/AccessibilityToggleFormInput';

    export default {
        name: 'EventTicketAddionalFiltersSidebar',
        components: {
            AccessibilityToggleFormInput,
        },
        props: {
            value: {
                type: Object,
                required: true
            },
            options: {
                type: Object,
                required: true
            }
        },
        data( ) {
            return {
                accessibility: false
            };
        },
        watch: {
            'value.accessibility': {
                handler( newValue ) {
                    this.accessibility = newValue;
                },
                immediate: true
            }
        },
        methods: {
            onSubmitDo( ) {
                const { accessibility, value } = this;

                this.$emit( 'apply', {
                    ...value,
                    accessibility
                } );
                this.$emit( 'close' );
            },
            onResetDo() {
                this.$emit( 'reset' );
                this.accessibility = this.value.accessibility;
            }
        },
        mounted( ) {
            this._breakpointChange = this.$watch( '$vuetify.breakpoint.mdAndUp', ( ) => {
                this.$emit( 'close' );
            } );
        },
        destroyed( ) {
            this._breakpointChange( );
        }
    };
</script>


<style lang="scss">
    @import '@scssVariables';
    @import '@scssMixins';

    .gst-event-ticket-addional-filters-sidebar {
        background-color: theme-color( 'white' );

        .gst-event-ticket-addional-filters-sidebar__title {
            @include font-size('xxl');
            @include font-weight('large');

            color: theme-color( 'quaternary' );
        }

        .gst-event-ticket-addional-filters-sidebar__footer {
            height: 60px;
            background-color: theme-color( 'quinary' );
            border-top: 1px solid theme-color-hex( 'senary-darken-2' );
        }

        .gst-event-ticket-addional-filters-sidebar__btn {
            @include font-size('s');
            @include font-weight('large');

            text-transform: capitalize;
        }
    }
</style>
