import OBR from "https://cdn.jsdelivr.net/npm/@owlbear-rodeo/sdk/+esm";

const FRONT_IMAGE = "https://demonrider0.github.io/extensao-obr/imagens/moeda-front.png";
const BACK_IMAGE = "https://demonrider0.github.io/extensao-obr/imagens/moeda_verso.png";

OBR.onReady(async () => {
  console.log("Extensão carregada!");

  await OBR.notification.show("Selecione um item e pressione R");

  window.addEventListener("keydown", async (event) => {
    if (event.key.toLowerCase() !== "r") return;

    try {
      const selectedItems = await OBR.scene.items.getItems(
        (item) => item.selected
      );

      if (!selectedItems.length) {
        await OBR.notification.show("Nenhum item selecionado.");
        return;
      }

      const item = selectedItems[0];

      // Detecta lado atual pela imagem
      const currentImage = item.image?.url || "";

      const nextImage =
        currentImage === FRONT_IMAGE ? BACK_IMAGE : FRONT_IMAGE;

      // Atualiza item
      await OBR.scene.items.updateItems([item.id], (items) => {
        for (let i of items) {
          i.image.url = nextImage;
        }
      });

      await OBR.notification.show("Flip realizado!");

    } catch (error) {
      console.error(error);
      await OBR.notification.show("Erro ao flipar item.");
    }
  });
});
