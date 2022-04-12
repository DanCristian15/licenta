<template>
    <VClamp
        class="gst-venue-info"
        :autoresize="clampable"
        :max-lines="contentMaxLines">
        <template slot="before">
            <slot name="before"></slot>
        </template>
        <slot></slot>
        {{ content }}
        <template slot="after">
            <slot name="after"></slot>
        </template>
    </VClamp>
</template>

<script>
    import VClamp from 'vue-clamp';

    export default {
        name: 'VenueInfo',
        components: {
            VClamp
        },
        props: {
            item: {
                type: Object,
                required: true
            },
            clampable: {
                type: Boolean,
                default: true
            },
            maxLines: {
                type: Number,
                default: 0
            }
        },
        computed: {
            content() {
                return this.$options.filters.venueInfoLocation ( this.item );
            },
            contentMaxLines() {
                if ( this.clampable ) {
                    return this.maxLines === 0 ? ( this.$vuetify.breakpoint.mdAndUp ? 2 : 1 ) : this.maxLines;
                } else {
                    return null;
                }
            }
        }
    };
</script>