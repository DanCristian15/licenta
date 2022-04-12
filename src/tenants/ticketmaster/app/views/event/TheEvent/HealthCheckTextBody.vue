<template>
    <div class="gst-heath-check-body">
        <div class="gst-heath-check-body__subtitle">
            <IconHealthCheck />
            <h6>
                {{ healthCheck.summary }}
            </h6>
        </div>

        <v-card-text class="gst-heath-check-body__content flex-grow-0 content-max-width" :style="{ color:'inherit'}">
            {{ healthCheck.description }}
            <a
                v-if="healthCheck.learnMoreUrl"
                class="gst-heath-check-body__learn-more-link text-capitalize"
                target="_blank"
                :href="healthCheck.learnMoreUrl"
                :data-test-id="$testId('button.learn-more')">
                {{ $t( '_common:buttons.learnMore') }}
            </a>
        </v-card-text>
    </div>
</template>

<script>
    import IconHealthCheck from '@tenant/app/assets/icons/health_cross.svg';

    export default {
        name: 'HealthCheckTextBody',
        components: {
            IconHealthCheck
        },
        props: {
            healthCheck: {
                type: Object,
                required: true
            }
        },
        testIdOptions: {
            keyPrefix: 'checkout.containers.healthCheckContainer.textBody'
        },
    };
</script>

<style lang="scss">
@import "@scssVariables";
@import "@scssMixins";

.gst-heath-check-body {
    .gst-heath-check-body__subtitle {
        display: flex;
        padding: theme-spacing( 4, 6, 0 );
        font-size: font-size( 'm' );
        font-weight: font-weight( 'large' );
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;

        h6 {
            padding-left: theme-spacing( 2 );
        }

        h6,
        svg {
            display: block;
        }
    }

    .gst-heath-check-body__content {
        padding: theme-spacing( 4, 6 );
        margin: 0;
        font-size: font-size( 's' );
        font-weight: font-weight( 'regular' );
        max-width: 70%;
    }

    .gst-heath-check-body__learn-more-link {
        padding-top: 0;
        font-size: font-size( 's' );
        font-weight: font-weight( 'large' );
        letter-spacing: 0;
    }

    @include mobile-only {
        .gst-heath-check-body__content {
            max-width: 100%;
        }

        .gst-heath-check-body__learn-more-link {
            display: block;
            padding-top: theme-spacing( 4 );
        }
    }
}
</style>
