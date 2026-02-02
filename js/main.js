document.addEventListener('DOMContentLoaded', () => {
    const drawBtn = document.getElementById('draw-btn');
    const resultArea = document.getElementById('result-area');
    const initialArea = document.getElementById('initial-area');
    const resultText = document.getElementById('result-text');
    const omikujiBox = document.querySelector('.omikuji-box');

    const fortunes = [
        "お金ひろう",
        "全部青信号で帰宅",
        "本命からチョコもらう",
        "右隣の人から褒められる",
        "モテモテの夢みる"
    ];

    drawBtn.addEventListener('click', () => {
        // Play click effect (visual)
        drawBtn.disabled = true;
        
        // Simple animation before result
        let count = 0;
        const shuffleInterval = setInterval(() => {
            resultText.style.opacity = 0.5;
            resultText.innerText = fortunes[Math.floor(Math.random() * fortunes.length)];
            count++;
            if (count > 10) {
                clearInterval(shuffleInterval);
                showResult();
            }
        }, 50);

        // UI toggling
        initialArea.classList.add('hidden');
        resultArea.classList.remove('hidden');
    });

    function showResult() {
        // Select final fortune
        const randomIndex = Math.floor(Math.random() * fortunes.length);
        const fortune = fortunes[randomIndex];

        // Display
        resultText.style.opacity = 1;
        resultText.innerText = fortune;

        // Visual effects for "Winning" feeling
        createConfetti();
        
        // Button reset cooldown
        setTimeout(() => {
            drawBtn.disabled = false;
            drawBtn.textContent = "もう一回引く";
        }, 1000);
    }

    function createConfetti() {
        const colors = ['#ff4081', '#ff80ab', '#ffeb3b', '#ffd700', '#00e676', '#2979ff'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Random properties
            const bg = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100 + '%';
            const animDuration = Math.random() * 2 + 1 + 's';
            const size = Math.random() * 10 + 5 + 'px';

            confetti.style.backgroundColor = bg;
            confetti.style.left = left;
            confetti.style.top = '-20px'; // Start from top of the box
            confetti.style.animationDuration = animDuration;
            confetti.style.width = size;
            confetti.style.height = size;
            
            // Shapes
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            }

            omikujiBox.appendChild(confetti);

            // Cleanup
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }
});
