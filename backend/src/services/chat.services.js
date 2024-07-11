const { FileNotFoundError } = require("../middlewares/error.response");
const chatModel = require("../models/chat.model");
const messageModel = require("../models/message.model");

class ChatService {
	static async createNewChat({ userId }) {
		const newChat = new chatModel({ user: userId });
		await newChat.save();
		return newChat;
	}

	static async deleteChat({ chatId, userId }) {
		messageModel.deleteMany({ chat: chatId });
		return await chatModel.deleteOne({ _id: chatId, user: userId });
	}

	static async addMessage({ chatId, type, body, metadata, userId }) {
		const existedChat = await chatModel.countDocuments({
			_id: chatId,
			user: userId,
		});
		if (!existedChat) throw new FileNotFoundError(`❌ Chat not found!`);

		return await new messageModel({
			type,
			chat: chatId,
			body,
			metadata,
		}).save();
	}

	static async renameChat({ chatId, title, userId }) {
		const existedChat = await chatModel.countDocuments({
			_id: chatId,
			user: userId,
		});
		if (!existedChat) throw new FileNotFoundError(`❌ Chat not found!`);

		return await chatModel.findOneAndUpdate(
			{ _id: chatId, user: userId },
			{ $set: { title: title } },
			{ returnOriginal: false }
		);
	}

	static async updateSchema({ chatId, schema, userId }) {
		const existedChat = await chatModel.countDocuments({
			_id: chatId,
			user: userId,
		});
		if (!existedChat) throw new FileNotFoundError(`❌ Chat not found!`);

		return await chatModel.findOneAndUpdate(
			{ _id: chatId, user: userId },
			{ $set: { schema: schema } },
			{ returnOriginal: false }
		);
	}

	static async loadHistory({ chatId, userId }) {
		const existedChat = await chatModel.findOne({
			_id: chatId,
			user: userId,
		});
		if (!existedChat) throw new FileNotFoundError(`❌ Chat not found!`);

		const messages = await messageModel
			.find({ chat: existedChat._id })
			.sort({ createdAt: -1 })
			.limit(10)
			.lean();

		return {
			chat: existedChat,
			messages: messages
		}
	}
}

module.exports = ChatService;