
// ----------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn   = document.querySelector('.navbar-menu');
  const openIcon  = document.querySelector('.open');
  const crossIcon = document.querySelector('.cross');
  let isOpen = false;

  // prepare both icons
  gsap.set(openIcon,  { opacity: 1, scale: 1, rotation: 0 });
  gsap.set(crossIcon, { opacity: 0, scale: 0.2, rotation: 90 });

  menuBtn.addEventListener('click', () => {
    // prevent retriggering mid-animation
    if (menuBtn._animating) return;
    menuBtn._animating = true;

    const tl = gsap.timeline({
      onComplete: () => menuBtn._animating = false
    });

    if (!isOpen) {
      // 1) spin-and-shrink openIcon away
      tl.to(openIcon, {
        duration: 0.4,
        opacity: 0,
        scale: 0,
        rotation: 360,
        ease: 'power2.in'
      })
      // 2) then spin-and-grow crossIcon in
      .to(crossIcon, {
        duration: 0.4,
        opacity: 1,
        scale: 1,
        rotation: 0,
        ease: 'back.out(1.7)'
      });
    } else {
      // reverse: hide cross first, then show open
      tl.to(crossIcon, {
        duration: 0.4,
        opacity: 0,
        scale: 0,
        rotation: -360,
        ease: 'power2.in'
      })
      .to(openIcon, {
        duration: 0.4,
        opacity: 1,
        scale: 1,
        rotation: 0,
        ease: 'back.out(1.7)'
      });
    }

    isOpen = !isOpen;
  });
});

// ----------------------------------------------------------------------------------------------------

const menuBtn = document.querySelector('.navbar-menu');
const openIcon = document.querySelector('.open');
const crossIcon = document.querySelector('.cross');
const menu = document.querySelector('.menu');
const menuItems = document.querySelectorAll('.menu h3');
const emailItems = document.querySelector('.bottom-menu-container')

let isOpen = false;

gsap.set(emailItems, { opacity: 0, y: 0 });
gsap.set(crossIcon, { opacity: 0, display: 'none' });
gsap.set(menuItems, { opacity: 0, y: 20 });
gsap.set(menu, { x: '100%', pointerEvents: 'none' });

menuBtn.addEventListener('click', () => {
  if (!isOpen) {
    gsap.to(openIcon, {
      duration: 0.3,
      opacity: 0,
      scale: 0.7,
      rotation: 90,
      onComplete: () => {
        gsap.set(openIcon, { display: 'none' });
        gsap.set(crossIcon, { display: 'block' });
        gsap.fromTo(crossIcon, { rotation: -90, scale: 0.7 }, {
          duration: 0.3,
          opacity: 1,
          scale: 1,
          rotation: 0
        });
      }
    });
 
    gsap.to(menu, { x: 0, pointerEvents: 'auto', duration: 0.7, ease: 'power2.out' });

    // Animate in menu items (bottom to top)
    gsap.to(menuItems, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      delay: 0.1,
      duration: 0.5,
      ease: 'power2.out'
    });
    gsap.to(emailItems, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      delay: 0.1,
      duration: 0.5,
      ease: 'power2.out'
    });
  } else {

    gsap.to(menuItems, {
      opacity: 0,
      y: 100,
      stagger: 0.05,
      duration: 0.3,
      ease: 'power2.in'
    });
    
    gsap.to(emailItems, {
      opacity: 0,
      y: 100,
      stagger: 0.05,
      duration: 0.3,
      ease: 'power2.in'
    });






    // Hide cross icon
    gsap.to(crossIcon, {
      duration: 0.3,
      opacity: 0,
      scale: 0.7,
      rotation: 90,
      delay: 0.2, // wait until content fades out
      onComplete: () => {
        gsap.set(crossIcon, { display: 'none' });
        gsap.set(openIcon, { display: 'block' });
        gsap.fromTo(openIcon, { rotation: -90, scale: 0.7 }, {
          duration: 0.3,
          opacity: 1,
          scale: 1,
          rotation: 0
        });
      }
    });

    // Slide out menu after a short delay
    gsap.to(menu, {
      x: '100%',
      pointerEvents: 'none',
      duration: 0.5,
      ease: 'power2.in',
      delay: 0.2
    });
  }

  isOpen = !isOpen;
});
