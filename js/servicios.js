document.addEventListener('DOMContentLoaded', () => {
  const tabs = Array.from(document.querySelectorAll('.svc-tab'));
  const panels = Array.from(document.querySelectorAll('.svc-panel'));
  function activate(index, focus = false) {
    tabs.forEach((tab, i) => {const active = i === index; tab.classList.toggle('is-active', active); tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1;});
    panels.forEach((panel, i) => {panel.hidden = i !== index; panel.classList.toggle('is-active', i === index);});
    if (focus) tabs[index].focus();
  }
  tabs.forEach((tab, i) => {tab.addEventListener('click', () => activate(i));tab.addEventListener('keydown', (event) => {let next = i;if(event.key === 'ArrowRight') next = (i + 1) % tabs.length;else if(event.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;else if(event.key === 'Home') next = 0;else if(event.key === 'End') next = tabs.length - 1;else return;event.preventDefault();activate(next, true);});});
});
