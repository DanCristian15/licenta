<template>
    <div>
        <detail-banner :title="$t('_common:pages.contact.title')" :src="bannerImage" />
        <component :is="component" />
    </div>
</template>
<script>
    import DetailBanner from '@core/shared/components/misc/DetailBanner';
    import StaticPageMixin from '@core/mixins/StaticPageMixin';
    import { Contact_fr, Contact_en } from '../Contact';

    export default {
        name: 'Contact',
        components: {
            DetailBanner,
            /* eslint-disable vue/no-unused-components */
            Contact_en,
            Contact_fr
            /* eslint-enable vue/no-unused-components */
        },
        mixins: [ StaticPageMixin ],
        computed: {
            component() {
                return `Contact_${this.language}`;
            }
        }
    };
</script>
