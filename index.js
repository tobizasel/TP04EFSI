const vencimiento = document.getElementsByClassName("vencimientoTarea");
const descripcionTarea = document.getElementsByClassName("descripcionTarea");
const article = document.getElementsByClassName("tareas");
const p = document.getElementsByClassName("p");
const boton = document.getElementsByClassName("boton");
const boton2 = document.getElementsByClassName("boton2");
const bodi = document.getElementById("todo");

const proyectos = [];
var j = 0;
var contenido = "";


const inputProyecto = document.getElementById("nombreProyecto");
const descripcionProyecto=document.getElementById("descripcionProyecto");
const boton3 = document.getElementById("crearProyecto");

const agregarAtributo = (x, agrego) => {
  var index = 100;

  if (agrego) {
    if(!(descripcionTarea[x].value=="")){
    article[x].innerHTML = "";
    proyectos[x].articulos.push({
      id: proyectos[x].i,
      descripcion:descripcionTarea[x].value,
      fechaVencimiento:vencimiento[x].value,
      estado: false,
      fechaCreacion: new Date().toLocaleString("es-ES"),
      fechaCumplimiento: "",
      tiempoCumplimiento: 999999999
    });
    proyectos[x].i++;
    }else{
        alert("completa los datos!");
    }
  }
  contenido = "";
  proyectos.forEach((e) => {

    contenido += `<div class="proyecto proyecto--${index}">
            <div class="proyecto__titulo proyecto__titulo--${index}">
              <h3 class="proyecto__titulo-1 ">${proyectos[j].nombre}</h3>
              <h3>${proyectos[j].descripcion}</h3>
            </div>
            <div class="proyecto__tarea">
            <div class="proyecto__input--wrapper">
            <p>Nombre de la tarea</p>
            <input type="text" class="descripcionTarea input input-3 " placeholder="descripcion tarea">
            </div>
            <div class="proyecto__vencimiento">
            <p>Vencimiento tarea (opcional)</p>
            <input type="date" class="vencimientoTarea input input-3">
            </div>
            <div class="botones">
            <button class="boton boton--${index}" Onclick="agregarAtributo(${j},true)" >Enviar</button>
            <button class="boton boton--${index}" Onclick="masRapido(${j})">Mostrar rapido</button>
            </div>
            </div>
           
        
            
            <article class="tareas">
        
            `;

      if (index>= 400) {
        index = 100;
      } else{
        index += 100;
      }

    e.articulos.forEach((element) => {

      const check = document.createElement("input");
      const label = document.createElement("label");
      const label2 = document.createElement("label");
      const div = document.createElement("div");
      const divGrande = document.createElement("div");
      // comparar quien tiene menor fecha
      check.setAttribute("type", "checkbox");
      check.setAttribute("id", element.id);
      check.classList.add("check");
      label.classList.add("label");
      label2.classList.add("label");
      element.estado ? check.setAttribute("checked", element.estado) : "";
      check.setAttribute("Onclick", `chequeado(${j},${check.id})`);
      console.log(element.fechaVencimiento);
      if(isNaN(Date.parse(element.fechaVencimiento)) ||element.fechaVencimiento!=null){
      label.innerText = element.descripcion;
      label2.innerText = element.fechaVencimiento.toString()
      console.log("x");
      }else{
       label.innerText = element.descripcion;
      }
      label.setAttribute("for", element.descripcion);
      div.setAttribute("class", "tareas__wrapper")
      div.appendChild(check);
      div.appendChild(label);
      div.appendChild(label2);
      divGrande.appendChild(div);
      contenido+=divGrande.innerHTML;
    });
    contenido += `</article>
        
    <article class="article2">
        <p class="p"></p>
    </article>
    </div>

    </div>`;
    j++;
  });

  bodi.innerHTML = contenido;

  j = 0;
};

const chequeado = (x, id) => {
  console.log(id);
  proyectos[x].articulos.forEach((e) => {
    if (e.id == id && !e.estado) {
      e.fechaCumplimiento = new Date().toLocaleString("es-ES");
      e.estado = true;
    } else if (e.id == id && e.estado) {
      e.estado = false;
    }
  });
};

const masRapido = (x) => {
  const arrayTiempos = [];

  proyectos[x].articulos.forEach((e) => {
    if (e.estado) {
      const fechaCreacion = new Date(e.fechaCreacion).getTime();
      const fechaCumplimiento = new Date(e.fechaCumplimiento).getTime();
      console.log(fechaCreacion);
      arrayTiempos.push(fechaCumplimiento - fechaCreacion);
      e.tiempoCumplimiento = fechaCumplimiento - fechaCreacion;
      console.log(e.tiempoc);
    } 
  });
  console.log(arrayTiempos);
  proyectos[x].articulos.forEach((element) => {
    if (Math.min(...arrayTiempos) === element.tiempoCumplimiento) {
      p[x].innerText = `el elemento mas rapido fue ${element.nombre}`;
      console.log(`el elemento mas rapido fue ${element.nombre}`);
    }
  });
};

const CrearProyecto = () => {
  proyectos.push({ nombre: inputProyecto.value , descripcion: descripcionProyecto.value, i: 0, articulos: [] });
  agregarAtributo(0, false);
};

boton3.addEventListener("click", CrearProyecto);
