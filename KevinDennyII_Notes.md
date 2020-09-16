###Better performance for grabbing user roles
For the read of User Roles I wanted to use the following code snippet:

```
{userTypes.map((userType) => {
    return (
        <input
        type="radio"
        value={userRole}
        name={userType}
        />
    )`${userType}`;
})}
```

I received the following error that I was unable to resolve 
which I believe I may be able to in due time:
```
UserDetails.component.js:41 
Uncaught TypeError: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(...) is not a function
```

This is why you see an `UserRoles.js` file under UserDetails

###Processing environment variables
I could not figure our when I attempted to deploy to Netlify when it could not find my `.env` when it was processing
a deployment.  It failed every time.  I know it has something to do with specifying my environment (`Node_ENV`). 
During this attempt, I changed the file from `env.js` to `.env` and access the environment variables, using `process.env`
I left those changes in the code on the `index.js` file and commented out. 
