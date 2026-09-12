'use strict';

// ==========================================================================
// Data
// ==========================================================================

const TIER_META = {
  mudah: { label: 'Mudah', points: 50 },
  menengah: { label: 'Menengah', points: 75 },
  ahli: { label: 'Ahli', points: 100 },
};

const CATEGORY_META = {
  html: { label: 'HTML' },
  css: { label: 'CSS' },
  javascript: { label: 'JavaScript' },
  dom: { label: 'DOM' },
  full: { label: 'Pemrograman Web Utuh' },
};

// Each real category has exactly 4 mudah, 4 menengah, 2 ahli questions.
const QUESTION_BANKS = {
  html: {
    mudah: [
      {
        question: 'Tag HTML mana yang digunakan untuk membuat judul (heading) terbesar?',
        options: ['<h1>', '<head>', '<title>', '<big>'],
        correctIndex: 0,
      },
      {
        question: 'Tag apa yang digunakan untuk membuat sebuah paragraf?',
        options: ['<para>', '<p>', '<text>', '<pg>'],
        correctIndex: 1,
      },
      {
        question: 'Atribut apa pada tag <a> yang menentukan alamat tujuan tautan?',
        options: ['src', 'link', 'href', 'target'],
        correctIndex: 2,
      },
      {
        question: 'Tag apa yang digunakan untuk menyisipkan gambar ke halaman?',
        options: ['<image>', '<img>', '<pic>', '<src>'],
        correctIndex: 1,
      },
    ],
    menengah: [
      {
        question: 'Elemen semantik mana yang paling tepat untuk membungkus menu navigasi utama?',
        options: ['<div>', '<nav>', '<menu-bar>', '<header-nav>'],
        correctIndex: 1,
      },
      {
        question: 'Apa fungsi utama atribut "alt" pada tag <img>?',
        options: [
          'Mengatur ukuran gambar',
          'Memberi teks alternatif untuk aksesibilitas dan saat gambar gagal dimuat',
          'Menentukan format file gambar',
          'Menambahkan animasi pada gambar',
        ],
        correctIndex: 1,
      },
      {
        question: 'Elemen apa yang digunakan untuk membuat dropdown pilihan pada form?',
        options: ['<dropdown>', '<input type="list">', '<select>', '<options>'],
        correctIndex: 2,
      },
      {
        question: 'Apa efek dari atribut "defer" pada tag <script>?',
        options: [
          'Script dijalankan sebelum HTML selesai diparsing',
          'Script dihapus otomatis setelah dijalankan',
          'Script dijalankan setelah HTML selesai diparsing, tanpa memblokir rendering',
          'Script hanya berjalan di mobile',
        ],
        correctIndex: 2,
      },
    ],
    ahli: [
      {
        question: 'Secara semantik, apa perbedaan utama antara <section> dan <div>?',
        options: [
          '<section> hanya bisa dipakai sekali per halaman',
          '<section> merepresentasikan bagian konten yang bermakna tematik, sedangkan <div> tidak punya makna semantik',
          '<div> lebih cepat dirender browser',
          'Tidak ada perbedaan, keduanya identik',
        ],
        correctIndex: 1,
      },
      {
        question: 'Apa tujuan utama dari Shadow DOM pada Web Components?',
        options: [
          'Mempercepat koneksi jaringan',
          'Mengenkapsulasi struktur dan style elemen agar tidak bentrok dengan CSS/DOM global',
          'Mengganti fungsi JavaScript sepenuhnya',
          'Menyimpan data di localStorage secara otomatis',
        ],
        correctIndex: 1,
      },
    ],
  },

  css: {
    mudah: [
      {
        question: 'Properti CSS apa yang digunakan untuk mengubah warna teks?',
        options: ['text-color', 'font-color', 'color', 'foreground'],
        correctIndex: 2,
      },
      {
        question: 'Properti apa yang mengatur ukuran huruf?',
        options: ['font-size', 'text-size', 'size', 'font-weight'],
        correctIndex: 0,
      },
      {
        question: 'Selector CSS mana yang digunakan untuk memilih elemen berdasarkan id?',
        options: ['.id', '#id', '*id', ':id'],
        correctIndex: 1,
      },
      {
        question: 'Properti apa yang mengatur jarak antara konten dan border suatu elemen?',
        options: ['margin', 'padding', 'gap', 'spacing'],
        correctIndex: 1,
      },
    ],
    menengah: [
      {
        question: 'Nilai display apa yang mengubah elemen menjadi flex container?',
        options: ['display: block', 'display: flex', 'display: inline', 'display: grid-flex'],
        correctIndex: 1,
      },
      {
        question: 'Apa fungsi properti z-index?',
        options: [
          'Mengatur zoom halaman',
          'Mengatur urutan tumpukan (stacking order) elemen yang saling tumpang tindih',
          'Mengatur ukuran font secara relatif',
          'Mengatur jumlah kolom pada grid',
        ],
        correctIndex: 1,
      },
      {
        question: 'Properti display apa yang digunakan untuk membuat layout grid dua dimensi?',
        options: ['display: flex', 'display: table', 'display: grid', 'display: columns'],
        correctIndex: 2,
      },
      {
        question: 'Pseudo-class apa yang digunakan untuk memberi gaya saat elemen di-hover kursor?',
        options: [':active', ':focus', ':hover', ':visited'],
        correctIndex: 2,
      },
    ],
    ahli: [
      {
        question: 'Dalam perhitungan specificity CSS, urutan prioritas dari yang tertinggi adalah?',
        options: [
          'Elemen > class > id > inline style',
          'Inline style > id > class > elemen',
          'Class > id > inline style > elemen',
          'Id > inline style > elemen > class',
        ],
        correctIndex: 1,
      },
      {
        question: 'Bagaimana cara mendefinisikan dan menggunakan custom property (variabel) di CSS?',
        options: [
          'Didefinisikan dengan @var nama: nilai; lalu dipanggil dengan get(nama)',
          'Didefinisikan dengan --nama: nilai; lalu dipanggil dengan var(--nama)',
          'Didefinisikan dengan $nama: nilai; lalu dipanggil dengan use($nama)',
          'CSS tidak mendukung variabel kustom',
        ],
        correctIndex: 1,
      },
    ],
  },

  javascript: {
    mudah: [
      {
        question: 'Kata kunci mana yang digunakan untuk mendeklarasikan variabel yang nilainya bisa diubah?',
        options: ['const', 'let', 'final', 'var-only'],
        correctIndex: 1,
      },
      {
        question: 'Operator mana yang membandingkan nilai sekaligus tipe data (strict equality)?',
        options: ['==', '===', '=', '!='],
        correctIndex: 1,
      },
      {
        question: 'Fungsi bawaan apa yang digunakan untuk menampilkan output ke console browser?',
        options: ['print()', 'console.log()', 'log.console()', 'echo()'],
        correctIndex: 1,
      },
      {
        question: 'Tipe data apa yang merepresentasikan nilai true atau false?',
        options: ['string', 'number', 'boolean', 'null'],
        correctIndex: 2,
      },
    ],
    menengah: [
      {
        question: 'Method array apa yang menambahkan satu elemen baru di akhir array?',
        options: ['pop()', 'shift()', 'push()', 'unshift()'],
        correctIndex: 2,
      },
      {
        question: 'Apa yang dimaksud dengan callback function?',
        options: [
          'Fungsi yang hanya bisa dipanggil sekali',
          'Fungsi yang diteruskan sebagai argumen ke fungsi lain dan dijalankan nanti',
          'Fungsi bawaan browser untuk animasi',
          'Fungsi yang otomatis berjalan saat error terjadi',
        ],
        correctIndex: 1,
      },
      {
        question: 'Sintaks mana yang benar untuk menulis arrow function?',
        options: ['function => (x) {}', '(x) => {}', 'x -> {}', 'arrow(x) {}'],
        correctIndex: 1,
      },
      {
        question: 'Apa fungsi dari JSON.stringify()?',
        options: [
          'Mengubah string JSON menjadi objek JavaScript',
          'Mengubah objek JavaScript menjadi string JSON',
          'Memvalidasi format JSON',
          'Menghapus data dari objek JSON',
        ],
        correctIndex: 1,
      },
    ],
    ahli: [
      {
        question: 'Apa yang dimaksud dengan closure di JavaScript?',
        options: [
          'Fungsi yang otomatis terhapus dari memori setelah dijalankan',
          'Fungsi yang "mengingat" scope leksikal tempat ia dibuat, meski dijalankan di luar scope tersebut',
          'Metode untuk menutup koneksi jaringan',
          'Cara untuk mengunci variabel agar tidak bisa diakses sama sekali',
        ],
        correctIndex: 1,
      },
      {
        question: 'Apa perbedaan utama antara Promise.all() dan Promise.race()?',
        options: [
          'Promise.all menunggu semua promise selesai, Promise.race mengambil hasil promise yang paling cepat selesai',
          'Keduanya identik, hanya beda nama',
          'Promise.race menunggu semua promise gagal terlebih dahulu',
          'Promise.all hanya bisa menerima satu promise',
        ],
        correctIndex: 0,
      },
    ],
  },

  dom: {
    mudah: [
      {
        question: 'Method mana yang digunakan untuk memilih elemen berdasarkan id-nya?',
        options: ['document.getElementById()', 'document.getElement()', 'document.selectId()', 'document.findById()'],
        correctIndex: 0,
      },
      {
        question: 'Properti mana yang digunakan untuk mengubah teks di dalam elemen tanpa mem-parsing HTML?',
        options: ['innerHTML', 'textContent', 'value', 'innerText only'],
        correctIndex: 1,
      },
      {
        question: 'Method apa yang digunakan untuk menambahkan elemen baru sebagai anak dari elemen lain?',
        options: ['appendChild()', 'addChild()', 'insertNode()', 'createChild()'],
        correctIndex: 0,
      },
      {
        question: 'Event apa yang terpicu ketika sebuah tombol diklik?',
        options: ['change', 'submit', 'click', 'load'],
        correctIndex: 2,
      },
    ],
    menengah: [
      {
        question: 'Method modern apa yang digunakan untuk memilih satu elemen menggunakan CSS selector?',
        options: ['document.querySelector()', 'document.getElementByClass()', 'document.selectOne()', 'document.find()'],
        correctIndex: 0,
      },
      {
        question: 'Parameter opsi ketiga pada addEventListener() umumnya digunakan untuk?',
        options: [
          'Menentukan nama event',
          'Mengatur opsi seperti capture atau { once: true }',
          'Menghapus listener secara otomatis setelah 1 detik',
          'Menentukan elemen target lain',
        ],
        correctIndex: 1,
      },
      {
        question: 'Bagaimana cara menghapus sebuah elemen langsung dari DOM?',
        options: ['element.delete()', 'element.remove()', 'element.destroy()', 'document.removeElement(element)'],
        correctIndex: 1,
      },
      {
        question: 'Apa yang dimaksud dengan "event bubbling"?',
        options: [
          'Event yang hanya berlaku di elemen induk',
          'Event yang menyebar dari elemen target menuju elemen-elemen induknya secara berurutan',
          'Event yang menghapus semua listener lain',
          'Event yang hanya berjalan sekali dalam satu sesi',
        ],
        correctIndex: 1,
      },
    ],
    ahli: [
      {
        question: 'Apa keuntungan utama menggunakan event delegation dibanding memasang listener di tiap elemen anak?',
        options: [
          'Kode menjadi lebih lambat namun lebih aman',
          'Satu listener di elemen induk bisa menangani elemen anak yang dibuat secara dinamis, lebih hemat memori',
          'Event delegation hanya berlaku untuk elemen <div>',
          'Tidak ada keuntungan nyata',
        ],
        correctIndex: 1,
      },
      {
        question: 'Dari sisi keamanan, apa perbedaan penting antara innerHTML dan textContent?',
        options: [
          'innerHTML mem-parsing string sebagai HTML sehingga berisiko XSS, textContent memperlakukan konten sebagai teks murni',
          'textContent lebih rentan terhadap serangan XSS dibanding innerHTML',
          'Keduanya sama-sama aman digunakan untuk data dari pengguna',
          'innerHTML tidak bisa digunakan untuk menyisipkan teks sama sekali',
        ],
        correctIndex: 0,
      },
    ],
  },
};

