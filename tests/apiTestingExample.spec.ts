import { test , expect } from '@playwright/test'

test('Test to check different types of api requests.', async({ request })=> {

    await test.step('This test is to check get request.',async() => {
    
        const baseURL = "https://api.freeapi.app/api/v1/public/randomjokes";
        const response = await request.get(baseURL);
        const body = await response.json();
        expect (response.status()).toBe(200)
        const totalItems = body.data.totalItems;
        const jokes = body.data.data;
        const jokeId1 = jokes.find((j: any) => j.id === 1);
        expect(totalItems).toBe(1465);
        expect (jokeId1.content).toBe("Chuck Norris invented the bolt-action rifle, liquor, sexual intercourse, and football-- in that order.");
    
    })

    await test.step('This test is to get a joke which contains the word bolt.',async() => {
    
        const baseURL = "https://api.freeapi.app/api/v1/public/randomjokes";
        const response = await request.get(baseURL);
        const body = await response.json();
        expect (response.status()).toBe(200)
        const jokes = body.data.data;
        const jokeWithMatch = jokes.find((j: any) => j.content.toLowerCase().includes('mother'));
       
        if(jokeWithMatch!==undefined){
            console.log(`Id :${jokeWithMatch.id} content : ${jokeWithMatch.content} `)
        }else{
            console.log('Not found!! Better luck next time.');
        }
    
    })

    await test.step('Check the value of cookies',async() => {
        
        const cookieURL = 'https://api.freeapi.app/api/v1/kitchen-sink/cookies/set';
        const cookieResponse = request.post(cookieURL,{
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            data: {
                'name': 'Ashutosh'
            }
        })
        const headers = (await cookieResponse).headers();
        const setCookieHeader = headers['set-cookie'];
        console.log(setCookieHeader)
        expect(setCookieHeader).toContain('name=Ashutosh');

    })
    
    await test.step('Check post request.',async()=> {

        const postRequestURL  = "https://api.freeapi.app/api/v1/kitchen-sink/http-methods/post";
        const resp = await request.post(
        postRequestURL,
        {
            headers: {
            'accept': 'application/json',
            }
        })
        console.log(resp);
        expect(resp.status()).toBe(200)
    })
})