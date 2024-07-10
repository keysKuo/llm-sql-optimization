const { model, Schema, Types } = require("mongoose");

const chatSchema = new Schema(
	{
        user: { type: Types.ObjectId, ref: 'User', required: true },
		title: { type: String, default: "New Chat"},
        schema: { type: String }
	},
	{
		timestamps: true,
	}
);

module.exports = model("Chat", chatSchema);
