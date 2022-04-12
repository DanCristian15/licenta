<template>
    <div class="event-sections-filters d-flex flex-column u-width-100">
        <div class="d-flex flex-row align-stretch pa-4 ">
            <div class="flex-grow-1 d-flex align-stretch u-height-100">
                <BaseFormSelect
                    :value="value.quantity"
                    :options="quantityOptions"
                    :clearable="false"
                    class="event-sections-sidebar-header__filter u-width-100 u-height-100 pl-4"
                    @input="onQuantityInputDo" />
            </div>
        </div>
    </div>
</template>

<script>
    import BaseFormSelect from '@shared/components/input/BaseFormSelect.vue';

    export default {
        name: 'EventSectionsFilters',
        components: {
            BaseFormSelect,
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
        computed: {
            quantityOptions( ) {
                const { maxQuantity, minQuantity } = this.options;

                return new Array( maxQuantity - minQuantity + 1 ).fill( ).reduce( ( agg, value, key ) => {
                    const q = key + minQuantity;
                    if( q % 2 === 0 ) {
                        agg.push( {
                            id: q,
                            name: this.$t( '_common:terms.guestWithCount', { count: q } )
                        } );
                    }
                    return agg;

                }, [] );
            }
        },
        methods: {
            onQuantityInputDo( value ) {
                this.$emit( 'input', {
                    ...value,
                    quantity: value
                } );
            }
        }
    };
</script>

<style lang="scss">
@import '@scssVariables';
@import '@scssMixins';

.event-sections-filters {
    border-bottom: 1px solid theme-color-hex( 'senary-darken-2' );

    .event-sections-sidebar-header__filter {
        height: 40px;
        border-radius: border-radius( 'xxs' );

        .gst-select__input {
            height: 100%;
            width: 100%;
            color: theme-color( 'primary' );
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
        }
    }
}

.event-sections-sidebar-header__btn-filter-icon--active {
    .gst-svg-icon {
        stroke: theme-color( 'white' );
        fill: theme-color( 'white' );
    }
}
</style>
