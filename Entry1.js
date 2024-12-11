const randomImages = Array.from(document.getElementsByClassName('random-image'));
    const extraImages = Array.from(document.getElementsByClassName('extra-image'));

    function showRandomImage(image) {
      const scrollY = window.scrollY;

      const randomX = Math.floor(Math.random() * window.innerWidth);
      const randomY = scrollY + Math.floor(Math.random() * window.innerHeight);

      image.style.left = `${randomX}px`;
      image.style.top = `${randomY}px`;
      image.style.opacity = 1;

      setTimeout(() => {
        image.style.opacity = 0;
      }, 1000);
    }

    function showImagesRandomly() {
      randomImages.forEach(image => {
        setTimeout(() => {
          showRandomImage(image);
        }, Math.random() * 2000);
      });
    }

    // 랜덤 이미지 클릭 시 추가 이미지 중 하나만 랜덤으로 보여줌
    randomImages.forEach(image => {
      image.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * extraImages.length);
        const extraImage = extraImages[randomIndex];

        const scrollY = window.scrollY;
        const randomX = Math.floor(Math.random() * window.innerWidth);
        const randomY = scrollY + Math.floor(Math.random() * window.innerHeight);

        extraImage.style.left = `${randomX}px`;
        extraImage.style.top = `${randomY}px`;
        extraImage.style.display = 'block';
        extraImage.style.opacity = 1;

        setTimeout(() => {
          extraImage.style.opacity = 0;
          extraImage.style.display = 'none';
        }, 1500);
      });
    });

    setInterval(showImagesRandomly, 2000);