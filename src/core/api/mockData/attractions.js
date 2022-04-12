import attractionsData from  './attractionsData.json';

export default {
    filterByKeyword: ( keyword ) => {
        return item => item.name.toLocaleLowerCase( ).startsWith( keyword.toLocaleLowerCase( ) );
    },
    data: attractionsData
};
