<template>
    <CheckboxRoundChecked class="gst-icon-checked" />
</template>
<script>
    import CheckboxRoundChecked from '@shared/assets/icons/checkboxes/round_checkbox_checked.svg';
    
    export default {
        name: 'IconCheckboxRoundChecked',
        components: {
            CheckboxRoundChecked
        }
    };
</script>
<style lang="scss">
    @import "@scssVariables";

    .gst-icon-checked .gst-svg-icon {
        fill: theme-color( 'primary' );
    }
</style>