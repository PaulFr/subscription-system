# Subscription System

A scalable and secure subscription system built with Node.js, Express, and microservices architecture, featuring RabbitMQ for message brokering and MongoDB for data persistence.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Architecture Overview](#architecture-overview)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)

## Getting Started

These instructions will help you get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
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


2. The application should now be running on the specified ports. You can test the endpoints using a REST client like Postman or curl.

## Architecture Overview

This subscription system is composed of three microservices:

1. Public Service: Backend for Frontend microservice to be used by UI frontend.
2. Subscription Service: Microservice implementing subscription logic, including persistence of subscription data in a MongoDB database and email notification using RabbitMQ.
3. Email Service: Microservice implementing email notifications using RabbitMQ. This service mocks the email sending process.

The public service is in the public network zone, while the subscription and email services are in the private network zone.

## API Documentation

API documentation can be found [here](link). We use Swagger for API documentation.

## Testing

To run the tests, execute the following command:

```npm test```


This project uses Jest for testing.

## Deployment

This project is containerized using Docker and can be deployed to any container orchestration platform that supports Docker, such as Kubernetes or Amazon ECS.
