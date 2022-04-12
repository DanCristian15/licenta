<template>
    <div class="gst-hotel-no-data">
        <h5>{{ $t('title') }}</h5>
        <p> {{ $t('message') }}</p>
        <a href="#" class="d-inline-block" @click="$emit('reset-filters')">
            {{ $t("_common:buttons.resetFilters").toLowerCase( ) }}
        </a>
    </div>
</template>

<script>

    export default {
        name: 'HotelsNoData',
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'modules.hotel.inputs.addHotelReservation._components.hotelsNoData'
        }

    };
</script>

<style lang="scss">
@import "@scssVariables";
@import "@scssMixins";

.gst-hotel-no-data {
    width: 40%;
    margin: theme-spacing( 16 ) auto;
    text-align: center;

    h5 {
        font-size: font-size( 'xxxxxl' );
        font-weight: font-weight( 'large' );
    }

    p {
        line-height: theme-spacing( 5 );
        font-size: font-size( 'l' );
        font-weight: font-weight( 'regular' );
    }

    a {
        font-size: font-size( 'l' );
    }

    @include mobile-only {
        h5 {
            @include font-size('xxxxl');
            @include font-weight('large');
        }
    }
}

</style>
