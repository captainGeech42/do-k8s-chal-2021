#!/bin/bash

# apply basic setup
kubectl apply -f basic-setup.yaml

# create strimzi cluster
# ref: https://strimzi.io/docs/operators/latest/quickstart.html
kubectl apply -f strimzi/cluster-operator/ -n kafka

# add strimzi perms for mq-app
kubectl apply -f strimzi/cluster-operator/020-RoleBinding-strimzi-cluster-operator.yaml -n mq-app
kubectl apply -f strimzi/cluster-operator/031-RoleBinding-strimzi-cluster-operator-entity-operator-delegation.yaml -n mq-app

# create the kafka cluster
kubectl apply -f kafka-cluster.yaml

# deploy the app
kubectl apply -f app.yaml