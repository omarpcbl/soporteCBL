function removeModal() {
  const modal = document.querySelector("#modalSincronizarVentasAnteriores");
  const backdrop = document.querySelector(".modal-backdrop.fade.in");

  if (modal && backdrop) {
    modal.remove();
    backdrop.remove();
  }
}

removeModal();
