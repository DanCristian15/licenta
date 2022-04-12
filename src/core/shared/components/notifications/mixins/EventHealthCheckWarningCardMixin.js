export default {
    props: {
        healthCheck: {
            type: Object,
            required: true
        }
    },
    computed: {
        title () {
            return this.healthCheck.summary;
        },
        message () {
            return this.healthCheck.description;
        },
        learnMoreUrl() {
            const { learnMoreUrl } = this.healthCheck;
            const hasValidUrlProtocol = [ 'http://', 'https://' ].some( protocol => learnMoreUrl.startsWith( protocol ) );
            return hasValidUrlProtocol ? learnMoreUrl : `http://${learnMoreUrl}`;
        }
    }
};