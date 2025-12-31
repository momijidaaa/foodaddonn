import { world, system, Player } from "@minecraft/server";
import * as ui from "@minecraft/server-ui";

import { world, system, ItemStack, BlockPermutation, Player } from "@minecraft/server";

  world.afterEvents.playerBreakBlock.subscribe(arg => {
    arg.player.addExperience(10);
    arg.player.sendMessage('§aかっこいい破壊だね');
});

world.afterEvents.itemUse.subscribe(arg => {
    const player = arg.source;

    // アイテムがコンパスでない場合は処理を中断
    if (arg.itemStack.typeId !== 'minecraft:compass') return;

    const form = new ui.ModalFormData();
    form.title('経験値どれくらいほしい');
    form.slider('追加するレベル', 0, 50, 1, 0);

    form.show(player).then(response => {
        // フォームがキャンセル（閉じられた）された場合は何もしない
        if (response.canceled) return;

        const levelAmount = response.formValues[0];

        // プレイヤーにレベルを付与
        if (typeof levelAmount === "number" && levelAmount > 0) {
            player.addLevels(levelAmount);
            player.sendMessage(`§aレベルを ${levelAmount} 付与しました。`);
        }
    }).catch(err => {
        console.error("UIの表示中にエラーが発生しました:", err);
    });
});
