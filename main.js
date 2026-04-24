alert("main.js carregou");

window.onload = () => {
  const btn = document.getElementById("testeBtn");
  const msg = document.getElementById("testeMsg");

  if (btn) {
    btn.onclick = () => {
      msg.textContent = "JS funcionando!";
    };
  }
};
