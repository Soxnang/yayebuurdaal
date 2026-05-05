/**
 * ⚙️ main.js - Logique Application YayeBuurDaal
 * DevSecOps : Code modulaire, commentaires pédagogiques, prêt pour évolution
 * 
 * Architecture :
 * - Initialisation au chargement DOM
 * - Gestion des animations au scroll
 * - Compteur animé
 * - Intégration WhatsApp sécurisée
 */

document.addEventListener('DOMContentLoaded', () => {
  // 🔐 Initialisation sécurité
  initSecurity();
  
  // 🎨 Initialisation UI
  initAnimations();
  initCounter();
  initWhatsApp();
  
  // 📊 Hook monitoring (prêt pour analytics futur)
  Analytics.trackPageView('home');
  
  console.log('[YayeBuurDaal] Application initialisée ✓');
});

/**
 * 🔐 Initialisation des protections sécurité
 */
function initSecurity() {
  // Appliquer l'échappement sur tous les contenus dynamiques
  document.querySelectorAll('[data-dynamic]').forEach(el => {
    const raw = el.textContent;
    el.textContent = SecurityUtils.escapeHTML(raw);
    el.setAttribute('data-sanitized', 'true');
  });
  
  // Prévenir l'injection via URL parameters (démo)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('redirect')) {
    console.warn('[Security] Paramètre redirect ignoré');
  }
}

/**
 * 🎨 Initialisation des animations au scroll
 */
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-on-scroll');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    // Reset pour réobserver si besoin
    el.style.opacity = '0';
    observer.observe(el);
  });
}

/**
 * 🔢 Compteur animé de commandes
 */
function initCounter() {
  const counterEl = document.querySelector('.counter-value');
  if (!counterEl) return;
  
  const target = parseInt(counterEl.dataset.target, 10) || 150;
  const duration = 2000; // 2 secondes
  const step = Math.ceil(target / (duration / 16)); // ~60fps
  let current = 0;
  
  const animate = () => {
    current += step;
    if (current >= target) {
      counterEl.textContent = target + '+';
      return;
    }
    counterEl.textContent = current + '+';
    requestAnimationFrame(animate);
  };
  
  // Démarrer l'animation quand l'élément est visible
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animate();
      observer.disconnect();
    }
  }, { threshold: 0.5 });
  
  observer.observe(counterEl);
}

/**
 * 💬 Initialisation WhatsApp sécurisé
 */
function initWhatsApp() {
  // Numéro configuré dans une variable globale (à modifier)
  const WHATSAPP_NUMBER = '221771234567'; // Format international sans +
  
  // Générer l'URL sécurisée
  const waURL = SecurityUtils.sanitizeWhatsAppURL(WHATSAPP_NUMBER);
  
  // Appliquer sur tous les liens WhatsApp
  document.querySelectorAll('[data-whatsapp]').forEach(link => {
    if (waURL) {
      link.href = waURL;
      link.setAttribute('aria-label', 'Contacter YayeBuurDaal sur WhatsApp');
      
      // Tracking sécurisé
      link.addEventListener('click', () => {
        SecurityUtils.logSecure('whatsapp_click', {
          source: link.dataset.source || 'unknown'
        });
      });
    } else {
      link.style.display = 'none';
      console.error('[Security] URL WhatsApp invalide');
    }
  });
}

/**
 * 📊 Module Analytics (prêt pour extension)
 */
const Analytics = {
  trackPageView: (pageName) => {
    // 🔒 Hook pour Google Analytics, Matomo, etc.
    // Actuellement : log sécurisé uniquement
    SecurityUtils.logSecure('page_view', { page: pageName });
  },
  
  trackEvent: (category, action, label) => {
    SecurityUtils.logSecure('event', { category, action, label });
  }
};