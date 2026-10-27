import { test, expect } from '@playwright/test';

test('Get Request API Test', async ({ request }) => {
   const starttime = Date.now();
   const response = await request.get('https://reqres.in/api/users/2');

   const duration = Date.now() -starttime;

   const responsebody = await response.json();

    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(3000);

    expect(responsebody.data.id).toBe(2);
    expect(responsebody.data.email).toContain('@')
    expect(responsebody.data.first_name).toBeTruthy();
    
});
 

