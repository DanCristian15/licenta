import get from 'lodash/get';

const ServerErrorExtractorUtils = {
    methods: {
        _getErrorsServerErrorExtractor( field ) {
            return get( this, [ 'serverErrors', field ] );
        }
    }
};

export default ServerErrorExtractorUtils;
