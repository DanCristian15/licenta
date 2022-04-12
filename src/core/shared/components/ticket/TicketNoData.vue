<template>
    <NoData class="u-height-100">
        <v-row
            class="u-height-100 py-0 px-0 my-0 mx-0"
            v-bind="$attrs">
            <v-col cols="12">
                <slot></slot>
            </v-col>
        </v-row>
    </NoData>
</template>
<script>
    import NoData from '@core/shared/components/misc/NoData.vue';

    export default {
        name: 'TicketNoData',
        components: {
            NoData
        }
    };
</script>