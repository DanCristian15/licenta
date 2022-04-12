<template>
    <DropDown
        :value="value"
        :items="items"
        :loading="loading"
        :clearable="clearable"
        :render-item-fn="renderItemFn"
        :i18n-key-all-items-item="i18nKeyAllItemsItem"
        :value-prop="valueProp"
        class="gst-store-drop-down"
        @input="onInputDo"
        @menu-opened.once="!loadOnFirstOpen || loadItems()" />
</template>


<script>
    import DropDown from './DropDown.vue';
    
    export default {
        name: 'StoreDropDown',
        components: {
            DropDown
        },
        props: {
            loadStoreActionName: {
                type: String,
                required: true
            },
            loadOnFirstOpen: {
                type: Boolean,
                default: true
            },
            value: {
                type: Object,
                default: ( ) => { return { name: '' }; }
            },
            clearable: {
                type: Boolean,
                default: true
            },
            i18nKeyAllItemsItem: {
                type: String,
                default: ''
            },
            valueProp: {
                type: String,
                default: 'id'
            },
            renderItemFn: {
                type: Function,
                default: ( item ) => item.name 
            },
            mapFn: {
                type: Function,
                default: null
            },
            mapItemFn: {
                type: Function,
                default: null
            }
        },
        data( ) {
            return {
                items: [ ],
                loading: false
            };
        },
        methods: {
            async loadItems( ) {
                this.loading = true;
                let response = await this.$store.dispatch( this.loadStoreActionName );
                !this.mapFn || ( response = this.mapFn( response ) );
                if ( this.mapItemFn ) {
                    this.items = response.map( this.mapItemFn );
                } else {
                    this.items = response;
                }
                this.loading = false;
            },
            onInputDo( value ) {
                this.$emit( 'input', value );
            }
        },
        async mounted( ) {
            this.loadOnFirstOpen || this.loadItems( ); 
        }
    };
</script>