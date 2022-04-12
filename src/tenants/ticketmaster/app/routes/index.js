const TheEvent                      = ( ) => import( '@tenant/app/views/event/TheEvent' );
const EventReservation              = ( ) => import( '@tenant/app/views/event/TheEvent/EventReservation' );
const EventInfoModal                = ( ) => import( '@tenant/app/views/event/EventInfoModal' );
const TheCheckout                   = ( ) => import( '@tenant/app/views/cart/TheCheckout' );
const TheLogin                      = ( ) => import( '@tenant/app/views/user/TheLogin' );
const ThePackageOffer               = ( ) => import( '@tenant/app/views/packageOffer/ThePackageOffer' );

const About                         = ( ) => import( '@tenant/app/static/About' );
const Faq                           = ( ) => import( '@tenant/app/static/Faq' );
const HowItWork                     = ( ) => import( '@tenant/app/static/HowItWork' );
const TermsAgreement                = ( ) => import( '@tenant/app/static/TermsAgreement' );
const PageNotFound                  = ( ) => import( '@tenant/app/views/PageNotFound' );

export default [
    {
        name: 'tmEvent',
        path: '/tm-event/:id',
        component: TheEvent,
        meta: {
            layout: 'blank',
            isPublic: true
        },
        children: [
            {
                name: 'tmEvent.reservation',
                path: '/tm-event/:id/reservation',
                component: EventReservation,
                meta: {
                    layout: 'blank',
                    isPublic: true,
                    routeRedirectOnError: 'tmEvent'
                },
                props: true
            },
        ]
    },
    {
        name: 'event',
        path: '/event/:id',
        component: TheEvent,
        meta: {
            layout: 'blank',
            isPublic: true
        },
        children: [
            {
                name: 'event.reservation',
                path: '/event/:id/reservation',
                component: EventReservation,
                meta: {
                    layout: 'blank',
                    isPublic: true,
                    routeRedirectOnError: 'event'
                },
                props: true
            },
        ]
    },
    {
        name: 'eventInfo',
        path: '/event/:id/info',
        meta: {
            type: 'modal',
            modalConfig: {
                component: EventInfoModal,
                props: {},
                config: {
                },
                configDesktop: {
                    'no-click-animation': true,
                    scrollable: true,
                    fullscreen: false,
                    persistent: false,
                    'hide-overlay': false,
                    'max-width': 600,
                    'min-height': 800,
                    'content-class': 'gst-v-dialog gst-v-dialog-event-info',
                },
                configMobile: {
                    'content-class': 'v-dialog__height-90 gst-v-dialog',
                    scrollable: true,
                    fullscreen: false,
                    persistent: false,
                    'hide-overlay': false,
                    transition: 'dialog-bottom-transition',
                }
            },
            isPublic: true
        }
    },
    {
        path: '/user/login',
        name: 'user.login',
        component: TheLogin,
        meta: {
            isPublic: true
        }
    },
    {
        name: 'cartCheckout',
        path: '/checkout/:cartId/:step?',
        component: TheCheckout,
        meta: {
            layout: 'blank',
            isPublic: true
        }
    },
    {
        name: 'packageOffer',
        path: '/packages/:id',
        component: ThePackageOffer,
        meta: {
            layout: 'default',
            isPublic: true
        }
    },
    // --- STATIC --- //
    {
        name: 'how-it-work',
        path: '/how-it-work',
        component: HowItWork,
        meta: {
            isPublic: true
        },
    },
    {
        name: 'faq',
        path: '/faq',
        component: Faq,
        meta: {
            isPublic: true
        },
    },
    {
        name: 'about',
        path: '/about',
        component: About,
        meta: {
            isPublic: true
        },
    },
    {
        name: 'termsAgreement',
        path: '/termsAgreement',
        component: TermsAgreement,
        meta: {
            isPublic: true
        },
    },
    {
        name: 'notFound',
        path: '*',
        component: PageNotFound
    }
];
