import { useEffect } from 'react';

export function useReveal(deps = []) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in');
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function useTilt(selector) {
  useEffect(() => {
    const cards = document.querySelectorAll(selector);
    const handlers = [];
    cards.forEach((card) => {
      const move = (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-6px)`;
      };
      const leave = () => {
        card.style.transform = '';
      };
      card.addEventListener('mousemove', move);
      card.addEventListener('mouseleave', leave);
      handlers.push([card, move, leave]);
    });
    return () => handlers.forEach(([card, move, leave]) => {
      card.removeEventListener('mousemove', move);
      card.removeEventListener('mouseleave', leave);
    });
  });
}
