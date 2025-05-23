document.addEventListener('DOMContentLoaded', () => {
  // Zoek de knop
  const btn = document.getElementById('PlaatsBerichtBtn');
  if (!btn) return;

  // Luister naar hover in & uit
  btn.addEventListener('mouseenter', () => btn.classList.add('hovered'));     // 3. Voeg hover toe
  btn.addEventListener('mouseleave', () => btn.classList.remove('hovered'));  // 3. Verwijder hover

  // Luister naar klik
  btn.addEventListener('click', () => {
    btn.classList.remove('clicked');  
    void btn.offsetWidth;              // 3. Force reflow
    btn.classList.add('clicked');      // 3. Activeer shine
  });
});

