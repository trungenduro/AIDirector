export type Language = 'ja' | 'vi';

export interface Translations {
  appTitle: string;
  appSubtitle: string;
  newScriptBtn: string;
  tabScript: string;
  tabStoryboard: string;
  tabRefine: string;
  tabProducer: string;
  tabMaster: string;

  // Screenplay Modal
  modalTitle: string;
  modalSubtitle: string;
  sampleScriptsLabel: string;
  sampleSelect: string;
  screenplayLabel: string;
  screenplayPlaceholder: string;
  genreLabel: string;
  styleLabel: string;
  pacingLabel: string;
  ratioLabel: string;
  cancelBtn: string;
  analyzeBtn: string;
  analyzingBtn: string;

  // Breakdown View
  directorVisionLabel: string;
  openCoDirectorBtn: string;
  sceneLabel: string;
  shotLabel: string;
  actionLabel: string;
  dialogueLabel: string;
  lightingLabel: string;
  audioLabel: string;
  ambientLabel: string;
  sfxLabel: string;
  musicLabel: string;
  copyPromptBtn: string;
  copiedPrompt: string;
  storyboardBtn: string;
  produceBtn: string;
  addShotBtn: string;
  completeEditBtn: string;
  editShotBtn: string;
  deleteShotBtn: string;

  // Storyboard View
  storyboardTitle: string;
  storyboardSubtitle: string;
  batchGenerateBtn: string;
  batchGeneratingBtn: string;
  aiDrawingMsg: string;
  noImagePlaceholder: string;
  generateSingleStoryboardBtn: string;
  inspectBtn: string;
  regenerateBtn: string;
  uploadCustomBtn: string;
  produceVeoBtn: string;
  inspectModalTitle: string;
  closeBtn: string;

  // Co-Director Chat
  coDirectorTitle: string;
  coDirectorSubtitle: string;
  selectShotLabel: string;
  cameraMovementLabel: string;
  lensLabel: string;
  applyRevisionBtn: string;
  proceedToVeoBtn: string;
  chatPlaceholder: string;
  chatThinkingMsg: string;
  quickPrompts: string[];

  // Shot Producer Studio
  studioTitle: string;
  studioSubtitle: string;
  prevShot: string;
  nextShot: string;
  proceedToMasterBtn: string;
  playBtn: string;
  pauseBtn: string;
  retakeBtn: string;
  toggleGridBtn: string;
  toggleHudBtn: string;
  callVeoTitle: string;
  callVeoSubtitle: string;
  veoPromptLabel: string;
  generateVeoBtn: string;
  generatingVeoBtn: string;
  soundStudioTitle: string;
  ttsVoiceBtn: string;
  ttsRecordingMsg: string;
  atmosphereLabel: string;
  foleyLabel: string;
  filmstripLabel: string;
  filmstripHint: string;

  // Master Sequencer
  masterTitle: string;
  masterSubtitle: string;
  downloadScriptBtn: string;
  renderMasterBtn: string;
  renderingMasterMsg: string;
  filmCompletedTitle: string;
  filmCompletedSubtitle: string;
  downloadVideoBtn: string;
  timelineLabel: string;
  totalDurationLabel: string;
  nowPlayingLabel: string;
  backToStudioBtn: string;

