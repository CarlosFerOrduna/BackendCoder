import { connect } from 'mongoose';

const connectMongo = async (connectionString) => {
    try {
        await connect(connectionString);

        console.log('connected successfully');
    } catch (e) {
        console.error(e);

        throw new Error('can not connect to the db');
    }
};

export default connectMongo;
