import { IMAGE_SIZE } from '@tenants/ticketmaster/app/utils/constants/imageData';

function findBiggerPicture( width, image ) {

    if( width === IMAGE_SIZE.ORIGINAL ) return image.original;

    return image.sizes.reduce( ( firstBigger, element ) => {
        if( element.width >= width ) {
            if( firstBigger && element.width < firstBigger.width ) {
                firstBigger = element;
            } else if( !firstBigger ) {
                firstBigger = element;
            }
        }
        return firstBigger;
    }, null ) || image.original;
}

function findSmallerPicture( width, image ) {

    if( width === IMAGE_SIZE.ORIGINAL ) return image.original;

    return image.sizes.reduce( ( firstSmaller, element ) => {
        if( element.width <= width ) {
            if( firstSmaller && element.width > firstSmaller.width ) {
                firstSmaller = element;
            } else if( !firstSmaller ) {
                firstSmaller = element;
            }
        }
        return firstSmaller;
    }, null ) || image.original;
}

/**
 *
 * @param {IMAGE_SIZE | number} width
 * @param {ResponsiveImageModel} image
 * @param {Function | null} ruleFind
 *
 */
export function getImageByWidth( width, image, ruleFind = null ) {
    if( ruleFind instanceof Function ) {
        const imgSmaller  = findSmallerPicture( width, image );
        const imgBigger   = findBiggerPicture( width, image );
        return ruleFind( image.sizes, imgSmaller, imgBigger );
    }

    return findBiggerPicture( width, image )?.url;
}
