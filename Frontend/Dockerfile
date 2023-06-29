# Use an official Node.js image as the base
FROM node:alpine

RUN mkdir /app

COPY package*.json /app

WORKDIR /app

RUN npm install

COPY . .

# Build the app
RUN npm run build

# Expose the port on which the app will run (adjust if necessary)
EXPOSE 3000

RUN chmod ugo+x /usr/local/bin/docker-entrypoint.sh
# Set the command to run the app when the container starts
CMD ["npm", "run", "serve" ]
