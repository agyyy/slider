'use strict';

{
  const images = [
    'img/pic00.png',
    'img/pic01.png',
    'img/pic02.png',
    'img/pic03.png',
    'img/pic04.png',
    'img/pic05.png',
    'img/pic06.png',
    'img/pic07.png',
  ];

  let currentIndex = 0;

  const mainImage = document.getElementById('main');
  mainImage.src = images[currentIndex];

  images.forEach((image, index) => {
    const img = document.createElement('img');
    img.src = image

    const li = document.createElement('li');
    li.appendChild(img);

    if (index === currentIndex) {
      li.classList.add('current');
    }

    li.addEventListener('click', () => {
      mainImage.src = image;
      const thumbnails = document.querySelectorAll('.thumbnails > li');
      thumbnails[currentIndex].classList.remove('current');
      currentIndex = index;
      thumbnails[currentIndex].classList.add('current');//li各要素にクリックイベントが生成されていて、例えばimg５のliをクリックしたときは、mainImageは５の画像になるし、５のクリックイベント内での最初のcurrentIndexは4で、最終的には5になる。要するに５のクリックイベントにはすでに５の画像とcurrentIndex=4とindex=5が渡されている。
    })

    document.querySelector('.thumbnails').appendChild(li);
  });

  const next = document.getElementById('next');
  next.addEventListener('click', () => {
    let target = currentIndex + 1
    console.log(target);
    if (target === images.length) {//images.length=8
      target = 0;
    }
    console.log(target);
    document.querySelectorAll('.thumbnails > li')[target].click();
    
  })

  const prev = document.getElementById('prev');
  prev.addEventListener('click', () => {
    let target = currentIndex - 1;
    if (target < 0) {
      target = images.length - 1;
    }
    document.querySelectorAll('.thumbnails > li')[target].click();
    console.log(currentIndex)
  })

  let timeoutId;

  const playSlider = () => {
    timeoutId = setTimeout(() => {
      next.click();
      playSlider();
    },500)
  }
  
  let isPlaying = false;

  const play = document.getElementById('play');
  play.addEventListener('click', () => {
    if (isPlaying === false) {
      playSlider();
      play.textContent = 'Pause';
    } else {
      clearTimeout(timeoutId);
      play.textContent = 'play';
    }
    isPlaying = !isPlaying;
  })
}