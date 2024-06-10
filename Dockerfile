# Stage 1: Build the React app
FROM node:16 AS build

# Set working directory
WORKDIR /server-side-rendering-react-with-express-main

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Set up the production environment for the Express server
FROM node:16

# Set working directory
WORKDIR /server-side-rendering-react-with-express-main

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the built React app from the previous stage
COPY --from=build /server-side-rendering-react-with-express-main/dist ./dist

# Copy the server code
COPY ./src/server ./server

# Set the command to start the server
CMD ["node", "./dist/server.cjs"]

# Expose the port the app runs on
EXPOSE 3000
