<template>
    <div class="section-card-variant-1 d-flex flex-row px-4 py-2" @click="$emit('click')">
        <div class="d-flex flex-grow-1 align-center">
            <VClamp
                autoresize
                :max-lines="1"
                class="section-card-variant-1__seat mr-1">
                {{ $t( '_common:abbreviations.section' ) }} {{ item.section }}
            </VClamp>
            <IconBed />
        </div>
        <div class="section-card-variant-1__price d-flex align-center">
            {{ $t( '_common:terms.from' ) }}
            <span class="ml-1">
                {{ item.minPrice | currencyFull( currency) }}
            </span>
        </div>
    </div>
</template>


<script>
    import VClamp from 'vue-clamp';
    import IconBed from '@tenant/app/assets/icons/bed.svg';

    export default {
        name: 'SectionCardVariant1',
        components: {
            VClamp,
            IconBed
        },
        props: {
            item: {
                type: Object,
                required: true
            }
        },
        computed: {
            currency( ) {
                return this.item.currency;
            },
        }
    };
</script>

<style lang="scss" scoped>
@import '@scssVariables';
@import '@scssMixins';

.section-card-variant-1 {
    border-bottom: 1px solid theme-color-hex( 'senary-darken-2' );
    min-height: 56px;

    .section-card-variant-1__seat {
        color: theme-color( 'quaternary' );
        font-size: font-size( 'l' );
        font-weight: font-weight( 'large' );
    }

    .section-card-variant-1__price {
        color: theme-color( 'primary' );
        font-size: font-size( 's' );

        span {
            font-weight: font-weight( 'large' );
        }
    }
}

.section-card-variant-1:hover {
    background-color: theme-color( 'primary-lighten-1' ) !important;
}

</style>
