export function setLang( value ) {
    document.documentElement.setAttribute( 'lang', value );
}

export function getLang( ) {
    return document.documentElement.getAttribute( 'lang' );
}