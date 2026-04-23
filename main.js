import OBR from "https://unpkg.com/@owlbear-rodeo/sdk?module";

OBR.onReady(() => {
  console.log("Extensão carregada!");

  document.getElementById("btn").addEventListener("click", () => {
    OBR.notification.show("Funcionou!");
  });
});
