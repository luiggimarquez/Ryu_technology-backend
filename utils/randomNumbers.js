
function randomNumbers(numbersRamdon) {
    
    let resultRandom = 0
    let numbers= parseInt(numbersRamdon) || 1000000

    for (let i=0; i<numbers; i++){

        resultRandom.push((Math.floor(Math.random()*(1000))+1))
    }

    let resultCount = 0

    resultRandom.forEach( count =>{
        resultCount[count] = resultCount[count] + 1 || 1

    })

    return  resultCount
}

let result = 0

process.on('message', (numbers) => {

    console.log("Inicio Subproceso: ");
    result = randomNumbers(parseInt(numbers.cant))
    process.send(result);
    process.exit()
    
});







