<template>
    <v-text-field
        v-bind="$attrs"
        :value="value"
        :error-messages="errorMessages"
        :placeholder="placeholder"
        v-on="$listeners">
        <template
            v-for="(_, slot) of $scopedSlots"
            v-slot:[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
        </template>
    </v-text-field>
</template>

<script>
    export default {
        name: 'GeneralInput',
        props: {
            placeholder: {
                type: String,
                default: ''
            },
            errorMessages: {
                type: Array,
                default: () => []
            },
            value: {
                type: [ String, Number ],
                default: null
            }
        }
    };
</script>
