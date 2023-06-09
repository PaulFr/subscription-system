# Subscription System

A scalable and secure subscription system built with Node.js, Express, and microservices architecture, featuring RabbitMQ for message brokering and MongoDB for data persistence.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Tools](#tools)
- [Architecture Overview](#architecture-overview)
- [Security](#security)
- [Potential Service Level Agreements Implementation](#potential-service-level-agreements-implementation)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [CI/CD Pipeline Implementation Proposition](#cicd-pipeline-implementation-proposition)
- [Using Kubernetes](#using-kubernetes)
- [Potential Optimizations](#potential-optimizations)

## Getting Started

These instructions will help you get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js 16
- Docker
- Docker Compose

### Installation

1. Clone the repository:

```git clone https://github.com/PaulFr/subscription-system.git```  


2. Change to the project directory:

```cd subscription-system```


3. Install dependencies:

```npm install```


4. Copy `.env.example` to `.env` and update the configuration values as needed.

```cp .env.example .env```


### Running the Project

1. Build and run the Docker containers:

```docker-compose up --build```


2. The application should now be running on the specified ports. 

It's important to note that RabbitMQ, which is a core component of our subscription system, may take some time to start up. When running the `docker-compose up --build` command, it's recommended to wait for about 20 seconds before attempting to interact with the microservices that depend on RabbitMQ. This will ensure that RabbitMQ has enough time to initialize and become available, allowing the connected microservices to be available and ready to treat your requests. 

To test the subscription system, you can send a POST request to the Public Service running on `localhost:3001/subscription`. Use an HTTP client such as Postman, Insomnia, or a simple curl command in your terminal to make the request. Here's an example of a valid payload:

```json
{
  "email": "john.doe@example.com",
  "firstName": "John",
  "gender": "male",
  "dateOfBirth": "1990-01-01",
  "consent": true,
  "newsletterId": "abc1"
}
```

To send the POST request using the curl command, open your terminal and run the following command:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"email":"john.doe@example.com","firstName":"John","gender":"male","dateOfBirth":"1990-01-01","consent":true,"newsletterId":"abc1"}' http://localhost:3001/subscription
```

If the request is successful, you should receive a response with a status code of `201 Created` and a JSON payload containing the newly created subscription's ID. Make sure to have the Public Service and other necessary microservices running before performing the test.

## Tools
In the development of the subscription system, I have used several meaningful frameworks and libraries to streamline the development process and improve the overall quality and maintainability of the codebase.

1. *Express.js*: A popular Node.js web application framework used for building the API for the microservices. I chose Express.js due to its flexibility, performance, and ease of use, as well as its vast ecosystem of middleware to handle various tasks like routing, request parsing, and error handling.
2. *Mongoose*: A library for MongoDB that provides a higher level of abstraction for working with the database. It simplifies schema definition, validation, and querying, helping me to manage the subscription data more efficiently and in a more structured manner.
3. *Axios*: A popular HTTP client for Node.js and browsers, used in the public service and API gateway to make requests to the subscription service. Axios was chosen for its ease of use, promise-based API, and the ability to intercept requests and responses, which allows me to add authentication headers and handle errors more effectively.
4. *RabbitMQ*: A message broker that implements the Advanced Message Queuing Protocol (AMQP). I use RabbitMQ to handle communication between the microservices, specifically for sending email notifications. It provides a reliable, scalable, and robust solution for decoupling and distributing workloads.
5. *MongoDB* Memory Server: A utility that allows running an in-memory MongoDB server for testing purposes. It is used to isolate the tests from external dependencies and provide a faster and more predictable testing environment.
6. *Docker*: A containerization platform used to package and distribute the microservices, ensuring consistent execution environments and easier deployment. Docker enables me to manage the dependencies and configurations for each microservice, making the system more maintainable and scalable.
7. *Jest*: A testing framework used for writing and running unit and integration tests for the microservices. Jest provides a comprehensive and easy-to-use API for creating and executing tests, which helps to improve the overall quality and reliability of the system.
8. *body-parser*: A middleware for Express.js that parses incoming request bodies, making it easy to work with JSON payloads in the API endpoints. This library streamlines the process of handling request data and ensures proper formatting.
9. *dotenv*: A library that enables loading environment variables from a .env file into the Node.js application. It simplifies the management of environment-specific configurations, helping to keep sensitive information, such as API keys and database credentials, secure and separate from the codebase.
10. *supertest*: A testing library for testing HTTP endpoints, used in conjunction with Jest for the integration tests. It provides an easy-to-use API for making requests to the microservices, verifying responses, and asserting expected behaviors.
11. *amqplib*: A library for working with AMQP-based message brokers like RabbitMQ. It provides an easy-to-use API for connecting, sending, and receiving messages, which is essential for the email notification system.
12. *Swagger*: A powerful tool for documenting, designing, and testing APIs. I use Swagger to generate interactive API documentation for the public service, making it easier for developers to understand and test the API endpoints.
13. *CORS*: A middleware for Express.js that enables Cross-Origin Resource Sharing (CORS) on the API, allowing the frontend to make requests to the API from different origins. This is essential for providing a seamless user experience in a web application.
14. *express-validator*: A set of Express.js middleware for validating and sanitizing request data. I use express-validator to ensure that the data received by the API is valid and secure before forwarding it to the subscription service.

 Each of these libraries and tools plays a crucial role in achieving specific goals, such as handling requests, validating data, enabling communication between microservices, and testing the application effectively.
## Architecture Overview

The subscription system is designed as a microservices architecture, composed of four interconnected microservices that work together to provide a seamless user experience:

1. Public Service: This is the Backend for Frontend (BFF) microservice that serves as the primary point of interaction for the UI frontend. It is responsible for forwarding requests to the appropriate microservices, handling data validation, and securing access to the system. The public service is deployed within the public network zone, making it accessible to end-users and clients.

2. API Gateway Service: This service acts as a secure gateway to the underlying microservices, ensuring that only authorized clients with a valid API Key can access the private network's functionality. It is responsible for routing requests to the correct microservices, handling authentication, and providing a single entry point for all communication between the public service and the private network.

3. Subscription Service: This microservice is responsible for implementing the core subscription logic. Its tasks include persisting subscription data in a MongoDB database, managing subscriptions, and triggering email notifications using RabbitMQ. The subscription service is deployed within the private network zone, ensuring that it can only be accessed by the API Gateway service.

4. Email Service: This microservice implements email notifications using RabbitMQ. It is responsible for processing email notifications triggered by the Subscription Service and simulates the email sending process. The email service is also deployed within the private network zone, making it accessible only to authorized services within the private network.

By dividing the system into these distinct components, the architecture promotes separation of concerns, scalability, and maintainability. The public service acts as the intermediary between the UI frontend and the private microservices, providing a secure and controlled environment for data validation and authentication. Meanwhile, the private microservices (Subscription Service and Email Service) focus on their specific tasks, ensuring that the system is modular and easy to extend or modify as needed.

## Security

This application takes a comprehensive approach to ensure security at various levels. Firstly, the API Gateway service is secured with an API Key, which adds an extra layer of protection and helps prevent unauthorized access to the underlying microservices. Clients must provide a valid API Key to access any functionality provided by the microservices.

Furthermore, the microservices are deployed within a private network, making them unreachable from the public network. This setup ensures that only the API Gateway service can communicate with the microservices, effectively isolating them from potential external threats. By restricting access to the private network, we minimize the surface area for attacks, increasing the overall security of our system.

Lastly, the API Gateway service is responsible for validating and securing incoming data. This centralized approach offers several advantages. By handling data validation at the gateway level, we can apply consistent validation rules and error handling across all microservices. This design not only helps maintain code quality and reusability but also allows us to easily update or modify validation logic without having to touch individual microservices. Additionally, offloading data validation to the API Gateway service can improve the performance of the microservices, as they can focus on their core tasks, knowing that the data they receive has already been validated and sanitized.

## Potential Service Level Agreements Implementation

In a production-ready subscription system, it would be important to set specific SLA requirements for the public service and subscription service. For example, the public service could aim for a response time of 100ms or less and a monthly uptime of 99.99%. Similarly, the subscription service could strive for a response time of 150ms or less and a monthly uptime of 99.99%.

To achieve these goals, one could employ monitoring and alerting tools to track response times and uptime for both services. Regular load tests could be conducted to verify that the services can handle the expected traffic while staying within the specified response time thresholds. Periodic reviews of performance data and reports could be carried out to identify trends, potential issues, and areas for improvement specific to each service.

By closely monitoring the response times and uptime of the public service and subscription service, a high level of performance and adherence to the SLA requirements could be maintained. Continuously optimizing the services to achieve the desired performance levels and maintaining transparency with stakeholders regarding the SLA metrics would be an essential part of such an implementation.

The current architecture is designed to help the public service and subscription service meet their respective SLA requirements. By implementing a microservices architecture, each service can be scaled independently, allowing for efficient resource allocation and improved performance. Additionally, having the API gateway handle validation and data sanitization reduces the workload on the subscription service, which in turn helps to maintain quick response times.

To further ensure that the system meets the specified SLA requirements, it is crucial to implement best practices such as rate limiting, caching, and load balancing. This can help to prevent excessive resource consumption and distribute the incoming traffic evenly across multiple instances of the services. Moreover, employing robust error handling and graceful degradation strategies can help the system maintain its functionality even when specific components or services encounter issues, contributing to higher uptime.

By focusing on these aspects and continuously monitoring and optimizing the services, the subscription system should be well-equipped to meet the desired response time and uptime targets outlined in the SLA requirements.

## API Documentation

API documentation can be found on the public service `localhost:3001/api-docs/`. Swagger is used for API documentation.

## Testing

To run the tests, execute the following command:

```npm test```


This project uses Jest for testing.

## Deployment

This project is containerized using Docker and can be deployed to any container orchestration platform that supports Docker, such as Kubernetes or Amazon ECS.

## CI/CD Pipeline Implementation Proposition

### Prerequisites
1. Github repo
2. Set up Docker Hub or GitHub Container Registry to store Docker images.

### Steps
1. Source Control (Git): Developers use Git for version control and collaborate on the codebase by pushing their changes to the Git repository.

2. GitHub: Create a workflow file in the repository to define the GitHub Actions workflow. This workflow will be triggered when developers push their code to GitHub.

3. Build & Test (GitHub Actions): Add the following steps to the yml file to build Docker images for each microservice, run unit and integration tests, and push the images to the Docker Registry.

4. Deployment (GitHub Actions): Update the yml file with a new job to deploy the new versions of the microservices to the desired environment (e.g., staging, production) using Docker Compose, Kubernetes, or another container orchestration tool. 

5. Monitoring & Logging: Configure monitoring and logging tools like Prometheus, Grafana, and ELK stack to collect metrics, logs, and other information about the running services. This data is crucial for assessing the performance of the services and ensuring they meet their SLA requirements.

## Using Kubernetes

Kubernetes is a powerful container orchestration system that can greatly benefit our subscription system. By leveraging Kubernetes, we can easily scale our microservices horizontally to handle increased traffic, ensuring that our system is highly available and resilient. Automatic load balancing and rolling updates help us distribute the workload evenly across instances and deploy new versions without downtime. Kubernetes' self-healing capabilities, such as restarting failed containers and rescheduling them to healthy nodes, ensure our system remains operational even in the face of failures. Additionally, Kubernetes simplifies the management of application configurations and secrets, allowing us to easily update the system without exposing sensitive data. By adopting Kubernetes, we can focus on delivering new features and improvements, while the platform takes care of the underlying infrastructure management, providing a stable and scalable environment for our subscription system.

Here is an example of Kubernetes configuration for deploying the the public service into a Kubernetes cluster.

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: public-service
spec:
  replicas: 2
  selector:
    matchLabels:
      app: public-service
  template:
    metadata:
      labels:
        app: public-service
    spec:
      containers:
        - name: public-service
          image: <DOCKER_HUB_USERNAME>/public-service:latest
          ports:
            - containerPort: 3000
          env:
            - name: API_GATEWAY_URL
              value: "http://api-gateway-service:8080"
---
apiVersion: v1
kind: Service
metadata:
  name: public-service
spec:
  selector:
    app: public-service
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
```

```sh
kubectl apply -f public-service-deployment.yaml
```

 The Public Service is exposed through a LoadBalancer, while the other microservices could be accessible within the cluster using ClusterIP Services. The API Gateway should access to the Subscription Service using the SUBSCRIPTION_SERVICE_URL environment variable.
 
 
## Potential Optimizations

There are several optimizations that could be made to improve the subscription system:

1. Implement a dynamic service discovery solution, like Consul or etcd, to handle changes in the microservice environment more effectively as the project scales.

2. Enhance security measures by adding Content Security Policy (CSP) headers, and consider integrating a Web Application Firewall (WAF) to protect the API gateway.

3. Adopt a centralized logging solution like the ELK stack (Elasticsearch, Logstash, and Kibana) for efficient log management, monitoring, and analysis.

4. Utilize monitoring tools like Prometheus and Grafana to visualize metrics, identify bottlenecks, and set up alerting mechanisms with tools like PagerDuty or Opsgenie.

5. Evaluate and possibly migrate to a more scalable and durable messaging system, like Apache Kafka, if the project requires it.

6. Incorporate static code analysis tools, such as ESLint and SonarQube, to enforce consistent code quality and maintainability across the project.

7. Apply advanced testing techniques, including chaos engineering, to simulate real-world scenarios and uncover potential weaknesses, ensuring a robust and fault-tolerant system.

8. Use techniques like canary deployments or feature flags to gradually roll out new features and quickly revert changes if issues arise, minimizing the risk of breaking changes in production.

9. Consider utilizing managed Kubernetes services, like Google Kubernetes Engine (GKE) or Amazon Elastic Kubernetes Service (EKS), to reduce operational overhead and focus more on development.

10. Employ performance testing tools, such as Apache JMeter or Gatling, to simulate realistic user loads, identify bottlenecks, and optimize the system accordingly.

By addressing these areas, we can further enhance the system's performance, security, maintainability, and scalability, ensuring a reliable and efficient subscription service.
