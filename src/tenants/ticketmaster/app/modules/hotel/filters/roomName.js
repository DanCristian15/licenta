export default function ( { name = '', standardNumBeds = '', bedTypeCode = ''  } ) {
    let ret = `${name}`;

    if ( standardNumBeds || bedTypeCode ) {
        ret = `${ret},`;
        if ( standardNumBeds ) {
            ret = `${ret} ${standardNumBeds}`;
        }
        if ( bedTypeCode ) {
            ret = `${ret} ${bedTypeCode}`;
        }
    }

    return ret;
}
