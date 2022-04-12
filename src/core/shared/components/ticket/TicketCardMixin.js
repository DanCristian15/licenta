export default {
    computed: {
        seats( ) {
            const { ticket } = this;

            return ticket.seats || [ ];
        }
    }
};