<template>
    <div>
        <detail-banner v-if="!hideBanner" :title="$t('_common:pages.termsAgreement.title')" :src="bannerImage" />
        <component :is="component" :class="{ 'pt-6': !hideBanner }" />
    </div>
</template>
<script>
    import DetailBanner from '@core/shared/components/misc/DetailBanner.vue';
    import StaticPageMixin from '@core/mixins/StaticPageMixin';
    import TermsAgreement_en from './TermsAgreement_en.vue';
    import TermsAgreement_fr from './TermsAgreement_fr.vue';


    export default {
        name: 'TermsAgreement',
        components: {
            DetailBanner,
            /* eslint-disable vue/no-unused-components */
            TermsAgreement_en,
            TermsAgreement_fr
            /* eslint-enable vue/no-unused-components */
        },
        mixins: [ StaticPageMixin ],
        props: {
            /**
             * 2020-05-20 Ionutt
             * We need this because this component needs to be opene from a modal without the header baner
             */
            'hideBanner': {
                type: Boolean,
                default: false
            },
        },
        computed: {
            component() {
                return `TermsAgreement_${this.language}`;
            }
        }
    };
</script>
