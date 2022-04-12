<template>
    <v-card 
        class="gst-event-info-modal d-flex flex-column" 
        :class="{
            'rounded-t-lg': !$vuetify.breakpoint.mdAndUp
        }"
        color="text">
        <HeaderVariant1
            v-if="$vuetify.breakpoint.mdAndUp"
            class="flex-grow-0"
            :title="$t( 'title' )"
            @close="$emit('close')" />
        <HeaderVariant2 
            v-else
            @close="$emit('close')" />
        <DataLoading v-if="loading" class="mt-5 mb-5 pt-5 pb-5" />
        <template v-else>
            <EventInfoModalSubHeader :event="event" />
            <EventInfoModalBody :event="event" />
        </template>
    </v-card>
</template>

<script>
    import HeaderVariant1 from '@core/shared/components/modals/layout/HeaderVariant1';
    import { mapActions, mapState } from 'vuex';
    import HeaderVariant2 from '@core/shared/components/modals/layout/HeaderVariant2';
    import CloseModalOnRouteChangeMixin from '@core/mixins/modals/CloseModalOnRouteChange';
    import CloseModalOnBreakpointChangeMixin from '@core/mixins/modals/CloseModalOnBreakpointChange';
    import DataLoading from '@core/shared/components/loading/DataLoading.vue';
    import EventInfoModalSubHeader from './EventInfoModal/EventInfoModalSubHeader.vue';
    import EventInfoModalBody from './EventInfoModal/EventInfoModalBody.vue';

    const STORE_NAME = 'events';
    
    export default {
        name: 'EventInfoModal',
        components: {
            HeaderVariant1,
            HeaderVariant2,
            EventInfoModalSubHeader,
            EventInfoModalBody,
            DataLoading
        },
        mixins: [ CloseModalOnRouteChangeMixin, CloseModalOnBreakpointChangeMixin ],
        props: {
            id: {
                type: [ String, Number ],
                default: null
            }
        },
        data( ) {
            return {
                loading: true
            };
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.event.eventInfoModal'
        },
        computed: {
            ...mapState( {
                event: state => state[STORE_NAME].detail 
            } )
        },
        methods: {
            ...mapActions( {
                loadOne: `${STORE_NAME}/one`,
            } ),
        },
        async mounted( ) {
            this.loading = true;
            if ( this.event.id !== this.id ) {
                await this.loadOne( this.id );
            }
            this.loading = false;
        }
    };
</script>
