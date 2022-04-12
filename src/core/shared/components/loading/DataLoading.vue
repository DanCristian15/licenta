<template>
    <div class="text-center">
        <v-progress-circular
            indeterminate
            color="primary"
            :width="$attrs.width ? $attrs.width : 2"
            v-bind="$attrs" />
    </div>
</template>

<script>
    export default {
        name: 'DataLoading',
        inheritsAttribute: true
    };
</script>
