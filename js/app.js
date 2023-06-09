const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector ('.todos');
const btnEnsaladas = document.querySelector('.ensaladas');
const btnPastas = document.querySelector ('.pasta');
const btnPizzas = document.querySelector ('.pizza');
const btnPostres = document.querySelector ('.postres');
const contenedorPlatos = document.querySelector ('.platos');

document.addEventListener('DOMContentLoaded', () => {
    eventos();
    platos();
});

const eventos = () =>{
    menu.addEventListener('click', abrirMenu);
}

const abrirMenu = () =>{
    navegacion.classList.remove('ocultar');
    botonCerrar();
}

const botonCerrar = () => {
    const btnCerrar = document.createElement('p');
    const overlay = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length > 0) return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');
    navegacion.appendChild(btnCerrar);
    cerrarMenu(btnCerrar,overlay);
    
}
const observer = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry=>{
            if(entry.isIntersecting){
                const imagen = entry.target;
                imagen.src = imagen.dataset.src;
                observer.unobserve(imagen);
            }
    });
});


imagenes.forEach(imagen=>{
    observer.observe(imagen);
});

const cerrarMenu = (boton, overlay) =>{
    boton.addEventListener('click',()=>{
        navegacion.classList.add('ocultar')
        overlay.remove();
        boton.remove();
    });

    overlay.onclick = function (){
        overlay.remove();
        navegacion.classList.add('ocultar')
        boton.remove();
    }
}

const platos = () =>{
    let platosArreglo = [];
    const platos = document.querySelectorAll('.plato')
    
    platos.forEach(plato => platosArreglo = [...platosArreglo,plato])

    const ensaladas = platosArreglo.filter(ensalada=> ensalada.getAttribute('data-plato') === 'ensalada');
    const pastas = platosArreglo.filter(pasta=> pasta.getAttribute('data-plato') === 'pasta');
    const pizzas = platosArreglo.filter(pizza=> pizza.getAttribute('data-plato') === 'pizza');
    const postres = platosArreglo.filter(postre=> postre.getAttribute('data-plato') === 'postre');

    mostrarPlatos(ensaladas, pastas, pizzas, postres, platosArreglo);
}

const mostrarPlatos = (ensaladas, pastas, pizzas, postres, todos) =>{
    btnEnsaladas.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatos);
        ensaladas.forEach(ensalada => contenedorPlatos.appendChild(ensalada));
    });

    btnPastas.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatos);
        pastas.forEach(pasta => contenedorPlatos.appendChild(pasta));
    });

    btnPizzas.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatos);
        pizzas.forEach(pizza => contenedorPlatos.appendChild(pizza));
    });

    btnPostres.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatos);
        postres.forEach(postre => contenedorPlatos.appendChild(postre));
    });
    btnTodos.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatos)
        todos.forEach(todos => contenedorPlatos.appendChild(todos));
    })
}


const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
        
}
