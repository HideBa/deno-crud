import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getTweet,
  getTweets,
  addTweet,
  updateTweet,
  deleteTweet,
} from "./controller.ts";

const router = new Router();
router.get("/tweets", getTweets)
  .get("/tweet/:id", getTweet)
  .post(
    "/tweets",
    addTweet,
  ).put("/tweet/:id", updateTweet)
  .delete("/tweet/:id", deleteTweet);

export default router;
