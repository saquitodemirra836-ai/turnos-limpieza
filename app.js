const usuarioSelect = document.getElementById("usuarioSelect");
const tareasContainer = document.getElementById("tareasContainer");
const grupoInfo = document.getElementById("grupoInfo");

// RELLENAR SELECT
usuarios.forEach(u => {
  let opt = document.createElement("option");
  opt.value = u;
  opt.textContent = u;
  usuarioSelect.appendChild(opt);
});

// OBTENER GRUPO
function obtenerGrupo(usuario) {
  for (const grupo in grupos) {
    if (grupos[grupo].includes(usuario)) return grupo;
  }
  return "Sin grupo";
}

// TAREAS DEL USUARIO
function tareasPara(usuario) {
  const zonaKeys = Object.keys(zonas);
  const pos = usuarios.indexOf(usuario);

  return zonaKeys.map((z, i) => ({
    zona: z,
    picto: zonas[z].picto,
    tarea: zonas[z].tareas[0],
    hora: "10:00 - 12:00"
  }));
}

// ACTUALIZAR PANTALLA
usuarioSelect.addEventListener("change", () => {
  const usuario = usuarioSelect.value;
  const grupo = obtenerGrupo(usuario);
  const tareas = tareasPara(usuario);

  grupoInfo.textContent = grupo;

  tareasContainer.innerHTML = "";

  tareas.forEach(t => {
    const div = document.createElement("div");
    div.className = "tarea";
    div.innerHTML = `
      <img src="${t.picto}" alt="${t.zona}">
      <div>
        <h3>${t.zona}</h3>
        <p class="lectura-facil">Tarea: <strong>${t.tarea}</strong></p>
        <p>Horario: ${t.hora}</p>
        <button onclick="this.disabled = true">Hecho ✔</button>
      </div>
    `;
    tareasContainer.appendChild(div);
  });
});

// CARGA INICIAL
usuarioSelect.value = usuarios[0];
usuarioSelect.dispatchEvent(new Event("change"));
