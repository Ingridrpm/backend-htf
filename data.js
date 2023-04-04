db = require('./src/db');
const general = require('./src/general')

async function dump() {

    //Borrar datos    

    await db.pool.query('delete from combustible');
    await db.pool.query('delete from energia');
    await db.pool.query('delete from gases');
    await db.pool.query('delete from otros');
    await db.pool.query('delete from papel');
    await db.pool.query('delete from viajes');
    await db.pool.query('delete from aceite');

    await db.pool.query('delete from categoria_aceite');
    await db.pool.query('delete from categoria_combustible');
    await db.pool.query('delete from categoria_energia');
    await db.pool.query('delete from categoria_gases');
    await db.pool.query('delete from categoria_otros');
    await db.pool.query('delete from categoria_papel');
    await db.pool.query('delete from categoria_viajes');

    await db.pool.query('delete from tipo_combustible');
    await db.pool.query('delete from tipo_energia');
    await db.pool.query('delete from tipo_otros');

    await db.pool.query('delete from tipo_emision');

    await db.pool.query('insert into tipo_emision values(1,"Emisiones directas");');
    await db.pool.query('insert into tipo_emision values(2,"Emisiones indirectas");');
    await db.pool.query('insert into tipo_emision values(3,"Otras emisiones indirectas");');
    await db.pool.query('insert into tipo_combustible values(1,"Combustible administrativo");');
    await db.pool.query('insert into tipo_combustible values(2,"Combustible indirecto de proveedor");');
    await db.pool.query('insert into tipo_combustible values(3,"Combustible de logistica");');
    await db.pool.query('insert into tipo_energia values(1,"Consumo administrativo");');
    await db.pool.query('insert into tipo_energia values(2,"Consumo logístico");');
    await db.pool.query('insert into tipo_energia values(3,"Consumo de distribución");');
    await db.pool.query('insert into tipo_otros values(1,"Consumo administrativo");');
    await db.pool.query('insert into tipo_otros values(2,"Consumo logístico");');
    await db.pool.query('insert into tipo_otros values(3,"Consumo de operación");');

    //Uso mensual de combustible para los vehículos administrativos: 750 galones
    //Agregar la categoria
    await db.pool.query(`INSERT INTO categoria_combustible
(id, Nombre, Descripcion, Clasificacion, Tipo_Emision)
VALUES(1, "Vehículos administrativos", NULL, 1, 1);
`)
    //Agregar informacipon por 3 meses
    for (let i = 1; i <= 3; i++) {
        await db.pool.query(`INSERT INTO combustible
    (Tiempo, Cantidad, Categoria)
    VALUES('2022-0${i}-01 10:00:00', 750, 1);
    `)
    }



    //Pérdidas de gases refrigerantes mensuales: 3 galones
    //Agregar la categoria
    await db.pool.query(`INSERT INTO categoria_gases
(id, Nombre, Descripcion, Tipo_Emision)
VALUES(1, 'Gases refrigerantes', 'Pérdidas de gases refrigerantes', 2);`)
    //Agregar informacipon por 3 meses
    for (let i = 1; i <= 3; i++) {
        await db.pool.query(`INSERT INTO gases
    (Tiempo, Cantidad, Categoria)
    VALUES('2022-0${i}-01 10:00:00', 3, 1);
    `)
    }




    //Consumo de energía eléctrica en oficinas administrativas: 300 Kw


    await db.pool.query(`INSERT INTO categoria_energia
    (id, Nombre, Descripcion, Clasificacion, Tipo_Emision)
VALUES(1, 'Oficinas administrativas', 'Consumo de energía eléctrica en oficinas administrativas', 1, 2);`)
    //Agregar informacipon por 3 meses
    for (let i = 1; i <= 3; i++) {
        await db.pool.query(`INSERT INTO energia
    (Tiempo, Cantidad, Categoria)
    VALUES('2022-0${i}-01 10:00:00', 300, 1);`);
    }


    //Uso mensual de combustible para vehículos de distribución: 1250 galones
    //Agregar la categoria
    await db.pool.query(`INSERT INTO categoria_combustible
(id, Nombre, Descripcion, Clasificacion, Tipo_Emision)
VALUES(2, "Vehículos de distribución", "Combustible para vehículos de distribución", 3, 1);`)
    //Agregar informacipon por 3 meses
    for (let i = 1; i <= 3; i++) {
        await db.pool.query(`INSERT INTO combustible
    (Tiempo, Cantidad, Categoria)
    VALUES('2022-0${i}-01 10:00:00', 1250, 2);`);
    }

    //Uso mensual de combustible para transporte tercero de materia prima: 500 galones
    //Agregar la categoria
    await db.pool.query(`INSERT INTO categoria_combustible
(id, Nombre, Descripcion, Clasificacion, Tipo_Emision)
VALUES(3, "Materia prima", "Combustible para transporte tercero de materia prima", 2, 1);`)
    //Agregar informacipon por 3 meses
    for (let i = 1; i <= 3; i++) {
        await db.pool.query(`INSERT INTO combustible
    (Tiempo, Cantidad, Categoria)
    VALUES('2022-0${i}-01 10:00:00', 500, 3);
    `)
    }


    //Viajes del CEO y COO de la empresa: 3 viajes mensuales
    //Agregar categorias
    await db.pool.query(`INSERT INTO categoria_viajes
(id, Nombre)
VALUES(1, 'Equipo administrativo');
`)
    //Agregar informacipon por 3 meses
    for (let i = 1; i <= 3; i++) {
        await db.pool.query(`INSERT INTO viajes
    (Categoria, Descipcion, Tiempo,Cantidad)
    VALUES(1, 'Viajes del CEO y COO de la empresa', '2022-0${i}-01 10:00:00',3);
    `)
    }



    //Uso mensual de aceite para mantenimiento de máquinas operadoras: 900 galones
    //Agregar la categoria
    await db.pool.query(`INSERT INTO categoria_otros
(id, Nombre, Descripcion, Clasificacion, Tipo_Emision)
VALUES(1, "Mantenimiento de máquinas operadoras", "Aceite para mantenimiento de máquinas operadoras", 3, 1);`)
    //Agregar informacipon por 3 meses
    for (let i = 1; i <= 3; i++) {
        await db.pool.query(`INSERT INTO otros
    (Tiempo, Cantidad, Categoria)
    VALUES('2022-0${i}-01 10:00:00', 900, 1);
    `)
    }

    //Consumo de energía eléctrica en planta de envasado: 900 Kw
    await db.pool.query(`INSERT INTO categoria_energia
    (id, Nombre, Descripcion, Clasificacion, Tipo_Emision)
VALUES(2, 'Planta de envasado', 'Consumo de energía eléctrica en planta de envasado', 3,1);`)
    //Agregar informacipon por 3 meses
    for (let i = 1; i <= 3; i++) {
        await db.pool.query(`INSERT INTO energia
    (Tiempo, Cantidad, Categoria)
    VALUES('2022-0${i}-01 10:00:00', 900, 2);`);
    }

    //Consumo diario de aceite para mantenimiento de flota de distribución: 1 galón
    //Agregar la categoria
    await db.pool.query(`INSERT INTO categoria_otros
(id, Nombre, Descripcion, Clasificacion, Tipo_Emision)
VALUES(2, "Mantenimiento de flota de distribución", "Aceite para mantenimiento de flota de distribución", 2, 1);`)
    //Agregar informacipon por 3 meses
    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 31; j++) {
            if (i == 2 && j == 29) break;
            await db.pool.query(`INSERT INTO otros
    (Tiempo, Cantidad, Categoria)
    VALUES('2022-${i}-${j} 10:00:00', 1, 2);`);
        }
    }

    //Uso promedio diario de papel bond para impresión de documentos: 300 hojas
    //Agregar la categoria
    await db.pool.query(`INSERT INTO categoria_papel
(id, Nombre, Descripcion, Tipo_Emision)
VALUES(1, 'Papel bond', 'Papel bond para la impresión de documentos', 1);`)

    //Agregar información por 3 meses
    for (let i = 1; i <= 3; i++) {
        await db.pool.query(`INSERT INTO papel
    (Tiempo, Cantidad, Categoria)
VALUES('2022-0${i}-01 10:00:00',300,1);
`)
    }

    //Viajes del equipo de ventas de la empresa: 2 viajes mensuales
    //Agregar categorias
    await db.pool.query(`INSERT INTO categoria_viajes
(id, Nombre)
VALUES(2, 'Equipo ventas');
`)

    //Agregar informacipon por 3 meses
    for (let i = 1; i <= 3; i++) {
        await db.pool.query(`INSERT INTO viajes
    (Categoria, Descipcion, Tiempo, Cantidad)
    VALUES(2, 'Viajes del equipo de ventas de la empresa', '2022-0${i}-01 10:00:00',2);
    `)
    }


    process.exit(0);
}

dump()

