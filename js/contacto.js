const contactoPageForm = document.querySelector('#contacto-page-form');
contactoPageForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!contactoPageForm.reportValidity()) return;
  const data = new FormData(contactoPageForm);
  const asunto = `Consulta desde Muy Celina — ${data.get('marca')}`;
  const mensaje = `Nombre: ${data.get('nombre')}\nEmail: ${data.get('email')}\nMarca: ${data.get('marca')}\nServicio: ${data.get('servicio')}\n\nMensaje:\n${data.get('mensaje')}`;
  window.location.href = `mailto:muycelina@gmail.com?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(mensaje)}`;
});
