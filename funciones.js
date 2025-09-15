// ---------------------------------------------------------------------------------------------------------------------
// VALIDACION FORMATO CORREO
function validacionCorreo(correo) {
    var va_correo = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return va_correo.test(correo);
}

// VALIDACION VACIO
function validacionVacio(campo) {
    return campo.val().trim() !== "";
}

// VALIDACION @gmail.cl
function correoEsGmail(correo) {
    return /@gmail\.com$/i.test(correo);
}

// VALIDACION NOMBRE: LETRAS, 50 CARACTERES MAX
function validacionNombre(nombreStr) {
    var va_caracteres = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,50}$/;
    return va_caracteres.test(nombreStr);
}

// VALIDACION CONTRASEÑA: >=8, 1 MAYUSCULA, 1 MINUSCULA, 1 NUMERO y 1 CARACTER ESPECIAL
function validacionPassword(password) {
    var va_caracteres = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return va_caracteres.test(password);
}

// VALIDACION TELEFONO: SOLO DIGITOS, LARGO 8 a 15
function validacionTelefono(telefonoTex) {
    if (telefonoTex.trim() === "") return true; // opcional
    return /^\d{8,15}$/.test(telefonoTex);
}

// VALIDACION CORREO UNICO (true si es unico)
function esCorreoUnico(correo) {
    var lista = JSON.parse(localStorage.getItem("usuariosRegistrados") || "[]");
    return !lista.includes(correo.toLowerCase());
}

//GUARDAR USUARIO
function guardarUsuarioEnLocalStorage(nombre, correo, password, telefono, direccion) {
    var lista = JSON.parse(localStorage.getItem("usuariosRegistrados") || "[]");
    lista.push({nombre, correo: correo.toLowerCase(), password, telefono, direccion});
    localStorage.setItem("usuariosRegistrados", JSON.stringify(lista));//
}

// CAMBIAR USUARIO EN LOCALSTORAGE
function cambiarUsuarioEnLocalStorage(correo, password) {
    var lista = JSON.parse(localStorage.getItem("usuariosRegistrados") || "[]");
    var usuario = null;
    for(var i = 0; i < lista.length; i++) {
        if (lista[i]?.correo === correo.toLowerCase()) {
            usuario = lista[i];
            lista[i].password = password;
            break;
        }
    }
    if (usuario) {
        localStorage.setItem("usuariosRegistrados", JSON.stringify(lista));
        return true;
    } else {
        return false;
    }
}

// VALIDACION REGISTRO
function validacionRegistro() {
    $("#resultado").empty();

    var nombre = $("#nombre");
    var correo = $("#correo");
    var password = $("#password");
    var confirmPassword = $("#confirmPassword");
    var telefono = $("#telefono");
    var direccion = $("#direccion");

    // ARRAYS PARA ERRORES Y VACIONS
    var camposVacios = [];
    var textoErrores = [];

    //VALIDAR QUE NO SEA VACIO
    if (!validacionVacio(nombre)) camposVacios.push("Nombre completo");
    if (!validacionVacio(correo)) camposVacios.push("Correo electrónico");
    if (!validacionVacio(password)) camposVacios.push("Contraseña");
    if (!validacionVacio(confirmPassword)) camposVacios.push("Confirmación de contraseña");

    // VALIDACIONES ESPECIFICAS
    if (validacionVacio(nombre) && !validacionNombre(nombre.val().trim()))
        textoErrores.push("El nombre debe contener solo letras y espacios (máx 50 caracteres).");

    if (validacionVacio(correo)) {
        var correoVal = correo.val().trim();
        if (!validacionCorreo(correoVal)) textoErrores.push("El formato del correo no es válido.");
        else if (!correoEsGmail(correoVal)) textoErrores.push("El correo debe pertenecer al dominio @gmail.com.");
        else if (!esCorreoUnico(correoVal)) textoErrores.push("El correo ya está registrado en el sistema.");
    }

    if (validacionVacio(password) && !validacionPassword(password.val()))
        textoErrores.push("La contraseña debe tener al menos 8 caracteres, incluir mayúscula, minúscula, número y carácter especial.");

    if (validacionVacio(password) && validacionVacio(confirmPassword) && password.val() !== confirmPassword.val())
        textoErrores.push("Las contraseñas no coinciden.");

    if (!validacionTelefono(telefono.val())) textoErrores.push("El teléfono debe contener solo números (8-15 dígitos).");

    if (camposVacios.length || textoErrores.length) {
        var mensajeError = "<div class='alert alert-danger'>";
        if (camposVacios.length) mensajeError += "<strong>Campos vacíos:</strong><br>• " + camposVacios.join("<br>• ") + "<br>";
        if (textoErrores.length) mensajeError += "<strong>Errores de formato:</strong><br>• " + textoErrores.join("<br>• ");
        mensajeError += "</div>";
        $("#resultado").html(mensajeError);
    } else {
        guardarUsuarioEnLocalStorage(nombre.val().trim(), correo.val().trim(), password.val(), telefono.val().trim(), direccion.val().trim());
        $("#resultado").html("<div class='alert alert-success'><strong>¡Perfecto!</strong> Registro completado correctamente.</div>");
        $("#formRegistro")[0].reset();
    }

    return false;
}

