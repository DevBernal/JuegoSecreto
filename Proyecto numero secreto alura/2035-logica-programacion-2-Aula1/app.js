// Establecer variables globales
let numeroSecreto = 0; // Almacenar el número secreto
let intentos = 1; // Contador de intentos
let listaNumerosSorteados = []; // Lista de números ya sorteados
let numeroMaximo = 10; // Número máximo permitido

/**
 * Función para cambiar el texto de un elemento HTML
 * @param {string} elemento - Selector del elemento HTML
 * @param {string} texto - Texto que se desea asignar
 */
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

// Inicializar las condiciones del juego
condicionesIniciales();

/**
 * Función principal para verificar el intento del usuario
 */
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value); // Capturar valor ingresado por el usuario
    
    if (numeroDeUsuario === numeroSecreto) {
        // Usuario acierta el número secreto
        asignarTextoElemento(
            'p',
            `¡Acertaste el número secreto en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}!`
        );
        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilitar botón de reiniciar
    } else {
        // Usuario no acierta, dar pistas
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        
        intentos++; // Incrementar contador de intentos
        limpiarCaja(); // Limpiar caja de texto
    }
}

/**
 * Función para vaciar la caja de texto donde el usuario ingresa el número
 */
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

/**
 * Función para generar un número aleatorio único
 * @returns {number} Número pseudoaleatorio
 */
function crearNumeroRandom() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    if (listaNumerosSorteados.length === numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
    } else {
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            // Si el número ya fue generado, intentar nuevamente
            return crearNumeroRandom();
        } else {
            listaNumerosSorteados.push(numeroGenerado); // Agregar número a la lista
            return numeroGenerado;
        }
    }
}

/**
 * Función para establecer las condiciones iniciales de un nuevo juego
 */
function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto'); // Cambiar título del HTML
    asignarTextoElemento('p', `Ingrese un número del 1 al ${numeroMaximo}`); // Cambiar texto del párrafo
    numeroSecreto = crearNumeroRandom(); // Generar nuevo número secreto
    intentos = 1; // Reiniciar contador de intentos
}

/**
 * Función para reiniciar el juego
 */
function reiniciarJuego() {
    limpiarCaja(); // Limpiar la caja de texto
    condicionesIniciales(); // Reestablecer condiciones iniciales
    document.getElementById('reiniciar').setAttribute('disabled', 'true'); // Deshabilitar botón de reinicio
}
