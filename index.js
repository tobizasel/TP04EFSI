const input = document.getElementById("input");
const array = [];
const article = document.getElementById("article")
const p = document.getElementById("p")
const boton = document.getElementById("boton")
const boton2 = document.getElementById("boton2")

var i=0;
const agregar = () => {
    console.log("holA");
    article.innerHTML = ""
        array.push({
            id:i,
            nombre: input.value,
            estado: false,
            fechaCreacion: new Date().toLocaleString("es-ES"),
            fechaCumplimiento:"",
            tiempoCumplimiento: 999999999
        })



        array.forEach(element => {
            const check = document.createElement("input");
            const label = document.createElement("label")

            // comparar quien tiene menor fecha

            check.setAttribute("type", "checkbox");
            check.setAttribute("id", element.id);
            element.estado ? check.setAttribute("checked", element.estado) : ""
            check.addEventListener("click",()=> chequeado(check.id));
            label.innerText=element.nombre;
            label.setAttribute("for", element.nombre);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
            article.appendChild(check);
            article.appendChild(label);


        });
        i++;
}

const chequeado = (id) => {
    array.forEach(e => {
        if(e.id==id){
            e.fechaCumplimiento = new Date().toLocaleString("es-ES");
            e.estado = true
        }
    });
}

const masRapido = () => {

    const arrayTiempos = [];

    array.forEach(e => {
        const fechaCreacion = new Date(e.fechaCreacion).getTime();
        const fechaCumplimiento = new Date(e.fechaCumplimiento).getTime();


        arrayTiempos.push(fechaCumplimiento - fechaCreacion);
        e.tiempoCumplimiento = fechaCumplimiento - fechaCreacion
        console.log(fechaCreacion , fechaCumplimiento);
    })


    array.forEach(element => {
        if (Math.min(...arrayTiempos) === element.tiempoCumplimiento) {
            console.log(element.nombre, "AAAAAAAAA");
            p.innerText = `el elemento mas rapido fue ${element.nombre}`
        }
    });
}

boton.addEventListener("click", agregar);
boton2.addEventListener("click", masRapido);


console.log(boton);