import TheHome from '@core/views/home/TheHome';

const About             = ( ) => import( '@core/static/About/About' );
const Help              = ( ) => import( '@core/static/Help/Help' );
const Contact           = ( ) => import( '@core/static/Contact/Contact' );
const FAQ               = ( ) => import( '@core/static/FAQ/FAQ' );
const NotFound          = ( ) => import( '@core/static/NotFound' );
const TermsAgreement    = ( ) => import( '@core/static/TermsAgreement/TermsAgreement' );


const TheAttraction                 = ( ) => import( '@core/views/attraction/TheAttraction' );
const TheCheckoutWizard             = ( ) => import( '@core/views/cart/TheCheckoutWizard' );
const TheEvent                      = ( ) => import( '@core/views/event/TheEvent' );
const EventInfoModal                = ( ) => import( '@core/views/event/EventInfoModal' );
const EventReservation              = ( ) => import( '@core/views/event/TheEvent/EventReservation' );
const TheSearch                     = ( ) => import( '@core/views/search/TheSearch' );
const SearchResultTabsAll           = ( ) => import( '@core/views/search/TheSearch/SearchResultTabsAll' );
const SearchResultTabsAttractions   = ( ) => import( '@core/views/search/TheSearch/SearchResultTabsAttractions' );
const SearchResultTabsEvents        = ( ) => import( '@core/views/search/TheSearch/SearchResultTabsEvents' );
const SearchResultTabsVenues        = ( ) => import( '@core/views/search/TheSearch/SearchResultTabsVenues' );

const TheUserFavorites              = ( ) => import( '@views/user/TheUserFavorites' );
const UserFavoritesTabsEvents       = ( ) => import( '@core/views/user/TheUserFavorites/UserFavoritesTabsEvents' );
const UserFavoritesTabsAttractions  = ( ) => import( '@core/views/user/TheUserFavorites/UserFavoritesTabsAttractions' );
const TheUserTickets                = ( ) => import( '@views/user/TheUserTickets' );
const TheVenue                      = ( ) => import( '@core/views/venue/TheVenue' );
const SearchModalContent            = () => import( '@core/shared/components/search/SearchModalContent' );
const Orders                        = () => import( '@core/shared/components/orders/Orders.vue' );
const ProductList                   = () => import( '@core/shared/components/ProductsList.vue' );
const ProductDetailsPage            = () => import( '@core/views/product/ProductDetailsPage.vue' );
const SignUp                        = () => import( '@core/views/signUp/SignUp.vue' );
const AddProduct                    = () => import( '@core/views/addProduct/AddProduct.vue' );
const LoggedUserProfile             = () => import( '@core/views/loggedUserProfile/LoggedUserProfile.vue' );
const BidPayment                    = () => import( '@core/shared/components/bidPayment/BidPayment.vue' );
const Notifications                    = () => import ( '@core/views/notifications/Notifications.vue' );

const TheConfig                     = ( ) => import( '@views/app/TheConfig' );