const REAL_CATEGORIES = ['html', 'css', 'javascript', 'dom'];
const TOTAL_QUESTIONS = 10;
const TIER_ORDER = ['mudah', 'menengah', 'ahli'];
const TIER_COUNTS = { mudah: 4, menengah: 4, ahli: 2 };
const TIME_PER_QUESTION = 15;
const TIMER_CIRCUMFERENCE = 106.8;
const RECORDS_KEY = 'kilaskode_records';
const THEME_KEY = 'kilaskode_theme';

// ==========================================================================
// State
// ==========================================================================

const state = {
  categoryKey: null,
  questions: [],
  answers: [],
  currentIndex: 0,
  timerId: null,
  timeLeft: TIME_PER_QUESTION,
};

// ==========================================================================
// DOM references
// ==========================================================================

const startScreen = document.getElementById('startScreen');
const quizScreen = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');
const recordsScreen = document.getElementById('recordsScreen');

const categoryGrid = document.getElementById('categoryGrid');
const viewRecordsFromStartBtn = document.getElementById('viewRecordsFromStartBtn');

const themeToggle = document.getElementById('themeToggle');

const quitQuizBtn = document.getElementById('quitQuizBtn');
const timerEl = document.getElementById('timer');
const timerFill = document.getElementById('timerFill');
const timerNum = document.getElementById('timerNum');
const difficultyBadge = document.getElementById('difficultyBadge');
const questionCount = document.getElementById('questionCount');
const pipsList = document.getElementById('pips');
const questionText = document.getElementById('questionText');
const optionsList = document.getElementById('optionsList');
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');

