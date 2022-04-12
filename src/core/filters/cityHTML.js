export default function cityHTML( { name, stateCode, countryCode }, showCountry = true ) {
    let ret = name;
  
    !stateCode || ( ret+=`<span>, ${stateCode}</span>` );
    ( !countryCode || !showCountry ) || ( ret+= `<span>, ${countryCode}</span>` );
  
    return ret;
}