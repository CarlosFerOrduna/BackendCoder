import { format } from 'date-fns'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let destination
        if (req.originalUrl.includes('documents')) destination = 'documents'
        if (req.originalUrl.includes('products')) destination = 'products'
        if (req.originalUrl.includes('profiles')) destination = 'profiles'

        if (!!destination) cb(null, `./public/${destination}`)
    },
    filename: function (req, file, cb) {
        const parsedName = file.originalname.replace(/\s/g, '-').toLowerCase()
        const filename = `${format(new Date(), 'yyyyMMddHHmmss')}-${parsedName}`

        cb(null, filename)
    }
})

export const uploader = multer({ storage })
