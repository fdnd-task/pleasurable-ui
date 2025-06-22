document.addEventListener('DOMContentLoaded', () => {
  try {
    const btn = document.getElementById('PlaatsBerichtBtn');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('closeFormButton');

    if (!btn || !overlay || !closeBtn) {
      console.error("Elementen niet gevonden.");
      return;
    }

    // Hover effect
    btn.addEventListener('mouseenter', () => btn.classList.add('hovered'));
    btn.addEventListener('mouseleave', () => btn.classList.remove('hovered'));

    // Klik effect
    btn.addEventListener('click', () => {
      btn.classList.remove('clicked');
      void btn.offsetWidth;
      btn.classList.add('clicked');

      setTimeout(() => {
        overlay.style.display = 'flex';
      }, 800);
    });

    // Close overlay
    closeBtn.addEventListener('click', () => {
      overlay.style.display = 'none';
    });

  } catch (err) {
    console.error("Fout in script:", err);
  }
});
