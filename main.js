import OBR from "https://cdn.jsdelivr.net/npm/@owlbear-rodeo/sdk/+esm";

OBR.onReady(async () => {
  console.log("Extensão Flip carregada");

  // Registra ação no menu do item (token)
  OBR.contextMenu.create({
    id: "flip-token-action",
    icons: [
      {
        icon: "https://demonrider0.github.io/extensao-obr/imagens/t20-icon.png",
        label: "Flip Token",
      },
    ],
    filter: (context) => {
      // garante que só aparece em tokens selecionados
      return context.items && context.items.length > 0;
    },
    onClick: async (context) => {
      try {
        const items = context.items;

        if (!items.length) {
          await OBR.notification.show("Nenhum token selecionado.");
          return;
        }

        await OBR.scene.items.updateItems(
          items.map(i => i.id),
          (updated) => {
            for (const item of updated) {
              item.scale = item.scale || { x: 1, y: 1 };

              // FLIP horizontal universal
              item.scale.x *= -1;
            }
          }
        );

        await OBR.notification.show("Token flipado!");

      } catch (err) {
        console.error(err);
        await OBR.notification.show("Erro ao flipar token.");
      }
    }
  });
});
