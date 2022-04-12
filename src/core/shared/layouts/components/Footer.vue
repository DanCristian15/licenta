<template>
    <div class="gst-footer">
        <div class="content-max-width">
            <v-layout wrap>
                <v-flex grow :class="$vuetify.breakpoint.smAndDown && 'xs12'">
                    <MainMenu :is-footer="true" />
                </v-flex>
                <v-flex v-if="$vuetify.breakpoint.mdAndUp" align-self-center shrink class="pr-3">
                    <p class="gst-footer__copyright ma-0">
                        {{ $t('copyright', { year: year }) }}
                    </p>
                    <p class="gst-footer__app-info">
                        {{ appInfo }}
                    </p>
                </v-flex>
                <v-flex shrink :class="$vuetify.breakpoint.smAndDown && 'xs12'">
                    <LanguageSelectField is-secondary-type />
                </v-flex>
                <v-flex v-if="$vuetify.breakpoint.smAndDown" shrink :class="$vuetify.breakpoint.smAndDown && 'xs12'">
                    <p class="gst-footer__copyright mt-12 mb-0">
                        {{ $t('copyright', { year: year }) }}
                    </p>
                    <p class="gst-footer__app-info mb-0">
                        {{ appInfo }}
                    </p>
                </v-flex>
            </v-layout>
            <LegalNotes />
        </div>
    </div>
</template>
<script>
    import appConstants from '@core/utils/constants/app';
    import MainMenu from '@core/shared/components/menu/MainMenu.vue';
    import LanguageSelectField from '@core/shared/components/input/LanguageSelectField.vue';
    import LegalNotes from './TheFooter/LegalNotes';

    export default {
        name: 'TheFooter',
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'layouts.footer',
        },
        components: {
            MainMenu,
            LanguageSelectField,
            LegalNotes
        },
        computed: {
            year() {
                return new Date().getFullYear();
            },
            appInfo() {
                return `v${this.appVersion} - Build: ${this.appBuildDateTime}`;
            },
            appVersion() {
                return appConstants.VERSION;
            },
            appBuildDateTime( ) {
                const buildTimetamp = appConstants.BUILD_TIMESTAMP;

                if ( !buildTimetamp )
                    return '';

                return this.$options.filters.date( new Date( buildTimetamp ), 'yyyy-MM-dd HH:mm:ss' );
            },
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";
@import "@scssMixins";

.gst-footer {
    // @include linear-gradient(to right, theme-color('footer-gradient-start') 0%, theme-color('footer-gradient-end') 100%);

    padding: 55px 0;
    background: black;
    color: theme-color( 'white' );

    @include mobile-only {
        padding: 30px 0;
        text-align: center;

        .gst-footer__copyright {
            opacity: 0.7;
        }
    }

    .gst-footer__copyright {
        font-size: font-size( 'xxs' );
    }

    .gst-footer__app-info {
        font-size: font-size( 'xxxxs' );
    }
}
</style>
