const { chromium } = require("playwright");
const path = require("path");

(async () => {
  const projectRoot = process.cwd();
  const htmlPath = path.resolve(projectRoot, "output", "output.html");
  const pdfPath  = path.resolve(projectRoot, "output", "output.pdf");

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Windows needs file:/// URL with forward slashes
  const fileUrl = "file:///" + htmlPath.replace(/\\/g, "/");

  await page.goto(fileUrl, { waitUntil: "networkidle" });

  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    margin: { top: "20mm", right: "15mm", bottom: "20mm", left: "15mm" },
  });

  await browser.close();
  console.log("OK: wrote", pdfPath);
})();
