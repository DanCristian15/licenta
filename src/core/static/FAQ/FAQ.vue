<template>
    <div>
        <detail-banner :title="$t('_common:pages.faq.title')" :src="bannerImage" />
        <component :is="component" />
    </div>
</template>
<script>
    import DetailBanner from '@core/shared/components/misc/DetailBanner.vue';
    import StaticPageMixin from '@core/mixins/StaticPageMixin';
    import FAQ_en from '../FAQ/FAQ_en.vue';
    import FAQ_fr from '../FAQ/FAQ_fr.vue';


    export default {
        name: 'FAQ',
        components: {
            DetailBanner,
            /* eslint-disable vue/no-unused-components */
            FAQ_en,
            FAQ_fr
            /* eslint-enable vue/no-unused-components */
        },
        mixins: [ StaticPageMixin ],
        computed: {
            component() {
                return `FAQ_${this.language}`;
            }
        }
    };
</script>