function validacionCambioPassword() {
    $("#resultado").empty();

    var correo = $("#correo")
    var password = $("#password")
    var confirmPassword = $("#confirmPassword")

    //ARRAYS PARA ERRORES Y VACIOS
    var camposVacios = [];
    var textoErrores = [];

    //VALIDAR QUE NO SEA VACIO
    if (!validacionVacio(correo)) camposVacios.push("Correo electrónico");
    if (!validacionVacio(password)) camposVacios.push("Contraseña");
    if (!validacionVacio(confirmPassword)) camposVacios.push("Confirmación de contraseña");

    // VALIDACIONES ESPECIFICAS
    if (validacionVacio(correo)) {
        var correoVal = correo.val().trim();
        if (!validacionCorreo(correoVal)) textoErrores.push("El formato del correo no es válido.");
        else if (!correoEsGmail(correoVal)) textoErrores.push("El correo debe pertenecer al dominio @gmail.com.");
        else if (!esCorreoUnico(correoVal)) textoErrores.push("El correo ya está registrado en el sistema.");
    }

    if (validacionVacio(password) && !validacionPassword(password.val()))
        textoErrores.push("La contraseña debe tener al menos 8 caracteres, incluir mayúscula, minúscula, número y carácter especial.");

    if (validacionVacio(password) && validacionVacio(confirmPassword) && password.val() !== confirmPassword.val())
        textoErrores.push("Las contraseñas no coinciden.");

    if (camposVacios.length || textoErrores.length) {
        var mensajeError = "<div class='alert alert-danger'>";
        if (camposVacios.length) mensajeError += "<strong>Campos vacíos:</strong><br>• " + camposVacios.join("<br>• ") + "<br>";
        if (textoErrores.length) mensajeError += "<strong>Errores de formato:</strong><br>• " + textoErrores.join("<br>• ");
        mensajeError += "</div>";
        $("#resultado").html(mensajeError);
    } else {
        cambiarUsuarioEnLocalStorage(correo.val().trim(), password.val());
        $("#resultado").html("<div class='alert alert-success'> Cambio de contraseña completado correctamente.</div>");
        $("#formCambioPass")[0].reset();
    }

    return false;
}

// LOGIN
function iniciarSesion(correo, password) {
    var lista = JSON.parse(localStorage.getItem("usuariosRegistrados") || "[]");
    var usuario = null;
    for(var i = 0; i < lista.length; i++) {
        if (lista[i].correo === correo.toLowerCase() && lista[i].password === password) {
            usuario = lista[i];
            break;
        }
    }
    if (usuario) {
        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
        return true;
    } else {
        return false;
    }
}

