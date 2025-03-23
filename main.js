const toTop = document.querySelectorAll('.toTop');
const rumput = document.querySelectorAll('.grass');
const tikus = document.querySelectorAll('.mole');
const number = document.querySelector('.score');
const startButton = document.querySelector('.start');
const alertBox = document.querySelector('.alert');
const closeButton = document.querySelector('.close');
const scoreTotal = document.querySelector('.scoreTotal');
const btnPlay = document.querySelector('.btnPlay');

let gameBerjalan = false;
let waktu = 30;
const soundtrack = new Audio('./asset/soundtrack.mp3');
soundtrack.loop = true; // Musik loop selama main

// Fungsi untuk memunculkan tikus secara acak
function acakTikus() {
  const randomTikus = tikus[Math.floor(Math.random() * tikus.length)];
  randomTikus.parentElement.classList.add('atas');

  setTimeout(() => {
    randomTikus.parentElement.classList.remove('atas');
    if (waktu > 0 && gameBerjalan) acakTikus(); // Lanjut acak jika waktu masih ada
  }, Math.random() * 1500 + 500);
}

// Fungsi skor dengan anti-spam klik
function score() {
  tikus.forEach((x) => {
    x.addEventListener('click', (e) => {
      if (!e.target.classList.contains('kena')) {
        number.innerHTML++;
        e.target.classList.add('kena'); // Mencegah klik ganda
        new Audio('./asset/hitt.mp3').play(); // Suara hit
        setTimeout(() => e.target.classList.remove('kena'), 500); // Reset klik setelah 0.5 detik
      }
    });
  });
}

// Fungsi Timer Game
function play() {
  const timer = setInterval(() => {
    waktu--;
    startButton.innerHTML = `Waktu: ${waktu}s`;

    if (waktu <= 0) {
      clearInterval(timer);
      gameBerjalan = false;
      startButton.innerHTML = 'Start Lagi!';
      alertBox.style.display = 'block';
      scoreTotal.innerHTML = number.innerHTML;
      soundtrack.pause(); // Stop musik
      new Audio('./asset/negative_beeps-6008.mp3').play(); // Suara game over
    }
  }, 1000);
}

// Fungsi mulai game
function startGame() {
  if (gameBerjalan) return; // Cegah klik start berkali-kali
  gameBerjalan = true;
  number.innerHTML = 0;
  waktu = 30;
  soundtrack.currentTime = 0; // Reset musik dari awal
  soundtrack.play();

  acakTikus();
  score();
  play();
}

// Tombol Start Game
startButton.addEventListener('click', startGame);

// Tombol Play Ulang di Alert
btnPlay.addEventListener('click', () => {
  alertBox.style.display = 'none';
  startGame();
});

// Tombol Tutup Alert
closeButton.addEventListener('click', () => {
  alertBox.style.display = 'none';
});
