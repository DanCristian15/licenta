import imageConstants from './imagePaths';

const i18Prefix = '_common:entities.eventCategory.list';
const listId = {
    SPORTS: 'KZFzniwnSyZfZ7v7nE',
    CONCERTS: 'KZFzniwnSyZfZ7v7nJ',
    ARTS: 'KZFzniwnSyZfZ7v7na',
    FAMILY: 'KnvZfZ7vA1n',
    OTHER: 'KZAyXgnZfZ7v7lt'
};

export default {
    LIST_ID: {
        SPORTS: listId.SPORTS,
        CONCERTS: listId.CONCERTS,
        ARTS: listId.ARTS,
        FAMILY: listId.FAMILY,
        OTHER: listId.OTHER
    },
    LIST: [
        {
            ID: listId.SPORTS,
            ICON: 'IconSports',
            i18nKey: i18Prefix + '.sports',
            FALLBACK: imageConstants.FALLBACKS.SPORTS
        },
        {
            ID: listId.CONCERTS,
            ICON: 'IconConcerts',
            i18nKey: i18Prefix + '.concerts',
            FALLBACK: imageConstants.FALLBACKS.CONCERTS
        },
        {
            ID: listId.ARTS,
            ICON: 'IconArts',
            i18nKey: i18Prefix + '.arts',
            FALLBACK: imageConstants.FALLBACKS.ARTS
        },
        {
            ID: listId.FAMILY,
            ICON: 'IconFamily',
            i18nKey: i18Prefix + '.family',
            FALLBACK: imageConstants.FALLBACKS.FAMILY
        },
        {
            ID: listId.OTHER,
            ICON: 'IconOtherEvents',
            i18nKey: i18Prefix + '.otherEvents',
            FALLBACK: imageConstants.FALLBACKS.OTHER_EVENTS
        }
    ],
    DEFAULT_ICON: 'IconOtherEvents',
    DEFAULT_FALLBACK: imageConstants.FALLBACKS.OTHER_EVENTS
};
