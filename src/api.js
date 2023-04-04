const general = require('./general')
const combustible = require('./combustible')
const energia = require('./energia')
const otros = require('./otros')


module.exports = function (app) {
    /* Se necesita registrar el consumo de combustible categorizado
        por
        - combustible administrativo
        - combustible indirecto de proveedor
        - combustible de logística

        También se debe segmentar según tipo de emisión */
    /*
        - combustible administrativo:   1
        - combustible indirecto de proveedor:   2
        - combustible de logística: 3
        */
    app.post('/combustible/instertar', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        const tipo = req.body.tipo;
        const fecha = req.body.fecha;
        const hora = req.body.hora;
        const cantidad = req.body.cantidad;
        let tiempo = general.getTime();
        if (fecha != null & hora != null) {
            if (!general.isValidDate(fecha)) return res.send("Formato de fecha inválido, insertar con formato YYYY-MM-DD")
            if (hora.length < 6) hora = hora + ":00"
            if (!general.isValidTime(hora)) return res.send("Formato de hora inválido, insertar con formato HH:MM o HH:MM:SS")
            tiempo = fecha + " " + hora
        }
        if (combustible.agregarRegistro(tipo, tiempo,cantidad)) return res.send("Registro de combustible agregado correctamente").status(200)
        return res.send("Error al intentar agregar registro de combustible").status(400)

    })

    /* Se necesita registrar el consumo de energía eléctrica
    categorizada por
    -  consumo administrativo
    -  consumo logístico
    - consumo de distribución
    También se debe segmentar según tipo de emisión
    /*
        - combustible administrativo:   1
        - combustible logistico:   2
        - combustible de distribución: 3
        */
    app.post('/energia/instertar', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        const tipo = req.body.tipo;
        const fecha = req.body.fecha;
        const hora = req.body.hora;
        const cantidad = req.body.cantidad;
        let tiempo = general.getTime();
        if (fecha != null & hora != null) {
            if (!general.isValidDate(fecha)) return res.send("Formato de fecha inválido, insertar con formato YYYY-MM-DD")
            if (hora.length < 6) hora = hora + ":00"
            if (!general.isValidTime(hora)) return res.send("Formato de hora inválido, insertar con formato HH:MM o HH:MM:SS")
            tiempo = fecha + " " + hora
        }
        if (energia.agregarRegistro(tipo, tiempo,cantidad)) return res.send("Registro de consumo de energía eléctirca agregado correctamente").status(200)
        return res.send("Error al intentar agregar registro de consumo de energía eléctirca").status(400)

    })

    /*
    Se necesita registrar el consumo de otros productos derivados
    del petróleo categorizada por
     -  consumo administrativo
     -  consumo logístico
     -  consumo de operación
    También se debe segmentar según tipo de emisión
    */
    /*
        - combustible administrativo:   1
        - combustible logistico:   2
        - combustible de operación: 3
    */
    app.post('/otros/instertar', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        const tipo = req.body.tipo;
        const fecha = req.body.fecha;
        const hora = req.body.hora;
        const cantidad = req.body.cantidad;
        let tiempo = general.getTime();
        if (fecha != null & hora != null) {
            if (!general.isValidDate(fecha)) return res.send("Formato de fecha inválido, insertar con formato YYYY-MM-DD")
            if (hora.length < 6) hora = hora + ":00"
            if (!general.isValidTime(hora)) return res.send("Formato de hora inválido, insertar con formato HH:MM o HH:MM:SS")
            tiempo = fecha + " " + hora
        }
        if (otros.agregarRegistro(tipo, tiempo,cantidad)) return res.send("Registro de consumo de otros derivados del petroleo agregado correctamente").status(200)
        return res.send("Error al intentar agregar registro de consumo de otros derivados del petroleo").status(400)
    })

    /*
    Registrar número de viajes. También se debe segmentar según tipo de emisión.
    */
    app.post('/viajes/instertar', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        const tipo = req.body.tipo;
        const descripcion = req.body.descripcion;
        const fecha = req.body.fecha;
        const hora = req.body.hora;
        let tiempo = general.getTime();
        if (fecha != null & hora != null) {
            if (!general.isValidDate(fecha)) return res.send("Formato de fecha inválido, insertar con formato YYYY-MM-DD")
            if (hora.length < 6) hora = hora + ":00"
            if (!general.isValidTime(hora)) return res.send("Formato de hora inválido, insertar con formato HH:MM o HH:MM:SS")
            tiempo = fecha + " " + hora
        }
        otros.agregarRegistro(tipo, descripcion, tiempo)
        return res.status(200)
    })

    /*
    Actualizar cantidad de consumo de combustible según su categoría.
    Se necesita actualizar la cantidad de un registro en específico en cuanto al consumo de combustible independiente su categoría o segmento
    */


    //Calcular el porcentaje de consumo anual de combustible por categoría (en porcentaje)

    app.get('/combustible/consumo_anual_categoria', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        const result = combustible.get1()
        if(result==null) return res.send("Error en la conexión con la base de datos").status(500)
        return res.send(result).status(200)
    })


    app.get('/combustible/consumo_promedio', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        const result = combustible.get2()
        if(result==null) return res.send("Error en la conexión con la base de datos").status(500)
        return res.send(result).status(200)
    })

}


