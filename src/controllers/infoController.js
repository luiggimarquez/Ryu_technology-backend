import config from "../../config.js"

class InfoControllers{

    getInfo= (req,res)=>{
        res.render("infoPartial.handlebars",{config,layout: false})
    }
}

let controllers = new InfoControllers
export default controllers