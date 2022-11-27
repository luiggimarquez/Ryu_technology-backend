import yargs from "yargs";
import {inspect} from 'util'
import util from 'util'



const info = { 
    args : process.argv,
    plataform : process.platform,
    arq : process.arch,
    os : process.env.OS,
    node :  process.version,
    rss : util.inspect(process.memoryUsage()),
    execpath :  process.execPath,
    pid : process.pid,
    folder :  process.cwd()
}

export default info