document.addEventListener('DOMContentLoaded', function (event) {
    const slider = document.querySelector('.slider');
    const sliderItems = document.querySelectorAll('.slider-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const progress = document.querySelectorAll('.progress');
    let slideWidth = sliderItems[0].clientWidth;
    let currentIndex = 0;
    let amountImg = 1;
    let touchStartX;
    let intervalId;

    function changeIndicator(translateX) {
        progress.forEach((element) => (element.style.width = '0'));
        if (translateX === -2 * slideWidth) {
            setProgress(progress[2]);
        } else if (translateX === -slideWidth) {
            setProgress(progress[1]);
        } else {
            setProgress(progress[0]);
        }
    }

    function prevSliderMove() {
        progress.forEach((element) => (element.style.width = '0'));
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = sliderItems.length - amountImg;
            slider.style.transform = `translateX(${
                -slideWidth * sliderItems.length
            }px)`;
            setTimeout(() => {
                slider.style.transition = 'transform 0.5s ease-in-out';
                currentIndex = sliderItems.length - amountImg;
                updateSlider();
            }, 0);
        } else {
            updateSlider();
        }
    }

    function nextSliderMove() {
        progress.forEach((element) => (element.style.width = '0'));
        currentIndex++;
        if (currentIndex >= sliderItems.length - (amountImg - 1)) {
            currentIndex = amountImg === 1 ? 0 : sliderItems.length - amountImg;
            slider.style.transform = `translateX(${slideWidth}px)`;
            setTimeout(() => {
                slider.style.transition = 'transform 0.5s ease-in-out';
                currentIndex = 0;
                updateSlider();
            }, 0);
        } else {
            updateSlider();
        }
    }

    prevBtn.addEventListener('click', () => {
        prevSliderMove();
    });

    nextBtn.addEventListener('click', () => {
        nextSliderMove();
    });

    function updateSlider() {
        slideWidth = sliderItems[0].clientWidth;
        const translateX = -currentIndex * slideWidth;
        slider.style.transform = `translateX(${translateX}px)`;
        changeIndicator(translateX);
        slider.style.transition = 'transform 0.5s ease-in-out';
    }

    function setProgress(element) {
        clearInterval(intervalId);

        intervalId = setInterval(() => {
            const currentWidth = parseInt(element.style.width);
            if (currentWidth === 100) {
                nextSliderMove();
            } else {
                element.style.width = `${currentWidth + 10}%`;
            }
        }, 500);
    }

    setProgress(progress[0]);

    sliderItems.forEach((item, index) => {
        item.addEventListener('mouseover', () => {
            clearInterval(intervalId);
        });

        item.addEventListener('mouseout', () => {
            setProgress(progress[index]);
        });

        item.addEventListener('mousedown', () => {
            clearInterval(intervalId);
        });

        item.addEventListener('mouseup', () => {
            setProgress(progress[index]);
        });

        item.addEventListener('touchstart', (e) => {
            clearInterval(intervalId);
            touchStartX = e.touches[0].clientX;
        });
        item.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const deltaX =touchEndX-touchStartX;;
            if (deltaX > 0) {
                prevSliderMove();
            } else if (deltaX < 0) {
                nextSliderMove();
            } else {
                setProgress(progress[index]);
            }
        });
    });
});
