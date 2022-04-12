export const appMainTheme = {
    // MAIN COLORS FROM DESIGN SYSTEM
    // Usage:
    // Anchor Links, Hover on Menu Anchors, Focus on Inputs, Labels of inputs, Date Selection, Current Date, Loader
    // Price on Event listing, Tabs active state, Language Picker, Ticket type, Range Picker,
    // Ticket Master Guarantee Card, Current and Prev steps on Checkout, Checkboxes, Counter
    // Icons: counter, gps, history, ticket, location
    // Button Type 1: Border primary, text color primary
    // Button Type 2: On Hover background primary, On Active state background primary
    // Button Type 3: Normal state background primary
    primary: '#00B4E2',

    // Usage:
    // Bonus points banners (Home, Checkout )
    secondary: '#FFC203',

    // Usage:
    // ICONS: search, location, date, sports, arts, family, other events, accesability
    // FONT/TEXT: Small section titles like - RECENTLY VIEWED EVENTS, Input placeholders, Input labels on normal state,
    // Tabs normal state, Attraction genre, Bonus points card title("You will earn"), Date picker start and end date, Event Time and Venue,
    // Sort by dropdown, No tickets text, Ticket price on Event detail, Checkout Current Step text, Checkout Confirmation subtitle, Counter Text
    // OTHER: Tooltip background
    tertiary: '#6D7D90',

    //Usage:
    // ICONS: Lang select dropdown, menu, close, back
    // FONT/TEXT: Bonus points title, popular events, menu anchor links in header, Search/Date/City inputs filled, Event/Attraction/Venue titles on search
    // Bonus points text color(100 bonus points, 2500dolars/ea) ,Event Date, Section of ticket, Price range value (100 - 200), Seat numbers, Count down time,
    // Date and location on ticket review, Price table text, Checkbox labels (electronic ticket, etc), Total payment text on payment step,
    // Checkout Confirmation title
    // OTHER: Swith track color on normal state
    quaternary: '#23262D',

    // Usage:
    // Mostly used as dividers or border colors
    // BORDERS: Header border-bottom, Attraction Image on search result page, Venue Icon border when venues listed in search Language selector,
    // Price Range Track when not in range, Bonus Points on Ticket listing, Ticket details on ticket preview, Next step indicator on checkout
    // Checkout FAQ,  Checkout form container, Checkout Input border, Checkout Price Details border
    // OTHER: Background when we have no tickets, Price ranges value background, Category filter buttons on home page background, Filter buttons background
    quinary: '#F0F2F3',

    // Usage:
    // ICONS: cancel/clear, tooltip
    senary: '#C2C2C2',

    //Usage:
    // BORDER: Category filter buttons on home page, Price ranges value borders, Filter buttons border, Switch Circle border on normal stat,
    septenary: '#D6DBE0',

    // STATUS COLORS
    error: '#E92505',
    success: '#60B403',
    warning: '#FFC203',
    info: '#00B4E2',

    // GRADIENT COLORS
    // FYI: if both gradient colors have same value, it will act like a full bg color
    gradientPrimary1:'#2980B9',
    gradientPrimary2: '#6DD5FA',
    gradientSecondary1: '#1D2671',
    gradientSecondary2: '#C33764',
    gradientRadial1: '#FF9F00',
    gradientRadial2: '#FFEE00',

    // VUETIFY VARIABLES OVERRIDEN
    // Should be the same as the primary color. Vuetify uses it for some components: Ex: Current Day in date picker
    accent: '#00B4E2',
    // Usually any anchor link will take this color.
    anchor: '#00B4E2',

    // CUSTOM VARIABLES
    homeBannerGradientStart: '#2980B9',
    homeBannerGradientEnd: '#6DD5FA',
    homeBannerSearchButtonBgColor: '#00B4E2',
    footerGradientStart: '#2980B9',
    footerGradientEnd: '#6DD5FA',
    calendar: '#f80445',
    backgroundTimer: '#00B4E2',
    backgroundSuccess: '#60B403',
    overlay: '#000000',
    shadow: '#D5DADF',
    bonusPointsChipBgColor: '#FFC203',
    bonusPointsChipColor: '#23262D',
    favoriteMarked: '#F80445',
    favoriteUnMarked: '#FFFFFF',
    eventStatusChipCancelled: '#EE2E24',
    eventStatusChipPostponed: '#FF7203',
    eventStatusChipRescheduled: '#D011C9',
};
