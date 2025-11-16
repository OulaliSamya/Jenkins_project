# Utilise Node.js 20 LTS
FROM node:20

# Définit le répertoire de travail
WORKDIR /app

# Copie package.json et package-lock.json et installe les dépendances
COPY package*.json ./
RUN npm install

# Copie le reste du projet
COPY . .

# Expose le port utilisé par Vite
EXPOSE 5173

# Démarre Vite en écoutant sur toutes les interfaces
CMD ["npm", "run", "dev", "--", "--host"]
