# Note - this Dockerfile is for a regular PC
# For a Raspberry PI compatible Node.js image see alexellis/docker-arm on Github.
FROM mhart/alpine-node:4
RUN apk --update add git sqlite
RUN mkdir /code
WORKDIR /code
RUN addgroup www-data
RUN adduser pimeter -D -g www-data -s /bin/sh
RUN chown pimeter:www-data /code

USER pimeter
ADD ./ ./
RUN npm install
RUN node_modules/.bin/bower install
RUN sqlite3 energy.db < provision.sql
EXPOSE 8080
CMD ["npm", "start"]
