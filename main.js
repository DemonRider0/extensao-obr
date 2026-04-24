import OBR from "https://unpkg.com/@owlbear-rodeo/sdk?module";

const EXTENSION_ID = "token-flip";

function setStatus(msg, error = false) {
  const status = document.getElementById("status");
  if (!status) return;

  status.textContent = msg;
  status.style.color = error ? "#ff8080" : "#9fd29f";
}

async function getSelectedToken() {
  const items = await OBR.scene.items.getItems();
  return items.find(item => item.selected);
}

OBR.onReady(() => {
  console.log("Funcionando!");

  const frontInput = document.getElementById("frontUrl");
  const backInput = document.getElementById("backUrl");
  const saveBtn = document.getElementById("saveBtn");
  const flipBtn = document.getElementById("flipBtn");
  const testeBtn = document.getElementById("testeBtn");
  const testeMsg = document.getElementById("testeMsg");

  setStatus("Extensão pronta.");

  if (testeBtn) {
    testeBtn.addEventListener("click", () => {
      testeMsg.textContent = "JS funcionando!";
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", async () => {
      try {
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
      } catch (err) {
        console.error(err);
        setStatus("Erro ao salvar.", true);
      }
    });
  }

  if (flipBtn) {
    flipBtn.addEventListener("click", async () => {
      try {
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

        setStatus(
          flipped
            ? "Virado para verso."
            : "Virado para frente."
        );
      } catch (err) {
        console.error(err);
        setStatus("Erro ao flipar.", true);
      }
    });
  }
});
