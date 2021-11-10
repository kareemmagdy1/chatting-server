# Chatting-Server

This is a  simulation of what a back-end server made to offer services to a chatting application would be like.




## Getting Started

- First run the following command to insall the packages used in this project

```sh
$ npm install 
```

- Second you will have to create a `.env` file which will hold your private variables you will find variables such as :

```javascript
const URI=process.env.DATABASE_URI;
```
- In this example nodejs will attempt to access the `.env` file and  fetch the value  for the variable `DATABASE_URI`

## Run The Server

- To run the server run the command

```sh
npm run
```


## Services

* **Authentication**

  contains services like login and signup required to acquire a token of authentication 

* **Communication**

  services such as (send messages , edit message , delete message, receive message)
  
* **Contracts**
 
  services that allow users to connect to each other provides services such as: (send connect request, accept connect request , decline connect request)
  


