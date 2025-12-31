import * as server from "@minecraft/server";

server.world.beforeEvents.worldInitialize.subscribe(init => {
  init.itemComponentRegistry.registerCustomComponent("mc:honeybread", {
    onConsume(arg) {
      const player = arg.source;
      player.runCommand("effect @s speed 5 2 true");
    }
  });
});
