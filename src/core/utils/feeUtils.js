import i18next from 'i18next';
import feeConstants from './constants/fee';

export function translateType( type ) {
    switch ( type ) {
    case feeConstants.TYPES.BASE:
        return i18next.t( '_common:entities.fee.type.base' );
    case feeConstants.TYPES.BASE_TAX:
        return i18next.t( '_common:entities.fee.type.base_tax' );
    case feeConstants.TYPES.SERVICE:
        return i18next.t( '_common:entities.fee.type.service' );
    case feeConstants.TYPES.DISTANCE:
        return i18next.t( '_common:entities.fee.type.distance' );
    case feeConstants.TYPES.FACILITY:
        return i18next.t( '_common:entities.fee.type.facility' );
    case feeConstants.TYPES.ORDER:
        return i18next.t( '_common:entities.fee.type.order' );
    default:
        return type.split( '_' ).join( ' ' );
    }
}

export function cleanAndTranslate( items, offerName ) {
    const mapWithTranslation = ( item, offerName ) => {
        return {
            ...item,
            label: getLabelByType( item, offerName ),
            isBase: item.type === feeConstants.TYPES.BASE,
            order: `${item.type !== feeConstants.TYPES.BASE && item.type === feeConstants.TYPES.BASE_TAX ? 1 : 0} ${item.type}`
        };
    };

    const getLabelByType = ( item, offerName ) => {
        const labelForEntityScope = offerName ? i18next.t(
            '_common:entities.fee.labelForEntityScope',
            {
                type: translateType( item.type ),
                scope: offerName,
                interpolation: { escapeValue: false }
            }
        ) : '';

        const labelForEntityTaxScope = i18next.t(
            '_common:entities.fee.labelForEntityTaxScope',
            {
                type: translateType( item.type ),
                interpolation: { escapeValue: false }
            }
        );

        const labelForOrderScope = i18next.t(
            '_common:entities.fee.labelForOrderScope',
            {
                type: translateType( item.type ),
            }
        );

        const labelForOrderScopeWithPrepend = `${i18next.t( '_common:entities.fee.type.order' )} ${labelForOrderScope}`;

        switch ( item.type ) {
        case feeConstants.TYPES.BASE:
            return labelForEntityScope;
        case feeConstants.TYPES.BASE_TAX:
            return labelForEntityTaxScope;
        default:
            return !item.prependLabel ? labelForOrderScope : labelForOrderScopeWithPrepend;
        }
    };

    const splitBaseTypeItemIntoPriceAndTax = ( acc, item ) => {
        const { price, tax, type } = item;

        if ( item.type === feeConstants.TYPES.BASE ) {
            const itemWithPrice = {
                ...item,
                price: price,
                tax: 0
            };

            acc = [ ...acc, itemWithPrice ];

            if ( item.tax ) {
                const itemWithTax = {
                    ...item,
                    price: tax,
                    tax: 0,
                    type: `${type}_tax`,
                };

                acc = [ ...acc, itemWithTax ];
            }

            return acc;
        }

        acc = [ ...acc, item ];

        return acc;
    };

    const ret = items
        .filter( item => item.price )
        .reduce( ( acc, item ) => splitBaseTypeItemIntoPriceAndTax( acc, item ), [] )
        .map( ( item ) => mapWithTranslation( item, offerName ) );

    return ret;
}

export function groupByLabelAndPrice( items ) {
    return items.reduce( ( acc, item ) => {
        const feeIndex = acc.findIndex( fee => fee.name.toLowerCase() === item.name.toLowerCase() && fee.price === item.price );
        if ( feeIndex !== -1 ) {
            acc[ feeIndex ] = {
                ...acc[ feeIndex ],
                amount: acc[ feeIndex ].amount + item.amount,
                quantity: acc[ feeIndex ].quantity + item.quantity,
            };
            return acc;
        }

        acc = [
            ...acc,
            item
        ];

        return acc;
    }, [] );
}