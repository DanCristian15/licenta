<template>
    <div>
        <DetailBanner class="gst-user-favorites__banner" :src="bannerImage" :title="$t('title')" />
        <div class="py-3 content-max-width">
            <UserFavoritesTabs />
            <SimilarAttractions class="mt-6 mt-lg-10 mb-10" />
        </div>
    </div>
</template>

<script>
    import imageConstants from '@core/utils/constants/imagePaths';
    import DetailBanner from '@core/shared/components/misc/DetailBanner.vue';
    import SimilarAttractions from '@core/shared/components/attraction/SimilarAttractions.vue';
    import UserFavoritesTabs from './TheUserFavorites/UserFavoritesTabs.vue';

    export default {
        name: 'TheUserFavorites',
        components: {
            DetailBanner,
            UserFavoritesTabs,
            SimilarAttractions
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.userFavorites.theUserFavorites'
        },
        computed: {
            bannerImage() {
                return imageConstants.BANNERS.USER_FAVORITES;
            }
        }
    };
</script>
