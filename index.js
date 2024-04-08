const nombreTarea = document.getElementsByClassName("nombreTarea");
const descripcionTarea = document.getElementsByClassName("descripcionTarea");
const article = document.getElementsByClassName("article");
const p = document.getElementsByClassName("p");
const boton = document.getElementsByClassName("boton");
const boton2 = document.getElementsByClassName("boton2");
const bodi = document.getElementById("todo");
const proyectos = [];
var j = 0;
var contenido = "";
const inputProyecto = document.getElementById("nombreProyecto");
const boton3 = document.getElementById("crearProyecto");

const agregarAtributo = (x, agrego) => {
  if (agrego) {
    if(!descripcionTarea[x].value==null || !nombreTarea[x].value==null ){
    article[x].innerHTML = "";
    proyectos[x].articulos.push({
      id: proyectos[x].i,
      nombre: nombreTarea[x].value,
      descripcion:descripcionTarea[x].value,
      estado: false,
      fechaCreacion: new Date().toLocaleString("es-ES"),
      fechaCumplimiento: "",
      tiempoCumplimiento: 999999999,
    });
    proyectos[x].i++;
    }else{
        alert("completa los datos!");
    }
  }
  contenido = "";
  proyectos.forEach((e) => {
    contenido += `<div class="proyecto">
            <h3>${proyectos[j].nombre}</h3>
            <input type="text" class="nombreTarea" placeholder="nombre">
            <input type="text" class="descripcionTarea" placeholder="descripcion">
            <button class="boton" Onclick="agregarAtributo(${j},true)" >Enviar</button>
            <button class="boton2" Onclick="masRapido(${j})">Mostrar rapido</button>
        
        
            <article class="article">
        
            `;

    e.articulos.forEach((element) => {
      const article = document.getElementsByClassName("article");

      const check = document.createElement("input");
      const label = document.createElement("label");
      const div = document.createElement("div");
      // comparar quien tiene menor fecha

      check.setAttribute("type", "checkbox");
      check.setAttribute("id", element.id);
      check.classList.add("check");
      label.classList.add("label");
      element.estado ? check.setAttribute("checked", element.estado) : "";
      check.setAttribute("Onclick", `chequeado(${j},${check.id})`);
      label.innerText = element.nombre +"    "+ element.descripcion;
      label.setAttribute("for", element.nombre);
      div.appendChild(check);
      div.appendChild(label);
      contenido += div.innerHTML;
    });
    contenido += `</article>
        
    <article class="article2">
        <p class="p"></p>
    </article></div>`;
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
  console.log(proyectos[x].articulos);

  proyectos[x].articulos.forEach((e) => {
    if (e.estado) {
      const fechaCreacion = new Date(e.fechaCreacion).getTime();
      const fechaCumplimiento = new Date(e.fechaCumplimiento).getTime();

      arrayTiempos.push(fechaCumplimiento - fechaCreacion);
      e.tiempoCumplimiento = fechaCumplimiento - fechaCreacion;
    } 
  });

  proyectos[x].articulos.forEach((element) => {
    if (Math.min(...arrayTiempos) === element.tiempoCumplimiento) {
      p[x].innerText = `el elemento mas rapido fue ${element.nombre}`;
    }
  });
};

const CrearProyecto = () => {
  proyectos.push({ nombre: inputProyecto.value, i: 0, articulos: [] });
  agregarAtributo(0, false);
};

boton3.addEventListener("click", CrearProyecto);
