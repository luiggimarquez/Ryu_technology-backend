function randomNumbers(numbersRamdon) {
    
    let resultRandom = []
    let numbers= numbersRamdon || 100

    console.log('calculando : ',numbers)

    for (let i=0; i<numbers; i++){

        resultRandom.push((Math.floor(Math.random()*(1000))+1))
    }

    let resultCount = {}
    
    resultRandom.forEach( count =>{
        
        resultCount[count] = resultCount[count] + 1 || 1
    })
    
    return  resultCount
}

process.on('message', (numbers) => {

    console.log("Inicio Subproceso: ");
    let result = randomNumbers(parseInt(numbers.cant))
    console.log('listo a enviar: ',result)
    process.send(result);
    process.exit()
    
});