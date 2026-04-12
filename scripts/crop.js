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

    const perm = block.permutation;

    const age = perm.getState("mc:crop_age");

    if (typeof age !== "number") continue;

    if (age < 3 && Math.random() < 0.1) {
      const newPerm = perm.withState("mc:crop_age", age + 1);
      block.setPermutation(newPerm);
    }
  }
}, 40);