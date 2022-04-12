import hotelsData from './hotelsData.json';

const data = {
    items: hotelsData.items.map( ( item, key ) => {
        return {
            ...item,
            propertyId: key,
            id: key
        };
    } ),
    offset: 10,
};

export default {
    get: ( ) => data,
    data
};
