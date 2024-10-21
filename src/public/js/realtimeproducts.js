//const titleInput = document.querySelector('#title');

//Configuracion para escuchar el server
const socket = io(); 

socket.on()

const newProdBtn = document.querySelector('#newProdBtn');

let product = '';

//Form Inputs
let titleInput;
let descriptionInput;

const productForm = {
    title: '',
}

//Evento para modal de nuevo Producto
newProdBtn.addEventListener('click', (event) => {
    Swal.fire({
        title: 'Agregar Nuevo Producto',
        text: 'Introduzca los datos del producto que desea agregar:',
        icon: 'info',
        showCloseButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#2ecc71',
        showCancelButton: true,
        cancelButtonColor: '#e74c3c',
        cancelButtonText: 'Cancelar',
        html: `
        <input type="text" id="title" class="swal2-input" placeholder="Title" required>
        <input type="text" id="description" class="swal2-input" placeholder="Descripcion" required>
        <input type="number" id="code" class="swal2-input" placeholder="Codigo" required>
        <input type="number" id="price" class="swal2-input" placeholder="Precio" required>
        <input type="text" id="status" class="swal2-input" placeholder="Status" required>
        <input type="number" id="stock" class="swal2-input" placeholder="Inventario" required>
        <input type="text" id="category" class="swal2-input" placeholder="Categoria" required>
        `,
        didOpen: () => {
            const popup = Swal.getPopup();
            titleInput = popup.querySelector('#title');
            descriptionInput = popup.querySelector('#description');
            codeInput = popup.querySelector('#code');
            priceInput = popup.querySelector('#price');
            statusInput = popup.querySelector('#status');
            stockInput = popup.querySelector('#stock');
            categoryInput = popup.querySelector('#category');

            //Shorcu para que se presione Confirmar al presionar 'Enter'
            titleInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm();
            descriptionInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm();
            codeInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm();
            priceInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm();
            statusInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm();
            stockInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm();
            categoryInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm();
          },
          preConfirm: () => {
            const title = document.querySelector('#title').value;
            const description = document.querySelector('#description').value;
            const code = document.querySelector('#code').value;
            const price = document.querySelector('#price').value;
            const status = document.querySelector('#status').value;
            const stock = document.querySelector('#stock').value;
            const category = document.querySelector('#category').value;
            if (!title || !description || !code || !price || !price || !stock || !category ) {
              Swal.showValidationMessage(`Por favor complete todos los campos`);
            }
            return { title, description, code, price, status, stock, category };
          }
      }).then((result) => {
        //console.log ('1' + result.value); //Probando si tenemos los datos para pasarlos por un emit
        
        //Emitimos la data del producto *1
        product = result.value;
        socket.emit('newProduct', product);

        })
})

/*titleInput.addEventListener('input', (event) => {
    product.title = event.target.value; //Obtiene el valor de input title
})*/

/*sendButton.addEventListener('click', () => {
    fetch('http:localhost:8080/api/product', {
        method: 'POST',
        body: JSON.stringify(productForm),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(result => console.log(result))
})*/

socket.on('answer', (data) => {
    console.log(data);
})


socket.on('socketDB', (data) => {
    const productContainer = document.querySelector('#productContainer');
    console.log(data);
    //Vaciamos el contenedor
    productContainer.innerHTML = '';

    //Llenamos el contenedor
    data.forEach((product) => {
        //Creamos los elementos
        const externaldiv = document.createElement('div');
        const internaldiv = document.createElement('div');
        const title = document.createElement('h3');
        const description = document.createElement('p');
        const category = document.createElement('p');
        const stock = document.createElement('p');
        const price = document.createElement('p');
        const delbtn = document.createElement('button');

        //Asignamos Valores
        title.innerText = product.title;
        description.innerText = 'Descripcion: ' + product.description;
        category.innerText = 'Categoria: ' + product.category;
        stock.innerText = 'Inventario: ' + product.stock;
        price.innerText = 'Precio: ' + product.price;
        delbtn.innerText = 'Eliminar';

        //Posicionamos
        externaldiv.appendChild(internaldiv);
        internaldiv.appendChild(title)
        internaldiv.appendChild(description)
        internaldiv.appendChild(category)
        internaldiv.appendChild(stock)
        internaldiv.appendChild(price)
        internaldiv.appendChild(delbtn)
        productContainer.appendChild(externaldiv);

        //Agregamos CSS
        externaldiv.className = "card";
        internaldiv.className = "card-body";
        title.className = "card-title";
        description.className = "card-text";
        category.className = "card-text";
        stock.className = "card-text";
        price.className = "card-text";
        delbtn.className = "btn btn-danger";
    })
})

