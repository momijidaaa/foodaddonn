import * as server from "@minecraft/server";

server.world.beforeEvents.worldInitialize.subscribe(init => {
   init.itemComponentRegistry.registerCustomComponent("mc:honeybread_component", {
    onConsume(arg) {
      const player = arg.source;
      player.addEffect("speed", 60, { amplifier: 1, showParticles: true });
    }
   });
});
