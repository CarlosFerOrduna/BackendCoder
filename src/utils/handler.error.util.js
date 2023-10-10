const handlerError = (req, res) => {
    return res.status(400).json({
        status: 'error',
        message: 'Bad request',
        data: []
    })
}

export default handlerError
