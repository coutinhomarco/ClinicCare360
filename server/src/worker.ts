import './config/bullmq';

console.log('Worker process started and listening for jobs.');

// Prevent the worker process from exiting immediately
setInterval(() => {}, 1000);
