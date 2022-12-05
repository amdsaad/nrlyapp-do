import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
gsap.config({
  autoSleep: 120,
  nullTargetWarn: false,
})
const smoother = ScrollSmoother.create({
  smooth: 2, // seconds it takes to "catch up" to native scroll position
  effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
  smoothTouch: 0.1,
})
smoother.effects('img', { speed: 1 })

const allel = document.getElementById('allel')

let currentId = 1

function setupSection(section) {
  gsap.fromTo(
    allel,
    {
      value: 0,
    },
    {
      value: 100,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        end: 'bottom bottom',
        scrub: true,
        immediateRender: false,
      },
    }
  )
}

gsap.utils.toArray('.inner_wrapper').forEach(setupSection)

// const touchSupported = 'ontouchstart' in window
ScrollTrigger.create({
  trigger: '#scroll_container_trigger',
  start: 0,
  end: 'bottom-=200px bottom',
  onLeave: () => {
    const wrapper = document.querySelector('.scroll_container')
    const clonedWrapper = wrapper.cloneNode(true)
    const panel = document.querySelector('#scroll_container_trigger')
    currentId += 1
    clonedWrapper.id = `id_${currentId}`
    panel.appendChild(clonedWrapper)
    setupSection(clonedWrapper)
    ScrollTrigger.refresh()
  },
})

// let allVids = document.querySelectorAll('video')
let showPlayVideo = document.querySelectorAll('.showPlayVideo')
let showInfoVideo = document.querySelectorAll('.showInfoVideo')
const vModal = document.getElementById('vModal')
const vModalVideo = vModal.querySelector('video')
const closeV = vModal.querySelector('.close-video')

const closeModal = () => {
  vModalVideo.pause()
  vModal.classList.remove('show')
}
closeV.addEventListener('click', () => {
  closeModal()
})

const vTou = (array) => {
  array.forEach((x) => {
    if (x.dataset.videoUrl) {
      x.addEventListener('click', (e) => {
        console.log(x.dataset.videoUrl)
        vModalVideo.src = x.dataset.videoUrl
        vModal.classList.add('show')
        setTimeout(() => {
          vModalVideo.play()
        }, 1000)
      })
    }
    if (x.dataset.videoInfo) {
      x.addEventListener('click', async (e) => {
        const getData = await window.$nuxt.$content(x.dataset.videoInfo).fetch()
        window.$nuxt.$store.commit('set_activeInfo', getData)
        window.$nuxt.$store.commit('set_showinfo', true)
        console.log('getData videoInfo', getData)
      })
    }
  })
}

vTou(showPlayVideo)
vTou(showInfoVideo)

let logoEls = document.querySelectorAll('.logo')

// addAnimationtoImage()

// contacts

const allATags = document.querySelectorAll('.contacts-a')

allATags.forEach((x) => {
  const nameEl = x.querySelector('.name')
  const hoverTextEl = x.querySelector('.hoverText')
  let nameHoverText
  x.addEventListener('mouseenter', () => {
    if (hoverTextEl.classList.contains('restore')) {
      hoverTextEl.classList.remove('restore')
    }
    nameHoverText = nameEl.innerText
    nameEl.classList.add('name__hover')
    nameEl.innerText = ''
    hoverTextEl.classList.add('hoverText__hover')
  })

  x.addEventListener('mouseleave', () => {
    nameEl.classList.remove('name__hover')
    nameEl.innerText = nameHoverText
    hoverTextEl.classList.remove('hoverText__hover')
    hoverTextEl.classList.add('restore')
  })
})
const logoModal = document.querySelector('.logo-modal')

// const homepage = document.querySelector('.homepage')

// const handleLogo = () => {
//   logoEls.forEach((el) => {
//     el.addEventListener('click', () => {
//       const nameEl = logoModal.querySelector('.name')
//       const hoverTextEl = logoModal.querySelector('.hoverText')
//       // let nameHoverText
//       logoModal.classList.add('logo-modal-show')
//       const closeLogoModal = document.getElementById('closeLogoModal')

//       closeLogoModal.addEventListener('mouseenter', () => {
//         if (hoverTextEl.classList.contains('restore')) {
//           hoverTextEl.classList.remove('restore')
//         }
//         // nameHoverText = nameEl.innerText
//         nameEl.classList.add('name__hover')
//         hoverTextEl.classList.add('hoverText__hover')
//       })

//       closeLogoModal.addEventListener('click', () => {
//         logoModal.classList.remove('logo-modal-show')
//       })
//     })
//   })
// }

// closeLogoModal

// handleLogo()

// const proxy = { skew: 0 }
// const skewSetter = gsap.quickSetter('.scenes_wraper', 'skewX', 'deg') // fast
// const clamp = gsap.utils.clamp(-0.15, 0.3) // don't let the skew go beyond 20 degrees.
// ScrollTrigger.create({
//   onUpdate: (self) => {
//     const skew = clamp(self.getVelocity() / -300)
//     // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
//     if (Math.abs(skew) > Math.abs(proxy.skew)) {
//       console.log('skew', skew)
//       proxy.skew = skew
//       gsap.to(proxy, {
//         skew: 0,
//         duration: 2,
//         ease: 'power3',
//         overwrite: true,
//         onUpdate: () => skewSetter(proxy.skew),
//       })
//     }
//   },
// })
// make the right edge "stick" to the scroll bar. force3D: true improves performance
gsap.set('.scenes_wraper', { transformOrigin: 'right center', force3D: true })

const previouslyCreatedSmoother = ScrollSmoother.get()
window.addEventListener('scroll ', (e) => {
  previouslyCreatedSmoother.refresh()
  // allVids = document.querySelectorAll('video')
  showPlayVideo = document.querySelectorAll('.showPlayVideo')
  showInfoVideo = document.querySelectorAll('.showInfoVideo')
  logoEls = document.querySelectorAll('.logo')
  vTou(showPlayVideo)
  vTou(showInfoVideo)
  // handleLogo()
})

window.addEventListener('touchstart', () => {
  // allVids = document.querySelectorAll('video')
  showPlayVideo = document.querySelectorAll('.showPlayVideo')
  showInfoVideo = document.querySelectorAll('.showInfoVideo')
  logoEls = document.querySelectorAll('.logo')
  vTou(showPlayVideo)
  vTou(showInfoVideo)
  // handleLogo()
})
