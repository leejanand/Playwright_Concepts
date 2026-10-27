import {test,expect } from '@playwright/test';

test('Post Request', async({request}) =>
{

const jsonfile = 'testdata/create-user.json';
const requestbody = JSON.parse(readFileSync(jsonfile,'utf-8'));
const response = await request.post('https://reqres.in/api/users',{data: requestbody});

const body = response.json();

expect(response.status()).toBe(201)
///expect(body.name).toBe(requestbody.name);


});




