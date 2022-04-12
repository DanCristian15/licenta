import eventTickets from  './tickets.json';

export default {
    filterByKeyword: ( keyword ) => {
        return item => item.name.toLocaleLowerCase( ).startsWith( keyword.toLocaleLowerCase( ) );
    },
    filterByCategory: ( category ) => {
        return item => item.classificationId === category;
    },
    data: eventTickets
};
