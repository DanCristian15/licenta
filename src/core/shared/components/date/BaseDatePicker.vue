<template>
    <v-date-picker
        ref="wrappedCmp"
        class="gst-base-date-picker"
        v-bind="$attrs"
        :value="value"
        v-on="$listeners">
        <template 
            v-for="(_, slot) of $scopedSlots" 
            v-slot:[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
        </template>
    </v-date-picker>
</template>

<script>
    export default {
        name: 'DatePicker',
        props: {
            value: {
                type: [ Array, String ],
                default: '' 
            }
        }
    };
</script>