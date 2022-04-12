export function generateConsecutive( begin = 0, length = 0 ) {
    return Array( length ).fill( ).map( ( v, i ) => i + begin );
}
