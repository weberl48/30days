import confetti from 'canvas-confetti'
import lottie from 'lottie-web'

// Confetti animations
export function createConfetti(options = {}) {
  const defaults = {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#667eea', '#764ba2', '#4CAF50', '#FF9800', '#E91E63', '#2196F3']
  }
  
  confetti({ ...defaults, ...options })
}

export function createStreakConfetti(streak) {
  const colors = {
    3: ['#FF6B35', '#F7931E'],
    7: ['#4ECDC4', '#44A08D'],
    14: ['#667eea', '#764ba2'],
    21: ['#A8E6CF', '#3D5A80'],
    30: ['#FFD700', '#FFA500']
  }
  
  const confettiColors = colors[streak] || colors[30]
  
  // Multiple bursts for bigger milestones
  const burstCount = streak >= 21 ? 3 : streak >= 7 ? 2 : 1
  
  for (let i = 0; i < burstCount; i++) {
    setTimeout(() => {
      createConfetti({
        particleCount: 150,
        spread: 100,
        origin: { x: Math.random(), y: Math.random() * 0.5 + 0.3 },
        colors: confettiColors
      })
    }, i * 300)
  }
}

export function createAchievementConfetti() {
  // Firework-style confetti
  const duration = 3000
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    const particleCount = 50 * (timeLeft / duration)
    
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    })
    
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    })
  }, 250)
}

// Lottie animations
export function loadLottieAnimation(container, animationData, options = {}) {
  const defaults = {
    container,
    renderer: 'svg',
    loop: false,
    autoplay: true,
    animationData
  }
  
  return lottie.loadAnimation({ ...defaults, ...options })
}

export function createSuccessAnimation(container) {
  // Success checkmark animation
  const animationData = {
    "v": "5.7.4",
    "fr": 60,
    "ip": 0,
    "op": 60,
    "w": 200,
    "h": 200,
    "nm": "Success",
    "ddd": 0,
    "assets": [],
    "layers": [
      {
        "ddd": 0,
        "ind": 1,
        "ty": 4,
        "nm": "checkmark",
        "sr": 1,
        "ks": {
          "o": {"a": 0, "k": 100},
          "r": {"a": 0, "k": 0},
          "p": {"a": 0, "k": [100, 100, 0]},
          "a": {"a": 0, "k": [0, 0, 0]},
          "s": {"a": 1, "k": [
            {"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 0, "s": [0]},
            {"t": 30, "s": [120]}
          ]}
        },
        "ao": 0,
        "shapes": [
          {
            "ty": "gr",
            "it": [
              {
                "ind": 0,
                "ty": "sh",
                "ks": {
                  "a": 0,
                  "k": {
                    "i": [[0,0],[0,0],[0,0]],
                    "o": [[0,0],[0,0],[0,0]],
                    "v": [[-20,0],[0,20],[40,-20]],
                    "c": false
                  }
                }
              },
              {
                "ty": "st",
                "c": {"a": 0, "k": [0.267, 0.773, 0.365, 1]},
                "o": {"a": 0, "k": 100},
                "w": {"a": 0, "k": 8},
                "lc": 2,
                "lj": 2
              },
              {
                "ty": "tr",
                "p": {"a": 0, "k": [0, 0]},
                "a": {"a": 0, "k": [0, 0]},
                "s": {"a": 0, "k": [100, 100]},
                "r": {"a": 0, "k": 0},
                "o": {"a": 0, "k": 100}
              }
            ]
          }
        ],
        "ip": 0,
        "op": 60,
        "st": 0,
        "bm": 0
      }
    ]
  }
  
  return loadLottieAnimation(container, animationData)
}

// CSS-based animations
export function animateElement(element, animation, duration = 600) {
  element.style.animation = `${animation} ${duration}ms ease-in-out`
  
  return new Promise(resolve => {
    setTimeout(() => {
      element.style.animation = ''
      resolve()
    }, duration)
  })
}

export function bounceIn(element) {
  return animateElement(element, 'bounce-in')
}

export function fadeInUp(element) {
  return animateElement(element, 'fade-in-up')
}

export function pulse(element, duration = 800) {
  return animateElement(element, 'pulse', duration)
}

export function shake(element) {
  return animateElement(element, 'shake', 500)
}

// Smooth scrolling
export function smoothScrollTo(element, offset = 0) {
  const elementPosition = element.offsetTop - offset
  
  window.scrollTo({
    top: elementPosition,
    behavior: 'smooth'
  })
}

// Intersection Observer for scroll animations
export function createScrollObserver(callback, options = {}) {
  const defaults = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  }
  
  const observer = new IntersectionObserver(callback, { ...defaults, ...options })
  
  return observer
}

// Particle system for visual feedback
export function createParticles(container, count = 50) {
  const particles = []
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div')
    particle.className = 'particle'
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: hsl(${Math.random() * 360}, 70%, 60%);
      border-radius: 50%;
      pointer-events: none;
      animation: float ${2 + Math.random() * 3}s ease-out forwards;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
    `
    
    container.appendChild(particle)
    particles.push(particle)
    
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle)
      }
    }, 5000)
  }
  
  return particles
}

// Loading animations
export function createLoadingSpinner(container, size = 40) {
  const spinner = document.createElement('div')
  spinner.className = 'loading-spinner'
  spinner.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 20px auto;
  `
  
  container.appendChild(spinner)
  return spinner
}

export function removeLoadingSpinner(spinner) {
  if (spinner && spinner.parentNode) {
    spinner.parentNode.removeChild(spinner)
  }
}

// Morphing animations
export function morphNumber(element, from, to, duration = 1000) {
  const startTime = performance.now()
  
  function animate(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // Easing function
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    
    const currentValue = Math.round(from + (to - from) * easeOutQuart)
    element.textContent = currentValue
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  
  requestAnimationFrame(animate)
}