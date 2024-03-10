FROM ubuntu:22.04

RUN mkdir /home/ango

WORKDIR /home/ango

RUN apt update -y

RUN apt upgrade -y

RUN apt install npm -y

RUN npm install -g http-server -y

#RUN npm install -g serve@11.3.2

COPY dist /home/ango

# Expose port 80
EXPOSE 8000

# Default command to start Nginx when the container starts
# CMD ["nginx", "-g", "daemon off;"]
# ENTRYPOINT serve -s build -p 8080 --listen 0.0.0.0
ENTRYPOINT http-server -p 8000 -a 0.0.0.0