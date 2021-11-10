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


## API Documentation

**Login User**
----
  Returns json data about a single user.

* **URL**

  /login

* **Method:**

  `POST`
  
*  **Body Params**

   **Required:**
 
   `username:[String]`,
   `password:[String]`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : [userId], Token : "Michael Bloom" , msg:"logged in successfully" }`
 
* **Error Response:**

  * **Code:** 401 unauthorizied <br />
    **Content:** `{ msg : "User doesn't exist" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "an unexpected error has occurred" }`
    
  OR

  * **Code:** 422 unprocessable entity <br />
    **Content:** `{ msg : "conflict in input" }`

  OR

  * **Code:** 400 bad request <br />
    **Content:** `{ error : "missing parameters" }`

**SignUp User**
----
  Creats a user account.

* **URL**

  /signup

* **Method:**

  `POST`
  
*  **Body Params**

   **Required:**
 
   `username:[String]`,
   `password:[String]`,
   `email:[String]`


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ userId : [userId], msg:"User created successfully" }`
 
* **Error Response:**

  * **Code:** 422 unprocessable entity <br />
    **Content:** `{ msg : "conflict in input" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "an unexpected error has occurred" }`

