import dotenv from "dotenv";

import { getChannel } from "./ticket";
import { DiscordMaintainer } from "./maintainer";
import { WsServer } from "./server";
import { SubscriptionNotifier } from "./subs";

dotenv.config();

getChannel(process.env.BOT_TOKEN ?? "")
  .then((channel) => {
    const notifier = new SubscriptionNotifier();
    new DiscordMaintainer(channel, notifier).start();
    new WsServer(parseInt(process.env.PORT ?? "", 10), channel, notifier);
    console.log("Initialization successful.");
  })
  .catch((e) => console.log("Failure during startup", e));
