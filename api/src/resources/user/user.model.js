import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let user = new Schema(
    {
        phoneNumber: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        stringJobs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'stringjob'
            }
        ]

    }
)
export const User = mongoose.model('user', user)