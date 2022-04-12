<template>
    <v-bottom-sheet
        class="gst-base-bottom-modal"
        v-bind="$attrs"
        v-on="$listeners">
        <template 
            v-for="(_, slot) of $scopedSlots" 
            v-slot:[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
        </template>
    </v-bottom-sheet>
</template>