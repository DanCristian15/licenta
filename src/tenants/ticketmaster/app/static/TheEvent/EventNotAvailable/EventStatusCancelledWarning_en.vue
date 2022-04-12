<template>
    <div class="gst-event-status-cancelled">
        <h5 class="gst-event-not-available__title mb-4">
            Event Canceled
        </h5>
        <div class="gst-event-not-available__content">
            <p>Unfortunately, the Event Organizer has had to cancel your event.</p>
            <p>No action is required to obtain a refund. It will be processed to the original method of payment used at time of purchase, once funds are received from the Event Organizer, which is usually completed within 30 days.</p>
            <p>If the Event Organizer is offering a credit option, it will be visible within the Event Details of your order, which can be found in your Ticketmaster account.</p>
            <p>Please Note: If the tickets were transferred to you, the refund will go to the fan who originally purchased the tickets from Ticketmaster.</p>
            <p>Please see our <a :href="purchasePolicyUrl" target="_blank">Purchase Policy</a> for more information.</p>
        </div>
    </div>
</template>

<script>
    import tenantUrlsConstants from '@tenant/app/utils/constants/tenantUrls'; 

    export default {
        computed: {
            purchasePolicyUrl( ) {
                return tenantUrlsConstants.purchasePolicy;
            }
        }
    };
</script>