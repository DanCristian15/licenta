<template>
    <div>
        <IconCheckCircle class="check-icon" /><span class="cancellation-policy-label">{{ label }}</span>
        <BaseTooltip
            v-if="showTooltip"
            nudge-left="145"
            :text="tooltipLabel"
            class-content="gst-hotel-free-cancelation-tooltip">
            <HelpIcon class="gst-hotel-free-cancelation-help-icon" />
        </BaseTooltip>
    </div>
</template>

<script>
    import HelpIcon from '@tenant/app/assets/icons/help.svg';
    import { getTimeline } from '@tenant/app/utils/hotelReservationCancellationPolicies';
    import cancellationPolicyChargeFilter from '@tenant/app/filters/cancellationPolicyCharge';
    import BaseTooltip from '@/core/shared/components/tooltips/BaseTooltip.vue';
    import IconCheckCircle from '@core/shared/assets/icons/check_circle.svg';

    export default {
        name: 'HotelCancellationPolicy',
        components: {
            HelpIcon,
            IconCheckCircle,
            BaseTooltip
        },
        props: {
            cancellationPolicies: {
                type: Array,
                required: true
            },
            currency: {
                type: String,
                required: true
            },
            basePrice: {
                type: Number,
                required: true
            },
            accomodationNights: {
                type: Number,
                required: true
            },
        },
        data: function() {
            return {
                policies: {}
            };
        },
        computed: {
            label() {
                if ( !this.policies.current && !this.policies.futures ) {
                    return this.$t( '_common:terms.freeCancellation' );
                }

                return this.$options.filters.cancellationPolicy( this.policies.current || this.policies.futures[0], this.currency );
            },
            tooltipLabel() {
                return cancellationPolicyChargeFilter( this.policies, this.currency, this.basePrice, this.accomodationNights );
            },
            showTooltip() {
                if ( this.policies.current &&  this.policies.current &&  new Date( this.policies.current.fromAt ) > new Date() ) {
                    return true;
                }

                return Boolean( this.policies.futures );
            }
        },
        mounted() {
            this.policies = getTimeline( this.cancellationPolicies );
        }
    };
</script>

<style lang="scss">
@import "@scssVariables";
@import "@scssMixins";

.gst-hotel-free-cancelation-help-icon {
    position: relative;
    top: 2px;
    margin-left: theme-spacing( 6 );

    .gst-svg-icon {
        stroke: theme-color( 'tertiary' ) !important;
        transition: stroke 1s ease-in-out;
        fill: unset !important;
    }
}

.gst-hotel-free-cancelation-help-icon:hover {
    .gst-svg-icon {
        stroke: theme-color( 'primary' ) !important;
        transition: stroke 0.2s ease-in-out;
    }
}

.gst-hotel-free-cancelation-tooltip.v-tooltip__content {
    @include border-radius( 'xs' );

    width: 340px !important;
    padding: theme-spacing( 4 ) !important;
    background: theme-color( 'white' ) !important;
    color: theme-color( 'quaternary' ) !important;
    box-shadow: 0 2px 6px rgba( 0, 0, 0, 0.25 ) !important;
    opacity: 1 !important;
}
</style>