const resultCategory = document.getElementById('resultCategory');
const resultScore = document.getElementById('resultScore');
const resultPoints = document.getElementById('resultPoints');
const resultMessage = document.getElementById('resultMessage');
const resultBadge = document.getElementById('resultBadge');
const restartBtn = document.getElementById('restartBtn');
const changeQuizBtn = document.getElementById('changeQuizBtn');
const viewRecordsFromResultBtn = document.getElementById('viewRecordsFromResultBtn');

const recordsList = document.getElementById('recordsList');
const backFromRecordsBtn = document.getElementById('backFromRecordsBtn');

// ==========================================================================
// Utilities
// ==========================================================================

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function showScreen(screen) {
  [startScreen, quizScreen, resultScreen, recordsScreen].forEach((el) => {
    el.hidden = el !== screen;
  });
}

function getRecords() {
  try {
    const stored = localStorage.getItem(RECORDS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
}

function saveRecord(record) {
  const records = getRecords();
  records.unshift(record);
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records.slice(0, 50)));
}

function getBestForCategory(categoryKey) {
  const records = getRecords().filter((r) => r.categoryKey === categoryKey);
  if (records.length === 0) return null;
  return records.reduce((best, r) => (r.correct > best.correct ? r : best), records[0]);
}

// ==========================================================================
// Theme toggle
// ==========================================================================

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  themeToggle.querySelector('.theme-toggle__icon').textContent =
    theme === 'light' ? '☀' : '☾';
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(saved);
}

