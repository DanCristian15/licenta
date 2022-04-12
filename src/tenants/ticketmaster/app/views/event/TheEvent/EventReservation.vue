<template>
    <div></div>
</template>

<script>
    import Vue from 'vue';
    import isEmpty from 'lodash/isEmpty';
    import { mapActions } from 'vuex';
    import WarnBeforeLeave from '@core/mixins/WarnBeforeLeave';
    import zIndex from '@scss/mixins/_z-index-export-js.scss';

    export default {
        name: 'EventReservation',
        mixins: [
            WarnBeforeLeave
        ],
        props: {
            payload: {
                type: Object,
                default: ( ) => { return { }; }
            },
            callbackAddItemToCartErrorFn: {
                type: Function,
                default: ( ) => ( ) => { }
            }
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.event.theEvent._components'
        },
        data() {
            return {
                busEventProgressStep: new Vue( ),
            };
        },
        computed: {
            labels( ) {
                if ( this.payload.hotelReservation ) {
                    return [
                        this.$t( 'progressStepAnimationModal.labels.stepBuild' ),
                        this.$t( 'progressStepAnimationModal.labels.stepCheckHotel' ),
                        this.$t( 'progressStepAnimationModal.labels.stepReserveTickets' ),
                        this.$t( 'progressStepAnimationModal.labels.stepAddCart' )
                    ];
                } else {
                    return [
                        this.$t( 'progressStepAnimationModal.labels.stepConfirm' ),
                        this.$t( 'progressStepAnimationModal.labels.stepReserveTickets' ),
                        this.$t( 'progressStepAnimationModal.labels.stepAddCart' ),
                    ];
                }
            },
            routeRedirectOnError() {
                return this.$route.meta.routeRedirectOnError;
            }
        },
        methods: {
            ...mapActions( {
                addItemToCart                   : 'cart/addItem',
                instantDeleteCurrentCart        : 'cart/instantDeleteCurrentCart'
            } ),
            showProgressAnimationModal( payload ) {
                let response;
                const { labels } = this;

                this.$modal.show(
                    import ( '@tenant/app/components/modals/ProgressStepAnimationModal.vue' ),
                    {
                        title: this.$t( 'progressStepAnimationModal.title' ),
                        labels,
                        busEvent: this.busEventProgressStep
                    },
                    {
                        style: `z-index: ${zIndex.highest}`,
                        'no-click-animation': true,
                        persistent: true,
                        scrollable: false,
                        fullscreen: true,
                        'hide-overlay': true
                    },
                    {
                        open: async ( ) => {
                            this.busEventProgressStep.$emit( 'go-to-step', labels.length );
                            this.warnBeforeLeaveMessage = this.$t( '_common:messages.leaveRouteDuringReservationConfirm' );
                            this.forceWarnBeforeLeaveMixin( );

                            response = await this.addItemToCart( payload );

                            this.unbindWarnBeforeYouLeaveMixin( );
                            if ( response.success ) {
                                if ( this._destroyed ) {
                                    this.instantDeleteCurrentCart( );
                                }
                                this.busEventProgressStep.$emit( 'go-to-end' );
                            } else {
                                this.busEventProgressStep.$emit( 'close' );
                            }
                        },
                        beforeClose: ( ) => {
                            if ( response.success  ) {
                                if ( this._destroyed ) {
                                    this.instantDeleteCurrentCart( );
                                } else {
                                    this.$router.replace( { name: 'cartCheckout', params: { cartId: response.cartId } } );
                                }
                            } else {
                                this.$router.replace( { name: this.routeRedirectOnError, params: { id: this.$route.params.id } } );
                                this.callbackAddItemToCartErrorFn( response );
                            }
                        }
                    }
                );
            },
        },
        created() {
            if ( !isEmpty( this.payload ) ) {
                this.showProgressAnimationModal( this.payload );
            } else {
                this.$router.replace( { name: this.routeRedirectOnError, params: { id: this.$route.params.id } } );
            }
        },
        destroyed( ) {
            this._destroyed = true;
        }
    };
</script>