<template>
    <div class="gst-just-for-user-entity">
        <router-link
            v-if="isItemEvent( item )"
            :to="{name: 'event', params: { id: item.data.id} } ">
            <EventCardVariant4
                :item="item.data"
                :with-to="false"
                v-bind="$attrs" />
        </router-link>
        <router-link
            v-if="isItemAttraction( item )"
            :to="{name: 'attraction', params: { id: item.data.id} } ">
            <AttractionCardVariant5
                :item="item.data"
                :with-to="false"
                v-bind="$attrs" />
        </router-link>
    </div>
</template>
<script>
    import AttractionCardVariant5 from '@shared/components/attraction/AttractionCardVariant5';
    import EventCardVariant4 from '@shared/components/event/EventCardVariant4';
    import entityConstants from '@core/utils/constants/entity';

    export default {
        name: 'JustForUserEntitiesEntity',
        components: {
            AttractionCardVariant5,
            EventCardVariant4
        },
        inheritAttrs: true,
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.home.theHome._components.justForUserEntities',
        },
        props: {
            item: {
                type: Object,
                default: null
            }
        },
        methods: {
            isItemAttraction( { type } ) {
                return type === entityConstants.TYPES.ATTRACTION;
            },
            isItemEvent( { type } ) {
                return type === entityConstants.TYPES.EVENT;
            }
        },
    };
</script>
