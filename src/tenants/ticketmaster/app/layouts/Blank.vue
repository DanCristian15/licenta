<template>
    <div>
        <v-main>
            <!-- Provides the application the proper gutter -->
            <v-container fluid class="py-0 px-0">
                <slot></slot>
            </v-container>
        </v-main>
    </div>
</template>

<script>
    export default {
        name: 'App',
    };
</script>
