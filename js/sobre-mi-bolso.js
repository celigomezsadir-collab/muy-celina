// Solo gestiona las etiquetas de los objetos en pantallas táctiles.
document.querySelectorAll('.bag-object').forEach((button) => {
  button.addEventListener('click', () => {
    const wasSelected = button.classList.contains('is-selected');
    document.querySelectorAll('.bag-object.is-selected').forEach((item) => item.classList.remove('is-selected'));
    if (!wasSelected) button.classList.add('is-selected');
  });
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.bag-object')) {
    document.querySelectorAll('.bag-object.is-selected').forEach((item) => item.classList.remove('is-selected'));
  }
});
