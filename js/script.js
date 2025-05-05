/*==================== toggle icon navbar ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

/*==================== scroll sections active link ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

if (sections){
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                if (document.querySelector('header nav a[href*=' + id + ']'))
                    {document.querySelector('header nav a[href*=' + id + ']').classList.add('active');}
            });
        }
    })

    /*==================== sticky navbar ====================*/
    let header = document.querySelector('header');

    
 
    header.classList.toggle('sticky', window.scrollY > 100);
    /*==================== remove toggle icon and navbar when click navbar link (scroll) ====================*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active'); 
};
}

/*==================== scroll reveal ====================*/
ScrollReveal({
    //reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
})

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
/*==================== typed js ====================*/
const typed = new Typed('.multiple-text', {
    strings: ['Desarrollo de Software', 'Diseño y Desarrollo de Páginas Web', 'Desarrollo de Aplicaciones Móviles'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

/*==================== Validacion contacto ====================*/

document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formularioContacto');
    
    if(formulario){
    formulario.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Resetear mensajes de error
      resetErrorMessages();
      
      // Validar campos
      const nombreValido = validarNombre();
      const correoValido = validarCorreo();
      const celularValido = validarCelular();
      const asuntoValido = validarAsunto();
      const mensajeValido = validarMensaje();
      
      // Si todo es válido, enviar el formulario
      if (nombreValido && correoValido && celularValido && asuntoValido && mensajeValido) {
        sendMail(); // Tu función original para enviar el correo
      }
    });
}
    function resetErrorMessages() {
      document.querySelectorAll('.invalid-feedback').forEach(function(el) {
        el.style.display = 'none';
      });
      document.querySelectorAll('.form-control').forEach(function(el) {
        el.classList.remove('is-invalid');
      });
    }
    
    function validarNombre() {
      const nombre = document.getElementById('nombre').value.trim();
      if (nombre === '') {
        mostrarError('errorNombre', 'El nombre es obligatorio');
        return false;
      }
      if (nombre.length < 3) {
        mostrarError('errorNombre', 'El nombre debe tener al menos 3 caracteres');
        return false;
      }
      return true;
    }
    
    function validarCorreo() {
      const correo = document.getElementById('correo').value.trim();
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (correo === '') {
        mostrarError('errorCorreo', 'El correo es obligatorio');
        return false;
      }
      if (!regex.test(correo)) {
        mostrarError('errorCorreo', 'Por favor ingrese un correo válido');
        return false;
      }
      return true;
    }
    
    function validarCelular() {
      const celular = document.getElementById('celular').value.trim();
      const regex = /^[0-9]{9,15}$/; // Ajusta según el formato de tu país
      
      if (celular === '') {
        mostrarError('errorCelular', 'El celular es obligatorio');
        return false;
      }
      if (!regex.test(celular)) {
        mostrarError('errorCelular', 'Por favor ingrese un número válido (9-15 dígitos)');
        return false;
      }
      return true;
    }
    
    function validarAsunto() {
      const asunto = document.getElementById('asunto').value.trim();
      if (asunto === '') {
        mostrarError('errorAsunto', 'El asunto es obligatorio');
        return false;
      }
      if (asunto.length < 5) {
        mostrarError('errorAsunto', 'El asunto debe tener al menos 5 caracteres');
        return false;
      }
      return true;
    }
    
    function validarMensaje() {
      const mensaje = document.getElementById('mensaje').value.trim();
      if (mensaje === '') {
        mostrarError('errorMensaje', 'El mensaje es obligatorio');
        return false;
      }
      if (mensaje.length < 10) {
        mostrarError('errorMensaje', 'El mensaje debe tener al menos 10 caracteres');
        return false;
      }
      return true;
    }
    
    function mostrarError(id, mensaje) {
      const elemento = document.getElementById(id);
      elemento.textContent = mensaje;
      elemento.style.display = 'block';
      // Agregamos la clase is-invalid al input correspondiente
      const inputId = id.replace('error', '').toLowerCase();
      document.getElementById(inputId).classList.add('is-invalid');
    }
  });
  
  // Función original para enviar el correo (debes implementarla según tu backend)
  function sendMail() {
    // Aquí iría tu lógica para enviar el correo
    alert('Formulario válido. Mensaje enviado!');
    document.getElementById('formularioContacto').reset();
  }  

/*==================== EmailJS para el formulario de contacto ====================*/
// Inicializa EmailJS con tu User ID
(function () {
  emailjs.init("zCmjhDtymOKgzUVIG");
})();

function sendMail(e) {
  e.preventDefault(); // Prevenir recarga del formulario

  const params = {
    nombre: document.getElementById("nombre").value,
    correo: document.getElementById("correo").value,
    celular: document.getElementById("celular").value,
    asunto: document.getElementById("asunto").value,
    mensaje: document.getElementById("mensaje").value,
  };

  const serviceID = "service_iu3j1bc";
  const templateID = "template_gnlir8h";

  emailjs.send(serviceID, templateID, params)
    .then((res) => {
      document.getElementById("contact-form").reset();

      // Mostrar el modal de Bootstrap al enviar correctamente
      const modal = new bootstrap.Modal(document.getElementById('modalConfirmacion'));
      modal.show();
    })
    .catch((err) => {
      console.error("Error al enviar:", err);
      alert("Ocurrió un error al enviar el mensaje.");
    });
}

// Función para mostrar el modal
function mostrarModal(id) {
  document.getElementById(id).style.display = 'flex';
}

// Función para cerrar el modal
function cerrarModal(id) {
  document.getElementById(id).style.display = 'none';
}

// Opcional: Cerrar al hacer clic fuera del modal
window.addEventListener("click", function(event) {
  const modales = document.querySelectorAll(".modal");
  modales.forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = "none"; // Cerrar el modal si se hace clic fuera del contenido
    }
  });
});

document.getElementById('btn-ver-mas').addEventListener('click', function (e) {
  e.preventDefault(); // Previene el salto automático por el href

  const seccionMV = document.getElementById('mision-vision');
  seccionMV.classList.remove('d-none');
  //seccionMV.classList.add('d-flex')
  const titulo = document.getElementById('titulo')
  // Calcular posición ajustada con compensación (ej. 100px por header fijo)
const yOffset = -100; // Ajusta este valor según el alto de tu navbar
const y = seccionMV.getBoundingClientRect().top + window.pageYOffset + yOffset;

window.scrollTo({ top: y, behavior: 'smooth' });

  titulo.classList.add('heading')
  ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
});