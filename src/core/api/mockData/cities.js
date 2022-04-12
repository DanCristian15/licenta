import citiesData from './citiesData.json';

export default {
    filterByKeyword: ( keyword ) => {
        return item => item.name.toLocaleLowerCase( ).startsWith( keyword.toLocaleLowerCase( ) );
    },
    data: citiesData
};
