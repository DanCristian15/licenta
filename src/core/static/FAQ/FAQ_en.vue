<template>
    <div class="content-max-width pt-4">
        <v-tabs
            v-model="activeTab"
            background-color="transparent"
            color="primary"
            class="gst-tabs"
            :show-arrows="false">
            <v-tab
                v-for="tab in tabs"
                :key="tab.id">
                {{ tab.title }}
            </v-tab>
        </v-tabs>

        <v-tabs-items
            v-model="activeTab"
            class="gst-tabs-item pt-4">
            <v-tab-item
                :key="tabs[0].id"
                transition="no-transition"
                reverse-transition="no-transition">
                <h5>Is this safe?</h5>
                <p>
                    Yes! All purchases are protected by our Buyer Trust Guarantee.
                    We guarantee that your purchase is safe,
                    protected, and that you will receive your tickets on time, but don't take our word for it!
                </p>
                <h5>How do I know the tickets are authentic?</h5>
                <p>
                    All purchases are protected by our Buyer Trust Guarantee.
                    We guarantee that your purchase is safe, protected, and that you
                    will receive your tickets on time.
                    If you have any problems, shoot us an email at support@lifestyle.com. It's what we're here for!
                </p>
                <h5>
                    Why can't I see exact seat numbers?
                </h5>
                <p>
                    To be honest, our ticket brokers could get in trouble
                    if the exact seat numbers made known publicly
                    (i.e. season ticket holders selling tickets to individual games is often not
                    allowed by certain venues). By not showing exact seat numbers, we are
                    able to protect our brokers and provide you with the best deals.
                </p>
                <h5>
                    Can I select the number of tickets I want?
                </h5>
                <p>
                    Yes and no. Since one ticket is less likely to sell than two tickets together,
                    brokers can specify what quantities their tickets are available in. Since we have such
                    a large volume of tickets available, the odds are excellent that you will
                    be able to buy the number of seats you want in the sections you want for a price you love.
                </p>
                <h5>Will our seats be together?</h5>
                <p>
                    Yes! All tickets purchased together will be together. If you want to sit separately, you must make multiple purchases.
                </p>
                <h5>
                    How close to the event can I buy tickets?
                </h5>
                <p>
                    As long as tickets are available, you can purchase tickets up to the start time of the event.
                </p>
                <h5>
                    Can I add to my order after I purchase tickets?
                </h5>
                <p>
                    Not exactly. If tickets are available in the same row as your previous
                    purchase, those tickets can be purchased separately.
                    If you email us at support@lifestyle.com, we will contact
                    the broker to make sure he puts the tickets together.
                </p>
                <h5>
                    Why was my card charged when my purchase didn't go through?
                </h5>
                <p>
                    No need to worry! The charge on your card was only an authorization
                    to make sure you have enough cash to buy the tickets you want.
                    If the purchase did not go through, the information is voided, and the hold
                    on your funds will be lifted within 24-48 hours.
                    To get the funds lifted sooner, email us at support@lifestyle.com and we will contact your bank for you.
                </p>
            </v-tab-item>
            <v-tab-item
                :key="tabs[1].id"
                transition="no-transition"
                reverse-transition="no-transition">
                <h5>How soon will I get my tickets?</h5>
                <p>
                    No matter what, we guarantee to deliver your tickets to you before the event.
                    If the event is within 48 hours, you'll receive the confirmation and ship
                    date within 2 business hours. If the event is more than
                    three days away, you'll receive a confirmation with delivery info within one business day.
                </p>
                <h5>If I purchase tickets on the day of the event when will I receive them?</h5>
                <p>
                    If the tickets are labeled as "e-tickets," you'll receive them within
                    2 business hours of your purchase.
                    If the purchase is within 2 hours of your event, you'll receive them within 20 minutes.
                </p>
                <h5>
                    Why is someone else's name on my tickets?
                </h5>
                <p>
                    Any name that is printed on your tickets merely reflect the
                    original purchaser's name and has no effect on your entry.
                </p>
                <h5>What if I need to change my shipping address?</h5>
                <p>
                    Not a problem.
                    Just send us an email to support@lifestyle.com with
                    your transaction id and confirm where you want the tickets to be shipped to.
                </p>
                <h5>When can I see loyalty points for the order I placed?</h5>
                <p>
                    Your points will be added to your account after the event occurs.
                </p>
            </v-tab-item>
            <v-tab-item
                :key="tabs[2].id"
                transition="no-transition"
                reverse-transition="no-transition">
                <h5>I placed an order. Can I cancel it?</h5>
                <p>
                    Sorry, but we have to hold up our user agreement to both our
                    buyers and sellers, and as required by sellers, all sales are final.
                </p>
                <h5>What if my event is postponed?</h5>
                <p>
                    If your event is postponed, your tickets will be good for the new date.
                    You will receive an email from us with the new event information.
                    If you cannot go to the new date of your event, you can resell
                    your tickets on our partner site here.
                </p>
                <h5>What if my event is canceled?</h5>
                <p>
                    If your event is cancelled and not rescheduled you'll
                    receive a full refund (applies to playoffs as well).
                </p>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>
<script>
    export default {
        name: 'FAQ',
        data () {
            return {
                activeTab: null,
            };
        },
        computed: {
            tabs() {
                return  [
                    {
                        id: 0,
                        title: 'Buying',
                    },
                    {
                        id: 1,
                        title: 'Post Purchase'
                    },
                    {
                        id: 2,
                        title: 'Cancelling'
                    },
                ];
            }
        }
    };

</script>
