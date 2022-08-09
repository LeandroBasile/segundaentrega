import ContenedorFB from "../../contenedorFirebase.js";

//CLASS EXTENDS
class DaoCartFb extends ContenedorFB {
    constructor(){
        super('compras')
    }
}


export default DaoCartFb