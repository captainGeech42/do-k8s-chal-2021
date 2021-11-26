# do-k8s-chal-2021
Digital Ocean Kubernetes Challenge repo

## Challenge: Deploy a scalable message queue
> A critical component of all the scalable architectures are message queues used to store and distribute messages to multiple parties and introduce buffering. Kafka is widely used in this space and there are multiple operators like Strimzi or to deploy it. For this project, use a sample app to demonstrate how your message queue works.

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