themeToggle.addEventListener('click', () => {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const next = isLight ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
});

// ==========================================================================
// Start screen: category selection
// ==========================================================================

function initStartScreen() {
  Object.keys(CATEGORY_META).forEach((key) => {
    const best = getBestForCategory(key);
    const scoreEl = categoryGrid.querySelector(`[data-score-for="${key}"]`);
    if (best) {
      scoreEl.textContent = `Rekor: ${best.correct}/${best.total} benar`;
      scoreEl.hidden = false;
    } else {
      scoreEl.hidden = true;
    }
  });
}

categoryGrid.addEventListener('click', (event) => {
  const card = event.target.closest('.category-card');
  if (!card) return;
  startQuiz(card.dataset.category);
});

viewRecordsFromStartBtn.addEventListener('click', () => openRecords(startScreen));
viewRecordsFromResultBtn.addEventListener('click', () => openRecords(resultScreen));
backFromRecordsBtn.addEventListener('click', () => {
  showScreen(startScreen);
  initStartScreen();
});

quitQuizBtn.addEventListener('click', () => {
  const confirmed = window.confirm('Keluar dari kuis sekarang? Progres tidak akan disimpan sebagai rekor.');
  if (!confirmed) return;
  quitQuiz();
});

restartBtn.addEventListener('click', () => startQuiz(state.categoryKey));
changeQuizBtn.addEventListener('click', () => {
  showScreen(startScreen);
  initStartScreen();
});

