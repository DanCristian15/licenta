import LogService from '@services/LogService';
import ModalWrapper from './ModalWrapper.vue';
import ModalBottomWrapper from './ModalBottomWrapper.vue';
import ModalsContainer from './ModalsContainer.vue';

const Plugin = {
    install( Vue, cfg = { } ) {
        if ( this.installed ) return;

        this.installed = true;
        this.rootInstance = null;
        const attachContainerId = 'modals_container';

        Vue.component( 'ModalsContainer', ModalsContainer );
        Vue.mixin( {
            beforeMount( ) {
                if ( Plugin.rootInstance === null ) {
                    Plugin.rootInstance = this.$root;
                }
            }
        } );

        const getModalsContainer = ( Vue, options, root ) => {
            if ( !root._dynamicContainer ) {
                const container = document.getElementById( attachContainerId );

                if ( !container ) {
                    LogService.warn( 'Cannot find container div with id=modals_container' );
                    return null;
                }

                new Vue( {
                    parent: root,
                    render: h => h( ModalsContainer )
                } ).$mount( container );
            }

            return root._dynamicContainer;
        };

        Vue.prototype.$modal = {
            show( component, componentProps, modalProps, events = { } ) {
                const container = getModalsContainer( Vue, {}, Plugin.rootInstance );
                if ( component instanceof Promise ) {
                    component.then ( resolve => {
                        container.add( ModalWrapper, { component: resolve.default, componentAttrs: componentProps, modalAttrs: { ...cfg.modalProps, ...modalProps }, events } );
                    } );
                } else 
                    container.add( ModalWrapper, { component, componentAttrs: componentProps, modalAttrs: { ...cfg.modalProps, ...modalProps }, events } );
            },
            showBottom( component, componentProps, modalProps, events = { } ) {
                const container = getModalsContainer( Vue, {}, Plugin.rootInstance );

                if ( component instanceof Promise ) {
                    component.then ( resolve => {
                        container.add( ModalBottomWrapper, { component:resolve.default, componentAttrs: componentProps, modalAttrs:{ ...cfg.modalBottomProps, ...modalProps }, events } );
                    } );
                } else
                    container.add( ModalBottomWrapper, { component, componentAttrs: componentProps, modalAttrs: { ...cfg.modalBottomProps, ...modalProps }, events } );
            }
        };

    }
};

export default Plugin;
