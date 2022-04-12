import { mapActions, mapGetters } from 'vuex';
import debounce from 'lodash/debounce';

export default {
    props: {
        ticket: {
            type: Object,
            required: true,
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
        }
    },
    data() {
        return {
            offersModel: [],
            totalBonusPointsEarn: 0,
            needCalculationTotalBonusPointsEarn: false 
        };
    },
    computed: {
        ...mapGetters( {
            isLoyaltyCurrencyTypeMoney: 'appTenant/isLoyaltyCurrencyTypeMoney'
        } ),
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
        totalBasePrice( ) {
            return this.offersModel.reduce( ( acc, { offer, quantity } ) => {
                return acc + offer.basePrice * quantity;
            }, 0 );
        },
        totalPrice( ) {
            return this.offersModel.reduce( ( acc, { offer, quantity } ) => {
                return acc + offer.totalPrice * quantity;
            }, 0 );
        },
        currency() {
            const { offers } = this;
            const offer = offers[ 0 ];

            return offer.currency;
        },
        loyaltyCurrency() {
            const { offers } = this;
            const offer = offers[ 0 ];

            return offer.loyaltyCurrency;
        },
        isOneOfferSelected( ) {
            return this.offersModel.filter( item => item.quantity > 0 ).length === 1;
        }
    },
    watch: {
        'offersModel': {
            handler: function ( offersModel ) {
                if ( !this.sumQuantityOffersModel ) {
                    this.needCalculationTotalBonusPointsEarn = false;
                    this.totalBonusPointsEarn = 0;
                    return;
                }
                if ( this.isOneOfferSelected && this.sumQuantityOffersModel === this.quantity  ) {
                    this.needCalculationTotalBonusPointsEarn = false;
                    this.totalBonusPointsEarn = offersModel.filter( item => item.quantity > 0 )[ 0 ].offer.bonusPoints;
                    return;
                }
                this.needCalculationTotalBonusPointsEarn = true;
                this.calculateBonusPointsEarnDebounced( );
            },
            deep: true
        }
    },
    methods: {
        ...mapActions( {
            calculateBonusPointsEarn: 'events/calculateBonusPointsEarn'
        } ),
        async checkout( ) {
            const { sumQuantityOffersModel, event, ticket, quantity } = this;

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
            this.busEventParent.$emit( 'checkout', {
                ticket: {
                    eventId:                event.id,
                    offers:                 offersPayload,
                    seats:                  ticket.seats,
                    row:                    ticket.row,
                    section:                ticket.section,
                    accessibility:          ticket.accessibility,
                    selection:              ticket.selection,
                }
            } );
        },
        getMaxQuantityForOfferModelItem( item ) {
            return this.offersModel.reduce( ( acc, { id, quantity } ) => {
                return item.id === id ? acc : acc - quantity;
            }, this.quantity );
        },
        calculateBonusPointsEarnDebounced: debounce(  async function ( ) {
            if ( !this.needCalculationTotalBonusPointsEarn ) {
                return;
            }
            const response = await this.calculateBonusPointsEarn( { id: this.event.id, amount: this.totalBasePrice } );
            
            if ( response && this.needCalculationTotalBonusPointsEarn ) {
                this.totalBonusPointsEarn = response.totalPoints;
            }
        }, 300 ),
    },
    created( ) {
        this.offers.forEach( item => {
            this.offersModel.push( {
                id: item.id,
                selected:  this.offers.length > 1 ? false : true,
                offer: item,
                quantity: this.offers.length > 1 ? 0 : this.quantity
            } );
        } );
    }
};
