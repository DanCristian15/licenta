import viewportConstants from '@core/utils/constants/viewport';

export function setMetaViewport ( value = viewportConstants.DEFAULT ) {
    const metaViewportElement = document.querySelector( 'meta[name="viewport"]' );
    if ( metaViewportElement ) {
        metaViewportElement.content = value;
    }
}

export function isVisibleOnViewport ( el, offsetViewportTop = 0 ) {
    const box = el.getBoundingClientRect( );

    return box.top < window.innerHeight
        && ( box.bottom >= 0 && ( !offsetViewportTop || box.bottom > offsetViewportTop ) );
}