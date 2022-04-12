<template>
    <v-container class="hotel-details-modal-overview d-flex px-0">
        <v-col class="hotel-details-modal-overview__description px-sm-4 pl-sm-4">
            <p class="pb-1">
                {{ item.description }}
            </p>
        </v-col>

        <v-col v-if="item.services.length" class="hotel-details-modal-overview__amenities">
            <span class="hotel-details-modal-overview__amenities__title mb-3">
                {{ $t('amenities') }}
            </span>
            <div v-for="(elem, index) in item.services" :key="index" class="hotel-details-modal-overview__amenities__elements d-flex align-center py-1">
                <IconRoomAmenity :id="elem.id" />
                <span>
                    {{ elem.name }}
                </span>
            </div>
        </v-col>
    </v-container>
</template>

<script>
    import IconRoomAmenity from '../../../icons/IconRoomAmenity';

    export default {
        name: 'HotelDetailsModalOverviewTab',
        components: {
            IconRoomAmenity
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'modules.hotel.modal._components._components.hotelDetailsModalBody._components.hotelDetailsModalOverviewTab'
        },
        props: {
            item: {
                type: Object,
                default: null
            }
        }
    };
</script>

<style lang="scss" scoped>
@import "@scssVariables";
@import "@scssMixins";

.hotel-details-modal-overview {
    padding-top: 16px;

    .hotel-details-modal-overview__description {
        width: 100%;
        padding-left: 0;
        flex: 2;

        p {
            color: theme-color( 'black' );
        }
    }

    .hotel-details-modal-overview__amenities {
        display: flex;
        flex-direction: column;

        .hotel-details-modal-overview__amenities__title {
            @include font-size('l');
            @include font-weight('bold');

            line-height: 18px;
            color: theme-color( 'black' );
        }

        .hotel-details-modal-overview__amenities__elements {
            background-color: theme-color( 'white' );
            color: theme-color( 'success' );

            span {
                padding-left: 16px;

                &:only-child {
                    padding-left: 32px;
                }
            }
        }
    }
}

@include mobile-only {
    .hotel-details-modal-overview {
        flex-direction: column;

        .hotel-details-modal-overview__description {
            padding-left: theme-spacing( 4 ) !important;
        }

        .hotel-details-modal-overview__amenities {
            padding: theme-spacing( 0, 4 );
            flex-direction: row;
            flex-wrap: wrap;

            .hotel-details-modal-overview__amenities__title {
                width: 100%;
            }

            .hotel-details-modal-overview__amenities__elements {
                display: flex;
                width: 50%;
                flex: 50%;
            }
        }
    }
}
</style>
