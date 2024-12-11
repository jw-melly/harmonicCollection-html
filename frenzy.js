const glitchContainer = document.getElementById('glitch-container');
const overlay = document.getElementById('overlay');
const btn = document.getElementById('btn');

// 글리치 텍스트 생성
for (let i = 0; i < 100; i++) {  // 글자 수 조절
    const text = document.createElement('div');
    text.className = 'glitch-text';
    text.innerText = "Don't Stop";
    text.style.top = `${Math.random() * 100}%`;
    text.style.left = `${Math.random() * 100}%`;
    text.style.animationDelay = `${Math.random() * 0.5}s`;  // 애니메이션 딜레이
    glitchContainer.appendChild(text);
}

// 클릭 시 화면 끊김 효과 및 버튼 표시
glitchContainer.addEventListener('click', () => {
    glitchContainer.style.display = 'none';   // 글리치 텍스트 사라짐
    overlay.style.visibility = 'visible';     // 오버레이 보이기
    overlay.style.opacity = '1';              // 서서히 페이드 인
    btn.classList.add('show');                // 버튼 페이드 인
});

