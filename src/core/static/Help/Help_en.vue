<template>
    <div class="content-max-width pt-4">
        <IllustrationBestDeals class="my-2" />
        <h5>
            Let One Ticket Lead You to the Next
        </h5>
        <p>
            Loyalty Members can earn points/miles for events they love such as concerts, sporting events, family shows and more in the U.S and Canada. To earn points/miles, just search and purchase your event tickets from this website and you will earn on every Ticketmaster purchase.  You will be asked to enter your Loyalty account number during the checkout so that we properly credit your account.
        </p>
        <IllustrationBestPrices class="my-2" />
        <h5>Same Ticket Prices, with the Bonus of Earning Miles</h5>
        <p>
            You get access to all of the same Ticketmaster tickets available from their regular website at the exact same prices, but Loyalty Members will get rewarded with added points/miles just by purchasing here!
        </p>
        <IllustrationAlwaysOnTime class="my-2" />
        <h5>
            Get your Tickets Immediately
        </h5>
        <p>
            Your Tickets will be made available to you electronically to ensure you do not miss your event.  Also, your Loyalty account will be credited within 24hrs of your ticket purchase.
        </p>
        <IllustrationBestTickets class="my-2" />
        <h5>
            Best Ticket Selection
        </h5>
        <p>
            Whether you are looking for pre-sale tickets, standard event tickets or verified resale tickets, you will find them here and receive reward points/miles on every purchase.
        </p>
    </div>
</template>
<script>
    import IllustrationAlwaysOnTime from '@core/shared/assets/illustrations/always_on_time.svg';
    import IllustrationBestDeals from '@core/shared/assets/illustrations/best_deals.svg';
    import IllustrationBestPrices from '@core/shared/assets/illustrations/best_prices.svg';
    import IllustrationBestTickets from '@core/shared/assets/illustrations/best_ticket.svg';

    export default {
        name: 'Help',
        components: {
            IllustrationAlwaysOnTime,
            IllustrationBestDeals,
            IllustrationBestPrices,
            IllustrationBestTickets
        }
    };
</script>
