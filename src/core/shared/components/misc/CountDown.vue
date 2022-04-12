<template>
    <span class="gst-count-down quaternary--text">
        {{ timer | date( format ) }}
    </span>
</template>
<script>
    import { differenceInSeconds as dateUtilsDifferenceInSeconds } from '@core/utils/dateUtils';

    export default {
        name: 'CountDown',
        props: {
            dateTimeTill: {
                type: Date,
                default: ( ) => { return new Date( ); }
            },
            format: {
                type: String,
                default: 'HH:mm:ss'
            },
            refresh: {
                type: Number,
                default: 1 * 1000
            }
        },
        data() {
            return {
                secondsTill: 1,
            };
        },
        computed: {
            timer( ) {
                return new Date( 0, 0, 0, 0, 0, this.secondsTill );
            }
        },
        watch: {
            secondsTill: function( newValue ) {
                if ( newValue <=0 ) {
                    this.$emit( 'finish' );
                }
            }
        },
        methods: {
            refreshSecondsTill( ) {
                return this.secondsTill = dateUtilsDifferenceInSeconds( this.dateTimeTill, new Date( ) );
            }
        },
        mounted( ) {
            this.refreshSecondsTill( );
            this._interval = setInterval( ( ) => {
                this.refreshSecondsTill( );
            }, this.refresh );
        },
        destroyed( ) {
            clearInterval( this._interval );
        }
    };
</script>
