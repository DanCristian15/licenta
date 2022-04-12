const baseUrl = process.env.VUE_APP_BASE_URL || '';

export default {
    BASE_URL: baseUrl,
    GET_DEFAULT_PARAMS: {
        KEYWORD: '',
        LIMIT: 20,
        OFFSET: 0
    },
    HEADERS: {
        GST_PARTNER_API: 'gst-partner-api',
        GST_LANGUAGE: 'gst-language',
        GST_SESSION_ID: 'gst-session-id',
        GST_ANALYTICS: 'gst-analytics',
        GST_USER_EMAIL: 'gst-user-email',
        GST_MOCK_DATA: 'mock',
    },
    STATUS: {
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500
    },
    ERROR_CODES: {
        EVENT_PROVIDER: {
            SYSTEM_DOWN: 50301,
            INVALID_CARD_INFORMATION: 20002,
            INVALID_CART_STATE: 20010,
            CART_OUTSTANDING_BALANCE: 20120,
            INVALID_BILLING_INFORMATION: 20118,
            COMMAND_NOT_PROCESSED: 20226,
            INVALID_QUANTITY: 20231
        },
        HOTEL_PROVIDER: {
            INVALID_REQUEST: 40010,
            INVALID_DATA: 40020,
            PRODUCT_ERROR: 50020,
            SYSTEM_ERROR: 50030
        },
        PACKAGE_OFFERS_NOT_AVAILABLE: 40077
    }
};
