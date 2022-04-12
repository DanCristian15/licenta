import entityConstants from './constants/entity';

export function transformFromTypeApi( type ) {
    switch ( type ) {
    case entityConstants.TYPES_API.ATTRACTION:
        return entityConstants.TYPES.ATTRACTION;
    case entityConstants.TYPES_API.EVENT:
        return entityConstants.TYPES.EVENT;
    case entityConstants.TYPES_API.VENUE:
        return entityConstants.TYPES.VENUE;
    default:
        return false;
    }
}

export function transformToTypeApi( type ) {
    switch ( type ) {
    case entityConstants.TYPES.ATTRACTION:
        return entityConstants.TYPES_API.ATTRACTION;
    case entityConstants.TYPES.EVENT:
        return entityConstants.TYPES_API.EVENT;
    case entityConstants.TYPES.VENUE:
        return entityConstants.TYPES_API.VENUE;
    default:
        return false;
    }
}