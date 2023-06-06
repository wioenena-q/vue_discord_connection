import { model, Schema, SchemaTypes } from "mongoose";

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    banner: {
      type: String,
      default: null,
    },
    guilds: {
      type: [SchemaTypes.ObjectId],
      ref: "Guild",
      default: [],
    },
  },
  { versionKey: false }
);

export const UserModel = model("User", UserSchema);
