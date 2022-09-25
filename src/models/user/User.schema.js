import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: [75, "Name is too long."],
    },
    company: {
      type: String,
      required: true,
      maxlength: [75, "Company name is too long."],
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      maxLength: [15, "phone number must be less than 15 characters"],
      minLength: [10, "phone number must be less than 10 characters"],
    },
    email: {
      type: String,
      unique: true,
      index: 1,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      maxLength: [100, "Maximum Password Characters are 100."],
      minLength: [8, "Password Must Be At Least 8 characters."],
    },
    refreshJWT: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
