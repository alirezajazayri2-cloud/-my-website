'use strict';
const themeButton = document.querySelector('.theme-toggle');
function syncTheme() { const dark = document.documentElement.dataset.theme === 'dark'; themeButton.setAttribute('aria-label', dark ? 'فعال کردن حالت روز' : 'فعال کردن حالت شب'); themeButton.setAttribute('aria-pressed', String(dark)); themeButton.firstElementChild.textContent = dark ? '☀' : '☾'; }
syncTheme();
themeButton.addEventListener('click', () => { const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = theme; try { localStorage.setItem('alireza-theme', theme); } catch {} syncTheme(); });
const menu = document.querySelector('.menu-toggle');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); document.querySelector('#main-nav').classList.remove('open'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); document.querySelector('#main-nav').classList.toggle('open', open); });
document.addEventListener('keydown', event => { if(event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
document.querySelector('#year').textContent = new Intl.DateTimeFormat('fa-IR', { year: 'numeric' }).format(new Date());
document.querySelectorAll('[data-personal-photo]').forEach(img => { const fallback = () => { img.hidden = true; img.nextElementSibling.hidden = false; }; img.addEventListener('error', fallback); if (img.complete && img.naturalWidth === 0) fallback(); });
let toastTimer;
function toast(message) { const element = document.querySelector('#toast'); element.textContent = message; element.classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => element.classList.remove('visible'), 3500); }
async function copyText(text) { try { await navigator.clipboard.writeText(text); toast('کپی شد؛ آمادهٔ استفاده است.'); } catch { const area = document.createElement('textarea'); area.value = text; area.style.cssText = 'position:fixed;top:0;left:0;opacity:0'; document.body.append(area); area.select(); let success = false; try { success = document.execCommand('copy'); } catch {} area.remove(); toast(success ? 'کپی شد؛ آمادهٔ استفاده است.' : 'کپی خودکار ممکن نیست؛ لطفاً متن را انتخاب و کپی کن.'); } }
document.querySelector('#copy-phone')?.addEventListener('click', () => copyText('09916382011'));
const form = document.querySelector('#contact-form');
if (form) { const selected = new URLSearchParams(location.search).get('service'); if (['website', 'app', 'psychology'].includes(selected)) form.elements.service.value = selected; form.addEventListener('submit', event => { event.preventDefault(); if(!form.reportValidity()) return; const name = form.elements.name.value.trim(); const message = form.elements.message.value.trim(); if(!name || !message) { toast('لطفاً نام و پیام را کامل بنویس.'); return; } const subject = form.elements.service.selectedOptions[0].text; document.querySelector('#prepared-message').value = `سلام علیرضا! من ${name} هستم.\nموضوع: ${subject}\n${message}`; document.querySelector('#message-result').hidden = false; document.querySelector('#prepared-message').focus(); }); document.querySelector('#copy-message').addEventListener('click', () => copyText(document.querySelector('#prepared-message').value)); }
