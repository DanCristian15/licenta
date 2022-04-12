<template>
    <CheckboxRoundUnchecked class="gst-icon-unchecked" />
</template>
<script>
    import CheckboxRoundUnchecked from '@shared/assets/icons/checkboxes/round_checkbox_unchecked.svg';
    
    export default {
        name: 'IconCheckboxRoundUnchecked',
        components: {
            CheckboxRoundUnchecked
        }
    };
</script>
<style lang="scss">
    @import "@scssVariables";

    .gst-icon-unchecked .gst-svg-icon {
        stroke: theme-color( 'tertiary' );
    }
</style>