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
                <h5>A Great Program</h5>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam finibus
                    ullamcorper risus in vestibulum. Curabitur maximus lorem sit amet cursus cursus.
                    Maecenas eu libero tempor, tincidunt lacus non, volutpat neque.
                    In tristique malesuada dolor eu facilisis. Cras efficitur lorem vitae ultrices finibus.
                </p>
                <h5>More info</h5>
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
                <h5>Great Benefits</h5>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam finibus
                    ullamcorper risus in vestibulum. Curabitur maximus lorem sit amet cursus cursus.
                    Maecenas eu libero tempor, tincidunt lacus non, volutpat neque.
                    In tristique malesuada dolor eu facilisis. Cras efficitur lorem vitae ultrices finibus.
                </p>
                <h5>Great Benefits</h5>
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
                <h5>Easy to Join</h5>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam finibus
                    ullamcorper risus in vestibulum. Curabitur maximus lorem sit amet cursus cursus.
                    Maecenas eu libero tempor, tincidunt lacus non, volutpat neque.
                    In tristique malesuada dolor eu facilisis. Cras efficitur lorem vitae ultrices finibus.
                </p>
                <h5>Easy to Join</h5>
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
                        title: 'Program Info',
                    },
                    {
                        id: 1,
                        title: 'Membership Benefits'
                    },
                    {
                        id: 2,
                        title: 'How to Join'
                    },
                ];
            }
        }
    };

</script>
