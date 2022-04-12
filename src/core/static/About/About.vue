<template>
    <div>
        <detail-banner :title="$t('_common:pages.about.title')" :src="bannerImage" />
        <component :is="component" />
    </div>
</template>
<script>
    import DetailBanner from '@core/shared/components/misc/DetailBanner.vue';
    import StaticPageMixin from '@core/mixins/StaticPageMixin';
    import About_en  from '../About/About_en.vue';
    import About_fr  from '../About/About_fr.vue';

    export default {
        name: 'About',
        components: {
            DetailBanner,
            /* eslint-disable vue/no-unused-components */
            About_en,
            About_fr
            /* eslint-enable vue/no-unused-components */
        },
        mixins: [ StaticPageMixin ],
        computed: {
            component() {
                return `About_${this.language}`;
            }
        }
    };
</script>
