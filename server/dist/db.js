"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000;
const connectToDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = process.env.MONGO_URI;
        yield mongoose.connect(url);
        console.log("Connected to MongoDB with Mongoose");
    }
    catch (err) {
        console.error("Could not connect to the database", err);
        process.exit(1);
    }
});
module.exports = { connectToDb, PORT };
