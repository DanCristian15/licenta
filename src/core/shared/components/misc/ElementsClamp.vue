<template>
    <div class="overflow-hidden">
        <component
            :is="tagItem"
            v-for="( item, key ) in viewItems"
            :key="key"
            :class="classItem">
            <slot name="item" :item="item">
                {{ item }}
            </slot>
        </component>
        <slot
            :remainingCount="items.length - viewItems.length"
            name="after">
        </slot>
    </div>
</template>

<script>
    import { addListener as addListenerResize, removeListener as removeListenerResize } from 'resize-detector';

    export default {
        name: 'ElementsClamp',
        props: {
            items: {
                type: Array,
                required: true
            },
            tagItem: {
                type: String,
                default: 'span'
            },
            classItem: {
                type: String,
                default: ''
            }
        },
        data( ) {
            return {
                offset: 0,
                viewItems: [ ]
            };
        },
        computed: {
            isOverflow( ) {
                return this.$el.scrollHeight > this.$el.offsetHeight;
            },
        },
        watch: {
            'offset': {
                handler( ) {
                    this.$nextTick( ( ) => {
                        this.eliminateItem( );
                    } );
                }
            },
            'items.length': {
                handler( ) {
                    this.$nextTick( ( ) => {
                        this.eliminateItem( );
                    } );
                }
            }
        },
        methods: {
            init( ) {
                this.offset = this.items.length;
                this.viewItems = [ ...this.items ];
                this.$nextTick( ( ) => {
                    this.eliminateItem( );
                } );
            },
            eliminateItem( ) {
                if ( this.$el && this.$el.scrollHeight > this.$el.offsetHeight && this.offset ) {
                    this.offset = this.offset - 1;
                    this.viewItems.pop( );
                }
            }
        },
        mounted( ) {
            this.init( );
            addListenerResize( this.$el, this.init );
        },
        destroyed( ) {
            removeListenerResize( this.$el, this.init );
        }
    };
</script>