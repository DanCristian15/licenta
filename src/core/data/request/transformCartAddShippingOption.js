export default function ( { id, description } ) {
    return {
        shippingId: id,
        description: description.short
    };
}