const { SuccessResponse } = require("../middlewares/success.response");
const ChatService = require("../services/chat.services");

class ChatController {
	/************************************* CREATE NEW CHAT **********************************************
	 * @url     /api/v1/chat/create
	 * @method  POST
	 * @desc    Create a new chat
	 * @param   {String} userId
	 * @return  {JSON} newChat
	 */
	static async createNewChat(req, res, next) {
		const userId = req.user._id;
		const metadata = await ChatService.createNewChat({ userId });

		return new SuccessResponse({
			code: 201,
			message: `✔️ Created new Chat`,
			metadata,
		}).send({ response: res });
	}

	/************************************* UPDATE SCHEMA **********************************************
	 * @url     /api/v1/chat/update
	 * @method  PUT
	 * @desc    Update new schema
	 * @param   {String} chatId
	 * @param   {String} schema
	 * @param   {String} userId
	 * @return  {JSON} updatedChat
	 */
	static async updateSchema(req, res, next) {
		const userId = req.user._id;
		const { chatId, schema } = req.body;
		const metadata = await ChatService.updateSchema({ chatId, schema, userId });

		return new SuccessResponse({
			code: 200,
			message: `✔️ Updated new Schema`,
			metadata,
		}).send({ response: res });
	}

	/************************************* ADD NEW MESSAGE **********************************************
	 * @url     /api/v1/chat/newMessage
	 * @method  POST
	 * @desc    Add new message to Chat
	 * @param   {String} chatId
	 * @param   {String} type
	 * @param   {String} body
	 * @param   {Array} metadata
	 * @param   {String} userId
	 * @return  {JSON} newMessage
	 */
	static async addMessage(req, res, next) {
		const userId = req.user._id;
		const { chatId, type, body, metadata } = req.body;

		return new SuccessResponse({
			code: 201,
			message: `✔️ Added new message`,
			metadata: await ChatService.addMessage({ chatId, type, body, metadata, userId })
		}).send({ response: res });
	}

	/************************************* DELETE CHAT **********************************************
	 * @url     /api/v1/chat/delete
	 * @method  DELETE
	 * @desc    Delete a chat
	 * @param   {String} chatId
	 * @param   {String} userId
	 * @return  {JSON} 
	 */
	static async deleteChat(req, res, next) {
		const userId = req.user._id;
		const { chatId } = req.body;

		return new SuccessResponse({
			code: 200,
			message: `✔️ Deleted chat`,
			metadata: await ChatService.deleteChat({ chatId, userId })
		}).send({ response: res });
	}


	/************************************* LOAD HISTORY **********************************************
	 * @url     /api/v1/chat/history/:chatId
	 * @method  GET
	 * @desc    Get history messages
	 * @param   {String} chatId
	 * @return  {JSON} messages
	 */
	static async loadHistory(req, res, next) {
		const userId = req.user._id;
		const { chatId } = req.params;

		return new SuccessResponse({
			code: 200,
			message: `✔️ Loaded history chat`,
			metadata: await ChatService.loadHistory({ chatId, userId })
		}).send({ response: res });
	}
}

module.exports = ChatController;
