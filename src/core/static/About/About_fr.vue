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
                <h5>Un excellent programme</h5>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam finibus
                    ullamcorper risus in vestibulum. Curabitur maximus lorem sit amet cursus cursus.
                    Maecenas eu libero tempor, tincidunt lacus non, volutpat neque.
                    In tristique malesuada dolor eu facilisis. Cras efficitur lorem vitae ultrices finibus.
                </p>
                <h5>Plus d'informations</h5>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam finibus
                    ullamcorper risus in vestibulum. Curabitur maximus lorem sit amet cursus cursus.
                    Maecenas eu libero tempor, tincidunt lacus non, volutpat neque.
                    In tristique malesuada dolor eu facilisis. Cras efficitur lorem vitae ultrices finibus.
                </p>
            </v-tab-item>
            <v-tab-item
                :key="tabs[1].id"
                transition="no-transition"
                reverse-transition="no-transition">
                <h5>Grands avantages</h5>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam finibus
                    ullamcorper risus in vestibulum. Curabitur maximus lorem sit amet cursus cursus.
                    Maecenas eu libero tempor, tincidunt lacus non, volutpat neque.
                    In tristique malesuada dolor eu facilisis. Cras efficitur lorem vitae ultrices finibus.
                </p>
                <h5>Grands avantages</h5>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam finibus
                    ullamcorper risus in vestibulum. Curabitur maximus lorem sit amet cursus cursus.
                    Maecenas eu libero tempor, tincidunt lacus non, volutpat neque.
                    In tristique malesuada dolor eu facilisis. Cras efficitur lorem vitae ultrices finibus.
                </p>
            </v-tab-item>
            <v-tab-item
                :key="tabs[2].id"
                transition="no-transition"
                reverse-transition="no-transition">
                <h5>Facile à rejoindre</h5>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam finibus
                    ullamcorper risus in vestibulum. Curabitur maximus lorem sit amet cursus cursus.
                    Maecenas eu libero tempor, tincidunt lacus non, volutpat neque.
                    In tristique malesuada dolor eu facilisis. Cras efficitur lorem vitae ultrices finibus.
                </p>
                <h5>Facile à rejoindre</h5>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam finibus
                    ullamcorper risus in vestibulum. Curabitur maximus lorem sit amet cursus cursus.
                    Maecenas eu libero tempor, tincidunt lacus non, volutpat neque.
                    In tristique malesuada dolor eu facilisis. Cras efficitur lorem vitae ultrices finibus.
                </p>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>
<script>
    export default {
        name: 'About',
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
                        title: 'Informations sur le programme',
                    },
                    {
                        id: 1,
                        title: 'Avantages de l\'adhésion'
                    },
                    {
                        id: 2,
                        title: 'Comment adhérer'
                    },
                ];
            }
        }
    };

</script>
