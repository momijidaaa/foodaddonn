import { world, system } from "@minecraft/server";

system.runInterval(() => {
  for (const player of world.getPlayers()) { 
    const dim = player.dimension;
    const p = player.location;
    const block = dim.getBlock({
      x: Math.floor(p.x),
      y: Math.floor(p.y) - 1,
      z: Math.floor(p.z)
    });

    if (!block || block.typeId !== "mc:rice_crop") continue;

    const perm = block.permutation;
    const age = perm.getState("mc:crop_age");

    if (typeof age === "number" && age < 3 && Math.random() < 0.1) {
      const newPerm = perm.withState("mc:crop_age", age + 1);
      block.setPermutation(newPerm);
    }
  }
}, 40);

world.beforeEvents.itemUseOn.subscribe((event) => {
  const { itemStack, block, player } = event;

  if (itemStack?.typeId !== "minecraft:bone_meal") return;
  if (block.typeId !== "mc:rice_crop") return;

  const perm = block.permutation;
  const age = perm.getState("mc:crop_age");

  if (typeof age === "number" && age < 3) {
    system.run(() => {
      const nextPerm = perm.withState("mc:crop_age", age + 1);
      block.setPermutation(nextPerm);

      block.dimension.spawnParticle("minecraft:crop_growth_emitter", {
        x: block.location.x + 0.5,
        y: block.location.y + 0.5,
        z: block.location.z + 0.5
      });

      block.dimension.playSound("item.bone_meal.use", block.location);

      if (player.getGameMode() !== "creative") {
        const inventory = player.getComponent("inventory").container;
        if (itemStack.amount > 1) {
          itemStack.amount -= 1;
          inventory.setItem(player.selectedSlotIndex, itemStack);
        } else {
          inventory.setItem(player.selectedSlotIndex, undefined);
        }
      }
    });
  }
});
