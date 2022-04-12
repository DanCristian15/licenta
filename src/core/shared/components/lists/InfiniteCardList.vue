<template>
    <div class="d-flex flex-column">
        <slot name="header"></slot>
        <div
            ref="container"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="isInfiniteScrollDisabled"
            infinite-scroll-distance="10"
            :style="{ flex: 1 }"
            class="overflow-y-auto">
            <slot name="inner-scroll-header"></slot>
            <slot v-if="loading && !data.length" name="loading"></slot>
            <template v-else>
                <div
                    v-if="!data.length"
                    class="h-full w-full"
                    :class="config.emptyListClasses">
                    <slot name="empty-list"></slot>
                </div>
                <v-list v-else
                    class="h-auto w-full"
                    :class="listClasses">
                    <v-list-item
                        v-for="( item, index ) in data"
                        :key="index"
                        :class="itemClasses"
                        :link="isItemLink"
                        @mouseenter="$emit( 'mouse-enter-item', item )"
                        @mouseleave="$emit( 'mouse-leave-item' )">
                        <component
                            :is="config.card"
                            :key="item[keyField]"
                            :class="config.cardClasses && config.cardClasses"
                            v-bind="propsToBind( item )"
                            :bus-events-parent="busEventsParent"
                            @click="$emit('click-item', item )" />
                    </v-list-item>
                    <div v-if="!allDataLoaded" class="gst-load-more-container w-full my-4 flex items-center justify-center">
                        <DataLoading v-if="!hasLoadButton && loading" />
                        <slot name="see-more-button">
                            <SeeMoreButton
                                v-if="hasLoadButton"
                                :data-test-id="$testId(testIdPrefix, 'buttons.seeMore')"
                                class="mx-auto d-flex mt-4"
                                :loading="loading"
                                @click="loadMore( )" />
                        </slot>
                    </div>
                </v-list>
            </template>
            <slot name="inner-scroll-footer"></slot>
        </div>
        <slot name="footer"></slot>
    </div>
</template>

<script>
    import debounce from 'lodash/debounce';
    import DataLoading from '@shared/components/loading/DataLoading.vue';
    import SeeMoreButton from '@core/shared/components/buttons/SeeMoreButton.vue';

    export default {
        name: 'InfiniteCardList',
        components: {
            DataLoading,
            SeeMoreButton
        },
        props: {
            config: {
                type: Object,
                required: true
            },
            busEventsParent: {
                type: Object,
                default: null
            },
            data: {
                type: Array,
                required: true
            },
            keyField: {
                type: String,
                default: 'id'
            },
            allDataLoaded: {
                type: Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: true
            },
            hasLoadButton: {
                type: Boolean,
                default: true
            },
            testIdPrefix: {
                type: String,
                default: ''
            },
            itemClasses: {
                type: String,
                default: 'pl-0 pr-0 mr-4'
            },
            prefill: {
                type: Boolean,
                default: false
            },
            listClasses: {
                type: String,
                default: ''
            },
            isItemLink: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            isInfiniteScrollDisabled( ) {
                return this.hasLoadButton || this.allDataLoaded;
            }
        },
        methods: {
            propsToBind( item ) {
                return this.config.propsToBind ? this.config.propsToBind( item ) : item;
            },
            loadMore: debounce( function ( ) {
                if ( !this.allDataLoaded && !this.loading ) {
                    this.$emit( 'load-more' );
                }
            }, 50 ),
        },
        mounted( ) {
            if ( this.prefill && !this.hasLoadButton && !this.allDataLoaded ) {
                this.unwatchData = this.$watch( 'data', function ( ) {
                    this.$nextTick( function ( )  {
                        const el = this.$refs.container;
                        if ( el.scrollHeight <= el.clientHeight ) {
                            this.loadMore( );
                        }
                    } );
                },  { deep: true } );
            }
        },
        destroyed( ) {
            !this.unwatchData || this.unwatchData( );
        }
    };
</script>
