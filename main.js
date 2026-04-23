import OBR from "https://cdn.jsdelivr.net/npm/@owlbear-rodeo/sdk/+esm";

const FRONT_IMAGE = "https://demonrider0.github.io/extensao-obr/imagens/moeda-front.png";
const BACK_IMAGE = "https://demonrider0.github.io/extensao-obr/imagens/moeda_verso.png";

OBR.onReady(async () => {
  console.log("Flip Tool ativo");

  // Quando a ferramenta for ativada
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

      for (const item of selectedItems) {
        const currentImage = item.image?.url || "";

        const nextImage =
          currentImage === FRONT_IMAGE ? BACK_IMAGE : FRONT_IMAGE;

        await OBR.scene.items.updateItems([item.id], (items) => {
          for (let i of items) {
            i.image.url = nextImage;
          }
        });
      }

      await OBR.notification.show("Flip realizado!");

    } catch (err) {
      console.error(err);
      await OBR.notification.show("Erro ao flipar token.");
    }
  });
});
