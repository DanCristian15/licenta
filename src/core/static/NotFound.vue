<template>
    <v-row class="u-height-100">
        <v-col cols="12"
            align="center"
            justify="center">
            <img :src="notFoundSrc" height="300px" />
            <p>
                {{ $t('message') }}
            </p>
            <BaseButton
                :placeholder="$t('_common:buttons.backToHome')"
                :to="'/'" />
        </v-col>
    </v-row>
</template>
<script>
    import BaseButton from '@core/shared/components/buttons/BaseButton';
    import imageConstants from '@core/utils/constants/imagePaths';
    
    export default {
        name: 'NotFound',
        components: {
            BaseButton
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'static.notFound'
        },
        data( ) {
            return {
                loading: true
            };
        },
        computed: {
            notFoundSrc() {
                return imageConstants.FALLBACKS.NOT_FOUND;
            }
        }
    };
</script>