  // Projects Library
  projectsListBtn: string;
  projectsDrawerTitle: string;
  projectsDrawerSubtitle: string;
  loadProjectBtn: string;
  duplicateProjectBtn: string;
  deleteProjectBtn: string;
  exportJsonBtn: string;
  importJsonBtn: string;
  noSavedProjects: string;
  activeBadge: string;
  confirmDelete: string;
  saveCurrentBtn: string;
  savedNotice: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  ja: {
    appTitle: 'CINEAI STUDIO',
    appSubtitle: '映画監督AIスタジオ（Veo動画生成・音響演出）',
    newScriptBtn: '新規脚本作成',
    tabScript: '1. 脚本・シーン構成',
    tabStoryboard: '2. 絵コンテAI',
    tabRefine: '3. 助監督チャット',
    tabProducer: '4. Veo撮影・音響演出',
    tabMaster: '5. 本編編集・マスター出力',

    modalTitle: '映画脚本・シナリオの設定',
    modalSubtitle: 'ご自身の脚本を入力するか、用意された映画サンプルシナリオを選択してください',
    sampleScriptsLabel: '映画サンプルシナリオ（クリックで即時読込）:',
    sampleSelect: '選択 →',
    screenplayLabel: '脚本・シナリオ本文 (Screenplay / Treatment):',
    screenplayPlaceholder: 'シーン1: 屋外。雨のサイバーパンク路地... セリフやト書きを入力してください',
    genreLabel: 'ジャンル (Genre)',
    styleLabel: '映像スタイル・照明',
    pacingLabel: 'テンポ・ペーシング',
    ratioLabel: 'アスペクト比',
    cancelBtn: 'キャンセル',
    analyzeBtn: 'シーン分析・カット割り自動生成',
    analyzingBtn: 'AIが脚本とカット割りを分析中...',

    directorVisionLabel: '監督ビジョン (Director Vision):',
    openCoDirectorBtn: '助監督AIと相談する',
    sceneLabel: 'シーン',
    shotLabel: 'カット',
    actionLabel: 'ト書き・演技指導:',
    dialogueLabel: 'セリフ:',
    lightingLabel: 'ライティング:',
    audioLabel: '音響設計:',
    ambientLabel: '環境音',
    sfxLabel: '効果音 (SE)',
    musicLabel: '劇伴 (BGM)',
    copyPromptBtn: 'Veoプロンプトをコピー',
    copiedPrompt: 'コピー完了！',
    storyboardBtn: '絵コンテ',
    produceBtn: '撮影スタジオ',
    addShotBtn: 'このシーンに新規カットを追加',
    completeEditBtn: '編集完了',
    editShotBtn: '手動編集',
    deleteShotBtn: 'カット削除',

    storyboardTitle: '映画絵コンテ（ストーリーボード）スタジオ',
    storyboardSubtitle: 'AI Veoでの本番撮影前に、構図・被写界深度・照明を視覚的にプレビューします。',
    batchGenerateBtn: '全カットの絵コンテを一括生成 (Batch AI)',
    batchGeneratingBtn: '全カットの絵コンテを自動生成中...',
    aiDrawingMsg: 'AIが絵コンテを作画中...',
    noImagePlaceholder: '絵コンテ未生成',
    generateSingleStoryboardBtn: 'AI絵コンテ生成',
    inspectBtn: '高解像度プレビュー',
    regenerateBtn: '再作画',
    uploadCustomBtn: '手描き絵コンテをアップロード',
    produceVeoBtn: 'Veoで撮影',
    inspectModalTitle: '絵コンテ詳細ビュー',
    closeBtn: '閉じる',

    coDirectorTitle: 'AI助監督アシスタント (AI Co-Director)',
    coDirectorSubtitle: '映画文法に基づき、カメラワーク・照明・セリフ・Veoプロンプトをリアルタイム調整',
    selectShotLabel: '調整対象のカットを選択:',
    cameraMovementLabel: 'カメラワーク:',
    lensLabel: 'レンズ:',
    applyRevisionBtn: 'この修正案をカットに反映する',
    proceedToVeoBtn: 'これでOK！Veo撮影スタジオへ進む',
    chatPlaceholder: '助監督にカット調整を指示（例: クローズアップに変更、雨とネオンを追加、緊迫感を高める...）',
    chatThinkingMsg: 'AI助監督が映画的演出を思案中...',
    quickPrompts: [
      'このカットを感情が際立つクローズアップ（CU）に変更して',
      '豪雨、立ち込める霧、サイアンとマゼンタのネオン反射を追加して',
      '緊迫感を出すため肩越しショット（OTS）にして視線を追従させて',
      '尺を3秒に短縮し、心臓の鼓動SEを追加してスリリングなテンポにして',
      'セリフを短く、冷徹でミステリアスな表現に書き直して',
    ],

    studioTitle: 'Veo本番撮影＆音響デザインスタジオ',
    studioSubtitle: 'Google Veo動画生成、Geminiアフレコ音声合成、劇伴BGM・環境音ミキシング',
    prevShot: '前カット',
    nextShot: '次カット',
    proceedToMasterBtn: '本編編集・マスター出力へ進む',
    playBtn: 'プレビュー再生',
    pauseBtn: '一時停止',
    retakeBtn: 'カチンコ（テイクやり直し）',
    toggleGridBtn: '三分割構図グリッド',
    toggleHudBtn: '監督モニター情報 (HUD)',
    callVeoTitle: 'AI Veo動画生成',
    callVeoSubtitle: 'Google Veo (gemini-omni-1.1-flash)',
    veoPromptLabel: 'Veo撮影指示プロンプト:',
    generateVeoBtn: 'AI Veoで動画をクランクイン（生成）',
    generatingVeoBtn: 'AI Veoが動画を撮影・生成中...',
    soundStudioTitle: '音響効果＆アフレコ録音',
    ttsVoiceBtn: 'AI声優アフレコ録音 (Gemini TTS)',
    ttsRecordingMsg: '録音中...',
    atmosphereLabel: '劇伴BGM・環境音:',
    foleyLabel: 'フォーリー効果音 (SE):',
    filmstripLabel: '全カットフィルムストリップ:',
    filmstripHint: 'フレームをクリックしてカットを切り替え',

    masterTitle: '本編マスター編集＆映画出力',
    masterSubtitle: '全シーン・カットをタイムライン上で統合し、映像と音響を完全同期した本編映画を書き出します。',
    downloadScriptBtn: '撮影台本（台帳）出力 (.md)',
    renderMasterBtn: '本編映画をレンダリング書き出し',
    renderingMasterMsg: 'マスター映像をレンダリング中',
    filmCompletedTitle: '映画の本編マスターが完成しました！',
    filmCompletedSubtitle: '24FPSシネマ品質の完成動画ファイルを直接ダウンロードできます。',
    downloadVideoBtn: '完成映画をダウンロード (.webm / .mp4)',
    timelineLabel: 'シーケンサータイムライン (Sequencer Timeline):',
    totalDurationLabel: '総再生時間',
    nowPlayingLabel: '再生中:',
    backToStudioBtn: 'スタジオに戻ってこのカットを再撮影',

    projectsListBtn: '制作プロジェクト一覧',
    projectsDrawerTitle: '映画監督プロジェクト一覧',
    projectsDrawerSubtitle: '過去に制作・分析したプロジェクトを確認・再編集・書き出しできます',
    loadProjectBtn: 'このプロジェクトを開いて編集',
    duplicateProjectBtn: '複製',
    deleteProjectBtn: '削除',
    exportJsonBtn: 'プロジェクト出力 (.json)',
    importJsonBtn: 'プロジェクト読込 (.json)',
    noSavedProjects: '保存済みのプロジェクトはありません。新規作成してください。',
    activeBadge: '編集中',
    confirmDelete: 'この制作プロジェクトを削除してもよろしいですか？',
    saveCurrentBtn: 'プロジェクトを保存',
    savedNotice: 'プロジェクトを保存しました',
  },
  vi: {
    appTitle: 'CINEAI STUDIO',
    appSubtitle: 'Hệ Thống Đạo Diễn & Dựng Phim AI (Veo & Sound)',
    newScriptBtn: 'Kịch bản mới',
    tabScript: '1. Kịch Bản & Phân Cảnh',
    tabStoryboard: '2. Storyboard AI',
    tabRefine: '3. Trao Đổi Đạo Diễn',
    tabProducer: '4. Dựng Cảnh Veo & Âm Thanh',
    tabMaster: '5. Ghép Phim Hoàn Chỉnh',

    modalTitle: 'Khởi Tạo Kịch Bản Phim',
    modalSubtitle: 'Nhập kịch bản phân đoạn của bạn hoặc chọn các kịch bản mẫu điện ảnh chuẩn bị sẵn',
    sampleScriptsLabel: 'Kịch bản mẫu tham khảo (Click để nạp nhanh):',
    sampleSelect: 'Chọn →',
    screenplayLabel: 'Nội dung Kịch bản (Screenplay / Treatment):',
    screenplayPlaceholder: 'Nhập kịch bản phân đoạn của bạn (CẢNH 1: NGOẠI. PHỐ ĐÊM..., lời thoại, hành động...)',
    genreLabel: 'Thể Loại (Genre)',
    styleLabel: 'Phong Cách Ánh Sáng & Ống Kính',
    pacingLabel: 'Nhịp Điệu Phim (Pacing)',
    ratioLabel: 'Tỉ Lệ Khung Hình (Ratio)',
    cancelBtn: 'Hủy bỏ',
    analyzeBtn: 'Phân Tích & Bẻ Phân Cảnh Chi Tiết',
    analyzingBtn: 'AI Đang Phân Tích Kịch Bản & Cú Máy...',

    directorVisionLabel: 'TẦM NHÌN ĐẠO DIỄN: ',
    openCoDirectorBtn: 'Trao đổi với AI Co-Director',
    sceneLabel: 'Cảnh',
    shotLabel: 'Cú máy',
    actionLabel: 'HÀNH ĐỘNG:',
    dialogueLabel: 'THOẠI:',
    lightingLabel: 'ÁNH SÁNG:',
    audioLabel: 'ÂM THANH ĐIỆN ẢNH:',
    ambientLabel: 'Môi trường',
    sfxLabel: 'SFX',
    musicLabel: 'Nhạc',
    copyPromptBtn: 'Chép Veo Prompt',
    copiedPrompt: 'Đã chép prompt!',
    storyboardBtn: 'Storyboard',
    produceBtn: 'Dựng Cảnh',
    addShotBtn: 'Thêm Cú Máy Mới Vào Cảnh Này',
    completeEditBtn: 'Hoàn tất sửa',
    editShotBtn: 'Chỉnh sửa',
    deleteShotBtn: 'Xóa cú máy',

    storyboardTitle: 'Phòng Thiết Kế Storyboard Điện Ảnh',
    storyboardSubtitle: 'Khung hình trực quan thể hiện góc máy, tỷ lệ bố cục và ánh sáng cho từng cú máy trước khi bấm máy Veo.',
    batchGenerateBtn: 'Tạo Tất Cả Storyboard (Batch AI)',
    batchGeneratingBtn: 'Đang Tự Động Tạo Toàn Bộ Storyboard...',
    aiDrawingMsg: 'AI đang phác họa khung hình...',
    noImagePlaceholder: 'Chưa có ảnh Storyboard',
    generateSingleStoryboardBtn: 'Sinh AI Storyboard',
    inspectBtn: 'Phóng to soi chi tiết',
    regenerateBtn: 'Tạo lại ảnh bằng AI',
    uploadCustomBtn: 'Tải lên phác thảo từ máy',
    produceVeoBtn: 'Dựng Video',
    inspectModalTitle: 'Chi Tiết Khung Hình Storyboard',
    closeBtn: 'Đóng',

    coDirectorTitle: 'AI Co-Director Assistant',
    coDirectorSubtitle: 'Đồng đạo diễn tư vấn ngôn ngữ điện ảnh, tinh chỉnh từng khuôn hình & prompt Veo',
    selectShotLabel: 'Chọn Cú Máy Cần Thảo Luận & Chỉnh Sửa:',
    cameraMovementLabel: 'GÓC MÁY:',
    lensLabel: 'ỐNG KÍNH:',
    applyRevisionBtn: 'Áp Dụng Bản Sửa Này Vào Shot',
    proceedToVeoBtn: 'OK! Bấm Máy Dựng Veo Cảnh Này',
    chatPlaceholder: 'Yêu cầu Co-Director sửa cú máy (góc máy, cảm xúc, ánh sáng, âm thanh...)...',
    chatThinkingMsg: 'AI Co-Director đang suy nghĩ góc nhìn nghệ thuật...',
    quickPrompts: [
      'Đổi shot này sang góc Cận cảnh (Close-Up) đặc tả biểu cảm và giọt nước mắt',
      'Thêm sương mù dày đặc, mưa axit và ánh đèn neon xanh tím phản chiếu',
      'Chuyển thành cú máy POV nhìn qua vai (OTS) để tăng cảm giác rình rập',
      'Giảm thời lượng xuống 3 giây, đẩy nhịp phim nhanh dồn dập và nghẹt thở',
      'Sửa lại câu thoại nhân vật cho ngắn gọn, sắc lạnh và bí ẩn hơn',
    ],

    studioTitle: 'Studio Dựng Phim Veo & Hòa Âm Điện Ảnh',
    studioSubtitle: 'Bấm máy mô hình Google Veo, thu âm lồng tiếng AI TTS, tạo không khí âm nhạc & foley',
    prevShot: 'Cú máy trước',
    nextShot: 'Cú máy sau',
    proceedToMasterBtn: 'Tiến Đến Ghép Phim Hoàn Chỉnh',
    playBtn: 'Xem diễn biến cú máy',
    pauseBtn: 'Tạm dừng',
    retakeBtn: 'Quay lại cảnh này (Clapper Slate & Retake)',
    toggleGridBtn: 'Bật/Tắt Lưới Tam Phân',
    toggleHudBtn: 'Bật/Tắt Thông số Đạo diễn (HUD)',
    callVeoTitle: 'Gọi AI Veo Dựng Phim',
    callVeoSubtitle: 'Google Veo (gemini-omni-1.1-flash)',
    veoPromptLabel: 'Prompt Kỹ Thuật Số (Veo Prompt):',
    generateVeoBtn: 'Bấm Máy Dựng Video Bằng AI Veo',
    generatingVeoBtn: 'AI Veo Đang Dựng Phim (Vui lòng chờ)...',
    soundStudioTitle: 'Dựng Âm Thanh & Lồng Tiếng',
    ttsVoiceBtn: 'Thu Âm Lời Thoại (AI TTS)',
    ttsRecordingMsg: 'Đang thu âm...',
    atmosphereLabel: 'Nhạc Nền & Bầu Không Khí:',
    foleyLabel: 'Bảng Hiệu Ứng Âm Thanh (Foley SFX):',
    filmstripLabel: 'Dải Phim Toàn Bộ Phân Cảnh (Filmstrip):',
    filmstripHint: 'Click vào khung hình để chuyển cú máy',

    masterTitle: 'Phòng Dựng Master & Xuất Phim Hoàn Chỉnh',
    masterSubtitle: 'Tất cả các phân đoạn đã được đạo diễn phê duyệt sẽ được kết nối theo dòng thời gian và kết xuất thành bộ phim hoàn chỉnh.',
    downloadScriptBtn: 'Xuất Kịch Bản Đạo Diễn (.md)',
    renderMasterBtn: 'Dựng & Xuất Phim Hoàn Chỉnh',
    renderingMasterMsg: 'Đang Kết Xuất Master',
    filmCompletedTitle: 'Bộ Phim Đã Hoàn Thành Ghép Cảnh!',
    filmCompletedSubtitle: 'Video chuẩn điện ảnh 24FPS đã sẵn sàng tải về máy của bạn.',
    downloadVideoBtn: 'Tải Phim Hoàn Chỉnh Về Máy',
    timelineLabel: 'Trục Thời Gian Dựng Phim (Sequencer Timeline):',
    totalDurationLabel: 'Tổng thời lượng',
    nowPlayingLabel: 'Đang phát:',
    backToStudioBtn: 'Quay lại Studio dựng phân đoạn này',

    projectsListBtn: 'Dự Án Đã Làm',
    projectsDrawerTitle: 'Danh Sách Dự Án Đạo Diễn',
    projectsDrawerSubtitle: 'Xem lại toàn bộ các dự án phim đã làm, mở ra chỉnh sửa tiếp hoặc tải về',
    loadProjectBtn: 'Mở Chỉnh Sửa Dự Án Này',
    duplicateProjectBtn: 'Nhân bản',
    deleteProjectBtn: 'Xóa',
    exportJsonBtn: 'Xuất File Dự Án (.json)',
    importJsonBtn: 'Nhập File Dự Án (.json)',
    noSavedProjects: 'Chưa có dự án nào được lưu. Hãy bấm "Kịch bản mới" để bắt đầu bộ phim đầu tiên!',
    activeBadge: 'Đang mở',
    confirmDelete: 'Bạn có chắc chắn muốn xóa dự án này khỏi danh sách không?',
    saveCurrentBtn: 'Lưu dự án hiện tại',
    savedNotice: 'Đã lưu dự án vào danh sách',
  },
};
