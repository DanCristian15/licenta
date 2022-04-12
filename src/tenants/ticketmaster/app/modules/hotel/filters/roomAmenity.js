export default function  ( { name, quantity } ) {
    if ( quantity ) {
        return `${name} ${quantity}`;
    }
    return name;
}