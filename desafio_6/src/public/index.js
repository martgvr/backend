const socketClient = io();

async function getAll() {
    try {
        const response = await fs.promises.readFile('./src/productos.txt', 'utf-8');
        return JSON.parse(response);
    } catch (e) {
        return { error: true } 
    }
}

socketClient
    .on("loadData", () => {
        console.log("Load data");
        getAll().then(data => console.log(data));
    })