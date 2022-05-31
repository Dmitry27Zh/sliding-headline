const elms = document.querySelectorAll('[data-headline]');
const LAST_PART = 0.4;
const getMaxOffset = () => window.innerWidth / 4;

const getTraverseProgress = (el, wrap) => wrap.getBoundingClientRect().top / (el.offsetTop + el.offsetHeight * LAST_PART);

const getNextOffset = (el, wrap, maxOffset) => {
  let result = maxOffset * -getTraverseProgress(el, wrap);
  return result;
};

const initHeadlineSliding = (el) => {
  const wrap = el.closest('[data-headline-wrapper]');
  let maxOffset, nextOffset;
  let directionFactor;
  const targets = el.querySelectorAll('[data-headline-factor]');

  const move = () => {
    maxOffset = getMaxOffset()
    nextOffset = getNextOffset(el, wrap, maxOffset);

    targets.forEach((target) => {
      directionFactor = target.dataset.headlineFactor;
      target.style.transform = `translate3d(${nextOffset * directionFactor}px, 0, 0)`;
      target.style.opacity = 1 - Math.abs(nextOffset) / maxOffset - 0.01;
    });
  };

  move();

  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) {
      window.removeEventListener('optimizedScroll', move);
      move();
      return;
    }

    move();
    window.addEventListener('optimizedScroll', move);
  }, {
    threshold: LAST_PART,
  });

  observer.observe((el));
};

export const initHeadlinesSliding = () => elms.forEach(initHeadlineSliding);
