<template>
  <div>
    <stripe-element-card
      ref="elementRef"
      :pk="publishableKey"
      @token="tokenCreated"
    />
    <button @click="submit">Generate token</button>
  </div>
</template>

<script>
    import { StripeElementCard } from '@vue-stripe/vue-stripe';
    import { pay } from '@core/services/userService.js';

    export default {
        components: {
            StripeElementCard,
        },
        data () {
            this.publishableKey = 'pk_test_51JxRMhIEWruivPNaGRT2QTN7FGO5irpsqZBgf4lxAzHy19c1C1wxqywUcgfhbWSsGq2emSjY99Z9UStG4EOfiRPB00GEOX2A7C';
            return {
                token: null,
            };
        },
        methods: {
            submit () {
                this.$refs.elementRef.submit();
            },
            tokenCreated (token) {
                pay((this.$route.params.product.bid + 15) * 100, token, 'USD')
            },
        }
    };
</script>