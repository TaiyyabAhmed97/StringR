import mongoose from 'mongoose'

const dbName = 'dev';

const connect = url => {
    return mongoose.connect(url || `mongodb://127.0.0.1:27017/${dbName}`, {
        useNewUrlParser: true
    })
};
export default connect;