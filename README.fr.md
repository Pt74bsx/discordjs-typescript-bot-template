# Discord.js TypeScript Bot Template — Français

Version française de la documentation principale.

> Une template Discord.js + TypeScript propre, sécurisée et pensée pour les performances, conçue pour démarrer rapidement puis évoluer vers un bot Discord de grande taille.

## Pourquoi cette template ?

- ⚡ Intents Discord minimaux
- 🧩 Découverte automatique des commandes
- 🗂️ Commandes organisées par domaine
- 🧠 TypeScript strict
- 🛡️ Permissions, cooldowns et erreurs centralisés
- 🧪 Tests Vitest
- 🔍 ESLint + Prettier
- 🔄 CI GitHub
- 🔐 Dependabot + CodeQL
- 🩺 `/health` et `/ready`
- 📴 Arrêt propre du processus
- 🚀 Déploiement des commandes séparé du démarrage

## Installation

Prérequis : **Node.js 20.19+**

```bash
git clone <URL_DU_REPO>
cd <DOSSIER_DU_REPO>
npm install
cp .env.example .env
```

Configure ensuite :

```env
DISCORD_TOKEN=ton_token
CLIENT_ID=ton_client_id
```

Pour le développement, tu peux aussi ajouter :

```env
GUILD_ID=ton_serveur_de_test
```

Puis :

```bash
npm run typecheck
npm run build
npm run deploy
npm start
```

## Développement

```bash
npm run dev:watch
npm run lint
npm test
npm run verify
```

## Ajouter une commande

Ajoute simplement un fichier dans une catégorie de :

```text
src/commands/
```

Le loader découvre automatiquement les commandes. Aucun registre central n'est nécessaire.

## Architecture

```text
src/
├── commands/
├── config/
├── events/
├── handlers/
├── types/
├── utils/
├── deploy.ts
├── healthServer.ts
└── index.ts
```

L'architecture est volontairement légère aujourd'hui, tout en laissant une voie claire vers une couche services, une base de données, Redis, des workers et le sharding.

## Documentation

Consulte le [`README.md`](README.md) principal pour la documentation complète en anglais, ou le dossier [`docs/`](docs/).

## 👤 Auteur

Créée et maintenue par **[Pt74bsx (Romain-Augusto)](https://github.com/Pt74bsx)**.

Si cette template t'est utile pour créer ton bot Discord, pense à laisser une ⭐ au repository : cela aide le projet à toucher davantage de développeurs.

## Licence

MIT.
