<template>
    <v-app>
        <Header :with-search="withSearch" />
        <v-main class="main">
            <!-- Provides the application the proper gutter -->
            <v-container fluid>
                <slot></slot>
            </v-container>
        </v-main>
        <Footer />
    </v-app>
</template>

<script>
    import { mapState } from 'vuex';
    import Header from './components/Header.vue';
    import Footer from './components/Footer.vue';

    export default {
        name: 'DefaultLayout',
        components: {
            Header,
            Footer
        },
        computed: {
            ...mapState( {
                homePageState: state => state.appState.page.home
            } ),
            withSearch( ) {
                return this.$route.path !== '/' || this.homePageState.showHeader;
            }
        }
    };
</script>
