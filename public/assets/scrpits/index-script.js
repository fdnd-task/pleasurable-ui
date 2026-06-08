let current = 0;
function showScreen(index) {
  const screens = document.querySelectorAll('.screen');
  if (index >= 0 && index < screens.length) {
    const currentScreen = screens[current];
    const nextScreen = screens[index];
    document.startViewTransition(() => {
      currentScreen.classList.remove('active');
      nextScreen.classList.add('active');
      current = index;
    });
  }
}

function nextScreen() {
  showScreen(current + 1);
}

function prevScreen() {
  showScreen(current - 1);
}