<script>
    import LogService from '@services/LogService';

    export default {
        functional: true,
        props: {
            'show': {
                type: Boolean,
                required: false,
                default: true
            }
        },
        render( h, ctx ) {
            const children = ctx.children.filter( vnode => vnode.tag );

            if ( children.length !== 1 ) {
                LogService.warn( 'this component accepts only one root node in its slot' );
            }
            const firstChild = children[ 0 ];
            if ( ctx.props.show )  {
                return firstChild;
            } else {
                return firstChild.children ? firstChild.children : firstChild.componentOptions.children;
            }
        }
    };
</script>
