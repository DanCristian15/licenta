<template>
    <v-tooltip 
        v-if="$slots.default"
        v-model="show"
        :disabled="disabled"
        top
        :content-class="classContent"
        v-bind="$attrs">
        <template v-slot:activator="{ on }">
            <div 
                v-click-outside="onClickOutsideDo"
                :class="classActivator" 
                class="u-mouse-pointer" 
                v-on="on" 
                @click="onClickSlotDo">
                <slot></slot>
            </div>
        </template>
        <span class="gst-base-tooltip-text">{{ text }}</span>
    </v-tooltip>
</template>
<script>
    export default {
        name: 'BaseTooltip',
        inheritAttrs: true,
        props: {
            text: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            value: {
                type: Boolean,
                default: false
            },
            classActivator: {
                type: String,
                default: ''
            },
            classContent: {
                type: String,
                default: 'gst-tooltip'
            }
        },
        data() {
            return {
                show: this.value
            };
        },
        methods: {
            onClickSlotDo() {
                this.show = !this.show;
            },
            onClickOutsideDo() {
                this.show = false;
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-base-tooltip.v-tooltip__content {
        max-width: 250px;
    }
</style>
