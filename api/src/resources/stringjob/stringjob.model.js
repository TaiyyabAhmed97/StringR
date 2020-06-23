import mongoose from "mongoose";

const Schema = mongoose.Schema;

let rst = new Schema(
  {
    racket: {
      type: String,
    },
    strings: [
      {
        string: String,
        tension: Number,
      },
    ],
  },
  { _id: false }
);

let stringjob = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  dueDate: {
    type: Date,
  },
  currentDate: {
    type: Date,
    default: new Date(),
  },
  rst: [rst],
  status: {
    type: String,
    enum: ["NOT DONE", "DONE"],
    default: "NOT DONE",
  },
  // the following properties are yet to be implemented (maybe v2?)
  /*
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
*/
});

export const StringJob = mongoose.model("stringjob", stringjob);
