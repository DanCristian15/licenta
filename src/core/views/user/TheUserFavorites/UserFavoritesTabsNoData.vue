<template>
    <v-flex class="gst-user-favorites-no-data container mb-14 py-0 px-5 px-md-0 text-center">
        <v-icon class="mt-8 mt-md-16 mb-4 mb-md-6" v-text="'$vuetify.icons.heartBordered'" />
        <h4 v-if="title">
            {{ title }}
        </h4>
        <p v-if="content">
            {{ content }}
        </p>
        <v-card outlined class="gst-user-favorites-no-data__content mt-6">
            <v-card-title v-if="card.title" class="py-0 px-4 justify-center">
                {{ card.title }}
            </v-card-title>
            <v-card-text v-if="card.content" class="pa-0">
                <v-row no-gutters class="flex-column flex-md-row">
                    <v-col v-if="card.content.event" class="pa-4">
                        <div class="col-icon">
                            <v-icon v-text="'$vuetify.icons.searchData'" />
                        </div>
                        <v-flex class="d-flex flex-no-wrap justify-center">
                            <v-chip class="pa-0 d-flex justify-center" color="primary">
                                1
                            </v-chip>
                            <span class="col-text text-left pl-2">{{ card.content.event }}</span>
                        </v-flex>
                    </v-col>
                    <v-col v-if="card.content.tickets" class="pa-4">
                        <div class="col-icon">
                            <v-icon v-text="browserIcon" />
                        </div>
                        <v-flex class="d-flex flex-no-wrap justify-center">
                            <v-chip class="pa-0 d-flex justify-center" color="primary">
                                2
                            </v-chip>
                            <span class="col-text text-left pl-2">{{ card.content.tickets }}</span>
                        </v-flex>
                    </v-col>
                    <v-col v-if="card.content.favorite" class="pa-4">
                        <div class="col-icon">
                            <v-icon v-text="'$vuetify.icons.heartHoverBordered'" />
                        </div>
                        <v-flex class="d-flex flex-no-wrap justify-center">
                            <v-chip class="pa-0 d-flex justify-center" color="primary">
                                3
                            </v-chip>
                            <span class="col-text text-left pl-2">{{ card.content.favorite }}</span>
                        </v-flex>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-flex>
</template>
<script>
    import entityConstants from '@core/utils/constants/entity';

    export default {
        name: 'UserFavoritesTabsNoData',
        props: {
            title: {
                type: String,
                default: ''
            },
            content: {
                type: String,
                default: ''
            },
            card: {
                type: Object,
                required: true
            },
            type: {
                type: String,
                default: entityConstants.TYPES.EVENT
            },
        },
        computed: {
            browserIcon( ) {
                return this.type === entityConstants.TYPES.EVENT ? '$vuetify.icons.browserEvent' : '$vuetify.icons.browserAttraction';
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-user-favorites-no-data {
        max-width: 625px;

        ::v-deep .v-icon .v-icon__component {
            height: auto;
            width: auto;
        }

        h4 {
            line-height: 23px;
            margin-bottom: 10px;
            color: theme-color( 'black' );
            letter-spacing: -0.47px;
        }

        p {
            line-height: 22px;
            color: theme-color( 'tertiary' );
            font-size: 16px;
            letter-spacing: -0.47px;
        }

        .gst-user-favorites-no-data__content {
            padding: 24px 0 8px;
            border-radius: border-radius( 'm' ) !important;
            border-color: theme-color( 'quinary' );

            .v-card__title {
                line-height: 21px;
                margin-bottom: 16px;
                color: theme-color( 'black' );
                font-size: 18px;
                font-weight: 500;
                letter-spacing: -0.47px;
            }

            .v-card__text {
                .v-chip {
                    height: 24px;
                    font-size: 14px;
                    font-weight: bold;
                    border-radius: border-radius( 'circle' ) !important;
                    min-width: 24px;
                }

                .col-icon {
                    margin-bottom: 15px;
                    min-height: 75px;
                }

                .col-text {
                    line-height: 19px;
                    padding-top: 2px;
                    color: theme-color( 'black' );
                    font-size: 16px;
                    letter-spacing: -0.47px;
                }
            }
        }

        @include mobile-only {
            max-width: 100%;
        }
    }
</style>
