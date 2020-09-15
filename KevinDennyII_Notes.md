For the read of User Types I wanted to use the following code snippet:

```
{userTypes.map((userType) => {
    return (
        <input
        type="radio"
        value="userType"
        //checked={Object.is(users)}
        name="userType"
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

This is why you see an `UserTypes.js` file under UserDetails
