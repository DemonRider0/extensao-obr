import OBR from "https://unpkg.com/@owlbear-rodeo/sdk?module";

const EXTENSION_ID = "token-flip";

const frontInput = document.getElementById("frontUrl");
const backInput = document.getElementById("backUrl");
const saveBtn = document.getElementById("saveBtn");
const flipBtn = document.getElementById("flipBtn");
const statusText = document.getElementById("status");

function setStatus(msg, error = false) {
  statusText.textContent = msg;
  statusText.style.color = error ? "#ff8080" : "#9fd29f";
}

async function getSelectedToken() {
  const items = await OBR.scene.items.getItems();
  const selected = items.find(i => i.selected);

  if (!selected) {
    setStatus("Nenhum token selecionado.", true);
    return null;
  }

  return selected;
}

saveBtn.addEventListener("click", async () => {
  const token = await getSelectedToken();
  if (!token) return;

  const front = frontInput.value.trim();
  const back = backInput.value.trim();

  if (!front || !back) {
    setStatus("Preencha as duas URLs.", true);
    return;
  }

  await OBR.scene.items.updateItems([token.id], items => {
    for (let item of items) {
      item.metadata[EXTENSION_ID] = {
        front,
        back,
        flipped: false
      };
    }
  });

  setStatus("Frente e verso salvos no token.");
});

flipBtn.addEventListener("click", async () => {
  const token = await getSelectedToken();
  if (!token) return;

  const data = token.metadata[EXTENSION_ID];

  if (!data) {
    setStatus("Esse token não foi configurado.", true);
    return;
  }

  const newFlipped = !data.flipped;
  const newImage = newFlipped ? data.back : data.front;

  await OBR.scene.items.updateItems([token.id], items => {
    for (let item of items) {
      item.image.url = newImage;

      item.metadata[EXTENSION_ID] = {
        ...data,
        flipped: newFlipped
      };
    }
  });

  setStatus(newFlipped ? "Token virou para o verso." : "Token voltou para frente.");
});

OBR.onReady(() => {
  setStatus("Extensão pronta.");
});
