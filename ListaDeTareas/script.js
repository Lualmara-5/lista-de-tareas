document.addEventListener("DOMContentLoaded", function () {
  // Mostrar la fecha actual
  const fechaElemento = document.getElementById("fecha-actual");
  const fecha = new Date();
  const opcionesFecha = { day: "2-digit", month: "long", year: "numeric" };
  fechaElemento.textContent = fecha.toLocaleDateString("es-ES", opcionesFecha);

  // Obtener nombre guardado o usar "TuNombre" por defecto
  let nombre = localStorage.getItem("nombreUsuario") || "TuNombre";
  const saludoElemento = document.getElementById("saludo");
  saludoElemento.innerHTML = `Hola, <span id="nombre-usuario" style="cursor: pointer;">${nombre}</span>`;

  // Evento para cambiar el nombre al hacer clic
  document
    .getElementById("nombre-usuario")
    .addEventListener("click", function () {
      let nuevoNombre = prompt("Ingresa tu nombre:");
      if (nuevoNombre && nuevoNombre.trim() !== "") {
        localStorage.setItem("nombreUsuario", nuevoNombre.trim());
        document.getElementById("nombre-usuario").textContent =
          nuevoNombre.trim();
      }
    });

  // Mensaje motivacional
  const frases = [
    "¡Hoy es un gran día para ser productivo! 💪",
    "Vamos a completar muchas tareas hoy. 🚀",
    "Organiza tu día y alcanza tus metas. ✨",
    "Cada tarea completada es un paso hacia el éxito. ✅",
  ];
  const mensaje = frases[Math.floor(Math.random() * frases.length)];
  document.getElementById("mensaje").textContent = mensaje;

  // Cargar tareas guardadas
  cargarTareas();

  // Función Tecla Enter
  const inputTarea = document.getElementById("input-tarea");
  inputTarea.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      añadirTarea();
    }
  });
  2;
});

// Modo Oscuro
const modoOscuroBoton = document.getElementById("modo-oscuro");
const body = document.body;

//Verificar si el usuario tenía activado el modo oscuro
if (localStorage.getItem("modoOscuro") === "activado") {
  body.classList.add("oscuro");
  modoOscuroBoton.classList.replace("bxs-sun", "bxs-moon");
}

// Evento para cambiar entre modo claro/oscuro
modoOscuroBoton.addEventListener("click", function () {
  body.classList.toggle("oscuro");
  const modoOscuroActivado = body.classList.contains("oscuro");

  //Guardar la config de Preferencia Usuario
  localStorage.setItem(
    "modoOscuro",
    modoOscuroActivado ? "activado" : "desactivado"
  );

  //Cambiar Icono
  if (modoOscuroActivado) {
    modoOscuroBoton.classList.replace("bxs-sun", "bxs-moon");
  } else {
    modoOscuroBoton.classList.replace("bxs-moon", "bxs-sun");
  }
});

// Función para añadir una nueva tarea
function añadirTarea() {
  const inputTarea = document.getElementById("input-tarea");
  const textoTarea = inputTarea.value.trim();

  if (textoTarea === "") return;

  const listaTareas = document.getElementById("lista-tareas");

  const divTarea = document.createElement("div");
  divTarea.classList.add("tarea");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.onchange = function () {
    spanTarea.classList.toggle("completada", checkbox.checked);
    guardarTareas();
  };

  const spanTarea = document.createElement("span");
  spanTarea.textContent = textoTarea;

  const iconoBorrar = document.createElement("i");
  iconoBorrar.classList.add("bx", "bx-trash");
  iconoBorrar.onclick = function () {
    divTarea.remove();
    guardarTareas();
  };

  // Estructura final de la tarea
  divTarea.appendChild(checkbox);
  divTarea.appendChild(spanTarea);
  divTarea.appendChild(iconoBorrar);

  listaTareas.appendChild(divTarea);

  inputTarea.value = "";
  inputTarea.focus();

  guardarTareas();
}

// Función guardar las tareas en LocalStorage
function guardarTareas() {
  const listaTareas = document.getElementById("lista-tareas");
  const tareas = [];

  listaTareas.querySelectorAll(".tarea").forEach((tarea) => {
    const texto = tarea.querySelector("span").textContent;
    const completada = tarea.querySelector("input").checked;
    tareas.push({ texto, completada });
  });

  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Función para cargar tareas guardadas
function cargarTareas() {
  const listaTareas = document.getElementById("lista-tareas");
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  tareas.forEach(({ texto, completada }) => {
    const divTarea = document.createElement("div");
    divTarea.classList.add("tarea");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completada;
    checkbox.onchange = function () {
      spanTarea.classList.toggle("completada", checkbox.checked);
      guardarTareas();
    };

    const spanTarea = document.createElement("span");
    spanTarea.textContent = texto;
    if (completada) spanTarea.classList.add("completada");

    const iconoBorrar = document.createElement("i");
    iconoBorrar.classList.add("bx", "bx-trash");
    iconoBorrar.onclick = function () {
      divTarea.remove();
      guardarTareas();
    };

    divTarea.appendChild(checkbox);
    divTarea.appendChild(spanTarea);
    divTarea.appendChild(iconoBorrar);

    listaTareas.appendChild(divTarea);
  });
}
