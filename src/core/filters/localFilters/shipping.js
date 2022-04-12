import { isElectronicTicketItem } from '@/core/utils/shippingOptionsUtils';
import currencyFull from '../currencyFull';

export default function shipping( item ) {
    const { short } = item.description;
    const { fee, currencyCode } = item.totals;
    const isElecTicketOption = isElectronicTicketItem( item );

    return ( !isElecTicketOption || fee ) ? `${short} - ${currencyFull( fee, currencyCode )}` : short;
}