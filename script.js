var arrayTareas = []

function presionar (e) {

  let i = 0;

  let Tarea = new Object()
        Tarea.creado = e.timeStamp
        Tarea.completo = false
        Tarea.fin = -1


  let nuevaTarea = document.getElementById("newCheckbox").value

        Tarea.valor = nuevaTarea

  if (validarIngreso(Tarea.valor)){

    if (e.key === 'Enter') { 

 
      const listaTareas = document.getElementById("divVacio")
      const tarea = document.createElement("li")

      const checkbox = document.createElement("input")
            checkbox.type = "checkbox"
            checkbox.className = "checkbox"
            checkbox.setAttribute("onclick", "tacharCheckbox(event)")

      const descripcion = document.createTextNode(nuevaTarea)
      contenedor = document.createElement("p")
      contenedor.innerText = nuevaTarea


      tarea.appendChild(checkbox)
      tarea.appendChild(contenedor)

      Tarea.htmlTag = tarea

      listaTareas.appendChild(tarea)

      document.getElementById("newCheckbox").value = ''

      arrayTareas.push(Tarea)

      i++

    }
  }


}

let validarIngreso =  (valor) => {

  if(valor === null || valor === undefined || valor === ' ' || valor === ''){ 

    alert("El campo está vacío. Inserte una tarea a la lista.")
    return false;

  }
  else{
    return true;
  }

}



function tacharCheckbox (evento){
  let checks = document.getElementsByClassName("checkbox")
  for (let i = 0; i < checks.length; i++) {
    if(checks[i].checked){

      let padre = checks[i].parentNode
      
      padre.childNodes[1].classList.add('tachado')
      //console.log(arrayTareas[i])
      let texto = padre.childNodes[1].textContent
      
      for(let j=0; j<arrayTareas.length; j++){
        // si el texto del elemento padre es igual al texto de la tarea del array
        if(texto === arrayTareas[j].valor){
            // agrego la fecha de finalizacion
            arrayTareas[j].fin = evento.timeStamp
            // agrego el estado de completado
            arrayTareas[j].completo = true
        }
      }
     // console.log(arrayTareas)
    }else{
      let padre = checks[i].parentNode
      console.log(padre.childNodes[1])
      padre.childNodes[1].classList.remove('tachado')
      let texto = padre.childNodes[1].textContent

      for (let k = 0; k < arrayTareas.length; k++) {
        if(texto === arrayTareas[k].valor){
          arrayTareas[k].fin = -1
          arrayTareas[k].completo = false
        }
      }
       console.log(arrayTareas)
    }
  }
}

function tareaMasRapida(evento){

  var tareasCompletadas = []
  var resultados = []

  for (let i = 0; i < arrayTareas.length; i++) {
    console.log(arrayTareas[i])
    if (arrayTareas[i].completo) {
      tareasCompletadas.push(arrayTareas[i])
    }
  }

  if (tareasCompletadas.length>0) {

    let tareasMasRapidas = []

    let numGrande = 999999999999999999999999

    for (let k = 0; k < tareasCompletadas.length; k++) {

      if (tareasCompletadas[k].fin - tareasCompletadas[k].creado < numGrande){

        tareasMasRapidas = []

        tareasMasRapidas.push(tareasCompletadas[k])
        
      }
      else if(tareasCompletadas[k].fin - tareasCompletadas[k].creado === tareasMasRapidas[tareasMasRapidas.length-1].fin - tareasMasRapidas[tareasMasRapidas.length-1].creado){
        tareasMasRapidas.push(tareasCompletadas[k])

      }
    }

    console.log(tareasMasRapidas)

    if (tareasMasRapidas.length == 1) {

      alert(`La tarea mas rapida fue ${tareasMasRapidas[0].valor}`)
      
    }
    else{
      for (let j = 0; j < tareasMasRapidas.length; j++) {
        resultados += `a${tareasMasRapidas[j].valor}`
      }

      alert(`Las tareas mas rapidas fueron ${resultados}`)
    }
  }
  else{
    alert(`No hay tareas completadas`)
  }
}