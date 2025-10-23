# Usa Node como base
FROM node:20-alpine

# Crea un directorio de trabajo
WORKDIR /web

# Copia los archivos de tu proyecto (solo los necesarios para instalar)
COPY package*.json ./

# Instala dependencias
RUN npm install pm2 -g && npm install

# Copia el resto del código
COPY . .

# Expone el puerto (el que usa NestJS o Express)
EXPOSE 3000

# Comando por defecto
CMD ["pm2-runtime", "start", "pm2.json"]
