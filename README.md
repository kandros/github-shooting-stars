# github-shooting-stars

Rediscover hidden treasures in your old github starred projects right into your email

nodejs microservice based on [Micro](https://github.com/zeit/micro) that fetches 3 random repositories you starred on github and send them via email
- send repositories are considered 'consumed' and wont appear again untill all repos all been send once
- consumed repos persistency on firebase


build as part of [Github Shooting Stars architecture](https://github.com/kandros/github-shooting-stars-architecture) project
 - https://github.com/kandros/serverless-cron-lambda-http-trigger
 - https://github.com/kandros/react-mailer-microservice
 - https://github.com/kandros/micro-jwt-auth
