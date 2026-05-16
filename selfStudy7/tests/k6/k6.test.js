import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 107,
    duration: '60s',
};

// The default exported function is gonna be picked up by k6 as the entry point for the test script. It will be executed repeatedly in "iterations" for the whole duration of the test.
export default function () {
    // Make a GET request to the target URL
    const res = http.get('http://host.docker.internal:5000/');
    check(res, { 'status was 200': (r) => r.status == 200 });

    // Sleep for 1 second to simulate real-world usage
    sleep(1);
}