<template>
    <component :is="component" />
</template>

<script>
    import BonusPointsBadgeMultiple from '@tenants/target/assets/sparkles.svg';
    import BonusPointsBadgeSingle from '@tenants/target/assets/sparkle.svg';

    export default {
        components: {
            // eslint-disable-next-line vue/no-unused-components
            BonusPointsBadgeMultiple,
            // eslint-disable-next-line vue/no-unused-components
            BonusPointsBadgeSingle
        },
        props: {
            variant: {
                type: String,
                default: 'multiple'
            }
        },
        computed: {
            component() {
                return this.variant === 'multiple' ? BonusPointsBadgeMultiple : BonusPointsBadgeSingle;
            }
        }
    };
</script>
