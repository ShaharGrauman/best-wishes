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
```

**GET /event/<id>**

**POST /new-wish/<eventId>**
```javascript
{
    from, //(min 2 chars)
    body, //(min 2 chars)
    image //(not required)
}
```

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

**POST /user/new-wish/<eventId>**
```javascript
{
    from, //(min 2 chars)
    body, //(min 2 chars)
    image //(not required)
}
```

**PUT /user/event/<eventId>**
Notice you don't have to send all fields, just the modified

```javascript
{
    title,     //(min 2 chars),
    category,  //(number),
    startDate, //(date, like "08-05-2018 19:00")
    endDate,   //(date, later than startDate),
    location   //(min 2 chars)
}
```