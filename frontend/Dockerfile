# Start with the Node.js image
FROM node:16-alpine

# Set the working directory
WORKDIR /social-network

# Copy the frontend code into the container
COPY package.json package-lock.json ./
# Install dependencies
RUN npm install



COPY . .

# # Build the frontend
RUN npm run build

# Expose the frontend port
EXPOSE 5173


# Start the frontend server
CMD ["npm","run", "dev"]