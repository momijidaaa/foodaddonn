import * as server from "@minecraft/server";

server.world.beforeEvents.worldInitialize.subscribe(init => {

  init.itemComponentRegistry.registerCustomComponent("mc:honeybread", {
    onConsume(arg) {
      const player = arg.source;
      if (!(player instanceof server.Player)) return;

      player.addEffect("speed", 60, {
        amplifier: 1,
        showParticles: true
      });
    }
  });

  init.itemComponentRegistry.registerCustomComponent("mc:cooked_catfish", {
    onConsume(arg) {
      const player = arg.source;
      if (!(player instanceof server.Player)) return;

      player.addEffect("water_breathing", 100, {
        amplifier: 2,
        showParticles: true
      });
    }
  });

});
