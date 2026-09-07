// Progressive enhancements; navigation, content and language routes work without JavaScript.
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const strings = JSON.parse($('#ui-strings')?.textContent || '{}');

const menu = $('#mobile-nav');
const toggle = $('.menu-toggle');
function closeMenu(returnFocus = false) {
  if (!menu || !toggle) return;
  menu.hidden = true;
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', strings.openMenu);
  if (returnFocus) toggle.focus();
}
toggle?.addEventListener('click', () => {
  const opening = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(opening));
  toggle.setAttribute('aria-label', opening ? strings.closeMenu : strings.openMenu);
  menu.hidden = !opening;
});
$$('a', menu || document.createElement('div')).forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu && !menu.hidden) closeMenu(true); });
document.addEventListener('click', event => { if (menu && !menu.hidden && !event.target.closest('.site-header')) closeMenu(); });
matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const cards = $$('.project-grid[data-filterable] .project-card');
const filters = $$('.filter');
function applyFilter(category, updateHistory = true) {
  if (!filters.some(button => button.dataset.filter === category)) category = 'all';
  let visible = 0;
  cards.forEach(card => {
    const show = category === 'all' || card.dataset.categories.split(' ').includes(category);
    card.hidden = !show;
    card.classList.toggle('reveal', show && category !== 'all');
    if (show) visible++;
  });
  filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
  const status = $('#results-count');
  if (status) status.textContent = strings.results.replace('{count}', String(visible)).replace('{total}', String(cards.length));
  if (updateHistory) {
    const url = new URL(location.href);
    if (category === 'all') url.searchParams.delete('category'); else url.searchParams.set('category', category);
    history.replaceState(null, '', url);
  }
}
filters.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter)));
if (cards.length) {
  applyFilter(new URL(location.href).searchParams.get('category') || 'all', false);
  window.addEventListener('popstate', () => applyFilter(new URL(location.href).searchParams.get('category') || 'all', false));
}

if ('IntersectionObserver' in window) {
  const links = $$('.desktop-nav a[data-section]');
  const sections = links.map(link => document.getElementById(link.dataset.section)).filter(Boolean);
  const observer = new IntersectionObserver(entries => {
    const active = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!active) return;
    links.forEach(link => {
      if (link.dataset.section === active.target.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));
}

const lightbox = $('#image-lightbox');
let previousFocus;
let previousOverflow;
function openImage(src, alt) {
  if (!lightbox?.showModal) { window.open(src, '_blank', 'noopener'); return; }
  previousFocus = document.activeElement;
  previousOverflow = document.body.style.overflow;
  $('#lightbox-image').src = src;
  $('#lightbox-image').alt = alt;
  $('#lightbox-caption').textContent = alt;
  lightbox.showModal();
  document.body.style.overflow = 'hidden';
}
$$('[data-image]').forEach(button => button.addEventListener('click', () => openImage(button.dataset.image, button.dataset.caption)));
$('.lightbox-close')?.addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
lightbox?.addEventListener('close', () => {
  document.body.style.overflow = previousOverflow || '';
  previousFocus?.focus();
});

const form = $('#contact-form');
form?.addEventListener('submit', async event => {
  event.preventDefault();
  if (!form.reportValidity() || form.dataset.submitting === 'true') return;
  const data = new FormData(form);
  if (data.get('website')) return;
  data.delete('website');
  const button = $('button[type=submit]', form);
  const status = $('#form-status');
  const label = $('[data-submit-label]', button);
  button.disabled = true;
  form.dataset.submitting = 'true';
  form.setAttribute('aria-busy', 'true');
  label.textContent = strings.sending;
  status.dataset.state = 'sending';
  status.textContent = strings.sending;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    // Keep the existing Make.com integration. A simple POST avoids a needless CORS preflight.
    const response = await fetch(form.action, { method: 'POST', body: data, signal: controller.signal });
    const body = (await response.text()).trim();
    const accepted = /^(ok|accepted|success)$/i.test(body);
    let structuredSuccess = false;
    try { const payload = JSON.parse(body); structuredSuccess = payload.success === true || payload.status === 'success'; } catch { /* Plain text responses are supported. */ }
    if (!response.ok || !(accepted || structuredSuccess)) throw new Error('Submission was not confirmed');
    status.dataset.state = 'success';
    status.textContent = strings.sent;
    form.reset();
  } catch {
    status.dataset.state = 'error';
    status.textContent = strings.sendError;
  } finally {
    clearTimeout(timer);
    button.disabled = false;
    form.dataset.submitting = 'false';
    form.removeAttribute('aria-busy');
    label.textContent = strings.send;
  }
});
