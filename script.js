document.getElementById('year').textContent = new Date().getFullYear();

const menuToggle = document.getElementById('menuToggle');
const navInner = document.getElementById('navInner');
const mobilePanel = document.getElementById('mobilePanel');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navInner.classList.toggle('open');
    mobilePanel.style.display = mobilePanel.style.display === 'flex' ? 'none' : 'flex';
  });

  mobilePanel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobilePanel.style.display = 'none';
      navInner.classList.remove('open');
    });
  });
}
