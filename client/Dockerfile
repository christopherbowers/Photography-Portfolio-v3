# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /client

# Copy just the package.json and yarn.lock first
COPY package.json yarn.lock /client/

# Install project dependencies
RUN yarn

# Copy the entire project directory (including the source code) to the container
COPY . /client/

# Build your application
RUN yarn build

COPY . /client/