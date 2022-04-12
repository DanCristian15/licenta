/**
 * type: ticket | section
 */
export default class BundleProductsEventTicketModel {
    type = 'ticket'
    event = null
    ticket = null
    section = null
    quantity = {
        tickets: 0
    }
    totals = {
        basePrice: 0,
        basePriceWithoutDiscount: 0
    }

    constructor( event, ticket, section, tickets = 0, totalBasePrice = 0, totalBasePriceWithoutDiscount = 0 ) {
        this.event = event;
        this.ticket = ticket;
        this.quantity.tickets = tickets;
        this.totals.basePrice = totalBasePrice;
        this.totals.basePriceWithoutDiscount = totalBasePriceWithoutDiscount;

        if( section ) {
            this.type = 'section';
            this.section = section;
        }
    }

    _clone( ) {
        return new BundleProductsEventTicketModel(
            this.event,
            this.ticket,
            this.section,
            this.quantity.tickets,
            this.totals.basePrice || 0,
            this.totals.basePriceWithoutDiscount || 0
        );
    }
}
