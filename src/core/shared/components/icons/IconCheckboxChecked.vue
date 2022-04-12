<template>
    <CheckboxChecked class="gst-icon-checked" />
</template>
<script>
    import CheckboxChecked from '@shared/assets/icons/checkboxes/checkbox_checked.svg';
    
    export default {
        name: 'IconCheckboxChecked',
        components: {
            CheckboxChecked
        }
    };
</script>

<style lang="scss">
    @import "@scssVariables";

    .gst-icon-checked .gst-svg-icon {
        fill: theme-color( 'primary' );
    }
</style>