const imageConstants =  {
    BANNERS: {
        SEARCH:         require( `@/tenants/${process.env.TENANT}/public/assets/banners/search_page_banner.png` ),
        STATIC:         require( `@/tenants/${process.env.TENANT}/public/assets/banners/static_page_banner.png` ),
        VENUE:          require( `@/tenants/${process.env.TENANT}/public/assets/banners/search_page_banner.png` ),
        USER_FAVORITES: require( `@/tenants/${process.env.TENANT}/public/assets/banners/user_favorites_page_banner.png` ),
    },
    FALLBACKS: {
        NO_DATA:                     require( `@/tenants/${process.env.TENANT}/public/assets/fallbackImages/no_events_available.png` ),
        NO_TICKETS:                  require( `@/tenants/${process.env.TENANT}/public/assets/fallbackImages/no_tickets_available.png` ),
        NOT_FOUND:                   require( `@/tenants/${process.env.TENANT}/public/assets/fallbackImages/404.png` ),
        SPORTS:                      require( `@/tenants/${process.env.TENANT}/public/assets/fallbackImages/sports.png` ),
        ARTS:                        require( `@/tenants/${process.env.TENANT}/public/assets/fallbackImages/arts.png` ),
        CONCERTS:                    require( `@/tenants/${process.env.TENANT}/public/assets/fallbackImages/concerts.png` ),
        FAMILY:                      require( `@/tenants/${process.env.TENANT}/public/assets/fallbackImages/family.png` ),
        OTHER_EVENTS:                require( `@/tenants/${process.env.TENANT}/public/assets/fallbackImages/other_events.png` ),
        EVENT_TICKETS_MAINTENANCE:   require( `@/tenants/_main/public/assets/fallbackImages/event_tickets_maintenance.png` ),
    },
    BONUS_POINTS: {
        DESKTOP: {
            HOME:                   require( `@/tenants/${process.env.TENANT}/public/assets/banners/desktop_landing_page_banner.png` ),
            CHECKOUT_SUMMARY:       require( `@/tenants/${process.env.TENANT}/public/assets/banners/desktop_summary_banner.png` ),
            CHECKOUT_CONFIRMATION:  require( `@/tenants/${process.env.TENANT}/public/assets/banners/desktop_success_banner.png` )
        },
        MOBILE: {
            HOME:                   require( `@/tenants/${process.env.TENANT}/public/assets/banners/mobile_landing_page_banner.png` ),
            CHECKOUT_SUMMARY:       require( `@/tenants/${process.env.TENANT}/public/assets/banners/mobile_summary_banner.png` ),
            CHECKOUT_CONFIRMATION:  require( `@/tenants/${process.env.TENANT}/public/assets/banners/mobile_success_banner.png` )
        }
    }
};

export default imageConstants;
