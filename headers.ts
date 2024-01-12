//https://developer.mozilla.org/en-US/docs/Web/API/Headers

//create new Headers object using constructor
const headers = new Headers();

//instance methods append, delete, entries/keys/values, forEach, get(str),
//set, has(bool), getSetCookie(arr)

headers.set('content-type', 'text/html');
console.log(headers); //object that is instance of Header class

//can set different headers for different fetch requests. Headers object more appropriate to use rather than just an object as it has a Header API and is easier to work with in context of creating headers
