<template>
    <div class="contact content-max-width pt-6">
        <h5 class="d-flex align-center">
            <IconMail class="mr-3" />
            Email support
        </h5>
        <p class="primary--text pl-9">
            support@lifestyle.com
        </p>
        <h5 class="d-flex align-center">
            <IconPhone class="mr-3" />
            Urgent Support Line
        </h5>
        <p class="primary--text pl-9">
            429-282-2669
        </p>
        <h5 class="d-flex align-center">
            <IconFacebook class="mr-3" />
            Facebook
        </h5>
        <p class="primary--text pl-9">
            @lifestyle
        </p>
        <h5 class="d-flex align-center">
            <IconTwitter class="mr-3" />
            Twitter
        </h5>
        <p class="primary--text pl-9">
            @lifestyle
        </p>
        <h5 class="d-flex align-center">
            <IconInstagram class="mr-3" />
            Instagram
        </h5>
        <p class="primary--text pl-9">
            @lifestyle
        </p>
        <h5 class="d-flex align-center">
            <IconLocation class="mr-3" />
            Location
        </h5>
        <p class="primary--text pl-9">
            292 Lebsack Ports Apt. 498
        </p>
    </div>
</template>
<script>
    import IconMail from '@core/shared/assets/icons/mail.svg';
    import IconPhone from '@core/shared/assets/icons/phone.svg';
    import IconFacebook from '@core/shared/assets/icons/facebook.svg';
    import IconTwitter from '@core/shared/assets/icons/twitter.svg';
    import IconInstagram from '@core/shared/assets/icons/instagram.svg';
    import IconLocation from '@core/shared/assets/icons/location.svg';

    export default {
        name: 'Contact',
        components: {
            IconMail,
            IconPhone,
            IconFacebook,
            IconTwitter,
            IconInstagram,
            IconLocation
        }
    };
</script>
<style lang="scss">
    @import "@scssMixins";
    @import "@scssVariables";
    
    .contact {
        .gst-svg-icon {
            fill: theme-color( 'tertiary' );
        }
    }
</style>
