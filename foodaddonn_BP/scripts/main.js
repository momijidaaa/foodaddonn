import * as server from "@minecraft/server";
import * as ui from "@minecraft/server-ui";


import { world, ItemStack, Player } from "@minecraft/server";

world.afterEvents.itemUse.subscribe((event) => {
    const { source: player, itemStack } = event;

    if (itemStack.typeId === "minecraft:compass") {
        
        if (player instanceof Player) {
            player.addExperience(10);
            
            player.sendMessage("§a経験値を10獲得しました！");
        }
    }
});