// PERFIL E INFORMACION
function mostrarUsuarioNav() {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo") || "null");
    const menu = $("#userMenu + .dropdown-menu");

    if (usuario) {
        // USUARIO LOGUEADO
        menu.html(
            `<li><strong>${usuario.nombre}</strong></li>
            <li><span class='text-muted'>${usuario.correo}</span></li>
            <li><a class='dropdown-item text-dark' href='gestionperfil.html'>Gestionar Perfil</a></li>
            <li><a class='dropdown-item text-dark' href='historialcompras.html'>Historial de compras</a></li>
            <li><hr class='dropdown-divider'></li>
            <li><a class='dropdown-item text-success' href='passchange.html'>Cambiar contraseña</a></li>
            <li><a class='dropdown-item text-danger' href='#' id='cerrarSesion'>Cerrar sesión</a></li>`
        );
        $("#cerrarSesion").click(function() {
            localStorage.removeItem("usuarioActivo");
            location.href = "login.html";
        });
    } else {
        // Invitado
        menu.html(
            `<li><strong>Invitado</strong></li>
            <li class='text-muted'>No has iniciado sesión</li>
            <li><hr class='dropdown-divider'></li>
            <li><a class='dropdown-item text-success' href='registro.html'>Registrarse</a></li>
            <li><a class='dropdown-item text-success' href='login.html'>Iniciar sesión</a></li>`
        );
    }
    $(".nav-item.dropdown").show();
}

// ACTUALIZAR PERFIL
function actualizarPerfil(nombre, direccion, telefono, password) {
    var usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo") || "null");
    if (!usuarioActivo) return false;

    var lista =JSON.parse(localStorage.getItem("usuariosRegistrados") || "[]");

    for (var i = 0; i < lista.length; i++) {
        if (lista[i].correo === usuarioActivo.correo){
            lista[i].nombre = nombre;
            lista[i].direccion = direccion;
            lista[i].telefono = telefono;
            if (password.trim() !== "") lista[i].password = password;
            usuarioActivo = lista[i];
            break;
        }
    }

    localStorage.setItem("usuariosRegistrados", JSON.stringify(lista));
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));
    return true;
}

// CAMBIAR USUARIO
function cambiarUsuarioEnLocalStorage(correo, password) {
    var lista = JSON.parse(localStorage.getItem("usuariosRegistrados") || "[]");
    var usuario = null;
    for(var i = 0; i < lista.length; i++) {
        if (lista[i]?.correo === correo.toLowerCase()) {
            usuario = lista[i];
            lista[i].password = password;
            break;
        }
    }
    if (usuario) {
        localStorage.setItem("usuariosRegistrados", JSON.stringify(lista));
        return true;
    } else {
        return false;
    }
}

// BOTONES
mostrarUsuarioNav();

// REGISTRO
$("#btnRegistrar").click(validacionRegistro);

// LOGIN
$("#btnLogin").click(function() {
    var correo = $("#correo").val().trim();
    var password = $("#password").val();
    if (iniciarSesion(correo, password)) {
        location.href = "index.html";
    } else {
        $("#loginResultado").html("<div class='alert alert-danger'>Correo o contraseña incorrectos.</div>");
    }
});

// CAMBIAR CONTRASEÑA
$("#btnCambiarPass").click(validacionCambioPassword);

$("#btnActualizarPerfil").click(function() {
    var nombre = $("#nombre").val().trim();
    var direccion = $("#direccion").val().trim();
    var telefono = $("#telefono").val().trim();
    var password = $("#password").val().trim();

    if (actualizarPerfil(nombre,direccion,telefono,password)) {
        $("#perfilResultado").html("<div class='alert alert-success'>Perfil actualizado correctamente.</div>");
    } else {
        $("#perfilResultado").html("<div class='alert alert-danger'>Error al actualizar perfil.</div>");
    }
})

// ---------------------------------------------------------------------------------------------------------------------
// CARRITO DE COMPRAS

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito") || "[]");
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// CARRITO AL INICIAR
document.addEventListener("DOMContentLoaded", actualizarCarrito);

// AGREGAR PRODUCTO
function agregarAlCarrito(codigo, nombre, precio, unidad, cantidad) {
    var carrito = obtenerCarrito();
    const index = carrito.findIndex(item => item.codigo === codigo);
    if(index !== -1) carrito[index].cantidad += cantidad;
    else carrito.push({codigo, nombre, precio, unidad, cantidad});

    guardarCarrito(carrito);
    actualizarCarrito();
}

// ELIMINAR PRODUCTO
function eliminarProductoCarrito(codigo) {
    var carrito = obtenerCarrito();
    carrito = carrito.filter(item => item.codigo !== codigo);
    guardarCarrito(carrito);
    actualizarCarrito();
}

// SUMAR PRODUCTO
function sumarProducto(codigo) {
    var carrito = obtenerCarrito();
    const index = carrito.findIndex(item => item.codigo === codigo);
    if(index !== -1){
        carrito[index].cantidad += 1;
        guardarCarrito(carrito);
        actualizarCarrito();
    }
}

