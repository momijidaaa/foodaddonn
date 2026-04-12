import { world, system } from "@minecraft/server";

system.runInterval(() => {
  const dim = world.getDimension("overworld");

  for (const player of dim.getPlayers()) {
    const p = player.location;

    const block = dim.getBlock({
      x: Math.floor(p.x),
      y: Math.floor(p.y) - 1,
      z: Math.floor(p.z)
    });

    if (!block) continue;

    if (block.typeId !== "mc:rice_crop") continue;

    const state = block.permutation.getState("mc:crop_age");

    if (state === undefined) continue;

    if (state < 3 && Math.random() < 0.1) {
      block.setPermutation(
        block.permutation.withState("mc:crop_age", state + 1)
      );
    }
  }
}, 40);