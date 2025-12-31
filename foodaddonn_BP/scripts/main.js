import * as server from "@minecraft/server";

server.world.beforeEvents.worldInitialize.subscribe(init => {
   init.itemComponentRegistry.registerCustomComponent("food:honeybread",{
    onConsume(arg){
      const player = arg.source;
      player.runCommandAsync("effect @s minecraft:speed 10 1 true");
    }
   })
})