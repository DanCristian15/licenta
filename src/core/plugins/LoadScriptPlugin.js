const LoadScriptPlugin = {
    install( Vue ) {
        if ( this.installed ) {
            return;
        }

        this.installed = true;

        Vue.loadScript = Vue.prototype.$loadScript = function ( src, type = 'text/javascript', attrs = { async: true }, target = document.head ) {
            return new Promise( function ( resolve, reject ) {
                
                if ( document.querySelector( 'script[src="' + src + '"]' ) ) {
                    resolve();
      
                    return;
                }
      
                const el = document.createElement( 'script' );
      
                el.type = type;
                el.async = attrs.async;
                el.src = src;
      
                el.addEventListener( 'load', resolve );
                el.addEventListener( 'error', reject );
                el.addEventListener( 'abort', reject );
                
                target.appendChild( el );
            } );
        };
      
        Vue.unloadScript = Vue.prototype.$unloadScript = function ( src, target = document.head ) {
            return new Promise( function ( resolve, reject ) {
                const el = document.querySelector( 'script[src="' + src + '"]' );
      
                if ( !el ) {
                    reject();
      
                    return;
                }

                target.removeChild( el );
      
                resolve();
            } );
        };
    }
};

export default LoadScriptPlugin;