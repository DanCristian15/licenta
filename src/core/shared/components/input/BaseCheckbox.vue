<template>
    <input
        type="checkbox"
        class="gst-base-checkbox"
        :class="[hasError && 'input-error']"
        v-bind="$attrs"
        :checked="value === onValue"
        @input="onInputDo"
        @blur="$emit( 'blur' )"
        @focus="$emit( 'focus' )" />
</template>

<script>
    export default {
        name: 'BaseInput',
        props: {
            value: {
                type: [ String, Number, Object, Boolean ],
                default: null
            },
            onValue: {
                type: [ String, Number, Object, Boolean ],
                default: function ( ) {
                    return true;
                }
            },
            offValue: {
                type: [ String, Number, Object, Boolean ],
                default: function ( ) {
                    return false;
                }
            },
            hasError: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            onInputDo( event ) {
                const value = event.target.checked;

                this.$emit( 'input', value ? this.onValue : this.offValue );
            }
        }
    };
</script>