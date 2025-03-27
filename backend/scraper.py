from playwright.async_api import async_playwright
import asyncio

async def get_gif_src(query):
    async with async_playwright() as p:
        # Launch the browser and open a new page
        browser = await p.chromium.launch()
        page = await browser.new_page()

        try:
            print("Opening Google Images...")
            await page.goto("https://www.google.com/imghp")

            print("Waiting for search box...")
            await page.wait_for_selector("textarea#APjFqb", timeout=10000, state="visible")

            print("Typing query...")
            await page.fill("textarea#APjFqb", query + " gif")
            await page.keyboard.press("Enter")

            print("Waiting for images to load...")
            await page.wait_for_selector('#rso div div div img')  # Wait for the first image thumbnail to load

            print("Clicking on the first image...")
            first_image = page.locator('#rso div div div img').nth(0)  # Use .nth(0) to select the first image
            await first_image.click()  # Correctly invoke the click method here

            await asyncio.sleep(8)

            print("Waiting for the image viewer to load...")
            # Wait for the main image in the viewer to be fully visible
            gif_viewer = page.locator('//*[@id="Sva75c"]/div[2]/div[2]/div/div[2]/c-wiz/div/div[2]/div/a/img[1]')
            await gif_viewer.wait_for()

            # Extract the 'src' attribute from the image viewer
            gif_src = await gif_viewer.get_attribute("src")

            # Print the actual gif URL
            print(f"GIF src: {gif_src}")
            return gif_src

        except Exception as e:
            print(f"An error occurred: {e}")
            return None
        finally:
            await browser.close()

