import mongoose, { Schema } from "mongoose";

const budgetSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    spend: {
      type: Number,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Budget = mongoose.models.Budget || mongoose.model("Budget", budgetSchema);

export default Budget;
