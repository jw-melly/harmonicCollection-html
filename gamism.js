const character = document.getElementById("character");
const obstacleContainer = document.getElementById("obstacle-container");
const statusText = document.getElementById("status");

let isJumping = false;

// 장애물 개수 및 속도 설정
const obstacles = [];
const obstacleCount = 5;      // 총 장애물 개수
const obstacleSpeed = 10;      // 일반 장애물 속도
let bigObstacleSpeed = 40;    // 큰 장애물 속도

// 사용할 장애물 이미지 배열
const obstacleImages = [
    "pixelfile/obstacle1.png",  
    "pixelfile/obstacle2.png",
    "pixelfile/obstacle3.png",
    "pixelfile/obstacle4.png",
];

// 큰 장애물 이미지 설정
const bigObstacleImage = "pixelfile/obstacle5.png";  

// 장애물 생성 함수
function createObstacles() {
    const initialGap = 600;  // 장애물 간격 설정
    const containerWidth = obstacleContainer.offsetWidth;  // 게임 상자 너비 확인

    // **일반 장애물 생성**
    for (let i = 0; i < obstacleCount - 1; i++) {
        const obstacle = document.createElement("div");
        obstacle.classList.add("obstacle");

        const randomImage = obstacleImages[Math.floor(Math.random() * obstacleImages.length)];
        obstacle.style.backgroundImage = `url('${randomImage}')`;
        obstacle.style.width = "50px";
        obstacle.style.height = "50px";

        // 상자 밖에서 시작하도록 위치 설정
        obstacle.style.right = `${-100 - i * initialGap}px`;
        obstacle.style.backgroundSize = "cover";

        // 장애물 추가
        obstacleContainer.appendChild(obstacle);
        obstacles.push(obstacle);
    }

    // **큰 장애물 마지막 생성**
    const bigObstacle = document.createElement("div");
    bigObstacle.classList.add("big-obstacle");

    bigObstacle.style.backgroundImage = `url('${bigObstacleImage}')`;
    bigObstacle.style.width = "200px";
    bigObstacle.style.height = "200px";

    // 큰 장애물 상자 밖에서 시작
    bigObstacle.style.right = `${-4000 - (obstacleCount - 1) * initialGap}px`;  
    bigObstacle.style.backgroundSize = "cover";

    obstacleContainer.appendChild(bigObstacle);
    obstacles.push(bigObstacle);
}

// 점프 기능
document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && !isJumping) {
        jump();
    }
});

function jump() {
    if (isJumping) return;

    isJumping = true;
    character.style.bottom = "150px";  // 점프 높이

    setTimeout(() => {
        character.style.bottom = "0px";  // 다시 내려오기
        isJumping = false;
    }, 800);  // 점프 지속 시간
}

// 장애물 이동 및 충돌 감지
function moveObstacles() {
    const characterRect = character.getBoundingClientRect();  // 캐릭터 위치

    for (let i = 0; i < obstacles.length; i++) {
        let currentRight = parseInt(obstacles[i].style.right);

        // 큰 장애물 속도 계산
        const isBigObstacle = obstacles[i].classList.contains("big-obstacle");
        const speed = isBigObstacle ? bigObstacleSpeed : obstacleSpeed;

        obstacles[i].style.right = `${currentRight + speed}px`;

        // 장애물 초기화 (다시 등장)
        if (currentRight > obstacleContainer.offsetWidth + 200) {
            if (!isBigObstacle) {
                obstacles[i].style.right = "-100px";  
            }
        }

        // **충돌 감지 로직 수정**
        const obstacleRect = obstacles[i].getBoundingClientRect();

        if (
            characterRect.right > obstacleRect.left && 
            characterRect.left < obstacleRect.right &&
            characterRect.bottom > obstacleRect.top &&
            characterRect.top < obstacleRect.bottom
        ) {
            gameOver();
        }
    }
}

// 게임 종료 → 로컬 HTML 파일로 이동
function gameOver() {
    // 이동할 HTML 파일 경로 설정
    window.location.href = "outro.html";   // 같은 폴더 내의 HTML 파일로 이동
}

// 게임 시작
window.onload = () => {
    createObstacles();                 // 장애물 생성 즉시 실행
    gameInterval = setInterval(moveObstacles, 50);  // 이동 시작
};
