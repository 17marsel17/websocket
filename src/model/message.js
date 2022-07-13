import mongoose from "mongoose";

const { Schema, model } = mongoose;

const Message = new Schema({
    author: String,
    message: String,
    bookId: String
});

export const MessageModel = model('Message', Message);