<template>
    <v-card outlined class="gst-search-result-tabs-no-data d-flex align-center flex-column py-5 px-2">
        <component :is="icon" class="mb-4" />
        <v-card-title v-if="title" class="d-flex justify-center pa-0">
            {{ title }}
        </v-card-title>
        <v-card-text v-if="content" class="d-flex justify-center pa-0">
            {{ content }}
        </v-card-text>
    </v-card>
</template>
<script>
    import entityConstants from '@core/utils/constants/entity';
    import IconMicrophoneBordered from '@core/shared/assets/icons/microphone_bordered.svg';
    import IconTicketBordered from '@core/shared/assets/icons/ticket_bordered.svg';
    import IconLocationBordered from '@core/shared/assets/icons/location_bordered.svg';

    export default {
        name: 'SearchResultTabsNoData',
        components: {
            /* eslint-disable vue/no-unused-components */
            IconMicrophoneBordered,
            IconTicketBordered,
            IconLocationBordered
            /* eslint-enable vue/no-unused-components */
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            content: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: entityConstants.TYPES.EVENT
            },
        },
        computed: {
            icon( ) {
                if ( this.type === entityConstants.TYPES.ATTRACTION ) {
                    return IconMicrophoneBordered;
                } else if ( this.type === entityConstants.TYPES.EVENT ) {
                    return IconTicketBordered;
                } else if ( this.type === entityConstants.TYPES.VENUE ) {
                    return IconLocationBordered;
                } else {
                    return null;
                }
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-search-result-tabs-no-data {
        border-radius: border-radius( 'm' ) !important;
        border-color: theme-color( 'quinary' );

        .v-card__title {
            line-height: line-height( 'xxxl' );
            margin-bottom: 3px;
            color: theme-color( 'quaternary' );
            font-size: font-size( 'l' );
            font-weight: font-weight( 'medium' );
            letter-spacing: -0.47px;
        }

        .v-card__text {
            line-height: line-height( 'xxl' );
            color: theme-color( 'tertiary' );
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
            letter-spacing: -0.25px;
        }
    }
</style>
