<template>
    <component
        :is="iconComponent" 
        :is-favorite="isFavorite" 
        @click="onClickDo" />
</template>
<script>
    import { mapActions, mapGetters } from 'vuex';
    import entityConstants from '@core/utils/constants/entity';
    import FavoriteIconButton from '@core/shared/components/buttons/FavoriteIconButton.vue';
    import FavoriteIconButtonVariant2 from '@core/shared/components/buttons/FavoriteIconButtonVariant2.vue';

    export default {
        name: 'FavoriteEntityButton',
        components: {
            /* eslint-disable vue/no-unused-components */
            FavoriteIconButton,
            FavoriteIconButtonVariant2
            /* eslint-enable vue/no-unused-components */
        },
        props: {
            entityType: {
                validator: ( value ) => !!Object.values( entityConstants.TYPES ).find( type => type === value ),
                required: true
            },
            entityId: {
                type: [ String, Number ],
                required: true
            },
            variant: {
                type: String,
                default: ''
            }
        },
        computed: {
            ...mapGetters( 'user/favoriteEntities', {
                isEntityFavorite: 'isFavorite'
            } ),
            isFavorite( ) {
                const { entityType, entityId } = this;

                return this.isEntityFavorite( entityType, entityId );
            },
            iconComponent( ) {
                if ( this.variant === 'variant2' ) {
                    return FavoriteIconButtonVariant2;
                }
                return FavoriteIconButton;
            }
        },
        methods: {
            ...mapActions( 'user/favoriteEntities', {
                toggle: 'toggle'
            } ),
            async onClickDo( event ) {
                const { entityType, entityId } = this;

                event.stopPropagation( );
                event.preventDefault( );
                this.toggle( { type: entityType, id: entityId } );
            },
        }
    };
</script>
