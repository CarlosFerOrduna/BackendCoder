import { connect } from "mongoose";

export const connectMongo = async () => {
    try {
        await connect(
            "mongodb+srv://fernandoorduna:nBUXrvkY5aVVjpcL@backend.zofjiwj.mongodb.net/ecommerce?retryWrites=true&w=majority"
        );
        console.log("plug to mongo!");
    } catch (e) {
        console.log(e);
        throw "can not connect to the db";
    }
};
