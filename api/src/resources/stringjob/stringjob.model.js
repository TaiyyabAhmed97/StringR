import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let rstSchema = new Schema(
    {
        racket: {
            type: String,
            required: true
        },
        strings: [
            {
                type: String,
                required: true
            }
        ],
        tension: {
            type: String,
            required: true
        }
    }
)


let stringjob = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    dueDate: {
        type: Date
    },
    rst: [rstSchema],
    grip: {
        type: String
    },
    totalPrice: {
        type: Number,
        require: true
    },
    paid: {
        type: Boolean
    }


})

export const StringJob = mongoose.model('stringjob', stringjob)