(function () {
  "use strict";

  /* ---------- utilidades ---------- */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  function fecha(s) {
    if (!s) return "";
    var m = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String(s).trim());
    if (!m) return String(s);
    var d = new Date(+m[1], +m[2] - 1, m[3] ? +m[3] : 1);
    if (isNaN(d.getTime())) return String(s);
    var t = d.toLocaleDateString("es-MX", m[3]
      ? { day: "numeric", month: "long", year: "numeric" }
      : { month: "long", year: "numeric" });
    return t.charAt(0).toUpperCase() + t.slice(1);
  }

  function iniciales(nombre) {
    var p = String(nombre || "?").trim().split(/\s+/).slice(0, 2);
    return p.map(function (w) { return w.charAt(0); }).join("").toUpperCase() || "?";
  }

  function vacio(titulo, texto) {
    var d = el("div", "empty");
    d.appendChild(el("b", "", titulo));
    d.appendChild(el("span", "", texto));
    return d;
  }

  var datosClientes = typeof CLIENTES !== "undefined" && Array.isArray(CLIENTES) ? CLIENTES : [];
  var datosResenas = typeof RESENAS !== "undefined" && Array.isArray(RESENAS) ? RESENAS : [];
  var cfg = typeof CONFIG !== "undefined" ? CONFIG : { empresa: "Rosas & Asociados", whatsapp: "526151127516" };

  /* ---------- página Clientes ---------- */
  function paginaClientes() {
    var box = document.getElementById("lista");
    var lista = datosClientes.filter(function (c) { return c && c.nombre; });
    if (!lista.length) {
      box.appendChild(vacio("Próximamente", "Muy pronto compartiremos aquí a las empresas con las que hemos trabajado."));
      return;
    }
    lista.forEach(function (c) {
      var card = el("article", "cli");
      var ph = el("div", "ph");
      var ini = el("div", "ini", iniciales(c.nombre));
      ini.setAttribute("aria-hidden", "true");
      if (c.foto) {
        var img = new Image();
        img.alt = "Foto de " + c.nombre;
        img.loading = "lazy";
        img.onerror = function () { img.remove(); ph.appendChild(ini); };
        img.src = c.foto;
        ph.appendChild(img);
      } else {
        ph.appendChild(ini);
      }
      var body = el("div", "body");
      body.appendChild(el("h3", "", c.nombre));
      if (c.servicio) body.appendChild(el("span", "tag", c.servicio));
      if (c.fecha) {
        var t = el("time", "", fecha(c.fecha));
        t.setAttribute("datetime", String(c.fecha));
        body.appendChild(t);
      }
      card.appendChild(ph);
      card.appendChild(body);
      box.appendChild(card);
    });
  }

  /* ---------- página Reseñas ---------- */
  function paginaResenas() {
    var validas = datosResenas.filter(function (r) {
      var n = Number(r && r.calificacion);
      var ok = r && n >= 1 && n <= 10 && r.comentario;
      if (!ok && r) console.warn("Reseña ignorada (revisa calificacion 1-10 y comentario):", r);
      return ok;
    }).map(function (r) {
      return { cal: Number(r.calificacion), com: String(r.comentario), nombre: r.nombre, fecha: r.fecha };
    });

    validas.sort(function (a, b) { return String(b.fecha || "").localeCompare(String(a.fecha || "")); });

    var total = validas.length;
    var suma = validas.reduce(function (s, r) { return s + r.cal; }, 0);
    document.getElementById("total").textContent = total;
    if (total) {
      document.getElementById("prom").textContent = (suma / total).toFixed(1);
      document.getElementById("de10").hidden = false;
    }

    var box = document.getElementById("lista");
    if (!total) {
      box.appendChild(vacio("Aún no hay reseñas", "Sé la primera persona en compartir su experiencia."));
    }
    validas.forEach(function (r) {
      var card = el("article", "rev");
      var top = el("div", "top");
      var badge = el("span", "badge", String(r.cal).replace(/\.0$/, ""));
      badge.appendChild(el("small", "", " / 10"));
      var meter = el("div", "meter");
      var fill = el("i");
      fill.style.setProperty("--v", (r.cal * 10) + "%");
      meter.appendChild(fill);
      meter.setAttribute("aria-hidden", "true");
      top.appendChild(badge);
      top.appendChild(meter);
      card.appendChild(top);
      card.appendChild(el("p", "", r.com));
      var who = el("div", "who");
      who.appendChild(el("b", "", r.nombre || "Cliente"));
      if (r.fecha) who.appendChild(document.createTextNode(" · " + fecha(r.fecha)));
      card.appendChild(who);
      box.appendChild(card);
    });

    /* Ventana para dejar reseña */
    var dlg = document.getElementById("dlg");
    var form = document.getElementById("form");
    var err = document.getElementById("err");
    var paso1 = document.getElementById("paso1");
    var gracias = document.getElementById("gracias");

    function abrir() {
      form.reset();
      err.textContent = "";
      paso1.hidden = false;
      gracias.hidden = true;
      if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
    }
    function cerrar() {
      if (typeof dlg.close === "function") dlg.close(); else dlg.removeAttribute("open");
    }

    document.getElementById("abrir").addEventListener("click", abrir);
    document.getElementById("cancelar").addEventListener("click", cerrar);
    document.getElementById("cerrar").addEventListener("click", cerrar);
    dlg.addEventListener("click", function (e) { if (e.target === dlg) cerrar(); });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var r = form.querySelector('input[name="cal"]:checked');
      var com = form.comentario.value.trim();
      var nombre = form.nombre.value.trim();
      if (!r) { err.textContent = "Elige una calificación del 1 al 10."; return; }
      if (com.length < 10) { err.textContent = "Escribe un comentario de al menos 10 caracteres."; return; }
      err.textContent = "";

      var msg = "Hola, quiero dejar una reseña de " + cfg.empresa + "." +
        "\n\nCalificación: " + r.value + "/10" +
        "\nComentario: " + com +
        (nombre ? "\nNombre: " + nombre : "");
      var a = document.createElement("a");
      a.href = "https://wa.me/" + cfg.whatsapp + "?text=" + encodeURIComponent(msg);
      a.target = "_blank";
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();

      paso1.hidden = true;
      gracias.hidden = false;
    });
  }

  /* ---------- arranque ---------- */
  var y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();

  var page = document.body.getAttribute("data-page");
  if (page === "clientes") paginaClientes();
  if (page === "resenas") paginaResenas();
})();
