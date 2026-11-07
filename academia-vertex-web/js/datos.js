const WHATSAPP = '5493624505465';
const MAT = {
  alg: ['Álgebra y Geometría Analítica', 'Números complejos y polinomios|Sistemas de ecuaciones lineales|Matrices y determinantes|Espacios vectoriales|Transformaciones lineales|Cónicas y cuádricas|Vectores y valores propios'],
  am1: ['Análisis Matemático I', 'Funciones reales|Límites y continuidad|Derivadas|Aplicaciones de derivadas|Integrales|Técnicas de integración|Aplicaciones de integrales'],
  am2: ['Análisis Matemático II', 'Funciones de varias variables|Derivadas parciales|Integrales múltiples|Campos vectoriales|Integrales de línea|Series y sucesiones|Ecuaciones diferenciales básicas'],
  am3: ['Análisis Matemático III', 'Ecuaciones diferenciales ordinarias|Transformadas|Series de Fourier|Métodos numéricos|Aplicaciones físicas|Modelización matemática'],
  f1: ['Física I', 'Cinemática|Dinámica|Trabajo y energía|Cantidad de movimiento|Rotación|Estática'],
  f2: ['Física II', 'Electricidad|Magnetismo|Circuitos eléctricos|Ondas|Óptica|Electromagnetismo'],
  f3: ['Física III', 'Física moderna|Termodinámica avanzada|Física cuántica básica|Relatividad|Aplicaciones tecnológicas'],
  q: ['Química', 'Estructura atómica|Tabla periódica|Enlaces químicos|Reacciones químicas|Soluciones|Termodinámica|Electroquímica']
};
const MATERIAS_ING = ['alg', 'am1', 'am2', 'am3', 'f1', 'f2', 'f3', 'q'];
// Completar con testimonios reales: { nombre: 'Nombre A.', carrera: 'Carrera', texto: '...' }
const TESTIMONIOS = [];
const RESPUESTAS = [
  [/carrera|estudi|materia/, 'Dictamos clases para Ingeniería, Ingeniería Informática, Desarrollo de Software, Tecnicatura en Redes, Profesorado de Matemática, Arquitectura, Medicina/CBC, Ciencias Económicas y Farmacia. ¿Cuál te interesa?'],
  [/modalidad|presencial|virtual|online|zoom/, 'Hay dos modalidades: presencial y virtual. En las dos el seguimiento es personalizado.'],
  [/horario|cuando|cuándo|turno/, 'Los horarios se coordinan según tu disponibilidad. Escribinos por WhatsApp y los acordamos.'],
  [/precio|costo|cuanto|cuánto|valor|arancel/, 'Los valores se informan por consulta directa. Escribinos por WhatsApp y te pasamos el detalle.'],
  [/contacto|whatsapp|telefono|teléfono|correo|mail/, 'Podés escribirnos por WhatsApp con el botón verde o completar el formulario de contacto.'],
  [/hola|buenas|buen d/, '¡Hola! Soy el asistente de Academia Vertex. Preguntame por carreras, modalidades u horarios.']
];
const RESPUESTA_DEFECTO = 'Gracias por tu consulta. Para darte la mejor atención, escribinos por WhatsApp o completá el formulario de contacto.';
const UNI = 'Universidades públicas y privadas';
const CARRERAS = [
  { n: 'Ingeniería', f: 'ingenieria.png', e: '⚙️', c: '#eef4fd', d: 'Preparación universitaria para estudiantes de ingeniería con metodología práctica y acompañamiento personalizado. Ingeniería Civil, Industrial, Electrónica, Sistemas y ramas afines.', u: ['UTN', 'UBA', 'UNNE', 'UNC', 'UNCAUS'], m: MATERIAS_ING },
  { n: 'Ingeniería Informática', f: 'ingenieria_informatica_logo_corregido.png', e: '💻', c: '#eef6ff', d: 'Materias técnicas, matemáticas y de programación: sistemas operativos, algoritmos, redes y arquitectura de computadoras.', u: ['UTN', 'UBA', 'UNNE', 'UNCAUS'], m: MATERIAS_ING },
  { n: 'Desarrollo de Software', f: 'software.png', e: '🧑‍💻', c: '#eef4fd', d: 'Programación, algoritmos, bases de datos, desarrollo web y herramientas tecnológicas modernas, con enfoque práctico.', u: ['UTN', 'Institutos terciarios de software'], m: [] },
  { n: 'Tecnicatura en Redes', f: 'redes.png', e: '🌐', c: '#eef4fd', d: 'Conectividad, administración de redes, cableado estructurado, protocolos, seguridad informática y administración de servidores.', u: ['UTN', 'UNCAUS', 'Institutos terciarios tecnológicos'], m: ['am1', 'alg'] },
  { n: 'Profesorado de Matemática', f: 'profesorado de matematicas.png', e: '📐', c: '#f4f7ff', d: 'Contenidos matemáticos, razonamiento lógico y formación pedagógica para la enseñanza.', u: ['UNNE', 'UNCAUS', 'Institutos de formación docente'], m: MATERIAS_ING },
  { n: 'Arquitectura', f: 'arquitectura.png', e: '🏛️', c: '#f3f5f7', d: 'Materias técnicas, estructuras, matemática y áreas relacionadas, combinando teoría y práctica.', u: ['UBA', 'UNNE', 'UNC', 'UNCAUS'], m: [] },
  { n: 'Medicina / CBC', f: 'medicina.png', e: '🔬', c: '#fff0f0', d: 'Materias básicas y profesionales de medicina y ciencias de la salud, con organización de contenidos para parciales y finales.', u: ['UBA', 'UNNE', 'UNC', 'UNCAUS'], m: [] },
  { n: 'Ciencias Económicas', f: 'ciencia economica.png', e: '📊', c: '#faf5ff', d: 'Materias contables, económicas, matemáticas y financieras.', u: ['UBA', 'UNNE', 'UNC', 'UNCAUS'], m: ['am1', 'alg'] },
  { n: 'Farmacia', f: 'farmacia.png', e: '💊', c: '#eef4fd', d: 'Química, farmacología, biología y análisis clínicos, con práctica y resolución de ejercicios.', u: ['UBA', 'UNNE', 'UNC', 'UNCAUS'], m: [] }
];

// Fotos: poné los archivos en la carpeta img/ (ver img/LEEME.txt). Si falta una foto, el sitio sigue funcionando.
// Sin extensión: el sitio prueba .jpg, .jpeg, .png y .webp. Respetá mayúsculas y espacios del nombre.
const LOGO = 'img/logos/Logoacademia vertex';
const FOTO_PROFESOR = 'img/logos/fotoperfil';
// Capturas de alumnos aprobados (carpeta img/resultados/), nombres SIN extensión, tal como se llaman los archivos.
const GALERIA = ['aprobad1', 'aprobado 2', 'aprobado5', 'aprobado6', 'aprobado7', 'aprobado8', 'aprobado9'];
