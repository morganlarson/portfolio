# syntax=docker/dockerfile:1

FROM nginx

COPY home.html /usr/share/nginx/html/index.html
COPY aboutme.html /usr/share/nginx/html
COPY projects.html /usr/share/nginx/html
COPY contact.html /usr/share/nginx/html
COPY feedback.html /usr/share/nginx/html