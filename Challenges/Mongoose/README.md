# Express + Mongoose Challenge

In this challenge you will refactor the app created in previous [Express](Express) Challenge 

1. First you will need a mongo db instance, for this we will use docker. make sure you have docker installed on your machine. open your Terminal and run the following commands
``` bash
$ docker pull mongo 
$ docker run mongo -p 27017:27017

```
2. Update your task service to use mongoose and connect to mongodb:
``` javascript 
    const MONGO_HOST  = process.env.NODE_ENV === 'production' ? 'mongodb' : 'localhost';
    const db = mongoose.connect(`mongodb://${MONGO_HOST}:27017/movies`);
```

3. create a task mongoose [schema](http://mongoosejs.com/docs/guide.html) & [model](http://mongoosejs.com/docs/models.html)

4. update your task service to use the schema and model methods for CRUD operations.



