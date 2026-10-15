/**
 * 智光商職 一年仁班 · 班級清潔打掃戰情室 | 衛生股長專用系統
 * Core JavaScript Logic & State Management
 * Clean Code, Zero Photo Dependencies, Native Web Audio & Confetti
 */

(function () {
  'use strict';

  // ==========================================
  // 1. DEFAULT DATA & STATE
  // ==========================================

  const DEFAULT_STUDENTS = [
    { seat: 1, name: '王俊傑' }, { seat: 2, name: '李承翰' }, { seat: 3, name: '林子翔' },
    { seat: 4, name: '張宇廷' }, { seat: 5, name: '陳威辰' }, { seat: 6, name: '黃冠宇' },
    { seat: 7, name: '吳柏翰' }, { seat: 8, name: '劉哲維' }, { seat: 9, name: '蔡育騰' },
    { seat: 10, name: '楊宗翰' }, { seat: 11, name: '許家瑋' }, { seat: 12, name: '鄭宏毅' },
    { seat: 13, name: '謝承恩' }, { seat: 14, name: '洪子健' }, { seat: 15, name: '郭耀文' },
    { seat: 16, name: '曾敬恒' }, { seat: 17, name: '邱聖傑' }, { seat: 18, name: '廖柏翔' },
    { seat: 19, name: '賴韋廷' }, { seat: 20, name: '徐晨宇' }, { seat: 21, name: '周子涵' },
    { seat: 22, name: '葉欣怡' }, { seat: 23, name: '蘇雅琪' }, { seat: 24, name: '莊婷羽' },
    { seat: 25, name: '江語彤' }, { seat: 26, name: '何佩珊' }, { seat: 27, name: '蕭佩萱' },
    { seat: 28, name: '潘宥伶' }, { seat: 29, name: '高詠晴' }, { seat: 30, name: '范妤瑄' },
    { seat: 31, name: '簡郁庭' }, { seat: 32, name: '彭詩婷' }, { seat: 33, name: '鐘品妍' },
    { seat: 34, name: '游佳穎' }, { seat: 35, name: '羅千惠' }, { seat: 36, name: '施柔安' }
  ];

  const DEFAULT_ZONES = [
    {
      id: 'zone-1',
      name: '講桌與前黑板區',
      type: 'indoor',
      icon: '👨‍🏫',
      description: '教師講桌淨空整理、黑板板面水洗擦拭、粉筆溝灰塵清理、板擦機定期集塵盒拍空。',
      assignedSeats: [1, 2, 3],
      items: [
        { text: '黑板表面擦拭乾淨，無殘留白斑或水痕', done: false },
        { text: '粉筆溝槽徹底清理，粉筆整齊放置粉筆盒內', done: false },
        { text: '電動板擦機集塵袋已拍空清理乾淨', done: false },
        { text: '講桌檯面擦拭乾淨，教學電腦螢幕鍵盤擺放整齊', done: false }
      ],
      verified: false,
      verifiedDate: null
    },
    {
      id: 'zone-2',
      name: '教室地板與課桌椅對齊',
      type: 'indoor',
      icon: '🧹',
      description: '全班地面全面清掃，桌椅沿地磚十字基準線切齊排好，桌墊下紙屑清除並拖地兩次。',
      assignedSeats: [4, 5, 6, 7],
      items: [
        { text: '全班桌椅按照地面十字標線對齊，排列筆直整齊', done: false },
        { text: '教室地面全面清掃，桌下與講台死角無任何垃圾紙屑', done: false },
        { text: '地板使用乾淨拖把拖拭，無積水與油污腳印', done: false },
        { text: '課桌椅抽屜與桌墊下無藏匿之果皮或飲料空罐', done: false }
      ],
      verified: false,
      verifiedDate: null
    },
    {
      id: 'zone-3',
      name: '門窗玻璃、滑軌與冷氣濾網',
      type: 'indoor',
      icon: '🪟',
      description: '教室所有鋁門窗軌道、窗戶玻璃內外擦亮、窗台死角擦拭，冷氣防塵網定檢。',
      assignedSeats: [8, 9, 10],
      items: [
        { text: '教室前後鋁門滑軌與窗溝泥沙徹底用刷子清出', done: false },
        { text: '窗戶玻璃使用報紙或玻璃刮刀擦拭乾淨明亮', done: false },
        { text: '窗台溝槽擦拭無灰塵，窗簾收束整齊', done: false },
        { text: '冷氣機面板灰塵抹淨，濾網定期檢查清掃', done: false }
      ],
      verified: false,
      verifiedDate: null
    },
    {
      id: 'zone-4',
      name: '走廊走道、洗手台與飲水機',
      type: 'outdoor',
      icon: '🚰',
      description: '班級門口走廊地面拖洗、洗手台水垢菜渣清理、拖把擰乾吊掛，飲水機接水槽刷洗。',
      assignedSeats: [11, 12, 13],
      items: [
        { text: '班級門口走廊地面清掃並拖拭乾淨，無積水防滑倒', done: false },
        { text: '洗手台水槽無殘留菜渣、茶包或油污，排水順暢', done: false },
        { text: '飲水機集水槽與出水口擦拭乾淨，無水垢污漬', done: false },
        { text: '拖把清洗乾淨、擰乾後夾置於走廊專用拖把架通風晾乾', done: false }
      ],
      verified: false,
      verifiedDate: null
    },
    {
      id: 'zone-5',
      name: '外掃專屬責任區 (落葉與花圃)',
      type: 'outdoor',
      icon: '🍂',
      description: '智光校園指定外掃公共區域：落葉打掃打包、花圃雜物撿拾、水溝落葉撈清。',
      assignedSeats: [14, 15, 16, 17, 18],
      items: [
        { text: '外掃責任區枯枝落葉掃除乾淨，裝入指定專用綠色大袋', done: false },
        { text: '花圃死角之手搖杯、吸管套與紙屑徹底夾除', done: false },
        { text: '排水溝鐵蓋周遭雜草與堆積泥沙清理通暢', done: false },
        { text: '打掃工具（竹掃把、長竹夾、畚箕）整齊收回教室掃具櫃', done: false }
      ],
      verified: false,
      verifiedDate: null
    },
    {
      id: 'zone-6',
      name: '垃圾桶清理與資源回收分類站',
      type: 'indoor',
      icon: '♻️',
      description: '班級一般垃圾桶套袋清運、資源回收桶徹底分類（紙容器/寶特瓶/鐵罐）、廚餘桶清洗。',
      assignedSeats: [19, 20, 21],
      items: [
        { text: '一般垃圾桶更換全新黑色垃圾袋，裝滿垃圾綁妥丟至大子母車', done: false },
        { text: '資源回收桶落實分類（寶特瓶壓扁、紙容器洗淨壓平）', done: false },
        { text: '班級午餐廚餘桶於放學前送至校園廚餘專區並用水沖洗乾淨', done: false },
        { text: '班級垃圾桶周邊地面拖洗乾淨，無漏汁異味', done: false }
      ],
      verified: false,
      verifiedDate: null
    }
  ];

  const DEFAULT_RECYCLE_ITEMS = [
    {
      category: '紙類 (乾淨紙張)',
      icon: '📄',
      color: '#3b82f6',
      examples: '課本講義、測驗卷、牛皮紙袋、筆記本 (拆除塑膠金屬線圈)、一般廢紙、白紙。',
      rules: '請平整疊放並綑綁或裝箱。⚠️ 注意：便當紙盒、熱飲紙杯非純紙類，請勿投入！',
      tips: '有防水膜或油污的紙不能丟這！'
    },
    {
      category: '紙容器 (便當盒/飲料杯)',
      icon: '🍱',
      color: '#f59e0b',
      examples: '排骨便當盒、手搖紙杯、超商咖啡杯、泡麵紙碗、利樂包/鋁箔包、紙餐盒。',
      rules: '內層皆有塑膠淋膜防水！務必在走廊水槽簡單沖洗菜湯、倒光殘液，瀝乾後壓扁投入。',
      tips: '學校評分最容易在此扣分，未沖水必定會引來蟑螂！'
    },
    {
      category: '寶特瓶 (PET 1號)',
      icon: '🍶',
      color: '#06b6d4',
      examples: '礦泉水瓶、茶飲寶特瓶、運動飲料塑膠瓶。',
      rules: '倒空殘餘液體 ➔ 撕下外包裝塑膠封膜 (丟一般垃圾) ➔ 踩扁後投入寶特瓶回收袋。',
      tips: '瓶蓋可留在瓶上或集中專門瓶蓋盒回收。'
    },
    {
      category: '鐵鋁罐類',
      icon: '🥫',
      color: '#ef4444',
      examples: '可樂八寶粥鋁罐、鐵罐咖啡、八寶粥馬口鐵罐、罐頭。',
      rules: '沖洗乾淨防酸臭招蟲，鋁罐請單腳踩扁縮減體積後投入。',
      tips: '注意易開罐拉環邊緣鋒利，小心割手。'
    },
    {
      category: '塑膠容器類',
      icon: '🧴',
      color: '#8b5cf6',
      examples: '優格杯、透明手搖塑膠杯 (PP 5號)、洗碗精空瓶、豆漿鮮奶塑膠瓶。',
      rules: '撕除杯口封膜與膠帶，倒空清水沖淨後疊合回收。',
      tips: '吸管與塑膠封膜屬一般垃圾，不可丟塑膠回收桶。'
    },
    {
      category: '一般垃圾 (焚化)',
      icon: '🗑️',
      color: '#64748b',
      examples: '髒污衛生紙、免洗竹筷、吸管、手搖杯封膜、橡皮擦屑、修正帶內帶、原子筆桿、洋芋片鋁箔複合袋、感熱紙發票。',
      rules: '無法回收再利用之廢棄物，請確實裝入班級黑色大垃圾袋，放學前綁緊投入子母車。',
      tips: '若混入可回收物被糾察隊查獲，全班操行整潔扣 2 分！'
    },
    {
      category: '廚餘與剩菜果皮',
      icon: '🍲',
      color: '#10b981',
      examples: '午餐剩菜剩飯、果皮果核、骨頭骨刺、茶葉渣、過期食品。',
      rules: '午餐結束立即集中入桶，嚴禁將塑膠袋、筷子骨肉分離之竹籤或湯匙混入！',
      tips: '放學前由抽籤當值同學扛至校內集中廚餘桶，桶子洗淨倒扣。'
    },
    {
      category: '特殊有害/廢照明與電池',
      icon: '🔋',
      color: '#eab308',
      examples: '乾電池、鋰電池、行動電源、日光燈管、壞掉的黑板板擦機。',
      rules: '絕不可丟入一般垃圾桶！請專門收集送至衛生組或警衛室廢電池回收盒。',
      tips: '廢電池隨意丟棄有起火與重金屬外洩風險！'
    }
  ];

  const QUIZ_BANK = [
    {
      item: '吃完的排骨便當紙盒（有菜渣油漬）',
      options: ['紙類', '紙容器', '一般垃圾', '塑膠類'],
      answerIndex: 1,
      explanation: '便當盒內層有防水淋膜，應先沖洗乾淨、壓扁後投放到「紙容器」！'
    },
    {
      item: '喝完手搖飲料的塑膠吸管與封膜膠帶',
      options: ['一般垃圾', '塑膠容器', '紙類', '紙容器'],
      answerIndex: 0,
      explanation: '吸管與杯口封膜材質雜亂且髒污，屬於「一般垃圾」，不可丟塑膠回收！'
    },
    {
      item: '擦拭鼻涕或污漬的衛生紙、擦手紙',
      options: ['紙類', '紙容器', '一般垃圾', '廚餘'],
      answerIndex: 2,
      explanation: '衛生紙含水溶性或髒污纖維，無法再生造紙，請丟「一般垃圾」！'
    },
    {
      item: '超商買咖啡附的透明塑膠杯蓋',
      options: ['紙容器', '塑膠容器類', '一般垃圾', '鐵鋁罐'],
      answerIndex: 1,
      explanation: '杯蓋多為 PP 或 PS 塑膠，洗淨後丟入「塑膠容器類」。'
    },
    {
      item: '麥當勞或飲料店裝冷飲的紙杯',
      options: ['紙類', '紙容器', '一般垃圾', '寶特瓶'],
      answerIndex: 1,
      explanation: '冷飲紙杯有 PE 防水膜，屬於「紙容器」，務必倒空壓扁回收！'
    },
    {
      item: '超商感熱紙電子發票與明細表',
      options: ['紙類', '紙容器', '一般垃圾', '廚餘'],
      answerIndex: 2,
      explanation: '感熱紙含有化學顯色劑（雙酚A），不可回收再造紙，請丟「一般垃圾」！'
    },
    {
      item: '喝完的茶裏王寶特瓶外包裝那層彩色列印塑膠薄膜',
      options: ['一般垃圾', '寶特瓶', '紙類', '鐵鋁罐'],
      answerIndex: 0,
      explanation: '外包裝封膜非 PET 材質，撕下後請投入「一般垃圾」！'
    }
  ];

  const DEFAULT_HISTORY = [
    {
      date: '2026-10-14',
      officer: '衛生股長 (林廷恩)',
      ratio: '6/6',
      score: 99,
      rank: '特優',
      notes: '放學全區驗收全數合格，黑板板溝吸塵徹底，走廊洗手台水垢刷得非常乾淨！'
    },
    {
      date: '2026-10-13',
      officer: '衛生股長 (林廷恩)',
      ratio: '6/6',
      score: 97,
      rank: '特優',
      notes: '外掃區落葉共打包三大袋，全班桌椅筆直對齊標線，榮獲衛生糾察給予加分推薦。'
    },
    {
      date: '2026-10-12',
      officer: '衛生股長 (林廷恩)',
      ratio: '5/6',
      score: 92,
      rank: '優等',
      notes: '垃圾分類桶內發現一根吸管未挑出，立即由輪值同學重新分類改正後通過。'
    }
  ];

  // ==========================================
  // 2. WEB AUDIO SYNTHESIZER (No External Files)
  // ==========================================

  class SoundEffects {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1) {
      if (!this.enabled) return;
      try {
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        console.warn('Audio play error:', e);
      }
    }

    click() {
      this.playTone(800, 'sine', 0.05, 0.05);
    }

    success() {
      if (!this.enabled) return;
      this.init();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 'triangle', 0.25, 0.12);
        }, idx * 90);
      });
    }

    bellChime() {
      if (!this.enabled) return;
      this.init();
      // School Bell Chord (Westminster chime simulation)
      const chimeChords = [659.25, 523.25, 587.33, 392.00];
      chimeChords.forEach((f, i) => {
        setTimeout(() => {
          this.playTone(f, 'sine', 0.6, 0.2);
        }, i * 350);
      });
    }

    tick() {
      this.playTone(1200, 'square', 0.03, 0.03);
    }

    wrong() {
      this.playTone(200, 'sawtooth', 0.25, 0.15);
    }

    spinTick() {
      this.playTone(900 + Math.random() * 300, 'sine', 0.04, 0.04);
    }
  }

  const sfx = new SoundEffects();

  // ==========================================
  // 3. CONFETTI EFFECT (Native Canvas)
  // ==========================================

  class ConfettiManager {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
      this.particles = [];
      this.animId = null;
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      if (!this.canvas) return;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    shoot(count = 70) {
      if (!this.canvas || !this.ctx) return;
      this.resize();
      const colors = ['#10B981', '#059669', '#38BDF8', '#F59E0B', '#F43F5E', '#8B5CF6', '#FBBF24'];

      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: this.canvas.width / 2 + (Math.random() - 0.5) * 200,
          y: this.canvas.height * 0.45,
          vx: (Math.random() - 0.5) * 16,
          vy: (Math.random() - 1.2) * 18,
          size: Math.random() * 8 + 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 12,
          opacity: 1
        });
      }

      if (!this.animId) {
        this.render();
      }
    }

    render() {
      if (!this.ctx) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.45; // Gravity
        p.vx *= 0.98;
        p.rotation += p.vRot;
        p.opacity -= 0.012;

        if (p.opacity <= 0 || p.y > this.canvas.height + 50) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.globalAlpha = Math.max(0, p.opacity);
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        this.ctx.restore();
      }

      if (this.particles.length > 0) {
        this.animId = requestAnimationFrame(() => this.render());
      } else {
        this.animId = null;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }

  const confetti = new ConfettiManager('confettiCanvas');

  // ==========================================
  // 4. STORAGE & LOCAL DATA ENGINE
  // ==========================================

  const STORAGE_KEYS = {
    STUDENTS: 'ckvs_clean_students',
    ZONES: 'ckvs_clean_zones',
    BULLETIN: 'ckvs_clean_bulletin',
    BULLETIN_TIME: 'ckvs_clean_bulletin_time',
    HISTORY: 'ckvs_clean_history',
    THEME: 'ckvs_clean_theme',
    SOUND: 'ckvs_clean_sound'
  };

  let state = {
    students: loadStorage(STORAGE_KEYS.STUDENTS, DEFAULT_STUDENTS),
    zones: loadStorage(STORAGE_KEYS.ZONES, DEFAULT_ZONES),
    bulletin: loadStorage(STORAGE_KEYS.BULLETIN, '各位一仁的同學大家好！今天是本週衛生整潔重點複評日。請各負責區域同學於鐘響後立即就位。特別注意：外掃區落葉務必裝入指定綠色大垃圾袋；走廊拖把請洗乾淨擰乾、夾好晾曬。打掃完成後請各區負責人至講台找衛生股長驗收蓋章！感謝大家的努力，一仁必得第一！💪'),
    bulletinTime: loadStorage(STORAGE_KEYS.BULLETIN_TIME, '本日最新發布'),
    history: loadStorage(STORAGE_KEYS.HISTORY, DEFAULT_HISTORY),
    activeZoneFilter: 'all',
    wheelCandidates: [],
    timerTotalSeconds: 15 * 60,
    timerCurrentSeconds: 15 * 60,
    timerRunning: false,
    timerInterval: null
  };

  function loadStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn('Storage read error:', e);
      return fallback;
    }
  }

  function saveStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage write error:', e);
    }
  }

  // ==========================================
  // 5. DOM ELEMENTS CACHE
  // ==========================================

  const el = {
    body: document.body,
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    soundToggleBtn: document.getElementById('soundToggleBtn'),
    projectorModeBtn: document.getElementById('projectorModeBtn'),
    liveDateDisplay: document.getElementById('liveDateDisplay'),
    tabs: document.querySelectorAll('.main-tabs .tab-btn'),
    panels: document.querySelectorAll('.tab-panel'),
    pendingVerifyCount: document.getElementById('pendingVerifyCount'),
    filterPendingCount: document.getElementById('filterPendingCount'),

    // Dashboard
    kpiProgressRing: document.getElementById('kpiProgressRing'),
    kpiOverallPercent: document.getElementById('kpiOverallPercent'),
    kpiProgressRatio: document.getElementById('kpiProgressRatio'),
    kpiProgressStatus: document.getElementById('kpiProgressStatus'),
    kpiRatingRank: document.getElementById('kpiRatingRank'),
    kpiRatingScore: document.getElementById('kpiRatingScore'),
    kpiRatingStars: document.getElementById('kpiRatingStars'),
    kpiDutyCount: document.getElementById('kpiDutyCount'),
    kpiTotalStudentCount: document.getElementById('kpiTotalStudentCount'),
    kpiActiveDutyBrief: document.getElementById('kpiActiveDutyBrief'),
    bulletinMessageText: document.getElementById('bulletinMessageText'),
    bulletinTimestamp: document.getElementById('bulletinTimestamp'),
    editBulletinBtn: document.getElementById('editBulletinBtn'),
    zoneQuickList: document.getElementById('zoneQuickList'),
    jumpToZonesBtn: document.getElementById('jumpToZonesBtn'),
    heroStartTimerBtn: document.getElementById('heroStartTimerBtn'),
    heroGoVerifyBtn: document.getElementById('heroGoVerifyBtn'),
    heroDrawLuckyBtn: document.getElementById('heroDrawLuckyBtn'),

    // Timer (Mini & Giant)
    miniTimerDisplay: document.getElementById('miniTimerDisplay'),
    miniTimerToggleBtn: document.getElementById('miniTimerToggleBtn'),
    miniTimerBtnIcon: document.getElementById('miniTimerBtnIcon'),
    miniTimerBtnText: document.getElementById('miniTimerBtnText'),
    miniTimerResetBtn: document.getElementById('miniTimerResetBtn'),
    openTimerModalBtn: document.getElementById('openTimerModalBtn'),
    timerModeLabel: document.getElementById('timerModeLabel'),

    timerModal: document.getElementById('timerModal'),
    closeTimerModalBtn: document.getElementById('closeTimerModalBtn'),
    giantClockDisplay: document.getElementById('giantClockDisplay'),
    timerProgressFill: document.getElementById('timerProgressFill'),
    modalTimerStatusChip: document.getElementById('modalTimerStatusChip'),
    modalTimerToggleBtn: document.getElementById('modalTimerToggleBtn'),
    modalTimerPlayIcon: document.getElementById('modalTimerPlayIcon'),
    modalTimerPlayText: document.getElementById('modalTimerPlayText'),
    modalTimerResetBtn: document.getElementById('modalTimerResetBtn'),
    modalBellSoundBtn: document.getElementById('modalBellSoundBtn'),
    presetBtns: document.querySelectorAll('.preset-btn'),

    // Zones
    zoneFilterTabs: document.getElementById('zoneFilterTabs'),
    zonesCardsGrid: document.getElementById('zonesCardsGrid'),
    resetAllChecklistsBtn: document.getElementById('resetAllChecklistsBtn'),
    verifyAllQuickBtn: document.getElementById('verifyAllQuickBtn'),

    // Roster
    rosterAssignmentGrid: document.getElementById('rosterAssignmentGrid'),
    copyRosterTextBtn: document.getElementById('copyRosterTextBtn'),
    printRosterBtn: document.getElementById('printRosterBtn'),
    rotateRosterBtn: document.getElementById('rotateRosterBtn'),
    studentCountLabel: document.getElementById('studentCountLabel'),
    addNewStudentBtn: document.getElementById('addNewStudentBtn'),
    resetRosterToDefaultBtn: document.getElementById('resetRosterToDefaultBtn'),
    studentSearchInput: document.getElementById('studentSearchInput'),
    studentPillPool: document.getElementById('studentPillPool'),

    // Wheel
    wheelCanvas: document.getElementById('wheelCanvas'),
    spinWheelBtn: document.getElementById('spinWheelBtn'),
    quickDrawSingleBtn: document.getElementById('quickDrawSingleBtn'),
    winnerBox: document.getElementById('winnerBox'),
    winnerNameDisplay: document.getElementById('winnerNameDisplay'),
    winnerTaskDisplay: document.getElementById('winnerTaskDisplay'),
    dismissWinnerBtn: document.getElementById('dismissWinnerBtn'),
    wheelCandidateCount: document.getElementById('wheelCandidateCount'),
    loadDutyPoolBtn: document.getElementById('loadDutyPoolBtn'),
    loadAllPoolBtn: document.getElementById('loadAllPoolBtn'),
    wheelCandidateTags: document.getElementById('wheelCandidateTags'),
    taskRadios: document.querySelectorAll('input[name="wheelTaskRadio"]'),
    customTaskInput: document.getElementById('customTaskInput'),

    // Recycle
    recycleSearchInput: document.getElementById('recycleSearchInput'),
    recycleCardsGrid: document.getElementById('recycleCardsGrid'),
    startQuizBtn: document.getElementById('startQuizBtn'),
    quizBody: document.getElementById('quizBody'),

    // History
    exportDataJsonBtn: document.getElementById('exportDataJsonBtn'),
    recordTodayLogBtn: document.getElementById('recordTodayLogBtn'),
    historyTableBody: document.getElementById('historyTableBody'),

    // Modals
    bulletinModal: document.getElementById('bulletinModal'),
    bulletinEditTextarea: document.getElementById('bulletinEditTextarea'),
    cancelBulletinEditBtn: document.getElementById('cancelBulletinEditBtn'),
    saveBulletinEditBtn: document.getElementById('saveBulletinEditBtn'),
    closeBulletinModalBtn: document.getElementById('closeBulletinModalBtn'),

    studentModal: document.getElementById('studentModal'),
    studentModalTitle: document.getElementById('studentModalTitle'),
    studentSeatInput: document.getElementById('studentSeatInput'),
    studentNameInput: document.getElementById('studentNameInput'),
    cancelStudentModalBtn: document.getElementById('cancelStudentModalBtn'),
    saveStudentModalBtn: document.getElementById('saveStudentModalBtn'),
    closeStudentModalBtn: document.getElementById('closeStudentModalBtn'),

    recordLogModal: document.getElementById('recordLogModal'),
    closeRecordLogModalBtn: document.getElementById('closeRecordLogModalBtn'),
    recordLogDate: document.getElementById('recordLogDate'),
    recordLogOfficer: document.getElementById('recordLogOfficer'),
    recordLogScore: document.getElementById('recordLogScore'),
    recordLogNotes: document.getElementById('recordLogNotes'),
    cancelRecordLogBtn: document.getElementById('cancelRecordLogBtn'),
    saveRecordLogBtn: document.getElementById('saveRecordLogBtn')
  };

  // ==========================================
  // 6. INITIALIZATION & NAVIGATION
  // ==========================================

  function init() {
    initTheme();
    initDateDisplay();
    initTabs();
    initBulletin();
    renderDashboardKPIs();
    renderZoneQuickList();
    renderZones();
    renderRoster();
    initWheelCandidates();
    drawWheel();
    renderRecycleGuide();
    renderHistoryTable();
    initTimerEvents();
    initModalEvents();
  }

  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    el.body.setAttribute('data-theme', savedTheme);
    updateThemeBtnLabel(savedTheme);

    if (el.themeToggleBtn) {
      el.themeToggleBtn.addEventListener('click', () => {
        sfx.click();
        const current = el.body.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        el.body.setAttribute('data-theme', next);
        localStorage.setItem(STORAGE_KEYS.THEME, next);
        updateThemeBtnLabel(next);
      });
    }

    if (el.soundToggleBtn) {
      const savedSound = localStorage.getItem(STORAGE_KEYS.SOUND);
      sfx.enabled = savedSound !== 'false';
      updateSoundBtnLabel(sfx.enabled);

      el.soundToggleBtn.addEventListener('click', () => {
        sfx.enabled = !sfx.enabled;
        localStorage.setItem(STORAGE_KEYS.SOUND, sfx.enabled);
        updateSoundBtnLabel(sfx.enabled);
        if (sfx.enabled) sfx.click();
      });
    }

    if (el.projectorModeBtn) {
      el.projectorModeBtn.addEventListener('click', () => {
        sfx.click();
        el.body.classList.toggle('projector-mode');
        const isProjector = el.body.classList.contains('projector-mode');
        el.projectorModeBtn.querySelector('.btn-label').textContent = isProjector ? '退出投影模式' : '投影全螢幕';
      });
    }
  }

  function updateThemeBtnLabel(theme) {
    if (!el.themeToggleBtn) return;
    const isDark = theme === 'dark';
    el.themeToggleBtn.querySelector('.btn-icon').textContent = isDark ? '☀️' : '🌙';
    el.themeToggleBtn.querySelector('.btn-label').textContent = isDark ? '明亮' : '深色';
  }

  function updateSoundBtnLabel(enabled) {
    if (!el.soundToggleBtn) return;
    el.soundToggleBtn.querySelector('.btn-icon').textContent = enabled ? '🔊' : '🔇';
    el.soundToggleBtn.querySelector('.btn-label').textContent = enabled ? '音效開' : '靜音';
  }

  function initDateDisplay() {
    if (!el.liveDateDisplay) return;
    const now = new Date();
    const days = ['日', '一', '二', '三', '四', '五', '六'];
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const day = days[now.getDay()];
    el.liveDateDisplay.querySelector('.text').textContent = `${year}年${month}月${date}日 星期${day} · 第 7 週整潔作戰`;

    if (el.recordLogDate) {
      const yyyy = String(year);
      const mm = String(month).padStart(2, '0');
      const dd = String(date).padStart(2, '0');
      el.recordLogDate.value = `${yyyy}-${mm}-${dd}`;
    }
  }

  function initTabs() {
    el.tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        sfx.click();
        const targetTab = btn.getAttribute('data-tab');
        switchTab(targetTab);
      });
    });

    if (el.jumpToZonesBtn) {
      el.jumpToZonesBtn.addEventListener('click', () => switchTab('tabZones'));
    }
    if (el.heroGoVerifyBtn) {
      el.heroGoVerifyBtn.addEventListener('click', () => switchTab('tabZones'));
    }
    if (el.heroDrawLuckyBtn) {
      el.heroDrawLuckyBtn.addEventListener('click', () => switchTab('tabWheel'));
    }
  }

  function switchTab(tabId) {
    el.tabs.forEach(b => b.classList.toggle('active', b.getAttribute('data-tab') === tabId));
    el.panels.forEach(p => p.classList.toggle('active', p.id === tabId));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (tabId === 'tabWheel') {
      drawWheel();
    }
  }

  // ==========================================
  // 7. BULLETIN BOARD LOGIC
  // ==========================================

  function initBulletin() {
    if (el.bulletinMessageText) el.bulletinMessageText.textContent = state.bulletin;
    if (el.bulletinTimestamp) el.bulletinTimestamp.textContent = state.bulletinTime;

    if (el.editBulletinBtn) {
      el.editBulletinBtn.addEventListener('click', () => {
        sfx.click();
        el.bulletinEditTextarea.value = state.bulletin;
        el.bulletinModal.classList.remove('hidden');
      });
    }

    if (el.cancelBulletinEditBtn) {
      el.cancelBulletinEditBtn.addEventListener('click', () => el.bulletinModal.classList.add('hidden'));
    }
    if (el.closeBulletinModalBtn) {
      el.closeBulletinModalBtn.addEventListener('click', () => el.bulletinModal.classList.add('hidden'));
    }

    if (el.saveBulletinEditBtn) {
      el.saveBulletinEditBtn.addEventListener('click', () => {
        sfx.success();
        const newText = el.bulletinEditTextarea.value.trim();
        if (newText) {
          state.bulletin = newText;
          const now = new Date();
          state.bulletinTime = `更新於 ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
          saveStorage(STORAGE_KEYS.BULLETIN, state.bulletin);
          saveStorage(STORAGE_KEYS.BULLETIN_TIME, state.bulletinTime);
          el.bulletinMessageText.textContent = state.bulletin;
          el.bulletinTimestamp.textContent = state.bulletinTime;
        }
        el.bulletinModal.classList.add('hidden');
      });
    }
  }

  // ==========================================
  // 8. DASHBOARD METRICS & QUICK LIST
  // ==========================================

  function renderDashboardKPIs() {
    let totalItems = 0;
    let doneItems = 0;
    let completedZones = 0;

    state.zones.forEach(z => {
      const isZoneDone = z.items.length > 0 && z.items.every(i => i.done);
      if (isZoneDone || z.verified) completedZones++;
      z.items.forEach(i => {
        totalItems++;
        if (i.done) doneItems++;
      });
    });

    const percent = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;
    if (el.kpiOverallPercent) el.kpiOverallPercent.textContent = `${percent}%`;
    if (el.kpiProgressRatio) el.kpiProgressRatio.textContent = `${completedZones} / ${state.zones.length} 區完成`;

    // Progress Ring offset: circumference is 2 * PI * 35 = 220
    if (el.kpiProgressRing) {
      const offset = 220 - (220 * percent) / 100;
      el.kpiProgressRing.style.strokeDashoffset = offset;
    }

    if (el.kpiProgressStatus) {
      if (percent === 100) {
        el.kpiProgressStatus.textContent = '🎉 全區檢核完成，達標滿分！';
        el.kpiProgressStatus.style.color = 'var(--primary)';
      } else if (percent > 50) {
        el.kpiProgressStatus.textContent = '清潔進行順利，加緊驗收！';
        el.kpiProgressStatus.style.color = 'var(--secondary)';
      } else if (percent > 0) {
        el.kpiProgressStatus.textContent = '各區域清潔工作中...';
        el.kpiProgressStatus.style.color = 'var(--accent)';
      } else {
        el.kpiProgressStatus.textContent = '今日打掃尚未展開';
        el.kpiProgressStatus.style.color = 'var(--text-muted)';
      }
    }

    // Dynamic Rating & Rank
    let rank = '待驗收';
    let score = 80 + Math.round(percent * 0.19);
    let stars = '★★★☆☆';
    if (percent === 100) {
      rank = '特優';
      score = 99;
      stars = '★★★★★';
    } else if (percent >= 75) {
      rank = '優等';
      score = 92;
      stars = '★★★★☆';
    } else if (percent >= 40) {
      rank = '甲等';
      score = 86;
      stars = '★★★☆☆';
    }

    if (el.kpiRatingRank) el.kpiRatingRank.textContent = rank;
    if (el.kpiRatingScore) el.kpiRatingScore.innerHTML = `${score} <small>分</small>`;
    if (el.kpiRatingStars) el.kpiRatingStars.textContent = stars;

    // Student Duty Count
    let activeDutySeats = new Set();
    state.zones.forEach(z => {
      z.assignedSeats.forEach(s => activeDutySeats.add(s));
    });
    if (el.kpiDutyCount) el.kpiDutyCount.innerHTML = `${activeDutySeats.size} <small>人</small>`;
    if (el.kpiTotalStudentCount) el.kpiTotalStudentCount.textContent = state.students.length;
    if (el.studentCountLabel) el.studentCountLabel.textContent = state.students.length;

    // Badges pending verification
    let pendingCount = state.zones.filter(z => !z.verified).length;
    if (el.pendingVerifyCount) el.pendingVerifyCount.textContent = pendingCount;
    if (el.filterPendingCount) el.filterPendingCount.textContent = pendingCount;
  }

  function renderZoneQuickList() {
    if (!el.zoneQuickList) return;
    el.zoneQuickList.innerHTML = '';

    state.zones.forEach(zone => {
      const isDone = zone.items.length > 0 && zone.items.every(i => i.done);
      const studentNames = zone.assignedSeats
        .map(seat => {
          const s = state.students.find(st => st.seat === seat);
          return s ? s.name : `${seat}號`;
        })
        .join('、');

      let badgeHtml = '';
      if (zone.verified) {
        badgeHtml = `<span class="zone-status-badge passed"><span>✅</span> 股長已驗收</span>`;
      } else if (isDone) {
        badgeHtml = `<span class="zone-status-badge in-progress"><span>⏳</span> 待股長查核</span>`;
      } else {
        const doneCount = zone.items.filter(i => i.done).length;
        badgeHtml = `<span class="zone-status-badge pending"><span>🧹</span> 進行中 (${doneCount}/${zone.items.length})</span>`;
      }

      const itemEl = document.createElement('div');
      itemEl.className = 'zone-quick-item';
      itemEl.innerHTML = `
        <div class="zone-quick-info">
          <span class="zone-quick-icon">${zone.icon}</span>
          <div>
            <div class="zone-quick-name">${zone.name}</div>
            <div class="zone-quick-duty">當值學生：${studentNames || '未指派'}</div>
          </div>
        </div>
        <div>${badgeHtml}</div>
      `;
      itemEl.addEventListener('click', () => {
        sfx.click();
        switchTab('tabZones');
      });
      el.zoneQuickList.appendChild(itemEl);
    });
  }

  // ==========================================
  // 9. TAB 2: ZONES & CHECKLISTS
  // ==========================================

  function renderZones() {
    if (!el.zonesCardsGrid) return;
    el.zonesCardsGrid.innerHTML = '';

    const filter = state.activeZoneFilter;
    const filteredZones = state.zones.filter(zone => {
      if (filter === 'all') return true;
      if (filter === 'indoor') return zone.type === 'indoor';
      if (filter === 'outdoor') return zone.type === 'outdoor';
      if (filter === 'pending') return !zone.verified;
      return true;
    });

    if (filteredZones.length === 0) {
      el.zonesCardsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">✨</div>
          <h3>此分類目前無待驗收區域！全數打掃整潔達標！</h3>
        </div>
      `;
      return;
    }

    filteredZones.forEach(zone => {
      const total = zone.items.length;
      const done = zone.items.filter(i => i.done).length;
      const percent = total > 0 ? Math.round((done / total) * 100) : 0;
      const isPassed = zone.verified;

      // Student chips
      const studentChipsHtml = zone.assignedSeats
        .map(seat => {
          const st = state.students.find(s => s.seat === seat);
          const name = st ? st.name : `${seat}號`;
          return `<span class="student-chip">${seat}號 ${name}</span>`;
        })
        .join('');

      // Check items
      const itemsHtml = zone.items
        .map(
          (item, idx) => `
        <label class="check-item ${item.done ? 'done' : ''}" data-zone="${zone.id}" data-idx="${idx}">
          <input type="checkbox" class="check-input" ${item.done ? 'checked' : ''}>
          <span class="check-text">${item.text}</span>
        </label>
      `
        )
        .join('');

      // Official Passed Stamp Seal
      const stampHtml = isPassed
        ? `
        <div class="stamp-passed">
          <span>智光一仁 查核合格</span>
          <span class="stamp-date">衛生股長核章 ${zone.verifiedDate || ''}</span>
        </div>
      `
        : '';

      const card = document.createElement('div');
      card.className = `zone-card ${isPassed ? 'is-passed' : ''}`;
      card.id = `card-${zone.id}`;
      card.innerHTML = `
        ${stampHtml}
        <div class="zone-card-header">
          <div class="zone-card-title-wrap">
            <span class="zone-card-icon">${zone.icon}</span>
            <div>
              <h3 class="zone-card-name">${zone.name}</h3>
              <span class="zone-card-type">${zone.type === 'indoor' ? '🏫 教室室內區域' : '🌳 校園外掃與公共區'}</span>
            </div>
          </div>
          <span class="zone-status-badge ${isPassed ? 'passed' : percent === 100 ? 'in-progress' : 'pending'}">
            ${isPassed ? '合格通過' : percent === 100 ? '待簽核' : `進度 ${percent}%`}
          </span>
        </div>

        <div class="zone-card-body">
          <div class="zone-duty-row">
            <span class="zone-duty-label">👷 負責同學：</span>
            <div class="zone-duty-students">
              ${studentChipsHtml || '<span style="color:var(--text-light)">尚未指派</span>'}
            </div>
          </div>

          <div class="zone-progress-wrap">
            <div class="zone-progress-info">
              <span>檢驗合格項目 (${done}/${total})</span>
              <span>${percent}%</span>
            </div>
            <div class="zone-progress-bar">
              <div class="zone-progress-fill" style="width: ${percent}%;"></div>
            </div>
          </div>

          <div class="checklist-items">
            ${itemsHtml}
          </div>

          <div class="zone-card-footer">
            <button class="btn btn-sm btn-ghost toggle-all-zone-btn" data-zone="${zone.id}">
              ${percent === 100 ? '取消全選' : '全項打勾'}
            </button>
            <button class="btn btn-sm ${isPassed ? 'btn-outline' : 'btn-primary'} verify-zone-btn" data-zone="${zone.id}">
              ${isPassed ? '重簽 / 撤銷核可' : '施蓋合格查核章 ➔'}
            </button>
          </div>
        </div>
      `;

      el.zonesCardsGrid.appendChild(card);
    });

    bindZoneCardEvents();
  }

  function bindZoneCardEvents() {
    // Checkbox toggles
    document.querySelectorAll('.check-item').forEach(label => {
      label.addEventListener('click', e => {
        if (e.target.tagName !== 'INPUT') return;
        const zoneId = label.getAttribute('data-zone');
        const idx = parseInt(label.getAttribute('data-idx'), 10);
        const zone = state.zones.find(z => z.id === zoneId);
        if (zone && zone.items[idx]) {
          zone.items[idx].done = e.target.checked;
          if (!zone.items[idx].done) {
            zone.verified = false;
          }
          saveStorage(STORAGE_KEYS.ZONES, state.zones);
          sfx.click();
          renderDashboardKPIs();
          renderZoneQuickList();
          renderZones();
        }
      });
    });

    // Toggle all items in a zone
    document.querySelectorAll('.toggle-all-zone-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sfx.click();
        const zoneId = btn.getAttribute('data-zone');
        const zone = state.zones.find(z => z.id === zoneId);
        if (zone) {
          const allDone = zone.items.every(i => i.done);
          zone.items.forEach(i => (i.done = !allDone));
          if (allDone) zone.verified = false;
          saveStorage(STORAGE_KEYS.ZONES, state.zones);
          renderDashboardKPIs();
          renderZoneQuickList();
          renderZones();
        }
      });
    });

    // Verify / Stamp a single zone
    document.querySelectorAll('.verify-zone-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const zoneId = btn.getAttribute('data-zone');
        const zone = state.zones.find(z => z.id === zoneId);
        if (!zone) return;

        if (zone.verified) {
          sfx.click();
          zone.verified = false;
          zone.verifiedDate = null;
        } else {
          sfx.success();
          confetti.shoot(35);
          zone.items.forEach(i => (i.done = true));
          zone.verified = true;
          const now = new Date();
          zone.verifiedDate = `${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
        }

        saveStorage(STORAGE_KEYS.ZONES, state.zones);
        renderDashboardKPIs();
        renderZoneQuickList();
        renderZones();
      });
    });
  }

  // Zone Filters & Batch Actions
  if (el.zoneFilterTabs) {
    el.zoneFilterTabs.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        sfx.click();
        el.zoneFilterTabs.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.activeZoneFilter = chip.getAttribute('data-filter');
        renderZones();
      });
    });
  }

  if (el.resetAllChecklistsBtn) {
    el.resetAllChecklistsBtn.addEventListener('click', () => {
      if (confirm('確定要將今日所有責任分區的檢核狀態與合格章重設嗎？')) {
        sfx.wrong();
        state.zones.forEach(z => {
          z.verified = false;
          z.verifiedDate = null;
          z.items.forEach(i => (i.done = false));
        });
        saveStorage(STORAGE_KEYS.ZONES, state.zones);
        renderDashboardKPIs();
        renderZoneQuickList();
        renderZones();
      }
    });
  }

  if (el.verifyAllQuickBtn) {
    el.verifyAllQuickBtn.addEventListener('click', () => {
      sfx.success();
      confetti.shoot(100);
      const now = new Date();
      const dateStr = `${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
      state.zones.forEach(z => {
        z.verified = true;
        z.verifiedDate = dateStr;
        z.items.forEach(i => (i.done = true));
      });
      saveStorage(STORAGE_KEYS.ZONES, state.zones);
      renderDashboardKPIs();
      renderZoneQuickList();
      renderZones();
    });
  }

  // ==========================================
  // 10. TAB 3: ROSTER (值日生輪值名冊)
  // ==========================================

  function renderRoster() {
    renderRosterAssignments();
    renderStudentPool();
  }

  function renderRosterAssignments() {
    if (!el.rosterAssignmentGrid) return;
    el.rosterAssignmentGrid.innerHTML = '';

    state.zones.forEach(zone => {
      const studentRows = zone.assignedSeats
        .map(seat => {
          const st = state.students.find(s => s.seat === seat);
          const name = st ? st.name : '未知名稱';
          return `
          <div class="assigned-student-row">
            <div class="assigned-student-info">
              <span class="assigned-seat">${seat}號</span>
              <span class="assigned-name">${name}</span>
            </div>
            <div class="student-actions">
              <button class="btn btn-xs btn-ghost text-danger remove-seat-btn" data-zone="${zone.id}" data-seat="${seat}" title="從本區移除">✕</button>
            </div>
          </div>
        `;
        })
        .join('');

      const card = document.createElement('div');
      card.className = 'roster-card';
      card.innerHTML = `
        <div class="roster-card-header">
          <div class="roster-card-title">
            <span>${zone.icon}</span>
            <span>${zone.name}</span>
          </div>
          <span class="badge-count">${zone.assignedSeats.length}人</span>
        </div>
        <div class="roster-student-list">
          ${studentRows || '<div style="font-size:0.8rem; color:var(--text-light); padding:1rem; text-align:center;">此區尚無排班同學，請由下方名冊點選指派</div>'}
        </div>
        <div style="margin-top:0.75rem; display:flex; justify-content:flex-end;">
          <button class="btn btn-xs btn-outline add-duty-student-btn" data-zone="${zone.id}">➕ 指派學生至本區</button>
        </div>
      `;

      el.rosterAssignmentGrid.appendChild(card);
    });

    // Bind remove seat
    document.querySelectorAll('.remove-seat-btn').forEach(b => {
      b.addEventListener('click', () => {
        sfx.click();
        const zoneId = b.getAttribute('data-zone');
        const seat = parseInt(b.getAttribute('data-seat'), 10);
        const zone = state.zones.find(z => z.id === zoneId);
        if (zone) {
          zone.assignedSeats = zone.assignedSeats.filter(s => s !== seat);
          saveStorage(STORAGE_KEYS.ZONES, state.zones);
          renderRoster();
          renderDashboardKPIs();
          renderZoneQuickList();
        }
      });
    });

    // Add student to zone prompt
    document.querySelectorAll('.add-duty-student-btn').forEach(b => {
      b.addEventListener('click', () => {
        sfx.click();
        const zoneId = b.getAttribute('data-zone');
        const zone = state.zones.find(z => z.id === zoneId);
        if (!zone) return;

        const seatInput = prompt(`請輸入要指派至【${zone.name}】的學生座號 (1 ~ ${state.students.length})：`);
        if (seatInput) {
          const seat = parseInt(seatInput.trim(), 10);
          if (isNaN(seat) || !state.students.some(s => s.seat === seat)) {
            alert('查無該座號學生，請確認全班名冊！');
            return;
          }
          if (zone.assignedSeats.includes(seat)) {
            alert(`${seat}號 已經在此負責分區名單中！`);
            return;
          }
          zone.assignedSeats.push(seat);
          zone.assignedSeats.sort((a, b) => a - b);
          saveStorage(STORAGE_KEYS.ZONES, state.zones);
          sfx.success();
          renderRoster();
          renderDashboardKPIs();
          renderZoneQuickList();
        }
      });
    });
  }

  function renderStudentPool() {
    if (!el.studentPillPool) return;
    el.studentPillPool.innerHTML = '';

    const query = el.studentSearchInput ? el.studentSearchInput.value.trim().toLowerCase() : '';
    const filtered = state.students.filter(s => {
      if (!query) return true;
      return s.seat.toString().includes(query) || s.name.toLowerCase().includes(query);
    });

    filtered.forEach(student => {
      // Find what zone this student is assigned to
      const assignedZones = state.zones.filter(z => z.assignedSeats.includes(student.seat));
      const zoneIcons = assignedZones.map(z => z.icon).join('');

      const pill = document.createElement('div');
      pill.className = 'pool-student-pill';
      pill.title = assignedZones.length > 0 ? `已指派負責：${assignedZones.map(z => z.name).join('、')}` : '尚未排定打掃區域';
      pill.innerHTML = `
        <span class="pool-seat">${student.seat}號</span>
        <span class="pool-name">${student.name}</span>
        <span>${zoneIcons}</span>
      `;

      pill.addEventListener('click', () => {
        sfx.click();
        const action = prompt(`學生：${student.seat}號 ${student.name}\n請選擇操作：\n1. 加入抽籤候選名單\n2. 修改姓名\n3. 刪除此學生\n(請輸入數字 1, 2, 3)：`);
        if (action === '1') {
          addStudentToWheel(student);
          switchTab('tabWheel');
        } else if (action === '2') {
          const newName = prompt(`請輸入 ${student.seat}號 的新姓名：`, student.name);
          if (newName && newName.trim()) {
            student.name = newName.trim();
            saveStorage(STORAGE_KEYS.STUDENTS, state.students);
            renderRoster();
          }
        } else if (action === '3') {
          if (confirm(`確定要從班級名冊刪除 ${student.seat}號 ${student.name} 嗎？`)) {
            state.students = state.students.filter(s => s.seat !== student.seat);
            state.zones.forEach(z => {
              z.assignedSeats = z.assignedSeats.filter(s => s !== student.seat);
            });
            saveStorage(STORAGE_KEYS.STUDENTS, state.students);
            saveStorage(STORAGE_KEYS.ZONES, state.zones);
            renderRoster();
            renderDashboardKPIs();
          }
        }
      });

      el.studentPillPool.appendChild(pill);
    });
  }

  if (el.studentSearchInput) {
    el.studentSearchInput.addEventListener('input', () => renderStudentPool());
  }

  // Weekly Clockwise Rotation
  if (el.rotateRosterBtn) {
    el.rotateRosterBtn.addEventListener('click', () => {
      if (confirm('【每週排班大輪替】\n確定要將各打掃區域的負責名單順時鐘輪替一輪嗎？\n(例如：講桌區同學換去地板區，外掃區換去走廊區)')) {
        sfx.success();
        confetti.shoot(50);
        // Shift assigned seats circularly
        const seatArrays = state.zones.map(z => [...z.assignedSeats]);
        const lastSeats = seatArrays.pop();
        seatArrays.unshift(lastSeats);

        state.zones.forEach((z, idx) => {
          z.assignedSeats = seatArrays[idx];
          z.verified = false;
          z.items.forEach(i => (i.done = false));
        });

        saveStorage(STORAGE_KEYS.ZONES, state.zones);
        renderRoster();
        renderDashboardKPIs();
        renderZoneQuickList();
        renderZones();
        alert('🎉 恭喜！全班清潔責任分區已完成每週智慧順時鐘輪替！');
      }
    });
  }

  // Copy Roster Text for LINE / Contact book
  if (el.copyRosterTextBtn) {
    el.copyRosterTextBtn.addEventListener('click', () => {
      sfx.click();
      let text = `🏫【新北市私立智光高級商工職業學校 · 一年仁班】\n📅 本週班級整潔責任分區輪值名冊\n🎖️ 衛生股長室公告\n-------------------------\n`;
      state.zones.forEach(z => {
        const studentNames = z.assignedSeats
          .map(seat => {
            const st = state.students.find(s => s.seat === seat);
            return st ? `${seat}號 ${st.name}` : `${seat}號`;
          })
          .join('、');
        text += `${z.icon} ${z.name}：\n   👉 ${studentNames || '無'}\n\n`;
      });
      text += `💡 衛生股長提醒：放學鐘響後請各組立即至負責區域就位，驗收請找衛生股長蓋章！乾淨一仁，人人有責！`;

      navigator.clipboard.writeText(text).then(() => {
        alert('📋 排班名冊文字已成功複製到剪貼簿！可直接貼至班級 LINE 群組或家長聯絡簿！');
      }).catch(() => {
        prompt('請手動複製以下排班文字：', text);
      });
    });
  }

  if (el.printRosterBtn) {
    el.printRosterBtn.addEventListener('click', () => {
      sfx.click();
      window.print();
    });
  }

  if (el.resetRosterToDefaultBtn) {
    el.resetRosterToDefaultBtn.addEventListener('click', () => {
      if (confirm('確定要將全班學生名冊重置回智光一仁 36 位預設名單嗎？')) {
        state.students = JSON.parse(JSON.stringify(DEFAULT_STUDENTS));
        saveStorage(STORAGE_KEYS.STUDENTS, state.students);
        renderRoster();
        renderDashboardKPIs();
      }
    });
  }

  // ==========================================
  // 11. TAB 4: LUCKY WHEEL & LOTTERY
  // ==========================================

  let wheelState = {
    rotationAngle: 0,
    isSpinning: false,
    spinVelocity: 0,
    friction: 0.985
  };

  function initWheelCandidates() {
    // Default load all students currently assigned to duty
    const dutySeats = [];
    state.zones.forEach(z => z.assignedSeats.forEach(s => dutySeats.push(s)));
    const uniqueSeats = Array.from(new Set(dutySeats)).sort((a, b) => a - b);

    state.wheelCandidates = uniqueSeats
      .map(seat => state.students.find(st => st.seat === seat))
      .filter(Boolean);

    if (state.wheelCandidates.length < 4) {
      state.wheelCandidates = state.students.slice(0, 8);
    }

    renderWheelCandidateTags();
  }

  function addStudentToWheel(student) {
    if (!state.wheelCandidates.some(s => s.seat === student.seat)) {
      state.wheelCandidates.push(student);
      renderWheelCandidateTags();
      drawWheel();
    }
  }

  function renderWheelCandidateTags() {
    if (!el.wheelCandidateTags) return;
    el.wheelCandidateTags.innerHTML = '';
    if (el.wheelCandidateCount) el.wheelCandidateCount.textContent = state.wheelCandidates.length;

    state.wheelCandidates.forEach((student, idx) => {
      const tag = document.createElement('span');
      tag.className = 'candidate-tag';
      tag.innerHTML = `<span>${student.seat}號</span> <strong>${student.name}</strong> <span>✕</span>`;
      tag.addEventListener('click', () => {
        sfx.click();
        state.wheelCandidates.splice(idx, 1);
        renderWheelCandidateTags();
        drawWheel();
      });
      el.wheelCandidateTags.appendChild(tag);
    });
  }

  if (el.loadDutyPoolBtn) {
    el.loadDutyPoolBtn.addEventListener('click', () => {
      sfx.click();
      initWheelCandidates();
      drawWheel();
    });
  }

  if (el.loadAllPoolBtn) {
    el.loadAllPoolBtn.addEventListener('click', () => {
      sfx.click();
      state.wheelCandidates = [...state.students];
      renderWheelCandidateTags();
      drawWheel();
    });
  }

  // Draw Canvas Wheel
  function drawWheel() {
    if (!el.wheelCanvas) return;
    const canvas = el.wheelCanvas;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 2 - 20;

    ctx.clearRect(0, 0, width, height);

    const candidates = state.wheelCandidates;
    const count = candidates.length;

    if (count === 0) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#e2e8f0';
      ctx.fill();
      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 20px "Noto Sans TC"';
      ctx.textAlign = 'center';
      ctx.fillText('請加入候選學生', centerX, centerY);
      return;
    }

    const arcSize = (2 * Math.PI) / count;
    const palette = ['#10B981', '#06B6D4', '#F59E0B', '#EC4899', '#8B5CF6', '#3B82F6', '#14B8A6', '#F43F5E'];

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(wheelState.rotationAngle);

    for (let i = 0; i < count; i++) {
      const angle = i * arcSize;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, angle, angle + arcSize);
      ctx.fillStyle = palette[i % palette.length];
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Text label
      ctx.save();
      ctx.rotate(angle + arcSize / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px "Noto Sans TC", sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.4)';
      ctx.shadowBlur = 4;
      const text = `${candidates[i].seat} ${candidates[i].name}`;
      ctx.fillText(text, radius - 28, 6);
      ctx.restore();
    }

    // Center Hub
    ctx.beginPath();
    ctx.arc(0, 0, 36, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.fillStyle = '#059669';
    ctx.font = 'bold 15px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowBlur = 0;
    ctx.fillText('CKVS', 0, 5);

    ctx.restore();
  }

  function getSelectedTask() {
    let task = '今天誰負責倒全班廚餘桶？';
    if (el.taskRadios) {
      el.taskRadios.forEach(r => {
        if (r.checked) {
          if (r.value === 'custom') {
            task = el.customTaskInput.value.trim() || '自訂班級整潔公差任務';
          } else {
            task = r.value;
          }
        }
      });
    }
    return task;
  }

  if (el.taskRadios) {
    el.taskRadios.forEach(r => {
      r.addEventListener('change', () => {
        if (r.value === 'custom' && r.checked) {
          el.customTaskInput.classList.remove('hidden');
          el.customTaskInput.focus();
        } else {
          el.customTaskInput.classList.add('hidden');
        }
      });
    });
  }

  function spinWheel() {
    if (wheelState.isSpinning) return;
    if (state.wheelCandidates.length < 2) {
      alert('轉盤候選名單至少需要 2 位同學才能進行公平抽籤！');
      return;
    }

    if (el.winnerBox) el.winnerBox.classList.add('hidden');
    wheelState.isSpinning = true;
    wheelState.spinVelocity = Math.random() * 0.35 + 0.45; // Initial high angular velocity

    let lastTickAngle = wheelState.rotationAngle;
    const arcSize = (2 * Math.PI) / state.wheelCandidates.length;

    function animateSpin() {
      wheelState.rotationAngle += wheelState.spinVelocity;
      wheelState.spinVelocity *= wheelState.friction;

      // Sound tick on segment crossing
      if (Math.abs(wheelState.rotationAngle - lastTickAngle) >= arcSize) {
        sfx.spinTick();
        lastTickAngle = wheelState.rotationAngle;
      }

      drawWheel();

      if (wheelState.spinVelocity > 0.002) {
        requestAnimationFrame(animateSpin);
      } else {
        wheelState.isSpinning = false;
        announceWinner();
      }
    }

    requestAnimationFrame(animateSpin);
  }

  function announceWinner() {
    const count = state.wheelCandidates.length;
    const arcSize = (2 * Math.PI) / count;

    // Normalizing angle: pointer is at top (-PI/2)
    // Canvas rotation is clockwise.
    let angle = (wheelState.rotationAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    let pointerAngle = (1.5 * Math.PI - angle + 2 * Math.PI) % (2 * Math.PI);
    let winningIndex = Math.floor(pointerAngle / arcSize) % count;

    const winner = state.wheelCandidates[winningIndex];
    const task = getSelectedTask();

    sfx.success();
    confetti.shoot(80);

    if (el.winnerBox) {
      el.winnerBox.classList.remove('hidden');
      el.winnerNameDisplay.textContent = `${winner.seat}號 ${winner.name}`;
      el.winnerTaskDisplay.textContent = `🎯 抽籤任務：${task}`;
      el.winnerBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  if (el.spinWheelBtn) {
    el.spinWheelBtn.addEventListener('click', () => spinWheel());
  }

  if (el.quickDrawSingleBtn) {
    el.quickDrawSingleBtn.addEventListener('click', () => {
      if (state.wheelCandidates.length === 0) {
        alert('請先載入候選學生名單！');
        return;
      }
      sfx.click();
      const randIdx = Math.floor(Math.random() * state.wheelCandidates.length);
      const winner = state.wheelCandidates[randIdx];
      const task = getSelectedTask();
      sfx.success();
      confetti.shoot(50);

      if (el.winnerBox) {
        el.winnerBox.classList.remove('hidden');
        el.winnerNameDisplay.textContent = `⚡ 快速抽出：${winner.seat}號 ${winner.name}`;
        el.winnerTaskDisplay.textContent = `🎯 抽籤任務：${task}`;
      }
    });
  }

  if (el.dismissWinnerBtn) {
    el.dismissWinnerBtn.addEventListener('click', () => {
      el.winnerBox.classList.add('hidden');
    });
  }

  // ==========================================
  // 12. TAB 5: RECYCLE GUIDE & QUIZ
  // ==========================================

  function renderRecycleGuide(query = '') {
    if (!el.recycleCardsGrid) return;
    el.recycleCardsGrid.innerHTML = '';

    const q = query.trim().toLowerCase();
    const filtered = DEFAULT_RECYCLE_ITEMS.filter(item => {
      if (!q) return true;
      return (
        item.category.toLowerCase().includes(q) ||
        item.examples.toLowerCase().includes(q) ||
        item.rules.toLowerCase().includes(q)
      );
    });

    if (filtered.length === 0) {
      el.recycleCardsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
          <h3>查無符合「${query}」之垃圾類別，若不確定材質請詢問衛生股長！</h3>
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'recycle-card';
      card.innerHTML = `
        <div class="recycle-header">
          <div class="recycle-title-wrap">
            <span class="recycle-icon">${item.icon}</span>
            <span class="recycle-name">${item.category}</span>
          </div>
          <span class="recycle-color-pill" style="background:${item.color}20; color:${item.color}; border: 1px solid ${item.color}40;">
            智光規範
          </span>
        </div>
        <div class="recycle-items-list">
          <strong>常見物品：</strong> ${item.examples}
        </div>
        <div class="recycle-rule-box">
          <strong>💡 處理標準：</strong> ${item.rules}
        </div>
      `;
      el.recycleCardsGrid.appendChild(card);
    });
  }

  if (el.recycleSearchInput) {
    el.recycleSearchInput.addEventListener('input', e => {
      renderRecycleGuide(e.target.value);
    });
  }

  // Quick Recycling Quiz
  let currentQuiz = null;
  function startQuizQuestion() {
    if (!el.quizBody) return;
    sfx.click();
    const randIdx = Math.floor(Math.random() * QUIZ_BANK.length);
    currentQuiz = QUIZ_BANK[randIdx];

    const optionsHtml = currentQuiz.options
      .map(
        (opt, idx) => `
      <button class="quiz-btn" data-idx="${idx}">${opt}</button>
    `
      )
      .join('');

    el.quizBody.innerHTML = `
      <div class="quiz-question-box">
        ❓ 請問校園垃圾：<strong>「${currentQuiz.item}」</strong> 該投入哪一桶？
      </div>
      <div class="quiz-options-grid">
        ${optionsHtml}
      </div>
      <div id="quizResultArea"></div>
    `;

    el.quizBody.querySelectorAll('.quiz-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedIdx = parseInt(btn.getAttribute('data-idx'), 10);
        checkQuizAnswer(selectedIdx);
      });
    });
  }

  function checkQuizAnswer(selectedIdx) {
    if (!currentQuiz) return;
    const resultArea = document.getElementById('quizResultArea');
    if (!resultArea) return;

    if (selectedIdx === currentQuiz.answerIndex) {
      sfx.success();
      confetti.shoot(40);
      resultArea.innerHTML = `
        <div class="quiz-result-msg correct">
          🎉 答對了！非常正確！<br>
          <small>${currentQuiz.explanation}</small>
        </div>
      `;
    } else {
      sfx.wrong();
      resultArea.innerHTML = `
        <div class="quiz-result-msg wrong">
          ❌ 哎呀答錯囉！這題很常被整潔糾察扣分喔！<br>
          正確答案是：<strong>【${currentQuiz.options[currentQuiz.answerIndex]}】</strong><br>
          <small>${currentQuiz.explanation}</small>
        </div>
      `;
    }
  }

  if (el.startQuizBtn) {
    el.startQuizBtn.addEventListener('click', () => startQuizQuestion());
  }

  // ==========================================
  // 13. TAB 6: HISTORY & AWARDS
  // ==========================================

  function renderHistoryTable() {
    if (!el.historyTableBody) return;
    el.historyTableBody.innerHTML = '';

    if (state.history.length === 0) {
      el.historyTableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">
            尚未建立歷史紀錄，點選右上角「儲存今日驗收總成績」開始寫入！
          </td>
        </tr>
      `;
      return;
    }

    state.history.forEach((row, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${row.date}</strong></td>
        <td>${row.officer}</td>
        <td><span class="badge-tech">${row.ratio}</span></td>
        <td><strong style="color:var(--primary); font-family:var(--font-display); font-size:1.1rem;">${row.score}</strong></td>
        <td><span class="zone-status-badge passed">${row.rank}</span></td>
        <td style="max-width:320px; font-size:0.825rem; color:var(--text-muted);">${row.notes}</td>
        <td>
          <button class="btn btn-xs btn-ghost text-danger delete-history-btn" data-idx="${idx}" title="刪除本筆日誌">✕</button>
        </td>
      `;
      el.historyTableBody.appendChild(tr);
    });

    document.querySelectorAll('.delete-history-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        if (confirm('確定要刪除這筆歷史驗收日誌嗎？')) {
          sfx.click();
          state.history.splice(idx, 1);
          saveStorage(STORAGE_KEYS.HISTORY, state.history);
          renderHistoryTable();
        }
      });
    });
  }

  if (el.recordTodayLogBtn) {
    el.recordTodayLogBtn.addEventListener('click', () => {
      sfx.click();
      el.recordLogModal.classList.remove('hidden');
    });
  }

  if (el.saveRecordLogBtn) {
    el.saveRecordLogBtn.addEventListener('click', () => {
      sfx.success();
      const date = el.recordLogDate.value || new Date().toISOString().split('T')[0];
      const officer = el.recordLogOfficer.value.trim() || '一年仁班 衛生股長';
      const score = parseInt(el.recordLogScore.value, 10) || 98;
      const notes = el.recordLogNotes.value.trim() || '全區檢核通過，桌椅筆直，環境乾淨。';

      let completedZones = 0;
      state.zones.forEach(z => {
        if (z.verified || (z.items.length > 0 && z.items.every(i => i.done))) completedZones++;
      });
      const ratio = `${completedZones}/${state.zones.length}`;
      let rank = score >= 95 ? '特優' : score >= 85 ? '優等' : '甲等';

      state.history.unshift({ date, officer, ratio, score, rank, notes });
      saveStorage(STORAGE_KEYS.HISTORY, state.history);
      renderHistoryTable();
      el.recordLogModal.classList.add('hidden');
      confetti.shoot(50);
    });
  }

  if (el.exportDataJsonBtn) {
    el.exportDataJsonBtn.addEventListener('click', () => {
      sfx.click();
      const exportBundle = {
        school: '新北市私立智光高級商工職業學校',
        class: '一年仁班',
        exportDate: new Date().toISOString(),
        students: state.students,
        zones: state.zones,
        bulletin: state.bulletin,
        history: state.history
      };

      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportBundle, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `智光商工一仁_整潔打掃系統備份_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    });
  }

  // ==========================================
  // 14. CLEANING COUNTDOWN TIMER ENGINE
  // ==========================================

  function initTimerEvents() {
    updateTimerDisplays();

    // Mini timer controls
    if (el.miniTimerToggleBtn) {
      el.miniTimerToggleBtn.addEventListener('click', () => toggleTimer());
    }
    if (el.miniTimerResetBtn) {
      el.miniTimerResetBtn.addEventListener('click', () => resetTimer());
    }
    if (el.openTimerModalBtn) {
      el.openTimerModalBtn.addEventListener('click', () => {
        sfx.click();
        el.timerModal.classList.remove('hidden');
      });
    }

    // Giant Modal timer controls
    if (el.modalTimerToggleBtn) {
      el.modalTimerToggleBtn.addEventListener('click', () => toggleTimer());
    }
    if (el.modalTimerResetBtn) {
      el.modalTimerResetBtn.addEventListener('click', () => resetTimer());
    }
    if (el.closeTimerModalBtn) {
      el.closeTimerModalBtn.addEventListener('click', () => {
        el.timerModal.classList.add('hidden');
      });
    }
    if (el.modalBellSoundBtn) {
      el.modalBellSoundBtn.addEventListener('click', () => sfx.bellChime());
    }

    // Hero quick launch
    if (el.heroStartTimerBtn) {
      el.heroStartTimerBtn.addEventListener('click', () => {
        el.timerModal.classList.remove('hidden');
        if (!state.timerRunning) toggleTimer();
      });
    }

    // Mode preset buttons
    el.presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sfx.click();
        el.presetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const minutes = parseInt(btn.getAttribute('data-minutes'), 10) || 15;
        setTimerDuration(minutes);
      });
    });
  }

  function setTimerDuration(minutes) {
    pauseTimer();
    state.timerTotalSeconds = minutes * 60;
    state.timerCurrentSeconds = state.timerTotalSeconds;
    if (el.timerModeLabel) el.timerModeLabel.textContent = `${minutes}分鐘模式`;
    updateTimerDisplays();
  }

  function toggleTimer() {
    if (state.timerRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  }

  function startTimer() {
    state.timerRunning = true;
    sfx.click();
    updateTimerButtonUI(true);

    if (el.modalTimerStatusChip) {
      el.modalTimerStatusChip.textContent = '⏱️ 打掃倒數計時進行中';
      el.modalTimerStatusChip.style.color = 'var(--primary)';
    }

    if (state.timerInterval) clearInterval(state.timerInterval);
    state.timerInterval = setInterval(() => {
      if (state.timerCurrentSeconds > 0) {
        state.timerCurrentSeconds--;
        updateTimerDisplays();

        // 3-minute remaining bell chime warning
        if (state.timerCurrentSeconds === 180) {
          sfx.bellChime();
        }

        // Last 5 seconds tick
        if (state.timerCurrentSeconds <= 5 && state.timerCurrentSeconds > 0) {
          sfx.tick();
        }
      } else {
        // Timer Finished!
        pauseTimer();
        sfx.bellChime();
        confetti.shoot(100);
        if (el.modalTimerStatusChip) {
          el.modalTimerStatusChip.textContent = '🔔 打掃時間到！請全體至講台找衛生股長驗收！';
          el.modalTimerStatusChip.style.color = '#ef4444';
        }
        alert('🔔【打掃時間結束！】\n15分鐘清潔時間已到，請各組組長將掃具歸位，並至講台接受衛生股長查核驗收！');
      }
    }, 1000);
  }

  function pauseTimer() {
    state.timerRunning = false;
    if (state.timerInterval) clearInterval(state.timerInterval);
    updateTimerButtonUI(false);
    if (el.modalTimerStatusChip) {
      el.modalTimerStatusChip.textContent = '⏸️ 已暫停打掃計時';
      el.modalTimerStatusChip.style.color = 'var(--text-muted)';
    }
  }

  function resetTimer() {
    pauseTimer();
    sfx.click();
    state.timerCurrentSeconds = state.timerTotalSeconds;
    updateTimerDisplays();
    if (el.modalTimerStatusChip) {
      el.modalTimerStatusChip.textContent = '準備中';
      el.modalTimerStatusChip.style.color = 'var(--text-muted)';
    }
  }

  function updateTimerButtonUI(isRunning) {
    if (el.miniTimerBtnIcon) el.miniTimerBtnIcon.textContent = isRunning ? '⏸️' : '▶️';
    if (el.miniTimerBtnText) el.miniTimerBtnText.textContent = isRunning ? '暫停計時' : '開始計時';
    if (el.modalTimerPlayIcon) el.modalTimerPlayIcon.textContent = isRunning ? '⏸️' : '▶️';
    if (el.modalTimerPlayText) el.modalTimerPlayText.textContent = isRunning ? '暫停打掃倒數' : '開始打掃倒數';
  }

  function updateTimerDisplays() {
    const mins = Math.floor(state.timerCurrentSeconds / 60);
    const secs = state.timerCurrentSeconds % 60;
    const timeFormatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    if (el.miniTimerDisplay) el.miniTimerDisplay.textContent = timeFormatted;
    if (el.giantClockDisplay) el.giantClockDisplay.textContent = timeFormatted;

    // Progress bar fill percentage
    const fillPercent = state.timerTotalSeconds > 0 ? (state.timerCurrentSeconds / state.timerTotalSeconds) * 100 : 0;
    if (el.timerProgressFill) {
      el.timerProgressFill.style.width = `${fillPercent}%`;
      if (fillPercent < 20) {
        el.timerProgressFill.style.background = 'linear-gradient(90deg, #ef4444, #f59e0b)';
      } else {
        el.timerProgressFill.style.background = 'linear-gradient(90deg, #10b981, #059669)';
      }
    }
  }

  // ==========================================
  // 15. MODAL SYSTEM HELPERS
  // ==========================================

  function initModalEvents() {
    // Add student modal
    if (el.addNewStudentBtn) {
      el.addNewStudentBtn.addEventListener('click', () => {
        sfx.click();
        const nextSeat = state.students.length > 0 ? Math.max(...state.students.map(s => s.seat)) + 1 : 1;
        el.studentSeatInput.value = nextSeat;
        el.studentNameInput.value = '';
        el.studentModal.classList.remove('hidden');
      });
    }

    if (el.cancelStudentModalBtn) {
      el.cancelStudentModalBtn.addEventListener('click', () => el.studentModal.classList.add('hidden'));
    }
    if (el.closeStudentModalBtn) {
      el.closeStudentModalBtn.addEventListener('click', () => el.studentModal.classList.add('hidden'));
    }

    if (el.saveStudentModalBtn) {
      el.saveStudentModalBtn.addEventListener('click', () => {
        const seat = parseInt(el.studentSeatInput.value, 10);
        const name = el.studentNameInput.value.trim();
        if (!seat || !name) {
          alert('請完整填寫座號與姓名！');
          return;
        }
        if (state.students.some(s => s.seat === seat)) {
          alert(`座號 ${seat} 已經存在，請更換座號！`);
          return;
        }
        sfx.success();
        state.students.push({ seat, name });
        state.students.sort((a, b) => a.seat - b.seat);
        saveStorage(STORAGE_KEYS.STUDENTS, state.students);
        renderRoster();
        renderDashboardKPIs();
        el.studentModal.classList.add('hidden');
      });
    }

    // Record log modal close handlers
    if (el.closeRecordLogModalBtn) {
      el.closeRecordLogModalBtn.addEventListener('click', () => el.recordLogModal.classList.add('hidden'));
    }
    if (el.cancelRecordLogBtn) {
      el.cancelRecordLogBtn.addEventListener('click', () => el.recordLogModal.classList.add('hidden'));
    }

    // Dismiss modals when clicking backdrop
    window.addEventListener('click', e => {
      if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.add('hidden');
      }
    });

    // Escape key closes modals
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.add('hidden'));
      }
    });
  }

  // Run application on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
