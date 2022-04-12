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
                <h5>Est-ce sûr?</h5>
                <p>
                    Oui! Tous les achats sont protégés par notre garantie de confiance de l'acheteur.
                    Nous garantissons que votre achat est sécurisé,
                    protégé, et que vous recevrez vos billets à temps, mais ne nous croyez pas sur parole! 
                </p>
                <h5>Comment puis-je savoir que les billets sont authentiques?</h5>
                <p>
                    Tous les achats sont protégés par notre garantie de confiance de l'acheteur.
                    Nous garantissons que votre achat est sûr, protégé et que vous
                    recevra vos billets à temps.
                    Si vous rencontrez des problèmes, envoyez-nous un e-mail à support@lifestyle.com. C'est pour ça que nous sommes là! 
                </p>
                <h5>
                    Pourquoi ne puis-je pas voir les numéros de siège exacts?
                </h5>
                <p>
                    Pour être honnête, nos courtiers en billets pourraient avoir des ennuis
                    si le nombre exact de sièges est rendu public
                    (c'est-à-dire que les détenteurs d'abonnements qui vendent des billets pour des matchs individuels
                    autorisé par certains lieux). En ne montrant pas les numéros de siège exacts, nous sommes
                    capable de protéger nos courtiers et de vous proposer les meilleures offres.
                </p>
                <h5>
                    Puis-je sélectionner le nombre de billets que je souhaite?
                </h5>
                <p>
                    Oui et non. Puisqu'un billet est moins susceptible de vendre que deux billets ensemble,
                    les courtiers peuvent spécifier dans quelles quantités leurs billets sont disponibles.
                    un grand volume de billets disponibles, les chances sont excellentes que vous le fassiez
                    pouvoir acheter le nombre de places que vous souhaitez dans les sections que vous souhaitez pour un prix que vous aimez.
                </p>
                <h5>Nos sièges seront-ils ensemble?</h5>
                <p>
                    Oui! Tous les billets achetés ensemble seront ensemble. Si vous souhaitez vous asseoir séparément, vous devez effectuer plusieurs achats.
                </p>
                <h5>
                    À quelle distance de l'événement puis-je acheter des billets?
                </h5>
                <p>
                    Tant que des billets sont disponibles, vous pouvez acheter des billets jusqu'à l'heure de début de l'événement.
                </p>
                <h5>
                    Puis-je ajouter à ma commande après avoir acheté des billets?
                </h5>
                <p>
                    Pas exactement. Si les billets sont disponibles dans la même ligne que votre précédent
                    achat, ces billets peuvent être achetés séparément.
                    Si vous nous envoyez un e-mail à support@lifestyle.com, nous vous contacterons
                    le courtier pour s'assurer qu'il assemble les billets.
                </p>
                <h5>
                    Pourquoi ma carte a-t-elle été débitée alors que mon achat n'a pas abouti?
                </h5>
                <p>
                    Pas besoin de s'inquiéter! Le débit de votre carte n'était qu'une autorisation
                    pour vous assurer d'avoir suffisamment d'argent liquide pour acheter les billets que vous souhaitez.
                    Si l'achat n'a pas abouti, les informations sont annulées et la suspension
                    sur vos fonds seront levés dans les 24 à 48 heures.
                    Pour que les fonds soient levés plus tôt, envoyez-nous un e-mail à support@lifestyle.com et nous contacterons votre banque pour vous.
                </p>
            </v-tab-item>
            <v-tab-item
                :key="tabs[1].id"
                transition="no-transition"
                reverse-transition="no-transition">
                <h5>Dans combien de temps vais-je recevoir mes billets?</h5>
                <p>
                    Quoi qu'il en soit, nous vous garantissons de vous livrer vos billets avant l'événement.
                    Si l'événement a lieu dans les 48 heures, vous recevrez la confirmation et expédierez
                    date dans les 2 heures ouvrables. Si l'événement est supérieur à
                    dans trois jours, vous recevrez une confirmation avec les informations de livraison dans un délai d'un jour ouvrable.
                </p>
                <h5>Si j'achète des billets le jour de l'événement, quand les recevrai-je?</h5>
                <p>
                    Si les billets sont étiquetés comme "billets électroniques", vous les recevrez dans les
                    2 heures ouvrables après votre achat.
                    Si l'achat a lieu dans les 2 heures suivant votre événement, vous les recevrez dans les 20 minutes.
                </p>
                <h5>
                    Pourquoi le nom de quelqu'un d'autre figure-t-il sur mes billets?
                </h5>
                <p>
                    Tout nom imprimé sur vos billets reflète simplement le
                    nom de l'acheteur d'origine et n'a aucun effet sur votre inscription.
                </p>
                <h5>Que faire si je dois changer mon adresse de livraison?</h5>
                <p>
                    Pas de problème.
                    Envoyez-nous simplement un e-mail à support@lifestyle.com avec
                    votre identifiant de transaction et confirmez où vous souhaitez que les billets soient expédiés.
                </p>
                <h5>Òu puis-je voir les points de fidélité pour la commande que j'ai passée?</h5>
                <p>
                    Vos points de fidélités seront ajoutés après l'événement.
                </p>
            </v-tab-item>
            <v-tab-item
                :key="tabs[2].id"
                transition="no-transition"
                reverse-transition="no-transition">
                <h5>J'ai passé une commande. Puis-je l'annuler?</h5>
                <p>
                    Désolé, mais nous devons maintenir notre accord d'utilisation à la fois
                    acheteurs et vendeurs, et à la demande des vendeurs, toutes les ventes sont finales.
                </p>
                <h5>Et si mon événement est reporté?</h5>
                <p>
                    Si votre événement est reporté, vos billets seront valables pour la nouvelle date.
                    Vous recevrez un e-mail de notre part avec les nouvelles informations sur l'événement.
                    Si vous ne pouvez pas vous rendre à la nouvelle date de votre événement, vous pouvez revendre
                    vos billets sur notre site partenaire ici.
                </p>
                <h5>Et si mon événement est annulé?</h5>
                <p>
                    Si votre événement est annulé et non reporté, vous
                    recevoir un remboursement complet (s'applique également aux séries éliminatoires).
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
                        title: 'Achat',
                    },
                    {
                        id: 1,
                        title: 'Après l\'achat'
                    },
                    {
                        id: 2,
                        title: 'Annulation'
                    },
                ];
            }
        }
    };

</script>
