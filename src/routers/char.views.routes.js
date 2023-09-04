import { Router } from "express";
import messageService from "../services/messages.service.js";
export const router = Router();

router.get("/", async (req, res) => {
    try {
        const messages = messageService.getMessages();

        return res.render("chat", {
            title: "ChatSocket",
            messages
        });
    } catch {
        return res.render("bad-request", {});
    }
});
