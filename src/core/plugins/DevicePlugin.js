const DevicePlugin = {
    install( Vue ) {
        if ( this.installed ) {
            return;
        }

        this.installed = true;

        Vue.mixin( {
            computed: {
                $device( ) {
                    return {
                        hasTouch: ( ( 'ontouchstart' in window ) || ( navigator.maxTouchPoints > 0 ) || ( navigator.msMaxTouchPoints > 0 ) ),
                        hasIos: ( /iPad|iPhone|iPod/.test( navigator.userAgent ) )
                    };
                }
            }
        } );
    }
};

export default DevicePlugin;