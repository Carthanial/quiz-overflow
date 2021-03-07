const db = require('../models/quizModels');

const userController = {};

userController.createUser = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  //check if username already exists
  const checkUserAlreadyExistsQuery = `SELECT username FROM users WHERE username = '${username}'`;
  db.query(checkUserAlreadyExistsQuery, (err0, queryRes0) => {
    if (err0) {
      console.log('err in checkUserAlreadyExistsQuery ', err0);
      return next(err0);
    } else {
      // if user already exists, return next
      if (queryRes0.rows.length) {
        res.locals.alreadyExists = true;
        return next();
      } else {
        // if user does not exist, proceed to create user
        const createUserQuery = `INSERT INTO users (username, password) VALUES ('${username}','${password}')`;
        db.query(createUserQuery, (err, queryRes) => {
          if (err) {
            console.log('err in createUserQuery ', err);
            return next(err);
          } else {
            const addedUserQuery = `SELECT _id FROM users WHERE username = '${username}'`;
            db.query(addedUserQuery, (err2, queryRes2) => {
              if (err) {
                console.log('err in addedUserQuery ', err2);
                return next(err2);
              } else {
                res.locals.userRecord = queryRes2.rows[0];
                res.locals.loggedIn = true;
                return next();
              }
            });
          }
        });
      }
    }
  });
};

userController.verifyUser = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const verifyUserQuery = `SELECT _id, username FROM users WHERE username = '${username}' AND password = '${password}'`;
  db.query(verifyUserQuery, (err, queryRes) => {
    if (err) {
      console.log('err in verifyUserQuery ', err);
      return next(err);
    } else if (queryRes.rows.length) {
      res.locals.userRecord = queryRes.rows[0];
      res.locals.loggedIn = true;
      return next();
    } else return next();
  });
};

module.exports = userController;