export default [
    {
        path: '*',
        name: 'pageNotFound',
        component: NotFound,
        meta: {
            isPublic: true
        }
    },
    {
        path: '/productDetailsPage/:productId',
        name: 'productDetailsPage',
        component: ProductDetailsPage,
        meta: {
            isPublic: true
        },
        props: true
    },
    {
        path: '/productsList/:category',
        name: 'productsList',
        component: ProductList,
        meta: {
            isPublic: true
        },
        props: true
    },
    {
        path: '/',
        name: 'home',
        component: TheHome,
        meta: {
            isPublic: true
        }
    },
    {
        path: 'signUp',
        name: 'signUp',
        component: SignUp,
        meta: {
            isPublic: true
        }
    },
    {
        path: '/loggedUserProfile',
        name: 'loggedUserProfile',
        component: LoggedUserProfile,
        meta: {
            isPublic: true
        },
        props: true
    },
    {
        path: '/notifications',
        name: 'notifications',
        component: Notifications,
        meta: {
            isPublic: true
        },
        props: true
    },
    {
        path: '/bidPayment/:productId',
        name: 'bidPayment',
        component: BidPayment,
        meta: {
            isPublic: true
        },
        props: true
    },
    {
        path: 'addProduct',
        name: 'addProduct',
        component: AddProduct,
        meta: {
            isPublic: true
        }
    },
    {
        path: 'orders',
        name: 'orders',
        component: Orders,
        meta: {
            isPublic: true
        }
    },
    {
        name: 'attraction',
        path: '/attraction/:id',
        component: TheAttraction,
        meta: {
            isPublic: true
        }
    },
    {
        name: 'cartCheckout',
        path: '/checkout/:cartId/:step?',
        component: TheCheckoutWizard,
        meta: {
            layout: 'blank',
            isPublic: true
        }
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
                    isPublic: true
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
                config: { },
                configDesktop: {
                    'no-click-animation': true,
                    scrollable: true,
                    fullscreen: false,
                    'hide-overlay': false,
                    'max-width': 554,
                    'content-class': 'gst-v-dialog gst-v-dialog-event-info',
                },
                configMobile: {
                    'content-class': 'v-dialog__height-90 gst-v-dialog',
                    scrollable: true,
                    fullscreen: false,
                    'hide-overlay': false,
                    transition: 'dialog-bottom-transition'
                }
            },
            isPublic: true
        }
    },
    {
        path: '/search',
        component: TheSearch,
        meta: {
            isPublic: true
        },
        children: [
            {
                path: '/',
                name: 'search',
                component: SearchResultTabsAll,
                meta: {
                    isPublic: true
                },
            },
            {
                path: 'events',
                name: 'search.events',
                component: SearchResultTabsEvents,
                meta: {
                    isPublic: true
                },
            },
            {
                path: 'attractions',
                name: 'search.attractions',
                component: SearchResultTabsAttractions,
                meta: {
                    isPublic: true
                },
            },
            {
                path: 'venues',
                name: 'search.venues',
                component: SearchResultTabsVenues,
                meta: {
                    isPublic: true
                },
            }
        ]
    },
    {
        name: 'venue',
        path: '/venue/:id',
        component: TheVenue,
        meta: {
            isPublic: true
        }
    },
    {
        path: '/userFavorites',
        component: TheUserFavorites,
        meta: {
            isPublic: false
        },
        children: [
            {
                name: 'userFavorites',
                path: '/',
                component: UserFavoritesTabsEvents,
                meta: {
                    isPublic: false
                }
            },
            {
                name: 'userFavorites.attractions',
                path: 'attractions',
                component: UserFavoritesTabsAttractions,
                meta: {
                    isPublic: false
                }
            }
        ]
    },
    {
        name: 'userTickets',
        path: '/userTickets',
        component: TheUserTickets,
        meta: {
            isPublic: false
        }
    },
    // -- STATIC PAGES
    {
        path: '/help',
        name: 'help',
        component: Help,
        meta: {
            navigation: 'topMenu',
            label: 'help',
            isPublic: true
        }
    },
    {
        path: '/faq',
        name: 'faq',
        component: FAQ,
        meta: {
            navigation: 'topMenu',
            label: 'faq',
            isPublic: true
        }
    },
    {
        path: '/about',
        name: 'about',
        component: About,
        meta: {
            navigation: 'topMenu',
            label: 'about',
            isPublic: true
        }
    },
    {
        path: '/contact',
        name: 'contact',
        component: Contact,
        meta: {
            //navigation: 'topMenu',
            label: 'contact',
            isPublic: true
        }
    },
    {
        path: '/termsAgreement',
        name: 'termsAgreement',
        component: TermsAgreement,
        meta: {
            label: 'termsAgreement',
            isPublic: true
        }
    },
    {
        path: '/404',
        name: 'notFound',
        component: NotFound,
        meta: {
            layout: 'Default',
            isPublic: true
        }
    },
    // --- MODALS --- //
    {
        name: 'modalSearch',
        path: '/modal/search',
        meta: {
            type: 'modal',
            modalConfig: {
                component: SearchModalContent,
                props: {},
                config: {
                    fullscreen: true,
                    transition: 'dialog-bottom-transition'
                },
            },
            isPublic: true
        }
    },
    // --- HIDDEN --- //
    {
        name: 'appConfig',
        path: '/app/config',
        component: TheConfig,
        meta: {
            isPublic: true
        }
    },
];
