export default function normalize( image ) {
    return {
        type: image.category,
        original: ( image.items || [] ).find( elem => !elem.width ),
        sizes: ( image.items || [] )
            .filter( item => item.width )
            .map( normalizeItemSize )
            .sort( ( first, second ) => first.width - second.width ),
    };
}


const normalizeItemSize = ( { url, width, height } ) => {
    return {
        url,
        width,
        height,
    };
};