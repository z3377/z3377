

document.addEventListener("DOMContentLoaded", () => {
  const queryParams = new URLSearchParams(window.location.search);

  // Rellena los campos del formulario con los datos de la URL
  document.getElementById("raza").value = queryParams.get("raza");
  document.getElementById("edad").value = queryParams.get("edad");
  document.getElementById("color").value = queryParams.get("color");
  document.getElementById("condicion").value = queryParams.get("condicion");

  const imagenURL = queryParams.get("imagen");

  // Establece la URL de la imagen en el elemento img
  const gatoImagen = document.getElementById("gato-imagen");
  gatoImagen.src = imagenURL;

  const adoptionForm = document.getElementById("adoption-form");

  const mensajeEnviado = document.getElementById("mensaje-enviado");

  adoptionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Aquí puedes acceder a los valores de los campos del formulario
    const raza = document.getElementById("raza").value;
    const edad = document.getElementById("edad").value;
    const color = document.getElementById("color").value;
    const condicion = document.getElementById("condicion").value;

    // También puedes acceder a la URL de la imagen
    const imagen = gatoImagen.src;

    // Ahora puedes utilizar estos valores para enviar al servidor o procesarlos
    console.log("Datos a enviar:", {
      raza,
      edad,
      color,
      condicion,
      imagen
    });

    // Puedes redirigir o mostrar un mensaje de éxito aquí
    // alert("Formulario enviado con éxito");


    // Ocultar el formulario y mostrar el mensaje
    adoptionForm.style.display = "none";
    mensajeEnviado.style.display = "block";

    // return false;
  });
});

