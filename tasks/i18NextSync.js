const sync = require( 'i18next-json-sync' ).default;
const withSync = ( process.argv.filter( item => item === '-sync' ).length === 1 );

const locales = [
    __dirname + '/../src/core/locales/_common/*.json',
    __dirname + '/../src/core/locales/shared/*.json',
    __dirname + '/../src/core/locales/main/*.json',
];

locales.forEach( function ( files ) {
    //defaults are inline:
    sync( {
        /** Audit files in memory instead of changing them on the filesystem and
            * throw an error if any changes would be made */
        check: !withSync,
        /** Glob pattern for the resource JSON files */
        files: files,
        /** Primary localization language. Other language files will be changed to match */
        primary: 'en',
        /** Language files to create if they don't exist, e.g. ['es, 'pt-BR', 'fr'] */
        createResources: [ 'fr' ],
        /** Space value used for JSON.stringify when writing JSON files to disk */
        space: 4,
        /** Line endings used when writing JSON files to disk. Either LF or CRLF */
        lineEndings: 'LF',
        /** Insert a final newline when writing JSON files to disk */
        finalNewline: false,
        /** Use empty string for new keys instead of the primary language value */
        newKeysEmpty: false
    } );
} );

if ( !withSync ) {
    //check if the french has more keys then en ( maybe someone delete a key from EN )
    locales.forEach( function ( files ) {
        sync( {
            check: true,
            files: files,
            primary: 'fr',
            createResources: [ 'en' ],
            space: 4,
            lineEndings: 'LF',
            finalNewline: false,
            newKeysEmpty: false
        } );
    } );
}

