import {test,expect} from "@playwright/test";

//Syntax:
/*
test("title",()=>{

//step1
//step2
//step3
    
})

*/

//fixture - global variable  : page, browser


test("Verify page title",async ({page})=>{

   await page.goto("http://www.automationpractice.pl/index.php"); 
   
   //let title:string=await page.title();
   
   console.log("Title:",await page.title());

   await expect(page).toHaveTitle("My Shop"); 

})

test("Verify page URL",async ({page})=>{

    await page.goto("http://www.automationpractice.pl/index.php"); 
    
    let url:string=await page.url();
     console.log("Url:",url);
 
    await expect(page).toHaveURL(/automationpractice/); 
 
 })

test('Verify Amazon card navigation links', async ({ page }) => {
  await page.goto('https://www.amazon.in', {
    waitUntil: 'domcontentloaded'
  });
await page.waitForTimeout(5000);

await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

await page.waitForTimeout(5000);

  const links = page.locator("//*[local-name()='svg' and contains(@class, '_multi-category-card_style_header-icon')]/ancestor::a[1]"
);

console.log("Ancestor links:", await links.count());

const linkCount = await links.count();
for (let i = 0; i < linkCount; i++) {
  const link = links.nth(i);
  const label = await link.getAttribute('aria-label');
  //console.log(`Link ${i + 1}: ${label}`);

  if (label?.includes("deals on laptops")) {
    await link.click();
    await page.waitForTimeout(5000);
    console.log("Clicked on link with label:", label);
  }
}
});

test.only('Select Amazon Devices department', async ({ page }) => {
  await page.goto('https://www.amazon.in', {
    waitUntil: 'domcontentloaded'
  });
  const department = page.locator('#searchDropdownBox');
  await department.selectOption({ label: 'Amazon Devices' });

  await expect(department).toHaveValue('search-alias=amazon-devices');
  await expect(department.locator('option:checked')).toHaveText('Amazon Devices');
});




