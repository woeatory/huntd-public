FROM node:12

# Create app directory
WORKDIR /usr/src/cms

# Install additional libraries
RUN wget https://github.com/libvips/libvips/releases/download/v8.10.5/vips-8.10.5.tar.gz
RUN tar xf vips-8.10.5.tar.gz
RUN cd vips-8.10.5
RUN ./vips-8.10.5/configure
RUN make
RUN make install
RUN ldconfig

# Install app dependencies
COPY package*.json ./
ARG NPM_TOKEN
RUN npm config set '//registry.npmjs.org/:_authToken' "$NPM_TOKEN"
RUN echo "npm user is >>> $(npm whoami) <<<"
RUN npm ci

# Bundle app source
COPY . .

## Build for development / staging / production
ARG APP_ENV
RUN echo ">> Current stage: $APP_ENV"
RUN if [ "$APP_ENV" != "local" ] ; then npm run build; else echo 'Nothing to build'; fi

EXPOSE 1337
EXPOSE 8000

CMD ["./wait-for-it.sh", "api:4000/healthz", "npm", "run", "prod"]
