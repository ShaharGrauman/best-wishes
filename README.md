# Best Wish
## **REST API**

### No Authentication is required for the following endpoints:

**POST /login**
{
    email, 
    password (min 6 chars)
}

**POST /register**
{
	username (min 2 chars),
    email, 
    password (min 6 chars)
}

**GET /event/id**

### Authentication is required for the following endpoints:

*Use Authorization header with value of: Bearer userId:(user id here)*

GET /user/my-events

POST /user/new-event
{
    title (min 2 chars),
    category (number),
    startDate, (date, like "08-05-2018 19:00")
    endDate (date, later than startDate),
    location (min 2 chars)
}