// RESTAR PRODUCTO
function restarProducto(codigo) {
    var carrito = obtenerCarrito();
    const index = carrito.findIndex(item => item.codigo === codigo);

    if (index !== -1) {
        carrito[index].cantidad -= 1;
        if (carrito[index].cantidad <= 0) {
            carrito = carrito.filter(item => item.codigo !== codigo);
        }
        guardarCarrito(carrito);
        actualizarCarrito();
    }
}

// VACIAR CARRITO
function vaciarCarrito() {
    var carrito = [];
    guardarCarrito(carrito);
    actualizarCarrito();
}

// REALIZAR COMPRA
function realizarCompra() {
    if(obtenerCarrito().length === 0){ alert("Carrito vacío"); return; }
    procesarCompra();
}

// CARRITO EN PANTALLA
function actualizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total-carrito");
    var carrito = obtenerCarrito();
    if (!lista || !totalCarrito) return;
    var total = 0;

    carrito.forEach(item => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        li.innerHTML = `
            <div>${item.nombre} (${item.cantidad} ${item.unidad})</div>
            <div>
                <button class="btn btn-sm btn-outline-success me-1" onclick="sumarProducto('${item.codigo}')">+</button>
                <button class="btn btn-sm btn-outline-warning me-1" onclick="restarProducto('${item.codigo}')">-</button>
                <button class="btn btn-sm btn-outline-danger ms-2" onclick="eliminarProductoCarrito('${item.codigo}')">Eliminar</button>
                <span class="ms-2">$${item.precio * item.cantidad} CLP</span>
            </div>
        `;
        lista.appendChild(li);
        total += item.precio * item.cantidad;
    });

    totalCarrito.textContent = total;
}

// FILTROS
const filtros = document.querySelectorAll(".filtro-btn");
filtros.forEach(btn => {
    btn.addEventListener("click", () => {
        filtros.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        filtrarProductos(btn.getAttribute("data-categoria"));
    });
});

// FILTRAR PRODUCTOS
function filtrarProductos(categoria){
    document.querySelectorAll(".producto").forEach(prod => {
        prod.style.display = (categoria === "todos" || prod.getAttribute("data-categoria") === categoria) ? "block" : "none";
    });
}

// BUSCADOR
const buscador = document.getElementById("buscador");
if(buscador){
    buscador.addEventListener("input", () => {
        const texto = buscador.value.toLowerCase();
        document.querySelectorAll(".producto").forEach(prod => {
            const nombre = prod.querySelector("h3").textContent.toLowerCase();
            const descripcion = prod.querySelector(".descripcion").textContent.toLowerCase();
            prod.style.display = (nombre.includes(texto) || descripcion.includes(texto)) ? "block" : "none";
        });
    });
}

//DESCRIPCIONES DE CATEGORÍAS
const descripcionesCategorias = {
    todos: "Mira todo nuestro catálogo de productos frescos y orgánicos.",
    frutas: "Nuestra selección de frutas frescas ofrece una experiencia directa del campo a tu hogar. Estas frutas se cultivan y cosechan en el punto óptimo de madurez para asegurar su sabor y frescura. Disfruta de una variedad de frutas de temporada que aportan vitaminas y nutrientes esenciales a tu dieta diaria. Perfectas para consumir solas, en ensaladas o como ingrediente principal en postres y smoothies.",
    verduras: "Descubre nuestra gama de verduras orgánicas, cultivadas sin el uso de pesticidas ni químicos, garantizando un sabor auténtico y natural. Cada verdura es seleccionada por su calidad y valor nutricional, ofreciendo una excelente fuente de vitaminas, minerales y fibra. Ideales para ensaladas, guisos y platos saludables, nuestras verduras orgánicas promueven una alimentación consciente y sostenible.",
    organicos: "Nuestros productos orgánicos están elaborados con ingredientes naturales y procesados de manera responsable para mantener sus beneficios saludables. Desde aceites y miel hasta granos y semillas, ofrecemos una selección que apoya un estilo de vida saludable y respetuoso con el medio ambiente. Estos productos son perfectos para quienes buscan opciones alimenticias que aporten bienestar sin comprometer el sabor ni la calidad.",
    lacteos: "Los productos lácteos de HuertoHogar provienen de granjas locales que se dedican a la producción responsable y de calidad. Ofrecemos una gama de leches, yogures y otros derivados que conservan su frescura y sabor auténtico. Ricos en calcio y nutrientes esenciales, nuestros lácteos son perfectos para complementar una dieta equilibrada, proporcionando el mejor sabor y nutrición para toda la familia."
};

