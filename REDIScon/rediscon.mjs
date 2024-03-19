import { createClient } from "redis"

const cl = createClient();
cl.on('error', err => console.log("Redis error", err));
await cl.connect();

const hashKey = 'myhash';
const hashInfo = await cl.hgetall(hashKey);
console.log(hashInfo);

export default cl;