const productManager = {
    deleteProduct: (pid, socket) => {
        socket.emit('delete_product', pid);
    },
    createProduct: (product, socket) => {
        socket.emit('create_product', product);
    },
    eventDeleteProduct: (socket) => {
        let btnDelete = document.getElementById('btn-form-delete');

        if (btnDelete) {
            btnDelete.addEventListener('click', function () {
                const pid = document.getElementById('pid').value;

                if (checkFields({ pid })) {
                    deleteProduct(pid, socket);
                }
            });
        }
    },
    eventCreateProduct: (socket) => {
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
                    createProduct(
                        {
                            ...product,
                            thumbnails: thumbnails.substring(thumbnails.lastIndexOf('\\'))
                        },
                        socket
                    );
                }
            });
        }
    },
    checkFields: (element) => {
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
    },
    loadProducts: (socket) => {
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
};

export default productManager;
