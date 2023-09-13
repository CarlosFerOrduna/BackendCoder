let user = '';

const messagesManager = {
    swalWraper: async () => {
        if (document.getElementById('new-message')) {
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
    },
    loadMessages: (socket) => {
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
    },
    insertMessage: (socket) => {
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
    }
};

export default messagesManager;
