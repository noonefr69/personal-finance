import mongoose, { Schema } from "mongoose";

const potSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    potName: {
      type: String,
      required: true,
    },
    amountPot: {
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

const Pots = mongoose.models.Pots || mongoose.model("Pots", potSchema);

export default Pots;
