export default class GuestsModel {
    adultsCount = 0;
    childrenCount = 0;
    childAges = [ ];

    constructor( adultsCount = 0, childrenCount = 0, childAges = [ ] ) {
        this.adultsCount = adultsCount;
        this.childrenCount = childrenCount;
        this.childAges = childAges;
    }
}
