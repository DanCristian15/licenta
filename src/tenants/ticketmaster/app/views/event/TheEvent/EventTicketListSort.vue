<template>
    <div class="gst-event-ticket-list-sort u-width-100 d-flex flex-row">
        <div
            v-for="item in sort.options"
            :key="item.key"
            v-ripple
            :class="{
                'gst-event-ticket-list-sort__item--selected': isItemSelected( item )
            }"
            class="gst-event-ticket-list-sort__item u-mouse-pointer flex-grow-1 text-center"
            @click="sort.value = item">
            {{ item.display }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'EventTicketListSort',
        props: {
            sort: {
                type: Object,
                required: true
            }
        },
        methods: {
            isItemSelected( item ) {
                return item === this.sort.value;
            }
        }
    };
</script>


<style lang="scss" scoped>
    @import '@scssVariables';
    @import '@scssMixins';

    .gst-event-ticket-list-sort {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        background-color: theme-color( 'white' );
        z-index: 1;

        .gst-event-ticket-list-sort__item {
            @include font-size('s');
            @include font-weight('large');

            height: 46px;
            padding-top: 12px;
            color: theme-color( 'quaternary' );
            border-bottom: 1px solid theme-color-hex( 'senary-darken-2' );
        }

        .gst-event-ticket-list-sort__item--selected {
            color: theme-color( 'primary' );
            border-bottom: 3px solid theme-color( 'primary' );
        }
    }
</style>

