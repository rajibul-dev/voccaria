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
  passwordResetTokenExpires?: Date;
  avatar?: string;
  provider: "google" | "local";
  providerId?: string;

  discord?: {
    id?: string;
    name?: string;
  };

  avatars: {
    manual?: string;
    google?: string;
    discord?: string;
    selected?: "manual" | "google" | "discord";
  };

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
    },
    role: {
      type: String,
      enum: ["user", "staff", "raji", "mia"],
      default: "user",
    },

    discord: {
      id: String,
      name: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    verified: Date,
    verificationToken: String,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,

    avatars: {
      manual: {
        type: String,
        default:
          "https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg",
      },
      google: String,
      discord: String,
      selected: {
        type: String,
        enum: ["manual", "google", "discord"],
        default: "manual",
      },
    },

    provider: {
      type: String,
      enum: ["google", "local"],
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
