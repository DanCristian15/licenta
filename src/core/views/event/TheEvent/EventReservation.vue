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
                default: () => ( {} )
            }
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.event.theEvent'
        },
        data() {
            return {
                busEventProgressStep: new Vue( ),
            };
        },
        methods: {
            ...mapActions( {
                addItemToCart                   : 'cart/addItem',
                instantDeleteCurrentCart        : 'cart/instantDeleteCurrentCart'
            } ),
            showProgressAnimationModal( payload ) {
                let cartId;

                this.$modal.show(
                    import ( '@core/shared/components/modals/ProgressStepAnimationModal.vue' ),
                    {
                        title: this.$t( 'progressStepAnimationModal.title' ),
                        labels: [ 
                            this.$t( 'progressStepAnimationModal.labels.step1Availability' ), 
                            this.$t( 'progressStepAnimationModal.labels.step2Reserving' ), 
                            this.$t( 'progressStepAnimationModal.labels.step3AddingToCart' )
                        ],
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
                            this.busEventProgressStep.$emit( 'go-to-step', 3 );

                            this.warnBeforeLeaveMessage = this.$t( '_common:messages.leaveRouteDuringReservationConfirm' );
                            this.forceWarnBeforeLeaveMixin( );
                            cartId = await this.addItemToCart( payload );
                            this.unbindWarnBeforeYouLeaveMixin( );
                            if ( cartId ) {
                                if ( this._destroyed ) {
                                    this.instantDeleteCurrentCart( );
                                }
                                this.busEventProgressStep.$emit( 'go-to-end' );
                            } else {
                                this.busEventProgressStep.$emit( 'close' );
                            }
                        },
                        beforeClose: ( ) => { 
                            if ( cartId ) {
                                if ( this._destroyed ) {
                                    this.instantDeleteCurrentCart( );
                                } else {
                                    this.$router.replace( { name: 'cartCheckout', params: { cartId } } );
                                }
                            } else {
                                this.$router.replace( { name: 'event', params: { id: this.$route.params.id } } );
                            }
                        }
                    }
                );
            }
        },
        created() {
            if ( !isEmpty( this.payload ) ) {
                this.showProgressAnimationModal( this.payload );
            } else {
                this.$router.replace( { name: 'event', params: { id: this.$route.params.id } } );
            }
        },
        destroyed( ) {
            this._destroyed = true;
        }
    };
</script>