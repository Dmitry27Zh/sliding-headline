const elms = document.querySelectorAll('[data-headline]');
const LAST_PART = 0.4;
let getMaxOffset = () => window.innerWidth / 4;

const getTraverseProgress = (el, wrap) => Math.abs(wrap.getBoundingClientRect().top / (el.offsetTop + el.offsetHeight * LAST_PART));

const getNextOffset = (el, wrap) => {
  let result = getMaxOffset() * getTraverseProgress(el, wrap);
  return result;
};

const initHeadline = (el) => {
  const wrap = el.closest('[data-headline-wrapper]');
  let nextOffset = 0;
  let factor;
  const targets = el.querySelectorAll('[data-headline-factor]');
  let isAway;

  const move = () => {
    targets.forEach((target) => {
      nextOffset = getNextOffset(el, wrap);
      factor = target.dataset.headlineFactor;
      target.style.transform = `translate3d(${nextOffset * factor}px, 0, 0)`;
      target.style.opacity = 1 - nextOffset / getMaxOffset() - 0.01;
    });
  };

  if (window.pageYOffset !== 0) {
    move();
  }

  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) {
      window.removeEventListener('optimazedScroll', move);
      move(1, getMaxOffset());
      isAway = true;
      return;
    }

    if (isAway) {
      move(-1, getMaxOffset());
    }

    window.addEventListener('optimazedScroll', move);
    isAway = false;
  }, {
    threshold: LAST_PART,
  });

  observer.observe((el));
};

export const initHeadlines = () => elms.forEach(initHeadline);
