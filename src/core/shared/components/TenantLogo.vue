<template>
    <with-first-parent :show="withRedirect">
        <router-link class="gst-tenant-logo__link" :to="{name:'home'}">
            <span class="gst-tenant-logo__content">
                <span></span>
                <TenantLogoIcon />
            </span>
        </router-link>
    </with-first-parent>
</template>

<script>
    import WithFirstParent from '@core/shared/components/enhancers/WithFirstParent.vue';

    export default {
        components: {
            WithFirstParent
        },
        props: {
            withRedirect: {
                type: Boolean,
                default: true,
            }
        }
    };
</script>

<style lang="scss" scoped>
    .gst-tenant-logo__link,
    .gst-tenant-logo__content {
        height: 40px;
    }

    .gst-tenant-logo__content span {
        display: inline-block;
        height: 100%;
        vertical-align: middle;
    }

    .gst-tenant-logo__content svg {
        vertical-align: middle;
    }
</style>
