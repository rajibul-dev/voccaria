import mongoose, { Schema, Document, Model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { ALL_ROLES, Roles } from "../../constants/roles.js";

export interface IUser extends Document {
  name: string;
  email: string;
  hashedPassword: string;
  roles: [Roles];
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
    username?: string;
    email?: string;
    verified?: boolean;
    display_name?: string;
    avatar?: string;
  };

  google?: {
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
    email_verified?: boolean;
  };

  avatars: {
    manual?: string;
    google?: string;
    discord?: string;
    selected?: "manual" | "google" | "discord";
  };

  bio?: string;

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

    roles: {
      type: [String],
      enum: ALL_ROLES,
      default: ["user"],
    },

    discord: {
      id: String,
      username: String,
      name: String,
      email: String,
      verified: Boolean,
      display_name: String,
      avatar: String,
    },

    google: {
      id: String,
      name: String,
      email: String,
      avatar: String,
      email_verified: Boolean,
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
        default: null,
      },
      google: String,
      discord: String,
      selected: {
        type: String,
        enum: ["manual", "google", "discord"],
        default: "manual",
      },
    },
    avatar: {
      type: String,
      default: null,
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

    bio: {
      type: String,
      maxlength: [1200, "Bio should be under 1200 letters"],
      default: "",
    },
  },
  { timestamps: true }
);

// set the avatar field from the avatars field
UserSchema.pre("save", function () {
  // Fix any broken /raw/upload/ URLs to /image/upload/
  if (this.avatars.manual && this.avatars.manual.includes("/raw/upload/")) {
    this.avatars.manual = this.avatars.manual.replace(
      "/raw/upload/",
      "/image/upload/"
    );
  }
  if (this.avatars.google && this.avatars.google.includes("/raw/upload/")) {
    this.avatars.google = this.avatars.google.replace(
      "/raw/upload/",
      "/image/upload/"
    );
  }
  if (this.avatars.discord && this.avatars.discord.includes("/raw/upload/")) {
    this.avatars.discord = this.avatars.discord.replace(
      "/raw/upload/",
      "/image/upload/"
    );
  }

  this.avatar = this.avatars[this.avatars.selected];
});

UserSchema.methods.comparePassword = async function (
  this: IUser,
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.hashedPassword);
};

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;
