const titleInp = document.querySelector('#title')

const productForm = {
    title: '',
}

titleInp.addEventListener('input', (event) => {
    product.title = event.target.value; //Obtiene el valor de input title
})

sendButton.addEventListener('click', () => {
    fetch('http:localhost:8080/api/product', {
        method: 'POST',
        body: JSON.stringify(productForm),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(result => console.log(result))
})