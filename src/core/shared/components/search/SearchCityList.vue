<template>
    <div>
        <v-list-item
            v-for="(city, index) in sortedItems"
            :key="index"
            class="gst-search-city-list__item"
            :class="{ 'selected': isSelected( city ) }"
            @click="$emit('select', city )">
            <slot name="icon"></slot>
            <v-list-item-title>
                <!-- eslint-disable-next-line vue/no-v-html -->
                <div class="gst-search-city-list__item-title" v-html="$options.filters.cityHTML( getHTMLCity( city ), { country: true } )"></div>
            </v-list-item-title>
        </v-list-item>
    </div>
</template>

<script>
    import isEqual from 'lodash/isEqual';
    import { sortCompare as sortCompareUtilsGeneralSort } from '@/core/utils/sortCompareUtils';

    export default {
        name: 'SeachCityList',
        props: {
            items: {
                type: Array,
                required: true
            },
            highlight: {
                type: String,
                required: false,
                default: ''
            },
            selected: {
                type: Object,
                default: () => ( {} )
            }
        },
        computed: {
            sortedItems() {
                return [ ...this.items ].sort( ( a, b ) => sortCompareUtilsGeneralSort( a.name, b.name, true ) );
            }
        },
        methods: {
            getHTMLCity( item ) {
                const { highlight } = this;

                if ( !highlight ) {
                    return item;
                }

                const regex = new RegExp( `(${highlight })`, 'gi' );

                return {
                    ...item,
                    name: item.name.replace( regex, '<mark>$1</mark>' )
                };
            },
            isSelected( item ) {
                return isEqual( item, this.selected );
            }
        },
    };
</script>

<style lang="scss">
    @import "@scssVariables";

    .v-list-item__title {
        font-size: font-size( 's' );
    }

    .gst-search-city-list__item-title mark {
        background-color: transparent;
        font-weight: font-weight( 'medium' );
    }

    .gst-search-city-list__item-title span {
        color: theme-color( 'tertiary' );
    }

    .gst-search-city-list__item.selected .v-list-item__title,
    .gst-search-city-list__item.selected span {
        color: theme-color( 'primary' );
    }
</style>
