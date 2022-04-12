<template>
    <IconLogo v-if="$vuetify.breakpoint.mdAndUp" />
    <IconLogoMobile v-else />
</template>

<script>
    import Logo from '../assets/logo.svg';
    import LogoMobile from '../assets/logo_mobile.svg';

    export default {
        components: {
            IconLogo: Logo,
            IconLogoMobile: LogoMobile
        }
    };
</script>