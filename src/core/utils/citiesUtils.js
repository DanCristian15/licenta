export function filterByName ( keyword ) {
    return item => item.name.toLowerCase().indexOf( keyword.toLowerCase( ) ) !== -1;
}
