# Use the official Node.js image
FROM node:lts-slim

# Set the working directory
WORKDIR /usr/app

COPY . /usr/app/
RUN yarn
# COPY src /usr/app/src


# Install dependencies
# RUN yarn

# Expose the port your app will run on
EXPOSE 3001

# Start your application
CMD ["yarn", "start"]
