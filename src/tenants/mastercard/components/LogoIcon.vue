<template>
    <IconLogo class="mastercard-icon-logo" width="200" height="40" />
</template>

<script>
    import Logo from '@tenants/mastercard/assets/logo.svg';

    export default {
        components: {
            IconLogo: Logo,
        }
    };
</script>
<style lang="scss">
    .mastercard-icon-logo {
        .st0 {
            opacity: 0;
        }

        .st1 {
            fill: #FFFFFF;
        }

        .st2 {
            fill: #FF5F00;
        }

        .st3 {
            fill: #EB001B;
        }

        .st4 {
            fill: #F79E1B;
        }

        .st5 {
            fill: #151514;
        }

        .st6 {
            font-weight: font-weight( 'medium' );
            font-family: 'FF Mark', sans-serif;
        }

        .st7 {
            font-size: 37.7684px;
        }
    }
</style>
