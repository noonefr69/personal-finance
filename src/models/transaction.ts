import mongoose, { Schema } from "mongoose";

const transactionShema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    transactionTitle: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionShema);

export default Transaction;