// ==========================================================================
// Timer (per soal, reset tiap pindah soal, tidak jalan untuk soal yang
// sudah dijawab)
// ==========================================================================

function startTimer() {
  stopTimer();
  state.timeLeft = TIME_PER_QUESTION;
  timerEl.classList.remove('is-low', 'is-done');
  updateTimerDisplay();

  state.timerId = setInterval(() => {
    state.timeLeft -= 1;
    updateTimerDisplay();

    if (state.timeLeft <= 4) {
      timerEl.classList.add('is-low');
    }

    if (state.timeLeft <= 0) {
      stopTimer();
      if (!state.answers[state.currentIndex]) {
        handleAnswer(-1, true); // waktu habis tanpa jawaban -> dihitung salah, lalu auto-lanjut
      }
    }
  }, 1000);
}

function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function updateTimerDisplay() {
  const clamped = Math.max(state.timeLeft, 0);
  timerNum.textContent = String(clamped);
  const ratio = clamped / TIME_PER_QUESTION;
  timerFill.style.strokeDashoffset = String(TIMER_CIRCUMFERENCE * (1 - ratio));
}

function showTimerAsDone() {
  stopTimer();
  timerEl.classList.remove('is-low');
  timerEl.classList.add('is-done');
  timerNum.textContent = '–';
  timerFill.style.strokeDashoffset = '0';
}

// ==========================================================================
// Building a question set
// ==========================================================================

function buildQuestionSet(categoryKey) {
  const tierPools = { mudah: [], menengah: [], ahli: [] };

  if (categoryKey === 'full') {
    REAL_CATEGORIES.forEach((cat) => {
      TIER_ORDER.forEach((tier) => {
        QUESTION_BANKS[cat][tier].forEach((q) => {
          tierPools[tier].push({ ...q, sourceCategory: cat });
        });
      });
    });
  } else {
    TIER_ORDER.forEach((tier) => {
      QUESTION_BANKS[categoryKey][tier].forEach((q) => {
        tierPools[tier].push({ ...q, sourceCategory: categoryKey });
      });
    });
  }

  const finalQuestions = [];

  TIER_ORDER.forEach((tier) => {
    const picked = shuffle(tierPools[tier]).slice(0, TIER_COUNTS[tier]);
    picked.forEach((q) => {
      const options = q.options.map((text, index) => ({
        text,
        isCorrect: index === q.correctIndex,
      }));
      finalQuestions.push({
        question: q.question,
        options: shuffle(options),
        tier,
        points: TIER_META[tier].points,
      });
    });
  });

  return finalQuestions;
}

// ==========================================================================
// Quiz flow
// ==========================================================================

