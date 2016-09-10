FROM node:6.5

MAINTAINER Leonardo Wolter <leocwolter@gmail.com>

# Define environment variables
ENV APOLLO_HOME=/opt/apollo
RUN mkdir -p $APOLLO_HOME
WORKDIR $APOLLO_HOME


# Bundle app source
ADD . $APOLLO_HOME
# Copy the prod config.js
ADD build/config.js $APOLLO_HOME/app/config.js

# Main command
ENTRYPOINT ["npm", "start"]