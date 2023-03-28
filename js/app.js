import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore, addDoc, getDocs, collection, onSnapshot, serverTimestamp, orderBy, query, limit } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

import firebaseConfig from './firebaseConfig.js';

 // Inicializar Firebase
 const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);

 let form = document.querySelector("#recetaForm");
 let cedulaInput = document.querySelector("#cedulaProfesional");
 let tipoSelect = document.querySelector("#tipoEnfermedad");
 let container = document.querySelector("#items");


 form.addEventListener("submit", function(guardar){
    guardar.preventDefault();
    addDoc(collection(db,"recetas"), { cedulaProfesional: cedulaInput.value, tipoEnfermedad: tipoSelect.value, fechaCaptura: serverTimestamp()});
    form.reset();
 });

 let queryRecetas = query(collection(db, "recetas"), orderBy("fechaCaptura", "desc"), limit(1) );
  
onSnapshot( queryRecetas, function(querySnapshot){ 
  container.innerHTML = "Última receta registrada <br>";
  querySnapshot.forEach(function(doc){
    let cedula = doc.data();
    const lista = document.createElement("lista");
    lista.innerHTML = `
      ${ cedula.cedulaProfesional}
      ${ cedula.tipoEnfermedad}
    `;
    container.appendChild(lista);
  });
});
  





