# do-k8s-chal-2021
Digital Ocean Kubernetes Challenge repo

## Challenge: Deploy a scalable message queue
> A critical component of all the scalable architectures are message queues used to store and distribute messages to multiple parties and introduce buffering. Kafka is widely used in this space and there are multiple operators like Strimzi or to deploy it. For this project, use a sample app to demonstrate how your message queue works.

I built a simple React app with a NodeJS backend (via HTTP and Websockets) that adds messages to a Kafka topic, and broadcasts them to all clients. You can open the demo in multiple tabs, and see messages sent from one tab appear in another.

A live demo is available [here](http://mq-demo-app.zanderwork.com/).

## Deployment:

### 1. Build the container image for the demo web app

```
$ cd mq-backend
$ npm run build-img # builds an image with the tag "mq-app"
```

### 2. Push the image to a registry

For simplicity, I just used Docker Hub.

```
$ docker tag mq-app <dockerhub username>/mq-app:latest
$ docker push <dockerhub username>/mq-app:latest
```

### 3. Create a k8s cluster on Digital Ocean to deploy to

https://github.com/digitalocean/Kubernetes-Starter-Kit-Developers/blob/main/01-setup-DOKS/README.md

### 4. Deploy to k8s

You will need to update the `WS_HOST` env var in [`app.yaml`](k8s/app.yaml#L31)

```
$ cd k8s
$ ./deploy.sh
```

## Local Testing

To test locally, open 3 terminals and run the following commands, one per terminal:

```
$ cd mq-frontend && npm start
$ cd mq-backend && npm run dev
$ docker-compose up -d
```

It'll take a little while for Kafka to finish deploying, but once that finished you will be able to go to `localhost:3000` and use the app locally. The backend server listens on port 4000 by default.

## Architecture

* Front end web app built using React
* Communicates with back end Node.js server using Websockets
* Kafka message queues using Strimzi supporting the messages
* All components running on k8s

Requires Node v16

## Resources

* https://medium.com/weekly-webtips/create-and-deploy-your-first-react-web-app-with-a-node-js-backend-ec622e0328d7
* https://blog.logrocket.com/websockets-tutorial-how-to-go-real-time-with-node-and-react-8e4693fbf843/
* https://github.com/osu-cs419-w20/final-project-group18-marvelbrowser
* https://www.educba.com/kafka-zookeeper/
* https://www.baeldung.com/ops/kafka-docker-setup
* https://kafka.js.org/docs/getting-started
* https://javascript.info/promise-chaining