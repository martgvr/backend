function randomNums(cant) {
    let arrayNums = []

    for (let i = 0; i < cant; i++) {
        const randNum =  Math.round(Math.random() * 1000)
        const findArray = arrayNums.find(element => element.num == randNum);

        if (findArray != undefined) {
            findArray.i++
        } else {
            arrayNums.push({ num: randNum, i: 1 })
        }
    }
    return arrayNums;
}

process.on('message', message => {
    const { order, cant } = message

    if (order == 'start') {
        const response = randomNums(cant);
        process.send(response)
        process.exit()
    }
})