<template>
    <div class="content-max-width pt-4">
        <IllustrationBestDeals class="my-2" />
        <h5>
            Laissez un billet vous amener au prochain
        </h5>
        <p>
            Les members de fidélité peuvent mériter des miles pour des événements qu’ils aiment tels que des concerts, des évéments sportifs, des spectacles familiaux et plus aux États-Unis et au Canada. Pour gagner des miles, il faut rechercher et acheter vos billets de l’événement sur le site web et vous allons mériter des points sur chaque achat de Ticketmaster. Vous allons être demandé d’entrer votre numéro de compte fidélité a la caisse pour que nous peuvent créditer votre compte.
        </p>
        <IllustrationBestPrices class="my-2" />
        <h5>Même prix des billets, avec le bonus de gagner des miles</h5>
        <p>
            Vous avez accès à tous les mêmes billets que Ticketmaster a disponible sur leur site web actuel, au même prix, mais les members de fidélité seront récompensés avec des miles supplementaires en acheter ici!
        </p>
        <IllustrationAlwaysOnTime class="my-2" />
        <h5>
            Obtenez vos billets tout de suite
        </h5>
        <p>
            Vos billets allons être disponible par voie électronique pour vous assurer que vous allons pas manquer votre événement. En plus, votre compte de fidélité sera crédité dans les 24 heures suivant de l’achat de votre billet.
        </p>
        <IllustrationBestTickets class="my-2" />
        <h5>
            Meilleure sélection de billets
        </h5>
        <p>
            Si vous  être entrain d’acheter des billets en avance, des billets d’événements standard ou des billets de revente verifiés, vous allons les trouver ici et recevrons des milles de recompense à chaque achat.
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
