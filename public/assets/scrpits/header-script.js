document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  toggle.addEventListener('click', (event) => {
    event.stopPropagation(); 
    menu.classList.toggle('open');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    const insideMenu = menu.contains(event.target);
    const ClickOnToggle = toggle.contains(event.target);

    if (!insideMenu && !ClickOnToggle) {
      menu.classList.remove('open');
    }
  });
});
