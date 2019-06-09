# Best Wish
## **REST API**

### No Authentication is required for the following endpoints:

**POST /login**
```javascript
{
    email, 
    password //(min 6 chars)
}
```

**POST /register**
```javascript
{
	username, //(min 2 chars),
    email, 
    password  //(min 6 chars)
}

**GET /event/id**


### Authentication is required for the following endpoints:


*Use Authorization header with value of -  __Bearer userId:(user id here)__*

**GET /user/my-events**

**POST /user/new-event**
```javascript
{
    title,     //(min 2 chars),
    category,  //(number),
    startDate, //(date, like "08-05-2018 19:00")
    endDate,   //(date, later than startDate),
    location   //(min 2 chars)
}
```