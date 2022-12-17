# Creation of an API (ExpressJS)

## 🌟 Purpose
> Build a REST API with ExpressJS with Presentation Layer, Business Logic Layer and Database Layer
> Authenticate users and secure access to backend data
> Limit user access to resources

## How to run
1. Install existing packages with `npm install`
   > ```shell
   >  npm install
   > ```
2. Add NPM packages `mongoose`, `dotenv` and `express`
   > ```shell
   > npm install --save mongoose
   > npm install --save dotenv
   > npm install --save express
   > ```
3. Put your database credentials and your JSON Web Token secret in a file named `.env` like:
   > ```dotenv 
   > MONGO_URI=mongodb://username:password@host:port/database
   > JWTSECRET=ceciestmonsecretdejwt
   > ```

## How to use
API requests according to the different routes (http://localhost:3000)
> GET  /users --> to get all users
> POST /users/register --> send JSON with username and password
> POST /users/login --> give username and password in your query || you'll receive a token to have access to other routes according to your role level
> GET  /users/me --> see the user logged in
> PUT  /users/me --> update current user (send JSON of modification)
> DEL  /users/me --> delete current user
> GET  /locations --> to get all locations
> POST /locations --> create location (JSON)
> GET  /locations/:id --> to get one location by id
> DEL  /locations/:id --> delete one location by id

## Security
Once a registration request is received, the password is `hashed` with bcrypt and a salt, and the user is stored with this hashed
password in database.

Once a login request is received, the backend will hash the password and compare it with the hash stored on the user.
If hashes match, the backend will deliver a JSON Web Token (JWT), a proof of authentication containing the user's ID.

In this project, a normal user can only GET locations and manage his account.
You need to have the role "admin" to get all users or create, modify or delete locations.

### Improvements
> I tried the JWT breach when "alg": "none" but the library is already protecting us from this attack
Still no httpS and no query limit to protect from denial of service  

## SonarCloud
[SonarCloud](https://sonarcloud.io/summary/overall?id=ArthurVaret_secure-web-dev-workshop3)
> Shouldn't trust user input in case of noSQL injection