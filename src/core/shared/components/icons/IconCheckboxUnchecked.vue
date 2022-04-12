<template>
    <CheckboxUnchecked class="gst-icon-unchecked" />
</template>
<script>
    import CheckboxUnchecked from '@shared/assets/icons/checkboxes/checkbox_unchecked.svg';
    
    export default {
        name: 'IconCheckboxUnchecked',
        components: {
            CheckboxUnchecked
        }
    };
</script>
<style lang="scss">
    @import "@scssVariables";

    .gst-icon-unchecked .gst-svg-icon {
        stroke: theme-color( 'tertiary' );
    }
</style>