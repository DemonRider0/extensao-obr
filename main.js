import OBR from "https://cdn.jsdelivr.net/npm/@owlbear-rodeo/sdk/+esm";

const FRONT_IMAGE = "https://demonrider0.github.io/extensao-obr/imagens/moeda-front.png";
const BACK_IMAGE = "https://demonrider0.github.io/extensao-obr/imagens/moeda_verso.png";

let currentSelection = [];

OBR.onReady(async () => {
  console.log("Extensão carregada!");

  // escuta seleção em tempo real
  OBR.scene.items.onChange((items) => {
    currentSelection = items.filter((item) => item.selected);
  });

  await OBR.notification.show("Extensão pronta!");

  const btn = document.getElementById("btn");

  btn.addEventListener("click", async () => {
    try {
      if (!currentSelection.length) {
        await OBR.notification.show("Nenhum item selecionado.");
        return;
      }

      const item = currentSelection[0];

      const currentImage = item.image?.url || "";
      const nextImage =
        currentImage === FRONT_IMAGE ? BACK_IMAGE : FRONT_IMAGE;

      await OBR.scene.items.updateItems([item.id], (items) => {
        for (let i of items) {
          i.image.url = nextImage;
        }
      });

      await OBR.notification.show("Flip realizado!");

    } catch (err) {
      console.error(err);
      await OBR.notification.show("Erro ao flipar item.");
    }
  });
});
