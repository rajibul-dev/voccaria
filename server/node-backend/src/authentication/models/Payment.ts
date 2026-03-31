import { Schema } from "mongoose";

export interface IPayment {
  user: Schema.Types.ObjectId;
  amount: number;
  currency: string;
  description: string;
  paypalPaymentId: string;
  status: "COMPLETED" | "PENDING" | "FAILED";
  createdAt: Date;
}

const PaymentSchema = new Schema<IPayment>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  paypalPaymentId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["COMPLETED", "PENDING", "FAILED"],
    default: "PENDING",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
