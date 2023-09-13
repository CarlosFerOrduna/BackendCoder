const cartManager = {
    addProductInCart: async () => {
        try {
            let inpCartId = document.getElementById('cid');
            let inpProductId = document.getElementById('pid');
            let btnCart = [...document.getElementsByClassName('btn-add-cart')];

            if (inpCartId && inpProductId && btnCart) {
                btnCart.forEach((btn) => {
                    btn.addEventListener('click', async (event) => {
                        event.preventDefault();

                        const result = await Swal.fire({
                            title: 'agregar este producto?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Si agregar'
                        });

                        if (result.isConfirmed) {
                            const pid = inpProductId.value;
                            let cid = inpCartId.value;
                            if (!cid) {
                                const { value } = await Swal.fire({
                                    title: 'Enter your cart id',
                                    input: 'text',
                                    inputLabel: 'Your cart id',
                                    inputValue: '',
                                    showCancelButton: false,
                                    allowOutsideClick: false,
                                    allowEscapeKey: false,
                                    inputValidator: (value) => {
                                        if (!value) {
                                            return 'You need to write your cart id';
                                        }
                                    }
                                });

                                cid = value;
                            }

                            const apiUrl = `http://localhost:8080/api/carts/${cid}/products/${pid}`;
                            const response = await fetch(apiUrl, { method: 'POST' });

                            if (response.ok) {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Agregado correctamente',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        }
                    });
                });
            }
        } catch (error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'algo salio mal' + error,
                showConfirmButton: false,
                timer: 1000
            });
        }
    },
    goToCart: async () => {
        try {
            let inpCartId = document.getElementById('cid');
            let btnCart = document.getElementById('btn-go-cart');

            if (inpCartId && btnCart) {
                btnCart.addEventListener('click', async (event) => {
                    event.preventDefault();

                    const cid = inpCartId.value;
                    window.location.href = `http://localhost:8080/views/carts/${cid}`;
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
};

export default cartManager;
