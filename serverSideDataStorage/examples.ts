// //In-memory storage

// //need to create interface (acts like a class defination/type)for ts to define structure of data
// interface logsStorage {
// 	logs: string[];
// }
// const objectStorage: logsStorage = {
// 	logs: [],
// };
// const mapStorage = new Map();
// mapStorage.set('logs', []);

// function handler(req: Request) {
// 	const url = req.url;
// 	objectStorage.logs.push(url); //can't push object so could also convert new URL() to string
// 	//as long as script is running the array remains persistant with urls being pushed/stored in it
// 	console.log(objectStorage);

// 	mapStorage.set('logs', [...mapStorage.get('logs'), url]);
// 	console.log(mapStorage);
// 	return new Response('in memory storage');
// }
// Deno.serve(handler);
// //-----------------------------------------------------------
//Text file storage (check fileStorage.json)
async function handler(req: Request) {
	const url = req.url;
	//we could use Deno.open which is more flexible from context of what types of files it deals with , but since we know we are dealing with a text/JSON file we can use Deno.read/writeTextFile
	const file = await Deno.readTextFile('fileStorage.json');
	console.log(file);
	const jsonFileData = JSON.parse(file); // parse JSON string to JS obj
	jsonFileData.logs.push(url); //add url to logs array in parsed JSON file
	await Deno.writeTextFile('fileStorage.json', JSON.stringify(jsonFileData));
	console.log(jsonFileData);
	console.log(file);
	return new Response('text file storage');
}

Deno.serve(handler);
