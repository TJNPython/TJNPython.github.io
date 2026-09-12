/* =========================================================
   TJN-PYTHON SYSTEM — 多语言字典（zh-CN / zh-TW / en / ja）
   ========================================================= */
window.I18N = (() => {
  const L = {
    'zh-CN': '简体中文',
    'zh-TW': '繁體中文（臺灣）',
    'en': 'English',
    'ja': '日本語'
  };

  const dict = {
    /* ---- 静态标签 ---- */
    app_title: { 'zh-CN': 'TJN-PYTHON SYSTEM', 'zh-TW': 'TJN-PYTHON SYSTEM', en: 'TJN-PYTHON SYSTEM', ja: 'TJN-PYTHON SYSTEM' },
    key_page_title: { 'zh-CN': '系统验证', 'zh-TW': '系統驗證', en: 'Verification', ja: '認証' },
    key_page_subtitle: { 'zh-CN': '请输入访问密钥以继续使用系统', 'zh-TW': '請輸入訪問密鑰以繼續使用系統', en: 'Enter the access key to continue', ja: 'アクセスキーを入力して続行' },
    main_page_title: { 'zh-CN': '命令控制台', 'zh-TW': '命令控制台', en: 'Command Console', ja: 'コマンドコンソール' },
    main_page_subtitle: { 'zh-CN': '输入符合规范的指令以执行 Python', 'zh-TW': '輸入符合規範的指令以執行 Python', en: 'Enter commands to execute Python', ja: 'コマンドを入力して Python を実行' },
    locked_page_title: { 'zh-CN': '访问被拒绝', 'zh-TW': '訪問被拒絕', en: 'Access Denied', ja: 'アクセス拒否' },
    locked_page_subtitle: { 'zh-CN': '您已被系统锁定，无法继续操作', 'zh-TW': '您已被系統鎖定，無法繼續操作', en: 'You have been locked out of the system', ja: 'システムからロックアウトされました' },
    key_label: { 'zh-CN': '请输入密钥', 'zh-TW': '請輸入密鑰', en: 'Enter the key', ja: 'キーを入力' },
    key_placeholder: { 'zh-CN': '请输入密钥', 'zh-TW': '請輸入密鑰', en: 'Enter the key', ja: 'キーを入力' },
    btn_verify: { 'zh-CN': '验证', 'zh-TW': '驗證', en: 'Verify', ja: '認証' },
    cmd_label: { 'zh-CN': '输入您的指令', 'zh-TW': '輸入您的指令', en: 'Enter your command', ja: 'コマンドを入力' },
    cmd_placeholder: { 'zh-CN': '输入您的指令', 'zh-TW': '輸入您的指令', en: 'Enter your command', ja: 'コマンドを入力' },
    btn_execute: { 'zh-CN': '执行', 'zh-TW': '執行', en: 'Execute', ja: '実行' },
    history_title: { 'zh-CN': '命令历史', 'zh-TW': '命令歷史', en: 'Command History', ja: 'コマンド履歴' },
    favorites_title: { 'zh-CN': '收藏夹', 'zh-TW': '收藏夾', en: 'Favorites', ja: 'お気に入り' },

    locked_title: { 'zh-CN': '访问被拒绝', 'zh-TW': '訪問被拒絕', en: 'Access Denied', ja: 'アクセス拒否' },
    locked_label: { 'zh-CN': '您没有权限使用此功能', 'zh-TW': '您沒有權限使用此功能', en: 'You do not have permission to use this feature', ja: 'この機能を使用する権限がありません' },
    locked_placeholder: { 'zh-CN': '无权限操作', 'zh-TW': '無權限操作', en: 'No permission', ja: '権限なし' },
    btn_no_permission: { 'zh-CN': '您没有权限！', 'zh-TW': '您沒有權限！', en: "You don't have permission!", ja: '権限がありません！' },
    locked_badge_title: { 'zh-CN': '系统已锁定', 'zh-TW': '系統已鎖定', en: 'System Locked', ja: 'システムロック' },
    locked_badge_desc: { 'zh-CN': '您已被系统锁定，无法执行任何命令。', 'zh-TW': '您已被系統鎖定，無法執行任何命令。', en: 'You have been locked out and cannot execute any commands.', ja: 'システムからロックアウトされ、いずれのコマンドも実行できません。' },
    locked_hint: { 'zh-CN': '您已被系统锁定，无法执行任何命令。', 'zh-TW': '您已被系統鎖定，無法執行任何命令。', en: 'You have been locked out and cannot execute any commands.', ja: 'システムからロックアウトされ、いずれのコマンドも実行できません。' },

    settings_title: { 'zh-CN': '设置', 'zh-TW': '設定', en: 'Settings', ja: '設定' },
    settings_subtitle: { 'zh-CN': '个性化您的体验', 'zh-TW': '個性化您的體驗', en: 'Personalize your experience', ja: '体験をパーソナライズ' },
    section_language: { 'zh-CN': '语言', 'zh-TW': '語言', en: 'Language', ja: '言語' },
    lang_auto: { 'zh-CN': '跟随系统', 'zh-TW': '跟隨系統', en: 'System', ja: 'システム' },
    section_theme: { 'zh-CN': '主题', 'zh-TW': '主題', en: 'Theme', ja: 'テーマ' },
    theme_light: { 'zh-CN': '浅色', 'zh-TW': '淺色', en: 'Light', ja: 'ライト' },
    theme_dark: { 'zh-CN': '深色', 'zh-TW': '深色', en: 'Dark', ja: 'ダーク' },
    theme_system: { 'zh-CN': '跟随系统', 'zh-TW': '跟隨系統', en: 'System', ja: 'システム' },
    section_theme_color: { 'zh-CN': '主题颜色', 'zh-TW': '主題顏色', en: 'Theme Color', ja: 'テーマカラー' },
    scheme_basil: { 'zh-CN': '罗勒绿', 'zh-TW': '羅勒綠', en: 'Basil', ja: 'バジル' },
    scheme_blue: { 'zh-CN': '海蓝', 'zh-TW': '海藍', en: 'Ocean', ja: 'オーシャン' },
    scheme_purple: { 'zh-CN': '紫罗兰', 'zh-TW': '紫羅蘭', en: 'Violet', ja: 'バイオレット' },
    scheme_orange: { 'zh-CN': '琥珀橙', 'zh-TW': '琥珀橙', en: 'Amber', ja: 'アンバー' },
    scheme_pink: { 'zh-CN': '粉玫瑰', 'zh-TW': '粉玫瑰', en: 'Rose', ja: 'ローズ' },
    section_background: { 'zh-CN': '背景', 'zh-TW': '背景', en: 'Background', ja: '背景' },
    bg_default: { 'zh-CN': '默认背景', 'zh-TW': '默認背景', en: 'Default', ja: 'デフォルト' },
    bg_custom: { 'zh-CN': '自定义', 'zh-TW': '自定義', en: 'Custom', ja: 'カスタム' },
    bg_upload_hint: { 'zh-CN': '选择图片 (JPG, PNG, WebP, GIF) - 最大10MB', 'zh-TW': '選擇圖片 (JPG, PNG, WebP, GIF) - 最大10MB', en: 'Choose Image (JPG, PNG, WebP, GIF) - Max 10MB', ja: '画像を選択 (JPG, PNG, WebP, GIF) - 最大10MB' },
    bg_delete: { 'zh-CN': '删除', 'zh-TW': '刪除', en: 'Delete', ja: '削除' },
    bg_blur_preview: { 'zh-CN': '背景模糊预览', 'zh-TW': '背景模糊預覽', en: 'Background Blur Preview', ja: '背景ぼかしプレビュー' },
    version_tag: { 'zh-CN': '版本: Alpha-3', 'zh-TW': '版本: Alpha-3', en: 'Version: Alpha-3', ja: 'バージョン: Alpha-3' },

    debug_title: { 'zh-CN': '调试设置', 'zh-TW': '調試設定', en: 'Debug Settings', ja: 'デバッグ設定' },
    debug_subtitle: { 'zh-CN': '高级系统调试和控制', 'zh-TW': '高級系統調試和控制', en: 'Advanced system debugging and control', ja: '高度なシステムデバッグと制御' },
    debug_active: { 'zh-CN': '调试模式已激活', 'zh-TW': '調試模式已激活', en: 'Debug Mode Active', ja: 'デバッグモード有効' },
    sec_visual: { 'zh-CN': '视觉设置', 'zh-TW': '視覺設定', en: 'Visual Settings', ja: 'ビジュアル設定' },
    sec_visual_sub: { 'zh-CN': '调整系统视觉效果和动画', 'zh-TW': '調整系統視覺效果和動畫', en: 'Adjust system visual effects and animations', ja: 'システムの視覚効果とアニメーションを調整' },
    ctrl_bg_blur: { 'zh-CN': '背景模糊强度', 'zh-TW': '背景模糊強度', en: 'Background Blur Intensity', ja: '背景ぼかし強度' },
    ctrl_modal_blur: { 'zh-CN': '模态模糊强度', 'zh-TW': '模態模糊強度', en: 'Modal Blur Intensity', ja: 'モーダルぼかし強度' },
    btn_reset: { 'zh-CN': '重置', 'zh-TW': '重置', en: 'Reset', ja: 'リセット' },
    btn_apply: { 'zh-CN': '应用', 'zh-TW': '應用', en: 'Apply', ja: '適用' },
    btn_save: { 'zh-CN': '保存设置', 'zh-TW': '保存設置', en: 'Save Settings', ja: '設定を保存' },
    btn_reset_all: { 'zh-CN': '重置所有设置', 'zh-TW': '重置所有設定', en: 'Reset All Settings', ja: 'すべての設定をリセット' },
    btn_clear_all: { 'zh-CN': '清除所有数据', 'zh-TW': '清除所有數據', en: 'Clear All Data', ja: 'すべてのデータをクリア' },
    sec_security: { 'zh-CN': '安全设置', 'zh-TW': '安全設定', en: 'Security Settings', ja: 'セキュリティ設定' },
    sec_security_sub: { 'zh-CN': '调整系统安全性和验证参数', 'zh-TW': '調整系統安全性和驗證參數', en: 'Adjust system security and verification parameters', ja: 'システムのセキュリティと認証パラメータを調整' },
    ctrl_attempts: { 'zh-CN': '验证尝试次数', 'zh-TW': '驗證嘗試次數', en: 'Verification Attempts', ja: '認証試行回数' },
    sec_storage: { 'zh-CN': '数据存储', 'zh-TW': '數據存儲', en: 'Data Storage', ja: 'データストレージ' },
    sec_storage_sub: { 'zh-CN': '管理本地存储和用户数据', 'zh-TW': '管理本地存儲和用戶數據', en: 'Manage local storage and user data', ja: 'ローカルストレージとユーザーデータを管理' },
    ctrl_local_storage: { 'zh-CN': 'Local Storage', 'zh-TW': 'Local Storage', en: 'Local Storage', ja: 'ローカルストレージ' },
    sec_system: { 'zh-CN': '系统控制', 'zh-TW': '系統控制', en: 'System Control', ja: 'システム制御' },
    sec_system_sub: { 'zh-CN': '高级系统操作和管理', 'zh-TW': '高級系統操作和管理', en: 'Advanced system operations and management', ja: '高度なシステム操作と管理' },
    ctrl_system_ops: { 'zh-CN': '系统操作', 'zh-TW': '系統操作', en: 'System Operations', ja: 'システム操作' },
    debug_version_tag: { 'zh-CN': '调试版本: Alpha-3-Debug', 'zh-TW': '調試版本: Alpha-3-Debug', en: 'Debug Version: Alpha-3-Debug', ja: 'デバッグバージョン: Alpha-3-Debug' },

    unlock_key_label: { 'zh-CN': '请输入解锁密钥', 'zh-TW': '請輸入解鎖密鑰', en: 'Enter unlock key', ja: 'アンロックキーを入力' },
    btn_cancel: { 'zh-CN': '取消', 'zh-TW': '取消', en: 'Cancel', ja: 'キャンセル' },
    btn_confirm: { 'zh-CN': '确认', 'zh-TW': '確認', en: 'Confirm', ja: '確認' },
    btn_use: { 'zh-CN': '使用此命令', 'zh-TW': '使用此命令', en: 'Use this command', ja: 'このコマンドを使用' },
    btn_fav: { 'zh-CN': '添加到收藏夹', 'zh-TW': '添加到收藏夾', en: 'Add to favorites', ja: 'お気に入りに追加' },
    btn_del: { 'zh-CN': '删除此记录', 'zh-TW': '刪除此記錄', en: 'Delete', ja: '削除' },

    /* ---- 动态消息 ---- */
    emptyKeyError: { 'zh-CN': '错误：密钥不能为空！', 'zh-TW': '錯誤：密鑰不能為空！', en: 'Error: Key cannot be empty!', ja: 'エラー：キーを空にすることはできません！' },
    successVerification: { 'zh-CN': '验证成功！正在进入系统...', 'zh-TW': '驗證成功！正在進入系統...', en: 'Verification successful! Entering system...', ja: '認証成功！システムに入ります...' },
    debugModeActivated: { 'zh-CN': '调试模式已激活！正在进入调试面板...', 'zh-TW': '調試模式已激活！正在進入調試面板...', en: 'Debug mode activated! Entering debug panel...', ja: 'デバッグモードが有効になりました！デバッグパネルに入ります...' },
    systemLocked: { 'zh-CN': '错误：尝试次数过多！系统已锁定！', 'zh-TW': '錯誤：嘗試次數過多！系統已鎖定！', en: 'Error: Too many attempts! System locked!', ja: 'エラー：試行回数が多すぎます！システムがロックされました！' },
    invalidKey: { 'zh-CN': '错误：密钥不正确！剩余尝试次数: {n}', 'zh-TW': '錯誤：密鑰不正確！剩餘嘗試次數: {n}', en: 'Error: Invalid key! Remaining attempts: {n}', ja: 'エラー：無効なキー！残り試行回数: {n}' },
    attempts_count: { 'zh-CN': '剩余尝试次数: {n}', 'zh-TW': '剩餘嘗試次數: {n}', en: 'Remaining attempts: {n}', ja: '残り試行回数: {n}' },
    emptyInputError: { 'zh-CN': '错误：输入不能为空！', 'zh-TW': '錯誤：輸入不能為空！', en: 'Error: Input cannot be empty!', ja: 'エラー：入力は空にできません！' },
    successExecution: { 'zh-CN': 'Python已为您执行！尊敬的TJN先生。', 'zh-TW': 'Python已為您執行！尊敬的TJN先生。', en: 'Python has been executed for you! Dear Mr. TJN.', ja: 'Pythonが実行されました！尊敬するTJN様。' },
    formatError: { 'zh-CN': '错误：格式不正确！', 'zh-TW': '錯誤：格式不正確！', en: 'Error: Incorrect format!', ja: 'エラー：形式が正しくありません！' },
    noPermission: { 'zh-CN': '错误：您没有权限执行该命令。', 'zh-TW': '錯誤：您沒有權限執行該命令。', en: 'Error: You do not have permission to execute this command.', ja: 'エラー：このコマンドを実行する権限がありません。' },
    emptyHistory: { 'zh-CN': '暂无历史记录', 'zh-TW': '暫無歷史記錄', en: 'No history yet', ja: '履歴はまだありません' },
    emptyFavorites: { 'zh-CN': '暂无收藏', 'zh-TW': '暫無收藏', en: 'No favorites yet', ja: 'お気に入りはまだありません' },
    invalidImageType: { 'zh-CN': '错误：请选择有效的图片文件（JPG, PNG, WebP, GIF）', 'zh-TW': '錯誤：請選擇有效的圖片文件（JPG, PNG, WebP, GIF）', en: 'Error: Please select a valid image file (JPG, PNG, WebP, GIF)', ja: 'エラー：有効な画像ファイルを選択してください（JPG, PNG, WebP, GIF）' },
    imageTooLarge: { 'zh-CN': '错误：图片文件过大，请选择小于10MB的图片', 'zh-TW': '錯誤：圖片文件過大，請選擇小於10MB的圖片', en: 'Error: Image file is too large, please select an image smaller than 10MB', ja: 'エラー：画像ファイルが大きすぎます。10MB未満の画像を選択してください' },
    backgroundUploadSuccess: { 'zh-CN': '自定义背景上传成功！', 'zh-TW': '自定義背景上傳成功！', en: 'Custom background uploaded successfully!', ja: 'カスタム背景が正常にアップロードされました！' },
    backgroundDeleteSuccess: { 'zh-CN': '自定义背景已删除', 'zh-TW': '自定義背景已刪除', en: 'Custom background deleted', ja: 'カスタム背景が削除されました' },
    uploading: { 'zh-CN': '上传中...', 'zh-TW': '上傳中...', en: 'Uploading...', ja: 'アップロード中...' },
    uploadError: { 'zh-CN': '上传失败，请重试', 'zh-TW': '上傳失敗，請重試', en: 'Upload failed, please try again', ja: 'アップロードに失敗しました。もう一度お試しください' },
    backgroundStoreError: { 'zh-CN': '图片存储失败：图片过大无法保存，请更换较小图片', 'zh-TW': '圖片儲存失敗：圖片過大無法保存，請更換較小圖片', en: 'Storage failed: image too large to save, please use a smaller image', ja: '保存に失敗しました：画像が大きすぎて保存できません。より小さい画像を使用してください' },
    monetApplied: { 'zh-CN': '配色方案已应用', 'zh-TW': '配色方案已應用', en: 'Color scheme applied', ja: '配色スキームが適用されました' },
    favoriteAdded: { 'zh-CN': '已添加到收藏夹', 'zh-TW': '已添加到收藏夾', en: 'Added to favorites', ja: 'お気に入りに追加されました' },
    favoriteRemoved: { 'zh-CN': '已从收藏夹移除', 'zh-TW': '已從收藏夾移除', en: 'Removed from favorites', ja: 'お気に入りから削除されました' },
    blurReset: { 'zh-CN': '背景模糊已重置为默认值', 'zh-TW': '背景模糊已重置為默認值', en: 'Background blur reset to default', ja: '背景ぼかしがデフォルトにリセットされました' },
    blurApplied: { 'zh-CN': '背景模糊设置已应用', 'zh-TW': '背景模糊設定已應用', en: 'Background blur settings applied', ja: '背景ぼかし設定が適用されました' },
    attemptsReset: { 'zh-CN': '尝试次数已重置为默认值', 'zh-TW': '嘗試次數已重置為默認値', en: 'Attempts reset to default', ja: '試行回数がデフォルトにリセットされました' },
    attemptsApplied: { 'zh-CN': '尝试次数设置已保存', 'zh-TW': '嘗試次數設定已保存', en: 'Attempts settings saved', ja: '試行回数設定が保存されました' },
    modalBlurReset: { 'zh-CN': '模态模糊已重置为默认值', 'zh-TW': '模態模糊已重置為默認值', en: 'Modal blur reset to default', ja: 'モーダルぼかしがデフォルトにリセットされました' },
    modalBlurApplied: { 'zh-CN': '模态模糊设置已应用', 'zh-TW': '模態模糊設定已應用', en: 'Modal blur settings applied', ja: 'モーダルぼかし設定が適用されました' },
    confirmResetAllTitle: { 'zh-CN': '重置所有设置', 'zh-TW': '重置所有設定', en: 'Reset All Settings', ja: 'すべての設定をリセット' },
    confirm_subtitle: { 'zh-CN': '请确认你的操作', 'zh-TW': '請確認你的操作', en: 'Please confirm your action', ja: '操作を確認してください' },
    confirmResetAll: { 'zh-CN': '确定要重置所有设置吗？这将清除所有自定义设置。', 'zh-TW': '確定要重置所有設定嗎？這將清除所有自定義設定。', en: 'Are you sure you want to reset all settings? This will clear all custom settings.', ja: 'すべての設定をリセットしてもよろしいですか？すべてのカスタム設定がクリアされます。' },
    confirmClearAllDataTitle: { 'zh-CN': '清除所有数据', 'zh-TW': '清除所有數據', en: 'Clear All Data', ja: 'すべてのデータをクリア' },
    confirmClearAllData: { 'zh-CN': '确定要清除所有数据吗？这将清除历史记录、收藏夹和背景设置，但保留调试设置。', 'zh-TW': '確定要清除所有數據嗎？這將清除歷史記錄、收藏夾和背景設定，但保留調試設定。', en: 'Are you sure you want to clear all data? This will clear history, favorites and background settings, but keep debug settings.', ja: 'すべてのデータをクリアしてもよろしいですか？履歴、お気に入り、背景設定がクリアされますが、デバッグ設定は保持されます。' },
    confirmDeleteBackgroundTitle: { 'zh-CN': '删除自定义背景', 'zh-TW': '刪除自定義背景', en: 'Delete Custom Background', ja: 'カスタム背景を削除' },
    confirmDeleteBackground: { 'zh-CN': '确定要删除自定义背景吗？', 'zh-TW': '確定要刪除自定義背景嗎？', en: 'Are you sure you want to delete the custom background?', ja: 'カスタム背景を削除してもよろしいですか？' },
    localStorageApplied: { 'zh-CN': 'Local Storage设置已应用', 'zh-TW': 'Local Storage設定已應用', en: 'Local Storage settings applied', ja: 'ローカルストレージ設定が適用されました' },
    animationsApplied: { 'zh-CN': '动画设置已应用', 'zh-TW': '動畫設定已應用', en: 'Animation settings applied', ja: 'アニメーション設定が適用されました' },
    historyApplied: { 'zh-CN': '历史记录设置已应用', 'zh-TW': '歷史記錄設定已應用', en: 'History settings applied', ja: '履歴設定が適用されました' },
    favoritesApplied: { 'zh-CN': '收藏夹设置已应用', 'zh-TW': '收藏夾設定已應用', en: 'Favorites settings applied', ja: 'お気に入り設定が適用されました' },
    hint_text: {
      'zh-CN': '输入必须同时包含"上引号，"和"下引号。"这两个关键词才能执行命令。',
      'zh-TW': '輸入必須同時包含"上引號，"和"下引號。"這兩個關鍵詞才能執行命令。',
      en: 'The input must contain both "上引号，" and "下引号。" keywords to execute the command.',
      ja: '「上引号，」と「下引号。」の両方のキーワードを含む必要があります。'
    },
    debug_status_line: {
      'zh-CN': '当前设置：模糊: {blur}, 尝试次数: {n}',
      'zh-TW': '當前設定：模糊: {blur}, 嘗試次數: {n}',
      en: 'Current Settings: Blur: {blur}, Attempts: {n}',
      ja: '現在の設定：ぼかし: {blur}, 試行回数: {n}'
    }
  };

  return {
    available: L,
    lang: 'zh-CN',
    setLang(l) { this.lang = l || 'zh-CN'; },
    /** 取当前语言文本，支持 {x} 占位符 */
    t(key, params) {
      const entry = dict[key];
      if (!entry) return key;
      let s = entry[this.lang] || entry['zh-CN'];
      if (params) {
        Object.keys(params).forEach((k) => {
          s = s.replace(new RegExp(`\\{${k}\\}`, 'g'), params[k]);
        });
      }
      return s;
    }
  };
})();