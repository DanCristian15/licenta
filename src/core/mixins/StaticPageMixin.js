import { mapState } from 'vuex';
import imageConstants from '@core/utils/constants/imagePaths';

let mixin = {
    computed: {
        ...mapState( {
            language:  state => state.appState.language
        } ),
        bannerImage() {
            return imageConstants.BANNERS.STATIC;
        }
    }
};

export default mixin;
