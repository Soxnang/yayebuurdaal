/**
 * 🔐 security.js - Utilities de Sécurité
 * DevSecOps : Prévention XSS, sanitization, bonnes pratiques
 * 
 * Bonnes pratiques implémentées :
 * - Échappement HTML pour prévenir XSS
 * - Validation des URLs externes
 * - Content Security Policy helper
 */

const SecurityUtils = {
  /**
   * Échappe les caractères HTML pour prévenir les injections XSS
   * @param {string} str - Chaîne à sanitiser
   * @returns {string} Chaîne sécurisée
   */
  escapeHTML: (str) => {
    if (typeof str !== 'string') return '';
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;'
    };
    return str.replace(/[&<>"'`=\/]/g, char => map[char]);
  },

  /**
   * Valide et sanitize une URL pour WhatsApp
   * @param {string} phoneNumber - Numéro au format international
   * @returns {string|null} URL sécurisée ou null si invalide
   */
  sanitizeWhatsAppURL: (phoneNumber) => {
    // Format attendu : 221771234567 (sans +, sans espaces)
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    
    // Validation basique : 9-15 chiffres pour numéro international
    if (!/^\d{9,15}$/.test(cleanNumber)) {
      console.warn('[Security] Numéro WhatsApp invalide');
      return null;
    }
    
    return `https://wa.me/${cleanNumber}`;
  },

  /**
   * Génère les headers CSP recommandés (à implémenter côté serveur)
   * @returns {string} Politique de sécurité de contenu
   */
  generateCSP: () => {
    return [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://wa.me",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self' https://wa.me",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'"
    ].join('; ');
  },

  /**
   * Logger sécurisé pour le monitoring (sans données sensibles)
   * @param {string} event - Type d'événement
   * @param {Object} metadata - Métadonnées non sensibles
   */
  logSecure: (event, metadata = {}) => {
    // 🔒 Ne jamais logger : tokens, emails, numéros complets
    const safeMetadata = Object.fromEntries(
      Object.entries(metadata).filter(([key]) => 
        !['password', 'token', 'email', 'phone'].includes(key.toLowerCase())
      )
    );
    
    console.log(`[YayeBuurDaal] ${event}`, {
      timestamp: new Date().toISOString(),
      ...safeMetadata
    });
  }
};

// Export pour modules futurs
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SecurityUtils;
}