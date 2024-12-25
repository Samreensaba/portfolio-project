const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnim() {
  var tl = gsap.timeline()

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: "0",
      duration: 2,
      ease: Expo.easeInOut,
      stagger: 0.2,
      delay: -1,
    })
    .from("#heroFooter", {
      y: "-10",
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });  
}

var timeout

function mouseSkew() {
  
  xscale = 1;
  yscale = 1;

  xprev = 0
  yprev = 0
  window.addEventListener("mousemove", function(dets) {
    clearTimeout(timeout);
    var xdiff = dets.clientX - xprev
    var ydiff = dets.clientY - yprev

    xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
    yscale = gsap.utils.clamp(0.8, 1.2, ydiff);

    xprev = dets.clientX
    yprev = dets.clientY
    
    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(() =>{
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)})`;
    }, 100)

  })
}

mouseSkew();

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (e) {
      
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(${xscale}, ${yscale})`;
  });
}

circleMouseFollower()
firstPageAnim()

document.querySelectorAll('.elem').forEach(function (elem){

  var rotate = 0
  var diffrot = 0


  elem.addEventListener("mouseleave", function (details) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener('mousemove', function(details){

    var diff = details.clientY - elem.getBoundingClientRect().top
    diffrot = details.clientX - rotate
    rotate = details.clientX
        
    gsap.to(elem.querySelector('img'), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: details.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot)
    })
  })
})
