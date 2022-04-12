<template>
    <image-masonry-variant-1
        :images="images" />
</template>

<script>
    import ImageMasonryVariant1 from '@tenants/ticketmaster/app/components/images/ImageMasonryVariant1';

    export default {
        name: 'HotelDetailsModalGallery',
        components: {
            ImageMasonryVariant1
        },
        props: {
            images: {
                required: true,
                type: Array
            }
        }
    };
</script>