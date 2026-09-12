/* =========================================================
   TJN-PYTHON SYSTEM — 应用逻辑（基于 mdui Web Components）
   模块：多语言 / 主题 / 莫奈配色 / 背景 / 调试 / 命令控制台
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const $ = (id) => document.getElementById(id);
  const root = document.documentElement;

  /* ---------------- 元素引用 ---------------- */
  const keyPage = $('keyPage'), mainPage = $('mainPage'), lockedPage = $('lockedPage');
  const keyInput = $('keyInput'), keySubmitBtn = $('keySubmitBtn');
  const keyResult = $('keyResult'), keyStatusContainer = $('keyStatusContainer');
  const attemptsCounter = $('attemptsCounter');
  const userInput = $('userInput'), submitBtn = $('submitBtn');
  const resultDiv = $('result'), statusContainer = $('statusContainer');
  const lockedInput = $('lockedInput'), lockedSubmitBtn = $('lockedSubmitBtn'), lockedResult = $('lockedResult');
  const historyList = $('historyList'), clearHistoryBtn = $('clearHistoryBtn');
  const favoritesList = $('favoritesList'), addCurrentToFavoritesBtn = $('addCurrentToFavoritesBtn');
  const formatHint = $('formatHint');
  const lockedHint = document.querySelector('.locked-hint');

  const settingsDialog = $('settingsDialog'), closeSettingsBtn = $('closeSettingsBtn');
  const debugDialog = $('debugDialog'), closeDebugBtn = $('closeDebugBtn');
  const keySettingsBtn = $('keySettingsBtn'), mainSettingsBtn = $('mainSettingsBtn'), lockedSettingsBtn = $('lockedSettingsBtn');

  const languageOptions = document.querySelectorAll('.language-option');
  const themeOptions = document.querySelectorAll('.theme-option');
  const backgroundOptions = document.querySelectorAll('.background-option');
  const monetOptions = document.querySelectorAll('.monet-option');

  const backgroundFileInput = $('backgroundFileInput'), bgUploadBtn = $('bgUploadBtn'), uploadStatus = $('uploadStatus');
  const customBackgroundUpload = $('customBackgroundUpload'), customBackgroundInfo = $('customBackgroundInfo');
  const customBackgroundImage = $('customBackgroundImage'), deleteCustomBackgroundBtn = $('deleteCustomBackgroundBtn');

  const blurVisual = $('blurVisual'), blurOverlay = $('blurOverlay'), backgroundContainer = $('backgroundContainer');
  const debugBlurVisual = $('debugBlurVisual'), debugBlurEffect = $('debugBlurEffect');
  const versionBadge = $('versionBadge'), debugVersionBadge = $('debugVersionBadge');

  const blurSlider = $('blurSlider'), blurValue = $('blurValue'), resetBlurBtn = $('resetBlurBtn'), applyBlurBtn = $('applyBlurBtn');
  const modalBlurSlider = $('modalBlurSlider'), modalBlurValue = $('modalBlurValue'), resetModalBlurBtn = $('resetModalBlurBtn'), applyModalBlurBtn = $('applyModalBlurBtn');
  const attemptsSlider = $('attemptsSlider'), attemptsValue = $('attemptsValue'), resetAttemptsBtn = $('resetAttemptsBtn'), applyAttemptsBtn = $('applyAttemptsBtn');
  const resetAllSettingsBtn = $('resetAllSettingsBtn'), clearAllDataBtn = $('clearAllDataBtn');
  const localStorageSwitch = $('localStorageSwitch'), applyLocalStorageBtn = $('applyLocalStorageBtn');

  const confirmDialog = $('confirmDialog'), confirmTitle = $('confirmTitle'), confirmMessage = $('confirmMessage');
  const confirmInputContainer = $('confirmInputContainer'), confirmKeyInput = $('confirmKeyInput');
  const confirmCancelBtn = $('confirmCancelBtn'), confirmConfirmBtn = $('confirmConfirmBtn'), closeConfirmBtn = $('closeConfirmBtn');
  const snackbar = $('snackbar');
  const debugStatusLine = document.querySelector('.debug-status-line');

  /* ---------------- 状态 ---------------- */
  let attempts = 3, isLocked = false, currentConfirmAction = null;
  let currentLanguage = localStorage.getItem('language') || 'zh-CN';
  let currentTheme = localStorage.getItem('theme') || 'light';
  let currentMonetScheme = localStorage.getItem('monetScheme') || 'basil';
  let currentBackground = localStorage.getItem('background') || 'default';
  let customBackgroundData = localStorage.getItem('customBackground');
  let currentBgUrl = '';
  let debugBackgroundBlur = parseInt(localStorage.getItem('debugBackgroundBlur')) || 5;
  let debugAttempts = parseInt(localStorage.getItem('debugAttempts')) || 3;
  let debugModalBlur = parseInt(localStorage.getItem('debugModalBlur')) || 12;

  const enabled = (k, d) => { const v = localStorage.getItem(k); return v === null ? d : v !== 'false'; };
  let debugLocalStorageEnabled = enabled('debugLocalStorageEnabled', true);
  let commandHistory = JSON.parse(localStorage.getItem('commandHistory')) || [];
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  const DEFAULT_BG = 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80';

  /* ---------------- 工具 ---------------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------------- 多语言 ---------------- */
  const t = (k, p) => I18N.t(k, p);

  function renderStaticText() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const k = el.getAttribute('data-i18n');
      if (k) el.textContent = t(k);
    });
    document.querySelectorAll('[data-i18n-label]').forEach((el) => {
      el.label = t(el.getAttribute('data-i18n-label'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });
    formatHint.innerHTML = `<span class="kw">${esc(t('hint_text'))}</span>`;
    if (lockedHint) lockedHint.innerHTML = `<span class="kw">${esc(t('locked_hint'))}</span>`;
    updateStatusUI();
  }

  function applyLanguage(lang) {
    if (lang === 'auto') {
      const sys = (navigator.language || navigator.userLanguage || 'zh-CN');
      const map = { 'zh-HK': 'zh-TW', 'zh-TW': 'zh-TW', 'zh': 'zh-CN', 'ja': 'ja', 'en': 'en' };
      let m = 'zh-CN';
      for (const key of ['zh-HK', 'zh-TW', 'zh', 'ja', 'en']) { if (sys.startsWith(key)) { m = map[key]; break; } }
      currentLanguage = m;
      localStorage.setItem('language', 'auto');
    } else {
      currentLanguage = lang;
      localStorage.setItem('language', lang);
    }
    I18N.setLang(currentLanguage);
    renderStaticText();
    renderHistory();
    renderFavorites();
    syncSettingsUI();
  }

  /* ---------------- 主题 / 莫奈配色 ---------------- */
  const hexToRgb = (hex) => {
    const h = String(hex).replace('#', '');
    if (h.length !== 6) return hex;
    return `${parseInt(h.substring(0, 2), 16)}, ${parseInt(h.substring(2, 4), 16)}, ${parseInt(h.substring(4, 6), 16)}`;
  };

  function syncMduiTheme() {
    if (window.mdui && typeof mdui.setTheme === 'function') {
      mdui.setTheme(currentTheme === 'auto' ? 'auto' : (root.getAttribute('data-theme') || currentTheme));
    }
  }

  function applyTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('theme', theme);
    if (theme === 'auto') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const set = (e) => { root.setAttribute('data-theme', e.matches ? 'dark' : 'light'); syncMduiTheme(); applyMonetScheme(currentMonetScheme); };
      set(mq);
      if (!window.__themeListener) { mq.addEventListener('change', set); window.__themeListener = true; }
    } else {
      root.setAttribute('data-theme', theme);
      syncMduiTheme();
      applyMonetScheme(currentMonetScheme);
    }
    syncSettingsUI();
  }

  const COLOR_SCHEMES = {
    basil: { light: { primary: '#286C2A', onPrimary: '#FFFFFF', container: '#C8E6C9', onContainer: '#092100', secondary: '#546E50', secondaryContainer: '#D7EFD0', tertiary: '#546E50', tertiaryContainer: '#D7EFD0' }, dark: { primary: '#5CB860', onPrimary: '#003907', container: '#00530C', onContainer: '#E2FBE0', secondary: '#BAEFAD', secondaryContainer: '#375D34', tertiary: '#BAEFAD', tertiaryContainer: '#375D34' } },
    blue: { light: { primary: '#1E88E5', onPrimary: '#FFFFFF', container: '#BBDEFB', onContainer: '#003B91', secondary: '#5C6BC0', secondaryContainer: '#E0E7FF', tertiary: '#42A5F5', tertiaryContainer: '#D1E4FF' }, dark: { primary: '#64B5F6', onPrimary: '#003363', container: '#004B8F', onContainer: '#D6E3FF', secondary: '#B4BCFF', secondaryContainer: '#35418B', tertiary: '#8FCBFF', tertiaryContainer: '#00466F' } },
    purple: { light: { primary: '#6750A4', onPrimary: '#FFFFFF', container: '#EADDFF', onContainer: '#240058', secondary: '#958DA5', secondaryContainer: '#E8DEF8', tertiary: '#B58392', tertiaryContainer: '#FFD8E4' }, dark: { primary: '#9575CD', onPrimary: '#2D0051', container: '#45207C', onContainer: '#EADDFF', secondary: '#B0A7C0', secondaryContainer: '#625B71', tertiary: '#EFB8C8', tertiaryContainer: '#633B48' } },
    orange: { light: { primary: '#F97316', onPrimary: '#FFFFFF', container: '#FFE0B2', onContainer: '#7A3400', secondary: '#A78BFA', secondaryContainer: '#EDE9FF', tertiary: '#FBBF24', tertiaryContainer: '#FFF0C4' }, dark: { primary: '#FFA726', onPrimary: '#552200', container: '#7A3400', onContainer: '#FFE0B2', secondary: '#C9BEFF', secondaryContainer: '#6D5AA3', tertiary: '#FFDE8A', tertiaryContainer: '#5D4700' } },
    pink: { light: { primary: '#DB2777', onPrimary: '#FFFFFF', container: '#FCE4EC', onContainer: '#5C0039', secondary: '#8B5CF6', secondaryContainer: '#EDE9FF', tertiary: '#EC4899', tertiaryContainer: '#FFD8E4' }, dark: { primary: '#F48FB1', onPrimary: '#5C0039', container: '#8C005D', onContainer: '#FFD8E4', secondary: '#C6B9FF', secondaryContainer: '#6D5AA3', tertiary: '#FF80B5', tertiaryContainer: '#8C005D' } }
  };

  function applyMonetScheme(scheme) {
    currentMonetScheme = scheme;
    localStorage.setItem('monetScheme', scheme);
    root.setAttribute('data-scheme', scheme);
    updateDynamicColors();
    syncSettingsUI();
  }

  function updateDynamicColors() {
    const scheme = COLOR_SCHEMES[currentMonetScheme] || COLOR_SCHEMES.basil;
    // 1) 让 mdui 按主色种子生成整套 M3 配色（--mdui-color-*：表面/描边/容器等随配色色相），
    //    使所有 mdui 组件都随主题颜色变化。
    if (window.mdui && typeof mdui.setColorScheme === 'function') {
      try { mdui.setColorScheme(scheme.light.primary); } catch (e) { /* ignore */ }
    }
    // 2) 再把关键语义色精确覆盖为自定义调色板值（与预览色块 / 自定义 CSS 完全一致），
    //    避免 mdui 生成的 tone 与预期主色不一致。
    const dark = root.getAttribute('data-theme') === 'dark';
    const c = scheme[dark ? 'dark' : 'light'];
    const rgb = (hex) => {
      const h = String(hex).replace('#', '');
      if (h.length !== 6) return hex;
      return `${parseInt(h.substring(0, 2), 16)}, ${parseInt(h.substring(2, 4), 16)}, ${parseInt(h.substring(4, 6), 16)}`;
    };
    const lum = (hex) => {
      const n = String(hex).replace('#', '');
      return (parseInt(n.substring(0, 2), 16) * 0.299 + parseInt(n.substring(2, 4), 16) * 0.587 + parseInt(n.substring(4, 6), 16) * 0.114) / 255;
    };
    const onFor = (hex) => lum(hex) > 0.5 ? '10, 10, 10' : '255, 255, 255';

    const set = (name, value) => root.style.setProperty(name, value);
    // 旧的 --md-sys-color-*（自定义 CSS 使用）
    set('--md-sys-color-primary', c.primary);
    set('--md-sys-color-on-primary', c.onPrimary);
    set('--md-sys-color-primary-container', c.container);
    set('--md-sys-color-on-primary-container', c.onContainer);
    set('--md-sys-color-secondary', c.secondary);
    set('--md-sys-color-secondary-container', c.secondaryContainer);
    set('--md-sys-color-tertiary', c.tertiary);
    set('--md-sys-color-tertiary-container', c.tertiaryContainer);
    // mdui 组件命名空间（--mdui-color-*）
    set('--mdui-color-primary', rgb(c.primary));
    set('--mdui-color-on-primary', rgb(c.onPrimary));
    set('--mdui-color-primary-container', rgb(c.container));
    set('--mdui-color-on-primary-container', rgb(c.onContainer));
    set('--mdui-color-secondary', rgb(c.secondary));
    set('--mdui-color-on-secondary', onFor(c.secondary));
    set('--mdui-color-secondary-container', rgb(c.secondaryContainer));
    set('--mdui-color-on-secondary-container', onFor(c.secondaryContainer));
    set('--mdui-color-tertiary', rgb(c.tertiary));
    set('--mdui-color-on-tertiary', onFor(c.tertiary));
    set('--mdui-color-tertiary-container', rgb(c.tertiaryContainer));
    set('--mdui-color-on-tertiary-container', onFor(c.tertiaryContainer));
  }

  /* ---------------- 背景 ---------------- */
  function applyBackground(background) {
    currentBackground = background;
    localStorage.setItem('background', background);
    let url = DEFAULT_BG;
    if (background === 'custom' && customBackgroundData) {
      try {
        const data = JSON.parse(customBackgroundData);
        if (data.dataUrl) url = data.dataUrl;
      } catch (e) { /* 忽略损坏数据 */ }
    }
    currentBgUrl = url;
    if (backgroundContainer) backgroundContainer.style.backgroundImage = `url("${url}")`;
    updateBlurPreview(url);
  }

  function updateBlurPreview(url) {
    const src = url || currentBgUrl;
    if (blurVisual) blurVisual.style.backgroundImage = `url(${src})`;
    if (debugBlurVisual) debugBlurVisual.style.backgroundImage = `url(${src})`;
  }

  // 压缩/缩放上传的背景图，使其在 localStorage 配额内可靠保存（真实照片尤其需要）
  function compressBackground(dataUrl, maxDim = 1920, quality = 0.85) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
          const w = Math.max(1, Math.round(img.width * scale));
          const h = Math.max(1, Math.round(img.height * scale));
          const canvas = document.createElement('canvas');
          canvas.width = w; canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);
          let out = canvas.toDataURL('image/jpeg', quality);
          let q = quality;
          while (out.length > 2.4 * 1024 * 1024 && q > 0.35) { q -= 0.08; out = canvas.toDataURL('image/jpeg', q); }
          resolve(out);
        } catch (e) { reject(e); }
      };
      img.onerror = () => reject(new Error('decode'));
      img.src = dataUrl;
    });
  }

  /* ---------------- 状态与提示 ---------------- */
  function updateAttemptsCounter() {
    const chip = attemptsCounter.querySelector('mdui-chip');
    if (chip) chip.textContent = t('attempts_count', { n: attempts });
  }

  function updateStatusUI() {
    updateAttemptsCounter();
    if (debugStatusLine) debugStatusLine.textContent = t('debug_status_line', { blur: debugBackgroundBlur + 'px', n: debugAttempts });
  }

  function showStatusMessage(message, type, container) {
    const icon = type === 'success' ? 'check_circle' : 'error';
    container.innerHTML =
      `<div class="status-indicator show ${type}">` +
      `<div class="status-icon ${type}"><mdui-icon name="${icon}--outlined"></mdui-icon></div>` +
      `<div class="status-content ${type}"><div class="status-title">${esc(message)}</div></div>` +
      `</div>`;
  }

  function showResult(message, type, el) {
    el.textContent = message;
    el.className = 'result ' + type;
    setTimeout(() => el.classList.add('show'), 10);
  }

  function snack(message) {
    snackbar.innerHTML = esc(message);
    snackbar.show();
  }
  const showDebugStatus = snack;

  /* ---------------- 对话框 ---------------- */
  function openSettings() {
    settingsDialog.classList.add('open');
    settingsDialog.classList.remove('closing');
    updateBlurPreview();
    syncSettingsUI();
  }
  function closeSettings() {
    settingsDialog.classList.add('closing');
    setTimeout(() => settingsDialog.classList.remove('open', 'closing'), 300);
  }
  function openDebug() {
    debugDialog.classList.add('open');
    debugDialog.classList.remove('closing');
    updateStatusUI();
  }
  function closeDebug() {
    debugDialog.classList.add('closing');
    setTimeout(() => debugDialog.classList.remove('open', 'closing'), 300);
  }

  function openConfirmDialog(title, message, needsKey, actionCallback) {
    currentConfirmAction = actionCallback;
    confirmTitle.textContent = title;
    confirmMessage.textContent = message;
    confirmInputContainer.hidden = !needsKey;
    confirmKeyInput.value = '';
    confirmDialog.classList.remove('closing');
    confirmDialog.classList.add('open');
  }
  function closeConfirm() {
    confirmDialog.classList.add('closing');
    setTimeout(() => confirmDialog.classList.remove('open', 'closing'), 300);
  }
  confirmCancelBtn.addEventListener('click', () => { closeConfirm(); currentConfirmAction = null; });
  closeConfirmBtn.addEventListener('click', () => { closeConfirm(); currentConfirmAction = null; });
  confirmConfirmBtn.addEventListener('click', () => {
    if (!currentConfirmAction) return;
    const needsKey = !confirmInputContainer.hidden;
    const key = needsKey ? confirmKeyInput.value.trim() : null;
    if (needsKey && !key) { showDebugStatus(t('emptyKeyError')); return; }
    const action = currentConfirmAction;
    currentConfirmAction = null;
    closeConfirm();
    action(key);
  });

  keySettingsBtn.addEventListener('click', openSettings);
  mainSettingsBtn.addEventListener('click', openSettings);
  lockedSettingsBtn.addEventListener('click', openSettings);
  closeSettingsBtn.addEventListener('click', closeSettings);
  closeDebugBtn.addEventListener('click', closeDebug);

  /* ---------------- 设置面板交互 ---------------- */
  const bindCard = (opts, handler) => {
    opts.forEach((opt) => {
      const activate = () => handler(opt);
      opt.addEventListener('click', activate);
      opt.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); } });
    });
  };

  bindCard(languageOptions, (opt) => applyLanguage(opt.getAttribute('data-lang')));
  bindCard(themeOptions, (opt) => applyTheme(opt.getAttribute('data-theme-value')));
  bindCard(backgroundOptions, (opt) => {
    const val = opt.getAttribute('data-bg');
    applyBackground(val);
    customBackgroundUpload.style.display = val === 'custom' ? 'flex' : 'none';
    syncSettingsUI();
  });
  bindCard(monetOptions, (opt) => { applyMonetScheme(opt.getAttribute('data-scheme')); showDebugStatus(t('monetApplied')); });

  function syncSettingsUI() {
    const storedLang = localStorage.getItem('language');
    const langVal = storedLang === 'auto' ? 'auto' : (currentLanguage || 'zh-CN');
    languageOptions.forEach((o) => o.classList.toggle('active', o.getAttribute('data-lang') === langVal));
    themeOptions.forEach((o) => o.classList.toggle('active', o.getAttribute('data-theme-value') === currentTheme));
    backgroundOptions.forEach((o) => o.classList.toggle('active', o.getAttribute('data-bg') === currentBackground));
    monetOptions.forEach((o) => o.classList.toggle('active', o.getAttribute('data-scheme') === currentMonetScheme));
  }

  /* ---------------- 自定义背景上传 ---------------- */
  bgUploadBtn.addEventListener('click', () => backgroundFileInput.click());
  backgroundFileInput.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    uploadStatus.textContent = t('uploading');
    uploadStatus.className = 'upload-status';
    const valid = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!valid.includes(file.type)) { uploadStatus.textContent = t('invalidImageType'); uploadStatus.className = 'upload-status error'; return; }
    if (file.size > 10 * 1024 * 1024) { uploadStatus.textContent = t('imageTooLarge'); uploadStatus.className = 'upload-status error'; return; }
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const dataUrl = await compressBackground(event.target.result);
        try {
          localStorage.setItem('customBackground', JSON.stringify({ dataUrl, name: file.name }));
        } catch (err) {
          uploadStatus.textContent = t('backgroundStoreError');
          uploadStatus.className = 'upload-status error';
          return;
        }
        customBackgroundData = JSON.stringify({ dataUrl, name: file.name });
        customBackgroundImage.src = dataUrl;
        customBackgroundInfo.style.display = 'flex';
        customBackgroundUpload.style.display = 'flex';
        uploadStatus.textContent = t('backgroundUploadSuccess');
        uploadStatus.className = 'upload-status success';
        // 上传成功后自动启用自定义背景，并同步选中状态
        applyBackground('custom');
        syncSettingsUI();
      } catch (err) {
        uploadStatus.textContent = t('uploadError');
        uploadStatus.className = 'upload-status error';
      }
    };
    reader.onerror = () => { uploadStatus.textContent = t('uploadError'); uploadStatus.className = 'upload-status error'; };
    reader.readAsDataURL(file);
  });

  deleteCustomBackgroundBtn.addEventListener('click', () => {
    openConfirmDialog(t('confirmDeleteBackgroundTitle'), t('confirmDeleteBackground'), false, () => {
      localStorage.removeItem('customBackground');
      customBackgroundData = null;
      customBackgroundInfo.style.display = 'none';
      customBackgroundUpload.style.display = 'none';
      applyBackground('default');
      syncSettingsUI();
    });
  });

  versionBadge.addEventListener('click', () => showDebugStatus(t('monetApplied')));
  debugVersionBadge.addEventListener('click', () => showDebugStatus(t('monetApplied')));

  /* ---------------- 调试面板逻辑 ---------------- */
  function applyDebugSettings() {
    root.style.setProperty('--background-blur', debugBackgroundBlur + 'px');
    blurOverlay.style.backdropFilter = `blur(${debugBackgroundBlur}px)`;
    blurOverlay.style.webkitBackdropFilter = `blur(${debugBackgroundBlur}px)`;
    root.style.setProperty('--modal-blur', debugModalBlur + 'px');
    attempts = debugAttempts;

    localStorageSwitch.checked = debugLocalStorageEnabled;

    blurSlider.value = debugBackgroundBlur;
    modalBlurSlider.value = debugModalBlur;
    attemptsSlider.value = debugAttempts;
    blurValue.textContent = debugBackgroundBlur + 'px';
    modalBlurValue.textContent = debugModalBlur + 'px';
    attemptsValue.textContent = String(debugAttempts);
    updateBlurPreview();
    syncBlurPreview();
    updateStatusUI();
  }

  function syncBlurPreview() {
    if (debugBlurEffect) debugBlurEffect.style.backdropFilter = `blur(${debugBackgroundBlur}px)`;
    if (debugBlurEffect) debugBlurEffect.style.webkitBackdropFilter = `blur(${debugBackgroundBlur}px)`;
  }

  const syncBlurChip = () => { const v = Number(blurSlider.value); blurValue.textContent = v + 'px'; debugBackgroundBlur = v; syncBlurPreview(); };
  blurSlider.addEventListener('input', syncBlurChip);
  blurSlider.addEventListener('change', syncBlurChip);
  resetBlurBtn.addEventListener('click', () => { debugBackgroundBlur = 5; blurSlider.value = 5; blurValue.textContent = '5px'; syncBlurPreview(); showDebugStatus(t('blurReset')); });
  applyBlurBtn.addEventListener('click', () => { debugBackgroundBlur = parseInt(blurSlider.value); localStorage.setItem('debugBackgroundBlur', debugBackgroundBlur); applyDebugSettings(); showDebugStatus(t('blurApplied')); });

  const syncModalBlurChip = () => { modalBlurValue.textContent = Number(modalBlurSlider.value) + 'px'; };
  modalBlurSlider.addEventListener('input', syncModalBlurChip);
  modalBlurSlider.addEventListener('change', syncModalBlurChip);
  resetModalBlurBtn.addEventListener('click', () => { debugModalBlur = 12; modalBlurSlider.value = 12; modalBlurValue.textContent = '12px'; showDebugStatus(t('modalBlurReset')); });
  applyModalBlurBtn.addEventListener('click', () => { debugModalBlur = parseInt(modalBlurSlider.value); localStorage.setItem('debugModalBlur', debugModalBlur); applyDebugSettings(); showDebugStatus(t('modalBlurApplied')); });

  const syncAttemptsChip = () => { attemptsValue.textContent = String(Number(attemptsSlider.value)); };
  attemptsSlider.addEventListener('input', syncAttemptsChip);
  attemptsSlider.addEventListener('change', syncAttemptsChip);
  resetAttemptsBtn.addEventListener('click', () => { debugAttempts = 3; attemptsSlider.value = 3; attemptsValue.textContent = '3'; showDebugStatus(t('attemptsReset')); });
  applyAttemptsBtn.addEventListener('click', () => { debugAttempts = parseInt(attemptsSlider.value); localStorage.setItem('debugAttempts', debugAttempts); attempts = debugAttempts; updateAttemptsCounter(); showDebugStatus(t('attemptsApplied')); });

  applyLocalStorageBtn.addEventListener('click', () => {
    debugLocalStorageEnabled = localStorageSwitch.checked;
    localStorage.setItem('debugLocalStorageEnabled', String(debugLocalStorageEnabled));
    if (!debugLocalStorageEnabled) {
      const k = () => { console.warn('Local Storage is disabled'); return false; };
      localStorage.setItem = k; localStorage.getItem = () => null; localStorage.removeItem = k; localStorage.clear = k;
    }
    showDebugStatus(t('localStorageApplied'));
  });

  resetAllSettingsBtn.addEventListener('click', () => {
    openConfirmDialog(t('confirmResetAllTitle'), t('confirmResetAll'), false, () => { localStorage.clear(); location.reload(); });
  });
  clearAllDataBtn.addEventListener('click', () => {
    openConfirmDialog(t('confirmClearAllDataTitle'), t('confirmClearAllData'), false, () => {
      const keys = ['debugBackgroundBlur', 'debugAttempts', 'debugModalBlur', 'debugLocalStorageEnabled'];
      const saved = {}; keys.forEach((k) => { if (localStorage.getItem(k) !== null) saved[k] = localStorage.getItem(k); });
      localStorage.clear();
      Object.keys(saved).forEach((k) => localStorage.setItem(k, saved[k]));
      location.reload();
    });
  });

  /* ---------------- 密钥验证 ---------------- */
  function validateKey() {
    if (isLocked) return;
    const key = keyInput.value.trim();
    keyResult.classList.remove('show', 'success', 'error');
    if (!key) { showStatusMessage(t('emptyKeyError'), 'error', keyStatusContainer); return; }
    if (key === 'MiybyTJN') {
      showStatusMessage(t('successVerification'), 'success', keyStatusContainer);
      setTimeout(() => { keyPage.classList.remove('active'); mainPage.classList.add('active'); }, 900);
    } else if (key === 'DebugbyTJN') {
      showStatusMessage(t('debugModeActivated'), 'success', keyStatusContainer);
      setTimeout(() => openDebug(), 500);
    } else {
      if (!isLocked) {
        attempts--; updateAttemptsCounter();
        if (attempts <= 0) {
          isLocked = true;
          updateAttemptsCounter();
          showStatusMessage(t('systemLocked'), 'error', keyStatusContainer);
          setTimeout(() => { keyPage.classList.remove('active'); lockedPage.classList.add('active'); }, 1400);
        } else {
          showStatusMessage(t('invalidKey', { n: attempts }), 'error', keyStatusContainer);
        }
      }
    }
  }
  keySubmitBtn.addEventListener('click', validateKey);
  keyInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); validateKey(); } });

  /* ---------------- 命令执行 ---------------- */
  function validateInput() {
    const input = userInput.value.trim();
    resultDiv.classList.remove('show', 'success', 'error');
    if (!input) { showStatusMessage(t('emptyInputError'), 'error', statusContainer); return; }
    if (input.includes('上引号，') && input.includes('下引号。')) {
      showStatusMessage(t('successExecution'), 'success', statusContainer);
      addToHistory(input);
      submitBtn.classList.add('pulse');
      setTimeout(() => submitBtn.classList.remove('pulse'), 500);
    } else {
      showStatusMessage(t('formatError'), 'error', statusContainer);
    }
  }
  submitBtn.addEventListener('click', validateInput);
  userInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); validateInput(); } });

  /* ---------------- 无权限页 ---------------- */
  function lockedAction() {
    lockedResult.classList.remove('show', 'success', 'error');
    showResult(t('noPermission'), 'error', lockedResult);
  }
  lockedSubmitBtn.addEventListener('click', lockedAction);
  lockedInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); lockedAction(); } });

  /* ---------------- 历史记录 ---------------- */
  function addToHistory(cmd) {
    if (commandHistory.length > 0 && commandHistory[0] === cmd) return;
    commandHistory.unshift(cmd);
    if (commandHistory.length > 10) commandHistory = commandHistory.slice(0, 10);
    localStorage.setItem('commandHistory', JSON.stringify(commandHistory));
    renderHistory();
  }
  function removeFromHistory(index) {
    commandHistory.splice(index, 1);
    localStorage.setItem('commandHistory', JSON.stringify(commandHistory));
    renderHistory();
  }
  function renderHistory() {
    historyList.innerHTML = '';
    if (!commandHistory.length) {
      const empty = document.createElement('mdui-list-item');
      empty.textContent = t('emptyHistory');
      empty.setAttribute('disabled', '');
      historyList.appendChild(empty);
      return;
    }
    commandHistory.forEach((cmd, index) => {
      const li = document.createElement('mdui-list-item');
      li.innerHTML =
        `<div slot="custom" class="list-row">` +
        `<span class="list-text"></span>` +
        `<div class="list-actions">` +
        `<mdui-button-icon icon="play_arrow--outlined" title="${esc(t('btn_use'))}"></mdui-button-icon>` +
        `<mdui-button-icon icon="star--outlined" title="${esc(t('btn_fav'))}"></mdui-button-icon>` +
        `<mdui-button-icon icon="delete--outlined" title="${esc(t('btn_del'))}"></mdui-button-icon>` +
        `</div></div>`;
      li.querySelector('.list-text').textContent = cmd;
      const btns = li.querySelectorAll('mdui-button-icon');
      const [use, fav, del] = [btns[0], btns[1], btns[2]];
      use.addEventListener('click', () => { userInput.value = cmd; userInput.focus(); });
      fav.addEventListener('click', () => addToFavorites(cmd));
      del.addEventListener('click', () => removeFromHistory(index));
      historyList.appendChild(li);
    });
  }
  clearHistoryBtn.addEventListener('click', () => { commandHistory = []; localStorage.setItem('commandHistory', '[]'); renderHistory(); });

  /* ---------------- 收藏夹 ---------------- */
  function addToFavorites(cmd) {
    if (favorites.includes(cmd)) return;
    favorites.push(cmd);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderFavorites();
    showDebugStatus(t('favoriteAdded'));
  }
  function removeFromFavorites(index) {
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderFavorites();
    showDebugStatus(t('favoriteRemoved'));
  }
  function renderFavorites() {
    favoritesList.innerHTML = '';
    if (!favorites.length) {
      const empty = document.createElement('mdui-list-item');
      empty.textContent = t('emptyFavorites');
      empty.setAttribute('disabled', '');
      favoritesList.appendChild(empty);
      return;
    }
    favorites.forEach((cmd, index) => {
      const li = document.createElement('mdui-list-item');
      li.innerHTML =
        `<div slot="custom" class="list-row">` +
        `<span class="list-text"></span>` +
        `<div class="list-actions">` +
        `<mdui-button-icon icon="play_arrow--outlined" title="${esc(t('btn_use'))}"></mdui-button-icon>` +
        `<mdui-button-icon icon="delete--outlined" title="${esc(t('btn_del'))}"></mdui-button-icon>` +
        `</div></div>`;
      li.querySelector('.list-text').textContent = cmd;
      const btns = li.querySelectorAll('mdui-button-icon');
      btns[0].addEventListener('click', () => { userInput.value = cmd; userInput.focus(); });
      btns[1].addEventListener('click', () => removeFromFavorites(index));
      favoritesList.appendChild(li);
    });
  }
  addCurrentToFavoritesBtn.addEventListener('click', () => {
    const cur = userInput.value.trim();
    if (cur) addToFavorites(cur);
  });

  /* ---------------- 初始化 ---------------- */
  if (currentLanguage === 'auto') applyLanguage('auto');
  I18N.setLang(currentLanguage);
  renderStaticText();
  applyTheme(currentTheme);
  applyMonetScheme(currentMonetScheme);
  applyBackground(currentBackground);
  applyDebugSettings();
  syncSettingsUI();
  renderHistory();
  renderFavorites();

  if (customBackgroundData) {
    try {
      const bg = JSON.parse(customBackgroundData);
      if (bg.dataUrl) { customBackgroundImage.src = bg.dataUrl; customBackgroundInfo.style.display = 'flex'; }
    } catch (e) { /* ignore */ }
  }
  if (currentBackground === 'custom') customBackgroundUpload.style.display = 'flex';

  updateBlurPreview();
});