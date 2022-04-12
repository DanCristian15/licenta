<template>
    <div class="gst-hotel-details-modal-body">
        <v-tabs-items v-model="tab">
            <v-tab-item v-for="(tabName, index) in navigationTabs" :key="index">
                <HotelDetailsModalOverviewTab v-if="tabName === 'overview'" :item="item" />
                <HotelDetailsModalRoomsTab v-if="tabName === 'rooms'"
                    :item="item"
                    :loading="loading"
                    :bundle-products="bundleProducts"
                    :has-value="hasValue"
                    :bus-events-parent="busEventsParent"
                    @close="$emit('close')" />
                <HotelDetailsModalNearTab v-if="tabName === 'whatsNearby'" :bundle-products="bundleProducts" :item="item" />
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>

    import HotelDetailsModalNearTab
        from './HotelDetailsModalBody/HotelDetailsModalNearTab';
    import HotelDetailsModalRoomsTab
        from './HotelDetailsModalBody/HotelDetailsModalRoomsTab';
    import HotelDetailsModalOverviewTab
        from './HotelDetailsModalBody/HotelDetailsModalOverviewTab';

    export default {
        name: 'HotelDetailsModalBody',
        components: {
            HotelDetailsModalNearTab,
            HotelDetailsModalRoomsTab,
            HotelDetailsModalOverviewTab
        },
        props: {
            item: {
                type: Object,
                default: null
            },
            loading: {
                type: Boolean,
                default: false
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
            },
            tab: {
                type: Number,
                default: 0
            },
            navigationTabs: {
                type: Array,
                default: new Array()
            }
        }
    };
</script>
