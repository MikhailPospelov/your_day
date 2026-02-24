function initSlider(sectionSelector, trackSelector, prevSelector, nextSelector, dotsSelector){

  const section = document.querySelector(sectionSelector);
  if(!section) return;

  const track = section.querySelector(trackSelector);
  const slides = section.querySelectorAll(".studio-card");
  const prevBtn = section.querySelector(prevSelector);
  const nextBtn = section.querySelector(nextSelector);
  const dotsContainer = section.querySelector(dotsSelector);

  let index = 0;

  /* ==== создаем точки ==== */
  slides.forEach((_, i)=>{
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if(i===0) dot.classList.add("active");

    dot.addEventListener("click",()=>{
      index=i;
      update();
    });

    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".dot");

  function update(){
    track.style.transform=`translateX(-${index*100}%)`;
    dots.forEach(d=>d.classList.remove("active"));
    dots[index].classList.add("active");
  }

  nextBtn.addEventListener("click",()=>{
    index++;
    if(index>=slides.length) index=0;
    update();
  });

  prevBtn.addEventListener("click",()=>{
    index--;
    if(index<0) index=slides.length-1;
    update();
  });
}


/* ================================
   ИНИЦИАЛИЗАЦИЯ СЛАЙДЕРОВ
================================ */

initSlider(
  ".studio",
  ".slider-track",
  "#prev",
  "#next",
  ".dots"
);

initSlider(
  ".price",
  ".price-track",
  ".price-prev",
  ".price-next",
  ".price-dots"
);

initSlider(
  ".gallery",
  ".gallery-track",
  ".gallery-prev",
  ".gallery-next",
  ".gallery-dots"
);

/* ===============================
   VIDEO MODAL FULL FIX
=============================== */

const videoModal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const videoOverlay = document.getElementById("videoOverlay");
const videoClose = document.getElementById("videoClose");

/* ==== открыть ==== */
document.querySelectorAll(".video-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const src = btn.dataset.video;
    modalVideo.src = src;
    videoModal.classList.add("show");
    modalVideo.play();
  });
});

/* ==== закрыть функция ==== */
function closeVideo(){
  videoModal.classList.remove("show");
  modalVideo.pause();
  modalVideo.currentTime = 0;
  modalVideo.src = "";
}

/* ==== закрытие ==== */
videoOverlay.addEventListener("click", closeVideo);
videoClose.addEventListener("click", closeVideo);

/* ==== ESC закрытие ==== */
document.addEventListener("keydown", (e)=>{
  if(e.key === "Escape"){
    closeVideo();
  }
});


document.querySelectorAll(".rule-header").forEach(header=>{
  header.addEventListener("click", ()=>{

    const item = header.parentElement;
    const content = item.querySelector(".rule-content");

    item.classList.toggle("active");

    if(item.classList.contains("active")){
      content.style.maxHeight = content.scrollHeight + "px";
    }else{
      content.style.maxHeight = 0;
    }

  });
});


const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".topbar__nav a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if(link.getAttribute("href") === "#" + current){
      link.classList.add("active");
    }
  });

});