import { model, Schema } from "mongoose";

const GuildSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

export const GuildModel = model("Guild", GuildSchema);
