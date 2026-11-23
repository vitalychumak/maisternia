// Спільні дрібниці уроків: кнопки «Скопіювати» і галочки завдань, що запам'ятовуються на пристрої.
(function () {
  function select(el) {
    const r = document.createRange();
    r.selectNodeContents(el);
    const s = getSelection();
    s.removeAllRanges();
    s.addRange(r);
  }
  document.querySelectorAll('.copy').forEach(function (b) {
    b.addEventListener('click', function () {
      const el = document.getElementById(b.dataset.target), old = b.textContent;
      const done = function () { b.textContent = 'Скопійовано'; setTimeout(function () { b.textContent = old; }, 1500); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(el.innerText).then(done).catch(function () { select(el); });
      } else select(el);
    });
  });
  const prefix = 'lesson' + (document.body.dataset.lesson || '') + '-';
  document.querySelectorAll('.task input').forEach(function (cb) {
    const key = prefix + cb.id, task = cb.closest('.task');
    try { cb.checked = localStorage.getItem(key) === '1'; } catch (e) {}
    task.classList.toggle('done', cb.checked);
    cb.addEventListener('change', function () {
      task.classList.toggle('done', cb.checked);
      try { localStorage.setItem(key, cb.checked ? '1' : '0'); } catch (e) {}
    });
  });
})();
