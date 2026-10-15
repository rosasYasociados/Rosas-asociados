// =====================================================================
//  DATOS DEL SITIO - Rosas & Asociados
//  Este es el ÚNICO archivo que hay que editar para agregar clientes
//  y reseñas. No toques nada más.
//
//  REGLAS PARA NO ROMPER LA PÁGINA:
//   - Cada cliente o reseña va entre llaves { }  y termina con coma ,
//   - Los textos van entre comillas "así"
//   - No borres los corchetes [ ] ni el punto y coma ; del final
//   - Para "desactivar" una línea de ejemplo, déjala con // al inicio
// =====================================================================

const CONFIG = {
  empresa: "Rosas & Asociados",
  // Número que recibe las reseñas por WhatsApp (país + número, sin signos)
  whatsapp: "526151127516"
};

// ---------------------------------------------------------------------
//  CLIENTES   (página "Clientes")
//  Al dar clic en un cliente se abre una ventana con todos sus detalles.
//
//  Campos de cada cliente:
//    nombre       -> obligatorio. Nombre del cliente o empresa.
//    servicio     -> obligatorio. Tipo de servicio (mejor corto).
//    fecha        -> obligatorio. "2026-03" (mes), "2026-03-15" (día)
//                    o texto libre como "Septiembre 2026".
//    foto         -> OPCIONAL. Nombre de la imagen, por ejemplo "salinera.jpg".
//    descripcion  -> OPCIONAL. Texto largo con el detalle del servicio.
//                    Para un salto de línea escribe \n dentro del texto.
//    archivo      -> OPCIONAL. Archivo del servicio (PDF, imagen, etc.).
//                    Aparece como "Archivo del servicio" en la ventana.
//                    Ejemplo: "informe-salinera.pdf"
//                    Para varios archivos: ["informe.pdf", "fotos.pdf"]
//
//  Las fotos y archivos se suben a GitHub en la misma carpeta que
//  index.html, y el nombre debe ser IDÉNTICO (mayúsculas, minúsculas
//  y extensión).
//
//  EJEMPLO COMPLETO (quita los // del inicio para activarlo):
//    {
//      nombre: "Transportes del Norte",
//      servicio: "Diagnóstico de brechas de cumplimiento",
//      fecha: "2026-03",
//      foto: "transportes.jpg",
//      descripcion: "Se revisaron las unidades y la documentación.\nSe entregó un plan de acción priorizado.",
//      archivo: "informe-transportes.pdf"
//    },
//
//  IMPORTANTE: pide permiso al cliente antes de publicar su nombre,
//  su foto o sus archivos.
// ---------------------------------------------------------------------
const CLIENTES = [

//  {
//    nombre: "Sales y Químicos de la Baja",
//    servicio: "Delimitación de áreas críticas mediante pintura amarilla, roja y blanca.",
//    fecha: "Septiembre 2026",
//    foto: "quimicas.jpeg"
    // Para activar el detalle, agrega una coma después de la foto y quita los //:
    // descripcion: "Escribe aquí el detalle del servicio.",
    // archivo: "nombre-del-archivo.pdf"
  },

];

// ---------------------------------------------------------------------
//  RESEÑAS   (página "Reseñas")
//  El promedio y el total se calculan solos con lo que pongas aquí.
//
//  Campos de cada reseña:
//    calificacion -> obligatorio. Número del 1 al 10.
//    comentario   -> obligatorio. El texto de la reseña.
//    nombre       -> opcional. Nombre o empresa de quien opina.
//    fecha        -> opcional. Formato "2026-03" o "2026-03-15".
//
//  Las reseñas nuevas llegan por WhatsApp. Cuando las revises y quieras
//  publicarlas, cópialas aquí.
//
//  EJEMPLO (quita los // del inicio de las líneas para activarlo):
//    {
//      calificacion: 9,
//      comentario: "Nos ayudaron a ordenar el cumplimiento de la empresa.",
//      nombre: "Empresa Ejemplo",
//      fecha: "2026-03"
//    },
// ---------------------------------------------------------------------
const RESENAS = [
  // Agrega aquí las reseñas aprobadas:

];
