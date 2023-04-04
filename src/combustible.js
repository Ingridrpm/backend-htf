db = require('./db');

async function agregarRegistro(tipo, fecha, cantidad) {
    try {
        const result = await db.pool.query("insert into combustible (Tiempo,Cantidad,Categoria) values (?,?,?)", [fecha, cantidad, tipo]);
        return true
    } catch (err) {
        return false
    }
}

function obtenerRegistro(param) {

}

async function get1() {

    try {
        const result = await db.pool.query(`select tipo_combustible.nombre, sum(combustible.Cantidad)/(select sum(combustible.Cantidad) from combustible)
    from tipo_combustible, categoria_combustible,combustible 
    where categoria_combustible.Clasificacion = tipo_combustible.id 
    and combustible.Categoria = categoria_combustible.id 
    group by categoria_combustible.id`);
        return result   
    } catch (err) {
        return null
    }
}

async function get2() {

    try {
        const result = await db.pool.query(`select MONTH(combustible.Tiempo) as Mes,avg(combustible.Cantidad) as "Galones"
        from combustible
        group by Mes`);
        return result   
    } catch (err) {
        return null
    }
}

module.exports = {
    agregarRegistro,
    get1
}