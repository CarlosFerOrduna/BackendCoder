const socket = io();

// PRODUCTS
function deleteProduct(pid) {
    socket.emit('delete_product', pid);
}

function createProduct(product) {
    socket.emit('create_product', product);
}

function eventDeleteProduct() {
    let btnDelete = document.getElementById('btn-form-delete');

    if (btnDelete) {
        btnDelete.addEventListener('click', function () {
            const pid = document.getElementById('pid').value;

            if (checkFields({ pid })) {
                deleteProduct(pid);
            }
        });
    }
}

function eventCreateProduct() {
    let btnCreate = document.getElementById('btn-form-create');

    if (btnCreate) {
        btnCreate.addEventListener('click', function () {
            product = {
                title: document.getElementById('title').value,
                description: document.getElementById('description').value,
                code: document.getElementById('code').value,
                price: document.getElementById('price').value,
                status: document.getElementById('status').value,
                stock: document.getElementById('stock').value,
                category: document.getElementById('category').value
            };

            const thumbnails = document.getElementById('thumbnails').value;
            if (checkFields(product)) {
                createProduct({
                    ...product,
                    thumbnails: thumbnails.substring(thumbnails.lastIndexOf('\\'))
                });
            }
        });
    }
}

function checkFields(element) {
    const nullish = [null, undefined, '', 0];
    let result = true;

    for (const key in element) {
        if (nullish.includes(element[key])) {
            const input = document.getElementById(`d-${key}`);

            input.innerHTML = `<div class="alert alert-danger" role="alert">
                                    campo necesario
                                </div>`;
            result = false;
        }
    }

    return result;
}

function loadProducts() {
    socket.on('load_products', (data) => {
        const products = document.getElementById('products');

        if (products) {
            let html = data.products
                .map((p) => {
                    return `<div class="col-lg-3 col-md-4 col-sm-6">
                            <div class="card m-2" style="width: 13rem;">
                                <img src="${p.thumbnails}" class="card-img-top" alt="${p.title}">
                                <div class="card-body">
                                    <h5 class="card-title">title: ${p.title}</h5>
                                    <p class="card-text">description: ${p.description}</p>
                                    <p class="card-text">stock: ${p.stock}</p>
                                    <p class="card-text">id: ${p.id}</p>
                                    <a href="#" class="btn btn-primary">Click</a>
                                </div>
                            </div>
                        </div>`;
                })
                .join('');

            products.innerHTML = html;
        }
    });
}

// MESSAGES

let user = '';

const swalWraper = async () => {
    if (document.getElementById('messages')) {
        const { value: email } = await Swal.fire({
            title: 'Enter your email',
            input: 'text',
            inputLabel: 'Your email',
            inputValue: '',
            showCancelButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write your email!';
                }
            }
        });
        user = email;
        document.getElementById('user').innerHTML = user;
    }
};

const loadMessages = () => {
    socket.on('load_message', (data) => {
        let containerMessage = document.getElementById('all-messages');

        if (containerMessage) {
            containerMessage.innerHTML = '';

            data.messages.reverse().forEach((m) => {
                const div = document.createElement('div');
                div.className = 'col-12';
                div.innerHTML = `<div class="alert alert-primary" role="alert">${m.user}: ${m.message}</div>`;
                containerMessage.appendChild(div);
            });

            containerMessage.scrollTop = containerMessage.scrollHeight;
        }
    });
};

const insertMessage = () => {
    const textBoxMessage = document.getElementById('new-message');

    if (textBoxMessage) {
        textBoxMessage.addEventListener('keyup', ({ key }) => {
            if (key == 'Enter' && textBoxMessage.value != '') {
                socket.emit('insert_message', {
                    user: user,
                    message: textBoxMessage.value
                });

                textBoxMessage.value = '';
            }
        });
    }
};

loadProducts();
loadMessages();
eventCreateProduct();
eventDeleteProduct();
swalWraper();

//addProductInCart
const addProductInCart = async () => {
    try {
        let inpCartId = document.getElementById('cid');
        let inpProductId = document.getElementById('pid');
        let btnCartId = document.getElementById('btn-add-cart');

        if (inpCartId && inpProductId && btnCartId) {
            btnCartId.addEventListener('click', async (event) => {
                event.preventDefault();

                const cid = inpCartId.value;
                const pid = inpProductId.value;
                const apiUrl = `http://localhost:8080/api/carts/${cid}/products/${pid}`;

                const response = await fetch(apiUrl, { method: 'POST' });

                console.log(response);
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

addProductInCart();
