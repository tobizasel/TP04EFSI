const vencimiento = document.getElementsByClassName("vencimientoTarea");
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
const descripcionProyecto=document.getElementById("descripcionProyecto");
const boton3 = document.getElementById("crearProyecto");

const agregarAtributo = (x, agrego) => {
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
            <div class="proyecto__titulo">
              <h3 class="proyecto__titulo-1">${proyectos[j].nombre}</h3>
              <h3>${proyectos[j].descripcion}</h3>
            </div>
            <div class="proyecto__tarea">
            <div class="proyecto__input--wrapper">
            <input type="text" class="descripcionTarea input " placeholder="descripcion tarea">
            </div>
            <div class="proyecto__vencimiento">
            <p>Vencimiento tarea (opcional)</p>
            <input type="date" class="vencimientoTarea input">
            </div>
            <div class="botones">
            <button class="boton" Onclick="agregarAtributo(${j},true)" >Enviar</button>
            <button class="boton2" Onclick="masRapido(${j})">Mostrar rapido</button>
            </div>
            </div>
           
        
        
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
      console.log(element.fechaVencimiento);
      if(isNaN(Date.parse(element.fechaVencimiento)) ||element.fechaVencimiento!=null){
      label.innerText = element.descripcion +"    "+ element.fechaVencimiento.toString();
      console.log("x");
      }else{
       label.innerText = element.descripcion;
      }
      label.setAttribute("for", element.descripcion);
      div.appendChild(check);
      div.appendChild(label);
      contenido += div.innerHTML;
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
  proyectos.push({ nombre: inputProyecto.value , descripcion: descripcionProyecto.value, i: 0, articulos: [] });
  agregarAtributo(0, false);
};

boton3.addEventListener("click", CrearProyecto);