function startQuiz(categoryKey) {
  state.categoryKey = categoryKey;
  state.questions = buildQuestionSet(categoryKey);
  state.answers = new Array(state.questions.length).fill(null);
  state.currentIndex = 0;

  renderPips();
  showScreen(quizScreen);
  renderQuestion();
}

function renderPips() {
  pipsList.replaceChildren();
  state.questions.forEach(() => {
    const pip = document.createElement('li');
    pip.className = 'pip';
    pipsList.appendChild(pip);
  });
  updatePips();
}

function updatePips() {
  const pips = pipsList.querySelectorAll('.pip');
  pips.forEach((pip, index) => {
    pip.classList.remove('is-current', 'is-correct', 'is-incorrect');
    const answer = state.answers[index];
    if (answer) {
      pip.classList.add(answer.isCorrect ? 'is-correct' : 'is-incorrect');
    }
    if (index === state.currentIndex) {
      pip.classList.add('is-current');
    }
  });
}

function renderQuestion() {
  const current = state.questions[state.currentIndex];
  const existingAnswer = state.answers[state.currentIndex];

  difficultyBadge.textContent = `${TIER_META[current.tier].label} · ${current.points} poin`;
  difficultyBadge.className = `difficulty-badge tier-${current.tier}`;

  questionCount.textContent = `Soal ${state.currentIndex + 1} dari ${state.questions.length}`;
  questionText.textContent = current.question;

  optionsList.replaceChildren();

  current.options.forEach((option, index) => {
    const letter = String.fromCharCode(65 + index);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'option';
    button.dataset.index = String(index);

    const letterSpan = document.createElement('span');
    letterSpan.className = 'option__letter';
    letterSpan.textContent = letter;

    const textSpan = document.createElement('span');
    textSpan.className = 'option__text';
    textSpan.textContent = option.text;

    button.append(letterSpan, textSpan);
    optionsList.appendChild(button);
  });

  if (existingAnswer) {
    lockOptions(existingAnswer.selectedIndex);
    showTimerAsDone();
  } else {
    startTimer();
  }

  backBtn.disabled = state.currentIndex === 0;
  nextBtn.disabled = !existingAnswer;
  nextBtn.textContent = state.currentIndex === state.questions.length - 1 ? 'Selesai' : 'Lanjut';

  updatePips();
}

// Event delegation: one listener on the container handles all option clicks.
optionsList.addEventListener('click', (event) => {
  const button = event.target.closest('.option');
  if (!button) return;
  if (state.answers[state.currentIndex]) return; // already answered

  const selectedIndex = Number(button.dataset.index);
  handleAnswer(selectedIndex);
});

function handleAnswer(selectedIndex, fromTimeout = false) {
  stopTimer();
  const current = state.questions[state.currentIndex];
  const correctIndex = current.options.findIndex((o) => o.isCorrect);
  const isCorrect = selectedIndex === correctIndex;

  state.answers[state.currentIndex] = { selectedIndex, isCorrect, timedOut: fromTimeout };

  lockOptions(selectedIndex);
  updatePips();

  nextBtn.disabled = false;

  if (fromTimeout) {
    // Beri jeda sebentar supaya warna jawaban benar/salah sempat terlihat,
    // lalu otomatis lanjut ke soal berikutnya (atau selesaikan kuis).
    setTimeout(advanceAfterTimeout, 1100);
  }
}

function advanceAfterTimeout() {
  // Guard: batal auto-lanjut kalau user sudah pindah layar/soal secara manual.
  if (quizScreen.hidden) return;
  if (!state.answers[state.currentIndex]) return;

  if (state.currentIndex === state.questions.length - 1) {
    finishQuiz();
  } else {
    state.currentIndex += 1;
    renderQuestion();
  }
}

