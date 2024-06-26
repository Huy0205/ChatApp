import express from "express";
const router = express.Router();
import ConversationModel from "../models/Conversation.js";
import * as conversationController from "../controllers/conversationController.js";
router.post("/",conversationController.handleCreateConversation);
router.get("/:id",conversationController.handleGetConversationById);
router.get("/user/:senderid",conversationController.handleGetConversation);
router.put("/:conversationId",conversationController.handleUpdateLastMessage);
router.post("/sort",async (req,res)=>{
  const x= await ConversationModel.find({}).sort({updatedAt: -1})
  res.status(200).json(x)
});
router.get("/notGroup/:currentUserId", conversationController.handleGetConversationNotGroup);

export default router