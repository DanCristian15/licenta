export default {
    props: {
        ticket: {
            type: Object,
            required: true,
        },
        hotelReservation: {
            type: Object,
            default: null,
        },
        offers: {
            type: Array,
            default: null
        },
        event: {
            type: Object,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        busEventParent: {
            type: Object,
            required: true
        },
        venueDetails: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            offersModel: [],
        };
    },
    computed: {
        venueInfoLocation( ) {
            const { venueName, venueStreet, venueCity, venueState, venueCountry } = this.event;

            return {
                name:          venueName,
                street:        venueStreet,
                city:          venueCity,
                stateCode:     venueState,
                countryCode:   venueCountry
            };
        },
        sumQuantityOffersModel( ) {
            return this.offersModel.reduce( ( acc, { quantity } ) => {
                return acc + quantity;
            }, 0 );
        },
        ticketsTotalBasePrice( ) {
            return this.offersModel.reduce( ( acc, { offer, quantity } ) => {
                return acc + offer.basePrice * quantity;
            }, 0 );
        },
        ticketsQuantity( ) {
            return this.quantity;
        },
        totalPrice( ) {
            return this.offersModel.reduce( ( acc, { offer, quantity } ) => {
                return acc + offer.totalPrice * quantity;
            }, 0 );
        },
        currency( ) {
            return this.offers[ 0 ].currency;
        },
        isOneOfferSelected( ) {
            return this.offersModel.filter( item => item.quantity > 0 ).length === 1;
        },
        canSubmit( ) {
            return this.sumQuantityOffersModel === this.quantity;
        }
    },
    methods: {
        async checkout( ) {
            const { sumQuantityOffersModel, event, ticket, quantity, venueDetails } = this;

            if ( sumQuantityOffersModel !== quantity ) {
                return;
            }

            const offersPayload = this.offersModel.filter( item => item.quantity )
                .map( item => {
                    return {
                        name: item.offer.name,
                        ticketTypeId: item.offer.ticketTypeId,
                        quantity: item.quantity
                    };
                } );

            let payload = {
                ticket: {
                    eventId:                event.id,
                    offers:                 offersPayload,
                    seats:                  ticket.seats,
                    row:                    ticket.row,
                    section:                ticket.section,
                    accessibility:          ticket.accessibility,
                    selection:              ticket.selection,
                    venueSeatMapUrl:        ticket.venueSeatMapUrl,
                    venueMapUrl:            venueDetails.mapUrl
                }
            };
            if ( this.hotelReservation ) {
                const { hotelReservation } = this;
                payload = {
                    ...payload,
                    hotelReservation: {
                        hotel: hotelReservation.item,
                        room:  hotelReservation.item.selectedRoom,
                        accommodation: {
                            startDateTime:  hotelReservation.startDateTime,
                            endDateTime:    hotelReservation.endDateTime,
                            roomsCount:     hotelReservation.roomsCount,
                            guests:         hotelReservation.guests,
                        },
                    }
                };
            }
            this.busEventParent.$emit( 'checkout', payload );
        },
        getMaxQuantityForOfferModelItem( item ) {
            return this.offersModel.reduce( ( acc, { id, quantity } ) => {
                return item.id === id ? acc : acc - quantity;
            }, this.quantity );
        },
    },
    created( ) {
        this.offers.forEach( ( item, key ) => {
            this.offersModel.push( {
                id: item.id,
                selected:  key > 0 ? false : true,
                offer: item,
                quantity: key > 0 ? 0 : this.quantity
            } );
        } );
        this.offers[ 0 ].quantity = this.quantity;
    }
};
