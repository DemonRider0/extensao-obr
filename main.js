const EXTENSION_ID = "token-flip";

function setStatus(msg, error = false) {
  const status = document.getElementById("status");
  status.textContent = msg;
  status.style.color = error ? "#ff8080" : "#9fd29f";
}

async function getSelectedToken() {
  const items = await OBR.scene.items.getItems();
  return items.find(i => i.selected);
}

OBR.onReady(() => {
  setStatus("Extensão pronta.");

  const frontInput = document.getElementById("frontUrl");
  const backInput = document.getElementById("backUrl");
  const saveBtn = document.getElementById("saveBtn");
  const flipBtn = document.getElementById("flipBtn");

  // BOTÃO TESTE
  const testeBtn = document.getElementById("testeBtn");
  const testeMsg = document.getElementById("testeMsg");

  if (testeBtn) {
    testeBtn.onclick = () => {
      testeMsg.textContent = "JS funcionando!";
    };
  }

  // SALVAR
  saveBtn.onclick = async () => {
    const token = await getSelectedToken();

    if (!token) {
      setStatus("Selecione um token.", true);
      return;
    }

    const front = frontInput.value.trim();
    const back = backInput.value.trim();

    if (!front || !back) {
      setStatus("Preencha frente e verso.", true);
      return;
    }

    await OBR.scene.items.updateItems([token.id], items => {
      items.forEach(item => {
        item.metadata[EXTENSION_ID] = {
          front,
          back,
          flipped: false
        };
      });
    });

    setStatus("Imagens salvas.");
  };

  // FLIP
  flipBtn.onclick = async () => {
    const token = await getSelectedToken();

    if (!token) {
      setStatus("Selecione um token.", true);
      return;
    }

    const data = token.metadata[EXTENSION_ID];

    if (!data) {
      setStatus("Token não configurado.", true);
      return;
    }

    const flipped = !data.flipped;
    const newUrl = flipped ? data.back : data.front;

    await OBR.scene.items.updateItems([token.id], items => {
      items.forEach(item => {
        item.image.url = newUrl;
        item.metadata[EXTENSION_ID] = {
          ...data,
          flipped
        };
      });
    });

    setStatus(flipped ? "Virado para verso." : "Virado para frente.");
  };
});
