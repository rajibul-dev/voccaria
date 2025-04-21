import mongoose, { model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is a mandatory field"],
      trim: true,
      minlength: 2,
      maxlength: [40, "Your name must be within 40 letters"],
    },
    email: {
      unique: true,
      type: String,
      required: [true, "Please provide your email"],
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
    },
    hashedPassword: {
      type: String,
      required: [true, "Please provide password"],
    },
    role: {
      type: String,
      enum: ["user", "staff", "raji", "mia"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    verified: Date,
    verificationToken: String,
    passwordToken: {
      type: String,
    },
    passwordTokenExpirationDate: {
      type: Date,
    },
    avatar: {
      type: String,
      // default: "",
    },

    // For OAuth login
    provider: {
      type: String,
      enum: ["google", "github", "local"],
      default: "local",
    },
    providerId: { type: String, default: null }, // null for local login

    // for future if we want to add this feature
    // accountColor: {
    //   type: String,
    //   enum: ["red", "blue", "green", "purple", "orange", "grey"],
    // },
  },
  { timestamps: true }
);

UserSchema.methods.comparePassword = async function (
  canditatePassword: string
) {
  const isMatch = await bcrypt.compare(canditatePassword, this.hashedPassword);
  return isMatch;
};

export default model("User", UserSchema);
