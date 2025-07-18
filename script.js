const materias = [
  { anio: "1° AÑO", codigo: "1.01", nombre: "Introducción a las Ciencias Sociales", correlativas: [] },
  { anio: "1° AÑO", codigo: "1.02", nombre: "Procesos Históricos Mundiales y Patrimonio", correlativas: [] },
  { anio: "1° AÑO", codigo: "1.03", nombre: "Introducción al Turismo", correlativas: [] },
  { anio: "1° AÑO", codigo: "1.04", nombre: "Introducción a la Economía", correlativas: [] },
  { anio: "1° AÑO", codigo: "1.05", nombre: "Introducción a la Administración", correlativas: ["1.03"] },
  { anio: "1° AÑO", codigo: "1.06", nombre: "Geografía I", correlativas: [] },
  { anio: "1° AÑO", codigo: "1.07", nombre: "Inglés I", correlativas: [] },
  { anio: "1° AÑO", codigo: "1.08", nombre: "Servicios Turísticos I", correlativas: [] },

  { anio: "2° AÑO", codigo: "2.01", nombre: "Procesos Históricos Latinoamericanos y Patrimonio", correlativas: ["1.01", "1.02"] },
  { anio: "2° AÑO", codigo: "2.02", nombre: "Geografía II", correlativas: ["1.06"] },
  { anio: "2° AÑO", codigo: "2.03", nombre: "Sociología del Turismo", correlativas: ["1.01"] },
  { anio: "2° AÑO", codigo: "2.04", nombre: "Estadística Aplicada", correlativas: [] },
  { anio: "2° AÑO", codigo: "2.05", nombre: "Legislación Turística", correlativas: ["1.03"] },
  { anio: "2° AÑO", codigo: "2.06", nombre: "Economía del Turismo", correlativas: ["1.04"] },
  { anio: "2° AÑO", codigo: "2.07", nombre: "Inglés II", correlativas: ["1.07"] },
  { anio: "2° AÑO", codigo: "2.08", nombre: "Servicios Turísticos II", correlativas: ["1.03", "1.08"] },

  { anio: "3° AÑO", codigo: "3.01", nombre: "Procesos Históricos Argentinos y Patrimonio", correlativas: ["1.01", "1.02", "2.01"] },
  { anio: "3° AÑO", codigo: "3.09", nombre: "Contabilidad Financiera en las Organizaciones Turísticas", correlativas: ["1.05", "2.08"] },
  { anio: "3° AÑO", codigo: "3.10", nombre: "Matemática Aplicada", correlativas: ["1.04"] },
  { anio: "3° AÑO", codigo: "3.11", nombre: "Tecnologías aplicadas al Turismo", correlativas: ["1.03", "1.05", "2.08"] },
  { anio: "3° AÑO", codigo: "3.07", nombre: "Metodología", correlativas: ["1.01", "2.04"] },
  { anio: "3° AÑO", codigo: "3.12", nombre: "Régimen Tributario y Laboral de Empresas Turísticas", correlativas: ["1.03", "1.08", "2.05", "2.08"] },
  { anio: "3° AÑO", codigo: "3.13", nombre: "Contabilidad para la gestión turística", correlativas: ["1.01", "1.04", "1.05"] },
  { anio: "3° AÑO", codigo: "3.14", nombre: "Idioma II", correlativas: [] },

  { anio: "4° AÑO", codigo: "4.01", nombre: "Electiva I", correlativas: ["1.01", "2.08"] },
  { anio: "4° AÑO", codigo: "4.09", nombre: "Planificación Turística", correlativas: ["2.06", "2.08"] },
  { anio: "4° AÑO", codigo: "4.10", nombre: "Administración Financiera de las Organizaciones Turísticas", correlativas: ["1.05", "2.08", "3.11"] },
  { anio: "4° AÑO", codigo: "4.11", nombre: "Marketing Turístico", correlativas: ["1.03", "2.03", "2.08"] },
  { anio: "4° AÑO", codigo: "4.05", nombre: "Electiva II", correlativas: ["1.01", "2.08"] },
  { anio: "4° AÑO", codigo: "4.12", nombre: "Gestión de las Organizaciones Turísticas", correlativas: ["3.10", "3.12", "3.13"] },
  { anio: "4° AÑO", codigo: "4.13", nombre: "Formulación y Evaluación de Proyectos Turísticos", correlativas: ["3.10", "3.11", "3.13", "4.10"] },
  { anio: "4° AÑO", codigo: "4.14", nombre: "Electiva III", correlativas: ["1.01", "2.08"] },

  { anio: "FINAL", codigo: "4.07", nombre: "Formación Práctica Integral en Territorio", correlativas: ["1.01", "3.12"] },
  { anio: "FINAL", codigo: "4.08", nombre: "Taller de Trabajo Final Integrador", correlativas: ["3.01", "3.12"] },
  { anio: "FINAL", codigo: "5.01", nombre: "Trabajo Final Integrador", correlativas: ["1.01", "4.14"] },
];

const estados = {};

function puedeCursarse(materia) {
  return materia.correlativas.every(cor => estados[cor]);
}

function render() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  const agrupadas = {};
  materias.forEach(mat => {
    if (!agrupadas[mat.anio]) agrupadas[mat.anio] = [];
    agrupadas[mat.anio].push(mat);
  });

  Object.entries(agrupadas).forEach(([anio, lista]) => {
    const section = document.createElement("div");
    section.className = "anio";
    const titulo = document.createElement("h2");
    titulo.textContent = anio;
    section.appendChild(titulo);

    const subgrid = document.createElement("div");
    subgrid.className = "grid";

    lista.forEach(mat => {
      const div = document.createElement("div");
      div.className = "materia";
      div.textContent = `${mat.codigo} - ${mat.nombre}`;

      if (estados[mat.codigo]) {
        div.classList.add("aprobada");
      } else if (!puedeCursarse(mat)) {
        div.classList.add("bloqueada");
      }

      div.onclick = () => {
        estados[mat.codigo] = !estados[mat.codigo];
        render();
      };

      subgrid.appendChild(div);
    });

    section.appendChild(subgrid);
    grid.appendChild(section);
  });
}

render();