//ACTUALIZAR DESCRIPCIÓN
document.querySelectorAll(".filtro-btn").forEach(boton => {
    boton.addEventListener("click", () => {
        const categoria = boton.getAttribute("data-categoria");
        document.getElementById("descripcion-categoria").textContent =
            descripcionesCategorias[categoria] || "";
    });
});

// Mostrar descripción
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("descripcion-categoria").textContent =
        descripcionesCategorias["todos"];
});

// ---------------------------------------------------------------------------------------------------------------------
// OBTENER HISTORIAL DE COMPRAS
function obtenerHistorial() {
    const historialJSON = localStorage.getItem('historialCompras');
    return historialJSON ? JSON.parse(historialJSON) : [];
}

// GUARDAR HISTORIAL DE COMPRAS
function guardarHistorial(historial) {
    localStorage.setItem('historialCompras', JSON.stringify(historial));
}



// AGREGAR COMPRAS AL HISTORIAL
function agregarComprasAlHistorial(productos) {
    const historial = obtenerHistorial();
    // Asumimos que cada producto tiene 'nombre', 'precio' y 'cantidad'

    const itemsComprados = productos.map(p => ({
        producto: p.nombre,
        precio: p.precio,
        cantidad: p.cantidad,
        codigo: p.codigo,
        unidad: p.unidad
    }));

    const nuevaCompra = {
        id: Date.now(), // ID único para la compra usando el timestamp
        fecha: new Date().toLocaleDateString('es-ES'),
        items: itemsComprados,
        calificacion: null
    };
    historial.push(nuevaCompra);
    guardarHistorial(historial);
}

// MOSTRAR EL HISTORIAL
function mostrarHistorialCompras() {
    const historial = obtenerHistorial();
    const historialTableBody = document.getElementById('historial-compras-table')?.getElementsByTagName('tbody')[0];

    if (historialTableBody) {
        historialTableBody.innerHTML = ''; // Limpiar la tabla antes de rellenarla
        historial.reverse().forEach(compra => { // .reverse() para mostrar las más recientes primero
            const nombresProductos = compra.items.map(item => item.producto).join(', ');
            const precioTotal = compra.items.reduce((total, item) => total + (item.precio * item.cantidad), 0);

            const row = historialTableBody.insertRow();
            row.innerHTML = `
                <td>${nombresProductos}</td>
                <td>${compra.fecha}</td>
                <td>$${precioTotal.toFixed(2)}</td>
                <td>
                    <select onchange="calificarCompra(${compra.id}, this.value)" ${compra.calificacion ? 'disabled' : ''}>
                        <option value="">${compra.calificacion ? `${compra.calificacion} estrellas` : 'Calificar'}</option>
                        <option value="1">1 Estrella</option>
                        <option value="2">2 Estrellas</option>
                        <option value="3">3 Estrellas</option>
                        <option value="4">4 Estrellas</option>
                        <option value="5">5 Estrellas</option>
                    </select>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="repetirPedido(${compra.id})">
                        Repetir pedido
                    </button>
                </td>
            `;
        });
    }
}

// CALIFICAR COMPRAS
function calificarCompra(compraId, calificacion) {
    if (!calificacion) return;

    const historial = obtenerHistorial();
    const compraIndex = historial.findIndex(c => c.id === compraId);

    if (compraIndex !== -1) {
        historial[compraIndex].calificacion = parseInt(calificacion);
        guardarHistorial(historial);
        alert(`¡Gracias por tu calificación de ${calificacion} estrellas!`);
        // Volver a renderizar para deshabilitar el select y mostrar la calificación
        mostrarHistorialCompras();
    }
}

