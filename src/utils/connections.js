import { connect } from 'mongoose';

export const connectMongo = async () => {
    try {
        const uri =
            'mongodb+srv://fernandoorduna:nBUXrvkY5aVVjpcL@backend.zofjiwj.mongodb.net/ecommerce?retryWrites=true&w=majority';
        await connect(uri);

        console.log('plug to mongo!');
    } catch (e) {
        console.error(e);

        throw new Error('can not connect to the db');
    }
};
