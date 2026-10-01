document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  }));

  // Highlight active nav link on scroll
  const links = [...nav.querySelectorAll('a')];
  const sections = links.map(a => document.querySelector(a.getAttribute('href')));
  const setActive = () => {
    const y = window.scrollY + 120;
    let current = 0;
    sections.forEach((s, i) => { if (s && s.offsetTop <= y) current = i; });
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = links.length - 1;
    links.forEach((a, i) => a.classList.toggle('active', i === current));
  };
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();

  // Animate skill bars when visible
  const bars = document.querySelectorAll('.bar i');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.level + '%';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(b => io.observe(b));
});