function lockOptions(selectedIndex) {
  const current = state.questions[state.currentIndex];
  const correctIndex = current.options.findIndex((o) => o.isCorrect);
  const buttons = optionsList.querySelectorAll('.option');

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === correctIndex) {
      button.classList.add('is-correct');
    } else if (index === selectedIndex) {
      button.classList.add('is-incorrect');
    } else {
      button.classList.add('is-dimmed');
    }
  });
}

backBtn.addEventListener('click', () => {
  if (state.currentIndex === 0) return;
  state.currentIndex -= 1;
  renderQuestion();
});

nextBtn.addEventListener('click', () => {
  if (!state.answers[state.currentIndex]) return;

  if (state.currentIndex === state.questions.length - 1) {
    finishQuiz();
  } else {
    state.currentIndex += 1;
    renderQuestion();
  }
});

function quitQuiz() {
  stopTimer();
  state.categoryKey = null;
  state.questions = [];
  state.answers = [];
  state.currentIndex = 0;

  showScreen(startScreen);
  initStartScreen();
}

// ==========================================================================
// Result screen
// ==========================================================================

function finishQuiz() {
  stopTimer();
  let total = 0;
  let correct = 0;
  let earnedPoints = 0;
  let maxPoints = 0;

  state.questions.forEach((q, index) => {
    const answer = state.answers[index];
    if (answer && answer.timedOut) return; // soal timeout: tidak dihitung sama sekali

    total += 1;
    maxPoints += q.points;
    if (answer && answer.isCorrect) {
      correct += 1;
      earnedPoints += q.points;
    }
  });

  const previousBest = getBestForCategory(state.categoryKey);
  const isNewBest = !previousBest || correct > previousBest.correct;

  const record = {
    categoryKey: state.categoryKey,
    categoryLabel: CATEGORY_META[state.categoryKey].label,
    correct,
    total,
    earnedPoints,
    maxPoints,
    date: new Date().toISOString(),
  };
  saveRecord(record);

  resultCategory.textContent = CATEGORY_META[state.categoryKey].label;
  resultScore.textContent = `${correct}/${total}`;
  resultPoints.textContent = `${earnedPoints} dari ${maxPoints} poin`;
  resultMessage.textContent = getResultMessage(correct, total);
  resultBadge.hidden = !isNewBest;

  showScreen(resultScreen);
}

function getResultMessage(correct, total) {
  const ratio = correct / total;
  if (ratio === 1) return 'Sempurna! Semua jawabanmu tepat.';
  if (ratio >= 0.8) return 'Hampir sempurna, pemahamanmu solid.';
  if (ratio >= 0.5) return 'Lumayan! Masih ada ruang untuk belajar lagi.';
  return 'Terus berlatih, kamu akan lebih baik lain kali.';
}

// ==========================================================================
// Records screen
// ==========================================================================

function openRecords(previousScreen) {
  renderRecords();
  showScreen(recordsScreen);
}

function renderRecords() {
  const records = getRecords();
  recordsList.replaceChildren();

  if (records.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'records-empty';
    empty.textContent = 'Belum ada rekor. Yuk mulai kuis pertamamu!';
    recordsList.appendChild(empty);
    return;
  }

  records.forEach((record) => {
    const item = document.createElement('div');
    item.className = 'record-item';

    const main = document.createElement('div');
    main.className = 'record-item__main';

    const category = document.createElement('span');
    category.className = 'record-item__category';
    category.textContent = record.categoryLabel;

    const date = document.createElement('span');
    date.className = 'record-item__date';
    date.textContent = formatDate(record.date);

    main.append(category, date);

    const stats = document.createElement('div');
    stats.className = 'record-item__stats';

    const score = document.createElement('span');
    score.className = 'record-item__score';
    score.textContent = `${record.correct}/${record.total}`;

    const points = document.createElement('span');
    points.className = 'record-item__points';
    points.textContent = `${record.earnedPoints} poin`;

    stats.append(score, points);

    item.append(main, stats);
    recordsList.appendChild(item);
  });
}

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// ==========================================================================
// Init
// ==========================================================================

initTheme();
initStartScreen();