class FirebaseContainer {
    constructor(collection) {
        this.collection = admin.firestore().collection(collection);
    }

    async getAll() {
        try {
            const data = await this.collection.get()
            const dataArray = data.docs.map(item => { return { id: item.id, ...item.data() } })
            return dataArray;
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }

    async getByID(id) {

    }

    async save(obj) {
        try {
            await this.collection.doc().create(obj)
            return { success: 'Objeto guardado con éxito' }
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }

    async deleteByID(id) {

    }

    async deleteAll() {

    }
}

export default FirebaseContainer