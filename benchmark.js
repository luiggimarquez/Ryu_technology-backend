import autocannon from 'autocannon'
import { PassThrough } from "stream"
import { logger } from './utils/logger.js'

let run = (url) => {

    const buf=[]
    const outputStream = new PassThrough()

    const inst = autocannon({

        url,
        connections:100,
        duration: 20
    })

    autocannon.track(inst,{ outputStream })

    outputStream.on('data', data => buf.push(data))
    inst.on('done', ()=>{

        process.stdout.write(Buffer.concat(buf))

        
    })

} 

logger.info("Runnig all benchmarks in parellel ...")

run('http:localhost:8081/info')