import IconChevronLeft from '@shared/components/icons/IconChevronLeft.vue';
import IconChevronRight from '@shared/components/icons/IconChevronRight.vue';
import IconClose from '@shared/components/icons/IconClose.vue';

export default {
    prev: {
        component: IconChevronLeft,
        name: 'prev'
    },
    next: {
        component: IconChevronRight,
        name: 'next'
    },
    close: {
        component: IconClose,
        name: 'close'
    }
};
