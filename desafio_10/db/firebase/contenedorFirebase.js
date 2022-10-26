
class Contenedor {
    constructor(client, connection, table) {
        this.client = client;
        this.connection = connection;
        this.table = table;
        this.db = knex({ client: this.client, connection: this.connection });
    }

    async getAll() {
        try {
            const products = await productsCollection.get()
            const productosArray = products.docs.map(producto => {
                return {
                    id: producto.id,
                    stock: producto.data().stock,
                    name: producto.data().name,
                    price: producto.data().price
                }
            })
            return productosArray;
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }

    async getByID(id) {

    }

    async save(obj) {

    }

    async deleteByID(id) {

    }

    async deleteAll() {

    }
}