// REPETIR LA COMPRA EN EL HISTORIAL
function repetirPedido(compraId) {
    const historial = obtenerHistorial();
    const compra = historial.find(c => c.id === compraId);

    if (compra && compra.items) {
        var carritoActual = obtenerCarrito();
        compra.items.forEach(item => {
            const productoEnCarrito = carritoActual.find(p => p.codigo === item.codigo);
            if (productoEnCarrito) {
                productoEnCarrito.cantidad += item.cantidad;
            } else {
                carritoActual.push({
                    codigo: item.codigo,
                    nombre: item.producto,
                    precio: item.precio,
                    unidad: item.unidad,
                    cantidad: item.cantidad
                });
            }
        });
        guardarCarrito(carritoActual);
        window.location.href = 'carrito.html';
    } else {
        alert('No se pudo encontrar la información de la compra.');
    }
}

// PROCESAR LA COMPRA
function procesarCompra() {
    const carrito = obtenerCarrito();

    if (carrito.length > 0) {
        agregarComprasAlHistorial(carrito);
        vaciarCarrito();
        alert('¡Compra realizada con éxito! Revisa tu historial.');
        window.location.href = 'historialcompras.html';
    } else {
        alert('Tu carrito está vacío.');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    // EJECUTAR SOLO EN HISTORIAL COMPRAS
    if (window.location.pathname.endsWith('historialcompras.html')) {
        mostrarHistorialCompras();
    }
});

// ---------------------------------------------------------------------------------------------------------------------
// VALOR POR ARBOL Y KM DE AUTO
const CONVERSION_FACTORS = {
    arbolxKgCO2: 0.48,
    KmautoxKgCO2: 4.2
};

// INICIAR CALCULADORA
$(document).ready(function() {

    $('.producto-input').on('input change keyup', function() {
        calcularImpacto();
    });

    // CALCULAR
    calcularImpacto();
});

// FUNCION PARA CALCULAR EL IMPACTO DE LOS PRODUCTOS
function calcularImpacto() {
    var totalCarbon = 0;
    var productosUsados = 0;

    // RECORRER CADA PRODUCTO
    $('.producto-input').each(function() {
        const cantidad = parseFloat($(this).val()) || 0;
        const carbonPorUnidad = parseFloat($(this).data('carbon')) || 0;

        if (cantidad > 0) {
            totalCarbon += cantidad * carbonPorUnidad;
            productosUsados++;
        }
    });

    totalCarbon = Math.max(0, totalCarbon);

    actualizarResultados(totalCarbon, productosUsados);
}

// ACTUALIZAR RESULTADOS
function actualizarResultados(totalCarbon, productosUsados) {
    // ACTUALIZAR EL CO2
    $('#total-carbon').text(totalCarbon.toFixed(1));

    // CALCULAR LOS ARBOLES Y KM CON LOS PRODUCTOS
    const arbolesPlantados = Math.round(totalCarbon * CONVERSION_FACTORS.arbolxKgCO2);
    const kmAuto = Math.round(totalCarbon * CONVERSION_FACTORS.KmautoxKgCO2);

    // ACTUALIZR EL CALCULO
    $('#arboles-plantados').text(arbolesPlantados);
    $('#km-auto').text(kmAuto);

    // 10KG DE CARBONO ES NEUTRAL
    const progresoMaximo = 10;
    var progreso = Math.min((totalCarbon / progresoMaximo) * 100, 100);
    progreso = Math.max(0, progreso); // No menor a 0

    $('#barra-impacto').css('width', progreso + '%');
    $('#porcentaje-impacto').text(Math.round(progreso) + '%');

    if (progreso > 0) {
        $('#barra-impacto').addClass('progress-bar-animated');
    }

    // CAMBIAR EL COLOR DE LA BARRA POR %
    actualizarColorBarra(progreso);
}

// COLOR DE LA BARRA
function actualizarColorBarra(progreso) {
    const barra = $('#barra-impacto');

    barra.removeClass('bg-success bg-info bg-warning bg-secondary');

    if (progreso >= 70) {
        barra.addClass('bg-success'); // Verde - Excelente
    } else if (progreso >= 40) {
        barra.addClass('bg-info'); // Azul - Bueno
    } else if (progreso >= 15) {
        barra.addClass('bg-warning'); // Amarillo - Regular
    } else {
        barra.addClass('bg-secondary'); // Gris - Inicial
    }
}

// REINICIAR CALCULADORA
function resetCalculadora() {
    $('.producto-input').val(0);

    calcularImpacto();

    $('.calculadora-resultado').fadeOut(200).fadeIn(400);
}
