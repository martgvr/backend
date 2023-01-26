export default class CartsDTO {
    constructor (data, total) {
        this.data = data
        this.total = total
        this.cartData = { data: data, total: total }
    }

    getCartData () {
        return this.cartData
    }
}