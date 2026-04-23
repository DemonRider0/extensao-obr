import OBR from "https://cdn.jsdelivr.net/npm/@owlbear-rodeo/sdk/+esm";

let flipMode = false;

OBR.onReady(async () => {
  console.log("Extensão carregada");

  const btn = document.getElementById("btn");

  btn.addEventListener("click", async () => {
    flipMode = !flipMode;

    btn.textContent = flipMode ? "🟢 Flip ON" : "🔴 Flip OFF";

    await OBR.notification.show(
      flipMode ? "Modo Flip ativado" : "Modo Flip desativado"
    );
  });

  // escuta clique no mapa (SEU "tool system")
  OBR.scene.onPointerDown?.(async (event) => {
    if (!flipMode) return;

    const selectedItems = await OBR.scene.items.getItems(
      (item) => item.selected
    );

    if (!selectedItems.length) return;

    await flipItems(selectedItems);
  });
});

async function flipItems(items) {
  await OBR.scene.items.updateItems(
    items.map(i => i.id),
    (items) => {
      for (const item of items) {
        item.scale = item.scale || { x: 1, y: 1 };
        item.scale.x *= -1;
      }
    }
  );

  await OBR.notification.show("Flip realizado!");
}
