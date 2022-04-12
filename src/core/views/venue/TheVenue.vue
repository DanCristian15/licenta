<template>
    <div class="gst-attraction">
        <DataLoading v-if="loading" class="mt-5 mb-5 pt-5 pb-5" />
        <div v-else>
            <DetailBanner :src="imageUrl" :title="item.name" />
            <v-flex class="mt-6 content-max-width">
                <v-flex xs12 md9>
                    <h4>{{ $t('_common:terms.event_plural' ) }}</h4>
                    <EventsSearchBy :search="searchEvents" class="mt-2" />
                </v-flex>
            </v-flex>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import entityConstants from '@core/utils/constants/entity';
    import imageConstants from '@core/utils/constants/imagePaths';
    import DetailBanner from '@core/shared/components/misc/DetailBanner.vue';
    import DataLoading from '@core/shared/components/loading/DataLoading.vue';
    import EventsSearchBy from '@core/shared/components/event/EventsSearchBy.vue';
    import EntityNotFoundRedirect404 from '@core/mixins/EntityNotFoundRedirect404';

    const STORE_NAME = 'venues';

    export default {
        name: 'TheVenues',
        components: {
            DetailBanner,
            DataLoading,
            EventsSearchBy
        },
        mixins:[
            EntityNotFoundRedirect404
        ],
        data( ) {
            return {
                loading: true
            };
        },
        computed: {
            ...mapState( {
                item:     state => state[STORE_NAME].detail
            } ),
            itemId( ) {
                return this.$route.params.id;
            },
            searchEvents() {
                return {
                    venueId: this.itemId
                };
            },
            imageUrl( ) {
                return this.item.imageUrl || imageConstants.BANNERS.VENUE;
            }
        },
        methods: {
            ...mapActions( {
                loadOne                             : `${STORE_NAME}/one`,
                addEntityToUserBrowsingHistory      : 'user/browsingHistory/addEntity',
            } )
        },
        async mounted( ) {
            const res = await this.loadOne( this.itemId );
            if ( !res ) {
                this._goToNotFoundPage( );
                return;
            }
            this.addEntityToUserBrowsingHistory( { entityType: entityConstants.TYPES.VENUE, data: this.item } );
            this.loading = false;
        }
    };
</script>
