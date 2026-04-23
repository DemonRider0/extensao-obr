import OBR from "https://cdn.jsdelivr.net/npm/@owlbear-rodeo/sdk/+esm";

OBR.onReady(() => {
  console.log("Extensão carregada!");

  document.getElementById("btn").addEventListener("click", async () => {
    await OBR.notification.show("Funcionou!");
  });
});
