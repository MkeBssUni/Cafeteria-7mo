import app from "./config/express";

const main = async ()=>{
    try {
        app.listen(app.get('port'),()=>console.log(`Server runnning on port: ${app.get('port')}`))
    } catch (error) {
        console.log(error)
    }
}

main();