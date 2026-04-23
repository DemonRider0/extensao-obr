OBR.onReady(() => {
  console.log("Extensão carregada!");

  document.getElementById("btn").addEventListener("click", () => {
    OBR.notification.show("Funcionou!");
  });
});