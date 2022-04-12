<template>
    <select
        :key="selectKey"
        :value="value"
        :disabled="disabled"
        v-bind="$attrs"
        class="gst-select-input"
        @change="changeOption"
        @focus="$emit('focus')"
        @blur="$emit('blur')">
        <option v-if="clearable" :value="blankValue">
            {{ $attrs.placeholder }}
        </option>
        <option
            v-for="option in options"
            :key="getOptionId( option )"
            :value="getOptionId( option )">
            {{ renderer ? renderer( option ) : getOptionDisplay( option ) }}
        </option>
    </select>
</template>

<script>
    export default {
        name: 'BaseSelect',
        inheritAttrs: false,
        props: {
            clearable: {
                type: Boolean,
                default: false,
            },
            displayProp: {
                type: String,
                default: 'name'
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            loading: {
                type: Boolean,
                default: false
            },
            i18nPrefix: {
                type: String,
                default: ''
            },
            invalidateOnChangeOptions: {
                type: Boolean,
                default: true
            },
            options: {
                type: Array,
                required: true
            },
            optionsArrayObj: {
                type: Boolean,
                default: true
            },
            renderer: {
                type: Function,
                default: null,
            },
            valueProp: {
                type: String,
                default: 'id'
            },
            value: {
                type: [ Object, String, Number ],
                default: null
            },
        },
        data() {
            return {
                blankValue: null,
            };
        },
        computed: {
            /*Needed to rerender the select if the value or the options where modified*/
            /* TODO see how thi behave when the new options lenght is the same*/
            selectKey( ) {
                return '_drop_down_'+ this.value + '_'+this.options.length;
            }
        },
        watch: {
            'options': function ( newOptions ) {
                if ( this.invalidateOnChangeOptions && !this.loading ) {
                    let find = newOptions.filter ( option => {
                        return option === this.value || option[this.valueProp] === this.value;
                    } );
                    if ( find.length === 0 ) {
                        this.$emit ( 'input', this.blankValue );
                    }
                }
            }
        },
        methods: {
            getOptionId( option ) {
                return this.optionsArrayObj ? option[ this.valueProp ] : option;
            },
            getOptionDisplay ( option ) {
                let ret = this.optionsArrayObj ? option[ this.displayProp ] : option;

                return this.i18nPrefix ? this.$t( `${this.i18nPrefix}.${ret}` ) : ret;
            },
            clearSelection ( ) {
                this.$emit( 'input', this.blankValue );
            },
            changeOption ( event ) {
                let index = event.target.selectedIndex,
                    ret = null;

                if ( index > ( this.clearable ? 0 : -1 ) ) {
                    let selectedOption = this.options[parseInt( index ) - ( this.clearable ? 1 : 0 ) ];
                    if ( selectedOption ) {
                        ret = this.getOptionId( selectedOption );
                    }
                }

                this.$emit( 'input', ret );
            },
        }
    };
</script>
