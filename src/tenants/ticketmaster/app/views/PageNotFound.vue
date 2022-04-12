<script>
    import { redirectToHome } from '../utils/tenantUrlslUtils';

    export default {
        name: 'PageNotFound',
        beforeRouteEnter( ) {
            redirectToHome();
        }
    };
</script>
