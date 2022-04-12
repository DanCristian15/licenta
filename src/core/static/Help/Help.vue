<template>
    <div>
        <detail-banner :title="$t('_common:pages.help.title')" :src="bannerImage" />
        <component :is="component" />
    </div>
</template>
    <script>
    import DetailBanner from '@core/shared/components/misc/DetailBanner.vue';
    import StaticPageMixin from '@core/mixins/StaticPageMixin';
    import Help_en from '../Help/Help_en.vue';
    import Help_fr from '../Help/Help_fr.vue';

    export default {
        name: 'Help',
        components: {
            DetailBanner,
            /* eslint-disable vue/no-unused-components */
            Help_en,
            Help_fr
            /* eslint-enable vue/no-unused-components */
        },
        mixins: [ StaticPageMixin ],
        computed: {
            component() {
                return `Help_${this.language}`;
            }
        }
    };
    </script>
