// Variable que almacena el servicio seleccionado, inicialmente no se ha seleccionado ninguno.
var selectedService = 0;

// Función para generar la contraseña.
function generatePassword(service) {
    // Longitud de la contraseña predeterminada.
    var passwordLength = 12;
    // Conjuntos de caracteres posibles para la contraseña.
    var uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    var numberChars = "0123456789";
    var specialChars = "!@#$%^&*()_+";

    var password = ""; // Variable para almacenar la contraseña generada.
    var chars = lowercaseChars; // Por defecto, se utiliza el conjunto de caracteres en minúsculas.

    // Determinar el conjunto de caracteres y la longitud de la contraseña según el servicio seleccionado.
    if (service === 1) {
        chars = uppercaseChars + lowercaseChars + numberChars + specialChars;
        passwordLength = 16;
    } else if (service === 2 || service === 3) {
        chars = uppercaseChars + lowercaseChars + numberChars + specialChars;
        passwordLength = 12; // Longitud mínima de 12 caracteres para los servicios 2 y 3.
    }

    // Generar la contraseña utilizando los caracteres definidos y la longitud determinada.
    for (var i = 0; i < passwordLength; i++) {
        var randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }

    // Mostrar la contraseña generada en un elemento con el ID "passwordDisplay".
    document.getElementById("passwordDisplay").value = password;
    selectedService = service; // Actualizar el servicio seleccionado.
}

// Función para copiar la contraseña al portapapeles.
function copyPassword() {
    var passwordDisplay = document.getElementById("passwordDisplay");
    var password = passwordDisplay.value.trim(); // Obtener la contraseña y eliminar espacios en blanco al principio y al final.
    if (password === "") {
        // Mostrar una alerta si no hay contraseña para copiar.
        Swal.fire({
            icon: 'warning',
            title: 'Por favor, genere una contraseña antes de intentar copiarla',
            showConfirmButton: false,
            timer: 1500
        });
        return false; // Evitar el envío del formulario.
    }

    passwordDisplay.select(); // Seleccionar el texto en el campo de contraseña.
    passwordDisplay.setSelectionRange(0, 99999); // Seleccionar todo el texto para copiarlo.
    document.execCommand("copy"); // Copiar al portapapeles.

    // Mostrar una alerta de éxito.
    Swal.fire({
        icon: 'success',
        title: 'Contraseña copiada',
        showConfirmButton: false,
        timer: 1500
    });

    return false; // Evitar el envío del formulario.
}

// Función para regenerar la contraseña.
function regPassword() {
    // Verificar si se ha seleccionado un servicio.
    if (selectedService === 0) {
        // Mostrar una alerta si no se ha seleccionado ningún servicio.
        Swal.fire({
            icon: 'warning',
            title: 'Por favor, seleccione un servicio antes de regenerar la contraseña',
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        // Generar la contraseña solo si se ha seleccionado un servicio.
        generatePassword(selectedService);
    }
}

// Función para limpiar el campo de contraseña.
function clearPassword() {
    document.getElementById("passwordDisplay").value = ""; // Limpiar el campo de contraseña.
}
