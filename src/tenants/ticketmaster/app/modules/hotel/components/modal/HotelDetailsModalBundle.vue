<template>
    <v-card class="gst-hotel-details-modal d-flex flex-column rounded">
        <HotelDetailsModalHeader class="flex-grow-0" :item="item" @close="$emit('close')">
            <template v-if="$vuetify.breakpoint.mdAndUp" v-slot:addressBar>
                <HotelDetailsAddressBar :item="item" :bundle-products="bundleProducts" />
            </template>
        </HotelDetailsModalHeader>
        <HotelDetailsModalGallery :images="item.images" />
        <HotelDetailsAddressBar v-if="!$vuetify.breakpoint.mdAndUp" :item="hotelData" :bundle-products="bundleProducts" />
        <HotelDetailsTabsNavigation :item="hotelData" :tab="tab" :navigation-tabs="navigationTabs" @change="changeTab" />
        <HotelDetailsModalBody :bundle-products="bundleProducts"
            :item="hotelData"
            :loading="!!loadingCounter"
            :tab="tab"
            :navigation-tabs="navigationTabs"
            :has-value="hasValue"
            :bus-events-parent="busEventsParent"
            @close="$emit('close')" />
    </v-card>
</template>

<script>
    import CloseModalOnRouteChangeMixin from '@core/mixins/modals/CloseModalOnRouteChange';
    import CloseModalOnBreakpointChangeMixin from '@core/mixins/modals/CloseModalOnBreakpointChange';
    import HotelDetailsModalHeader from './HotelDetailsModal/HotelDetailsModalHeader';
    import HotelDetailsAddressBar from './HotelDetailsModal/HotelDetailsAddressBar';
    import HotelDetailsModalGallery from './HotelDetailsModal/HotelDetailsModalGallery';
    import HotelDetailsModalBody from './HotelDetailsModal/HotelDetailsModalBody';
    import HotelDetailsTabsNavigation from './HotelDetailsModal/HotelDetailsTabsNavigation';

    export default {
        name: 'HotelDetailsModalBundle',
        components: {
            HotelDetailsModalHeader,
            HotelDetailsModalGallery,
            HotelDetailsModalBody,
            HotelDetailsTabsNavigation,
            HotelDetailsAddressBar
        },
        mixins: [ CloseModalOnRouteChangeMixin, CloseModalOnBreakpointChangeMixin ],
        props: {
            item: {
                type: Object,
                default: null
            },
            bundleProducts: {
                type: Object,
                default: null
            },
            busEventsParent: {
                type: Object,
                default: null
            },
            hasValue: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                navigationTabs: [ 'overview', 'whatsNearby' ],
                tab: 0,
                hotelData: this.item,
                loadingCounter: 0
            };
        },
        methods: {
            changeTab( id ) {
                this.tab = id;
            }
        }
    };
</script>

<style lang="scss">
@import "@scssVariables";
@import "@scssMixins";

.gst-hotel-details-modal {
    position: relative;
    padding-bottom: 16px;
    background-color: theme-color( 'white' ) !important;
    color: theme-color( 'quaternary' );
    overflow-x: hidden;
    overflow-y: scroll;
}
</style>
