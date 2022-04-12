<template>
    <div class="gst-header-detail-sidebar-header">
        <div v-if="$vuetify.breakpoint.mdAndUp" class="gst-header-detail-sidebar-header__toolbar py-3">
            <h5>{{ $t('_common:entities.seat.section_abv') }} {{ section.section }}</h5>
            <v-btn
                icon
                small
                class="gst-header-detail-sidebar-header__button"
                @click="$emit( 'close' )">
                <IconClose />
            </v-btn>
        </div>
        <p class="gst-header-detail-sidebar-header__title my-2 ml-2">
            {{ $t( 'titleWithCount', { count: quantity} ) }}
        </p>
    </div>
</template>

<script>
    import IconClose from '@core/shared/assets/icons/close.svg';

    export default {
        name:  'SectionDetailSidebarHeader',
        components: {
            IconClose
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.event.theEvent._components.sectionDetailSidebar._components.sectionDetailSidebarHeader'
        },
        props: {
            section: {
                type: Object,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    };
</script>

<style lang="scss">
    @import '@scssVariables';
    @import '@scssMixins';

    .gst-header-detail-sidebar-header {
        h5 {
            line-height: line-height( 'xxxl' );
            font-size: font-size( 'xxl' );
            font-weight: font-weight( 'large' );
        }

        p {
            line-height: line-height( 'm' );
            color: theme-color( 'quaternary' );
            font-size: font-size( 'xxs' );
            font-weight: font-weight( 'regular' );
        }

        .gst-header-detail-sidebar-header__toolbar {
            position: relative;
            background: theme-color( 'senary' );
            text-align: center;
        }

        .gst-header-detail-sidebar-header__button {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY( -50% );

            svg {
                height: 24px;
                width: 24px;

                .gst-svg-icon {
                    fill: theme-color( 'tertiary' );
                }
            }
        }
    }
</style>
