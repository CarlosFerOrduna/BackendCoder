import { connect } from 'mongoose';

const connectMongo = async () => {
    try {
        await connect(process.env.CONNECTION_STRING);

        console.log('connected successfully');
    } catch (e) {
        console.error(e);

        throw new Error('can not connect to the db');
    }
};

export default connectMongo;
