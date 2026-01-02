
import { test, expect,Locator } from '@playwright/test';

test.only('Assessapp Login',async({page})=>{

    await page.goto('https://aram-qa.assessappglobal.com.au/');
    
    await page.waitForTimeout(5000);

    const username:Locator = page.locator("//div[@class='login-container']//div[1]//input[1]")
    await username.fill("leejanand.pandian@eluminaelearning.com.au")
    
    const password:Locator = page.locator("//input[@type='password']")
    await password.fill("DTpkYhM3&B")
    
    const loginbtn:Locator =page.locator('div.submit-butn')
    await expect(loginbtn).toBeVisible();
    await expect(loginbtn).toBeEnabled();
    loginbtn.click();

    await page.waitForTimeout(5000);

    const value:string ="landing-page"
    expect(page.url()).toContain(value);
    
    const iAuthor:Locator =page.locator("div[title='Question Management System'] div[class='icon-holder']")
    
    await page.waitForTimeout(5000);
    iAuthor.click();

    await page.waitForTimeout(5000);

    const [newPage] = await Promise.all([
        page.context().waitForEvent('page')
        //page.click(iAuthor) // or the element that opens the new tab
      ]);
      
      await newPage.waitForLoadState();

    const value1:string ="qms"
    expect(newPage.url()).toContain(value1);

    const searchbox:Locator = newPage.getByPlaceholder('Search Schedule(s)')
    await expect(searchbox).toBeVisible();


    let hasmorepages=true;

    const rows=await newPage.locator('.table tbody tr').all();
    for(let row of rows)
    {
       console.log(await row.innerText());
    }

})
test("Autosuggest dropdown", async({page})=>{

    await page.goto("https://www.google.com/");
    await page.locator("textarea[name='q']").fill("smart");  // Search text
    await page.waitForTimeout(5000);
    const options:Locator=page.locator(':text("smart")');

    const count=await options.count();
    console.log("Number of suggested options:", count);

    console.log("Printing all the auto suggestions.....")
    for(let i=0;i<count;i++)
    {
        //console.log(await options.nth(i).innerText());
        console.log(await options.nth(i).textContent());
    }
    console.log("5 th option:", await options.nth(5).innerText());

     //select/click on the smartphone option

     for(let i=0;i<count;i++)
     {
        const text=await options.nth(i).innerText();
        if(text==='smart card download')
        {
        await options.nth(i).click();
         break;
        }
        
     }
     await page.waitForTimeout(5000);
})

test("blaze", async ({page})=>{

    await page.goto('https://blazedemo.com/');

    const departure:Locator=page.locator("select[name='fromPort']");
    await departure.selectOption("Boston");

    const destination:Locator=page.locator("select[name='toPort']");
    await destination.selectOption("London");

    const findflight:Locator = page.locator("input[value='Find Flights']")
    await findflight.click();

    const table:Locator=page.locator("table.table tbody");
    await expect (table).toBeVisible();
    
    const rows= table.locator("tr");
    const rowCount = await rows.count();

    const prices: string[] = [];
    for (let i = 0; i < rowCount; i++) {
    const price = await rows.nth(i).locator('td').nth(5).innerText(); // 6th column (index 5)
    prices.push(price);
    //console.log(`${price}`);
  }

  const flights: string[] = [];
  for (let i = 0; i < rowCount; i++) {
    const flight = await rows.nth(i).locator('td').nth(2).innerText(); // 6th column (index 5)
    flights.push(flight);
    //console.log(`${flight}`);
  }

console.log("flighs prices"+prices);

const sortedPrices:string[] = [...prices].sort();
const lowestPrice =sortedPrices[0];
console.log('Lowest Price:', lowestPrice);

for (let i = 0; i < rowCount; i++) {
    const price = await rows.nth(i).locator('td').nth(5).innerText(); // 6th column (index 5)
    if(price===lowestPrice)
    {
        await rows.nth(i).locator('td input[type="submit"]').click();
        break;
    }
    
  }
    

})