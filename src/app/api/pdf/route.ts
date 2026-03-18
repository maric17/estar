import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req: NextRequest) {
  let browser;
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Set content or navigate to a URL
    await page.setContent(`
      <h1>Hello from Puppeteer PDF Generator</h1>
      <p>This PDF was generated using Puppeteer in Next.js.</p>
    `);
    
    const pdf = await page.pdf({ format: 'A4' });
    
    return new NextResponse(Buffer.from(pdf), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="document.pdf"',
      },
    });
  } catch (error) {
    console.error("Puppeteer PDF Error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  } finally {
    if (browser) await browser.close();
  }
}
