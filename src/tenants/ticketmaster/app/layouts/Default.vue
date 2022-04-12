<template>
    <v-app>
        <Header />
        <v-main class="main">
            <!-- Provides the application the proper gutter -->
            <v-container fluid>
                <slot></slot>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    import Header from './components/Header.vue';

    export default {
        name: 'App',
        components: {
            Header
        }
    };
</script>
