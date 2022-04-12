<template>
    <v-card
        flat
        class="gst-subscribe-card mx-auto">
        <v-card-title>
            <h3 class="mx-auto">
                Don't miss a thing!
            </h3>
        </v-card-title>
        <v-card-text>
            We're always working on new deals. Subscribe to our newsletter. Don't worry, we don't spam.😉
        </v-card-text>
        <v-layout wrap>
            <v-flex
                grow
                px-3>
                <v-text-field
                    v-model="yourName"
                    readonly
                    class="gst-input"
                    flat
                    outlined
                    label="Your Name"
                    solo />
            </v-flex>
            <v-flex
                grow
                pr-3>
                <v-text-field
                    v-model="email"
                    readonly
                    class="gst-input"
                    flat
                    outlined
                    label="Email address"
                    solo />
            </v-flex>
            <v-flex shrink>
                <ButtonBase placeholder="Subscribe" />
            </v-flex>
        </v-layout>
    </v-card>
</template>
<script>
    import ButtonBase from '@core/shared/components/buttons/ButtonBase';

    export default {
        name: 'SubscribeCard',
        components: { ButtonBase },
        data: () => ( {
            yourName: '',
            email: ''
        } )
    };
</script>
<style lang="scss" scoped>
.gst-subscribe-card {
    text-align: center;
    max-width: 784px;
}
</style>
