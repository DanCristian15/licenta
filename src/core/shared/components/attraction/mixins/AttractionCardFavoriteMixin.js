import { mapGetters } from 'vuex';
import entityConstants from '@core/utils/constants/entity';
import categoriesConstants from '@core/utils/constants/categories';
import {
    hasIncorrectContentSize as imageUtilsHasIncorrectContentSize
} from '@core/utils/imageUtils';

export default { 
    props: {
        item: {
            type: Object,
            required: true
        },
        withTo: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            errorLoadingImage: false
        };
    },
    computed: {
        ...mapGetters( 'user/favoriteEntities', {
            isEntityFavorite: 'isFavorite'
        } ),
        entityType() {
            return entityConstants.TYPES.ATTRACTION;
        },
        imageSrc() {
            const { errorLoadingImage, fallbackSrc } = this;
            const { imageUrl } = this.item;

            if ( errorLoadingImage ) {
                return this.fallbackSrc;
            } else {
                return imageUrl || fallbackSrc;
            }
        },
        fallbackSrc() {
            let found = categoriesConstants.LIST.find( item => item.ID === this.item.classificationSegmentId );
            return found ? found.FALLBACK : categoriesConstants.DEFAULT_FALLBACK ;
        },
        to( ) {
            const { withTo, item } = this;
            return withTo ? { name:'attraction', params: { id: item.id } } : null;
        },
        
        isFavorite( ) {
            const { entityType, item } = this;

            return this.isEntityFavorite( entityType, item.id );
        }
    },
    methods: {
        onImageLoadDo( ) {
            if ( this.item.imageUrl && this.item.imageUrl === this.imageSrc ) {
                this.errorLoadingImage = imageUtilsHasIncorrectContentSize( this.$refs.image.image );
            }
            this.$emit( 'load-image' );
        }
    }
};