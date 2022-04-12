<template>
    <div :data-test-id="$attrs['data-test-id']"
        class="gst-attraction-card"
        @mouseenter="hover=true"
        @mouseleave="hover=false">
        <BaseImage
            ref="image"
            class="gst-attraction-card__cover white--text"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            :src="item.imageUrl"
            :max-height="80"
            :max-width="164"
            @error="errorLoadingImage = true" />
        <p class="gst-attraction-card__name mb-0 pt-2">
            {{ item.name }}
        </p>
    </div>
</template>
<script>

    import BaseImage from '@tenants/ticketmaster/app/components/BaseImage';
    import entityConstants from '@core/utils/constants/entity';

    export default {
        name: 'AttractionCardVariant1',
        components: { BaseImage },
        props: {
            item: {
                type: Object,
                required: true
            },
            withTo: {
                type: Boolean,
                default: true
            },
            width: {
                type: String,
                default: null
            },
            height: {
                type: String,
                default: '144px'
            },
            showRemoveButton: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                errorLoadingImage: false,
                hover: false
            };
        },
        computed: {
            to( ) {
                const { withTo, item } = this;
                return withTo ? { name:'attraction', params: { id: item.id } } : null;
            }
        },
        methods: {
            onClickRemoveDo( e ) {
                e.preventDefault( );
                this.$emit( 'remove', { entityType: entityConstants.TYPES.ATTRACTION, entityId: this.item.id } );
            }
        }
    };
</script>

<style lang="scss" scoped>
@import "@scssVariables";

.gst-attraction-card {
    display: inline-block;

    .gst-attraction-card__cover {
        height: 80px;
        max-width: 164px;
    }

    .gst-attraction-card__name {
        @include font-size('l');

        width: 100%;
        line-height: 20px;
        color: theme-color( "quaternary" );
        text-decoration: none;
        -webkit-hyphens: initial;
        -ms-hyphens: initial;
        hyphens: initial;
        text-align: center;
    }
}

.gst-attraction-card__cancel-button {
    margin-top: -7px;
    margin-right: -7px;
}

</style>

<style lang="scss">
.gst-attraction-card__cancel-button-icon:hover {
    svg > path {
        fill-opacity: 1;
    }
}
</style>
