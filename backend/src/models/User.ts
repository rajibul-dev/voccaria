import mongoose, { Schema, Document, Model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  hashedPassword: string;
  role: "user" | "staff" | "raji" | "mia";
  isVerified: boolean;
  verified?: Date;
  verificationToken?: string;
  passwordResetToken?: string;
  passwordResetTokenExpirationDate?: Date;
  avatar?: string;
  provider: "google" | "github" | "local";
  providerId?: string;

  createdAt: Date;
  updatedAt: Date;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema(
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
        validator: (email: string) => validator.isEmail(email),
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
    passwordResetToken: String,
    passwordResetTokenExpirationDate: Date,
    avatar: String,

    provider: {
      type: String,
      enum: ["google", "github", "local"],
      default: "local",
    },
    providerId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

UserSchema.methods.comparePassword = async function (
  this: IUser,
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.hashedPassword);
};

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;
