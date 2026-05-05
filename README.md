# 👞 YayeBuurDaal - Application Web Premium

> 🎯 Projet DevSecOps : Site vitrine + prise de commandes WhatsApp pour une marque de chaussures premium.

[![Deploy](https://github.com/ton-user/yayebuurdaal/actions/workflows/deploy.yml/badge.svg)](https://github.com/ton-user/yayebuurdaal/actions/workflows/deploy.yml)
[![Dependabot](https://img.shields.io/badge/dependabot-active-brightgreen.svg)](./.github/dependabot.yml)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

## 🌟 Fonctionnalités

✅ Page d'accueil premium avec hero animé  
✅ Présentation des collections Homme/Femme/Sur-mesure  
✅ Galerie responsive avec placeholders  
✅ Témoignages clients & compteur animé  
✅ Intégration WhatsApp sécurisée  
✅ Design luxe : Noir, Or, Gris métallique  
✅ 100% responsive (mobile-first)  
✅ Accessibilité (ARIA, contrastes, navigation clavier)  

## 🔐 DevSecOps - Bonnes Pratiques Implémentées

### Sécurité
- [x] Échappement HTML pour prévention XSS (`js/security.js`)
- [x] Validation des URLs WhatsApp
- [x] Meta tags CSP, X-Content-Type-Options, X-Frame-Options
- [x] Attribution `rel="noopener noreferrer"` sur liens externes
- [x] Logging sécurisé sans données sensibles
- [x] Structure prête pour headers HTTP sécurisés côté serveur

### CI/CD
- [x] Pipeline GitHub Actions avec validation HTML
- [x] Scan de sécurité basique dans le workflow
- [x] Déploiement automatique sur `main`
- [x] Gestion des conflits de déploiement (concurrency)

### Maintenance
- [x] Dependabot pour mises à jour automatiques
- [x] Code modulaire et commenté pédagogiquement
- [x] Variables CSS centralisées pour maintenance facile
- [x] Hooks prêts pour analytics (RGPD-compliant)

## 🚀 Déploiement Rapide

### Prérequis
- Compte GitHub
- Git installé localement

### Étapes

1. **Forker ou cloner le repo**
   ```bash
   git clone https://github.com/ton-utilisateur/yayebuurdaal.git
   cd yayebuurdaal