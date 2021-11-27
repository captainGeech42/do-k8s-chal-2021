# Kubernetes Setup

There are two namespaces being used, besides the default ones:

* `kafka`: This is where Strimzi lives, and operates the Kafka cluster
* `mq-app`: This is where the demo app lives

All of the YAML files in `strimzi/` were written by the Strimzi team, I just followed their deployment instructions: https://strimzi.io/docs/operators/latest/quickstart.html