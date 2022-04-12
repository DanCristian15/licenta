export const providers = {
    visa: {
        name: 'VISA',
        regex: new RegExp( '^4[0-9]{12}(?:[0-9]{3})?$' )
    },
    mastercard: {
        name: 'MASTERCARD',
        regex: new RegExp( '^5[1-5][0-9]{14}$' )
    },
    americanExpress: {
        name: 'AMERICANEXPRESS',
        regex: new RegExp( '^3[47][0-9]{13}$' )
    },
    discover: {
        name: 'DISCOVER',
        regex: new RegExp( '^6(?:011|5[0-9]{2})[0-9]{12}$' )
    },
    jcb: {
        name: 'JCB',
        regex: new RegExp( '/^(?:2131|1800|35[0-9]{3})[0-9]{11}$/' )
    },
    maestro: {
        name: 'MAESTRO',
        regex: new RegExp( '/^(5018|5081|5044|5020|5038|603845|6304|6759|676[1-3]|6799|6220|504834|504817|504645)[0-9]{8,15}$/' )
    },
    dinersClub: {
        name: 'DINERSCLUB',
        regex: new RegExp( '/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/' )
    }
};