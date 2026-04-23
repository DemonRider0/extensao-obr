import OBR from "https://cdn.jsdelivr.net/npm/@owlbear-rodeo/sdk/+esm";

OBR.onReady(async () => {
  console.log("Flip Tool carregado");

  OBR.tool.onToolChange(async (tool) => {
    if (tool !== "flip-token") return;

    try {
      const selectedItems = await OBR.scene.items.getItems(
        (item) => item.selected
      );

      if (!selectedItems.length) {
        await OBR.notification.show("Selecione um token primeiro.");
        return;
      }

      await OBR.scene.items.updateItems(
        selectedItems.map(i => i.id),
        (items) => {
          for (const item of items) {
            
            // garante transform
            item.scale = item.scale || { x: 1, y: 1 };

            // flip horizontal
            item.scale.x = item.scale.x * -1;
          }
        }
      );

      await OBR.notification.show("Token flipado!");

    } catch (err) {
      console.error(err);
      await OBR.notification.show("Erro ao flipar token.");
    }
  });
});
