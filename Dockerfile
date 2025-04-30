# образ Node.js
FROM node:22-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы конфигурации
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Открываем порт для сервера разработки
EXPOSE 5173

# Запускаем Vite
CMD ["npm", "run", "dev", "--", "--host"]
