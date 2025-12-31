import * as server from "@minecraft/server";

server.world.beforeEvents.worldInitialize.subscribe(init =>{
 init.itemComponentRegistry.registerCostomComponent("mc:honeybread",{
    onConsume(arg){
        const Player =arg.source;
        Player.runComannd("effect @s speed 5 2 true");
    }
 })
})