const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const wait = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ 
    headless: "new",
    defaultViewport: { width: 1440, height: 900 }
  });
  const page = await browser.newPage();
  
  const imgDir = path.join(__dirname, '../Images');
  
  // Clean Images dir safely
  try {
      const files = fs.readdirSync(imgDir);
      for (const file of files) {
          if (file.endsWith('.png')) {
              fs.unlinkSync(path.join(imgDir, file));
          }
      }
  } catch (e) {}
  
  const baseUrl = 'http://localhost:5173';

  try {
    // 1. Landing
    console.log('Capturing Landing...');
    await page.goto(baseUrl);
    await wait(2000);
    await page.screenshot({ path: path.join(imgDir, '01_landing.png') });

    // 2. Register Edge Cases
    console.log('Capturing Register...');
    await page.click('a[href="/register"]');
    await wait(1000);
    await page.screenshot({ path: path.join(imgDir, '02_register.png') });
    await page.click('button[type="submit"]'); // Trigger validation errors
    await wait(500);
    await page.screenshot({ path: path.join(imgDir, '03_register_validation_errors.png') });

    // 3. Login
    console.log('Going to Login...');
    await page.click('a[href="/login"]');
    await wait(1000);
    await page.screenshot({ path: path.join(imgDir, '04_login.png') });

    // ==========================================
    // RECRUITER FLOW
    // ==========================================
    console.log('Logging in as Recruiter...');
    await page.type('input[type="email"]', 'recruiter@test.com');
    await page.type('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await wait(2000);

    console.log('Capturing Recruiter Dashboard...');
    await page.screenshot({ path: path.join(imgDir, '05_recruiter_dashboard.png') });

    console.log('Capturing Recruiter Jobs...');
    await page.goto(`${baseUrl}/recruiter/jobs`);
    await wait(2000);
    await page.screenshot({ path: path.join(imgDir, '06_recruiter_jobs.png') });

    console.log('Capturing Edit Job Modal (Edge Case)...');
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button, a'));
        const editBtn = btns.find(b => b.innerText.includes('Edit') || b.href?.includes('/edit'));
        if(editBtn) editBtn.click();
    });
    await wait(2000);
    await page.screenshot({ path: path.join(imgDir, '07_recruiter_edit_job.png') });

    console.log('Capturing Create Job Validation (Edge Case)...');
    await page.goto(`${baseUrl}/recruiter/jobs/create`);
    await wait(1000);
    await page.click('button[type="submit"]'); // trigger errors
    await wait(500);
    await page.screenshot({ path: path.join(imgDir, '08_recruiter_create_job_errors.png') });

    console.log('Capturing Recruiter Applications Table...');
    await page.goto(`${baseUrl}/recruiter/applications`);
    await wait(2000);
    await page.screenshot({ path: path.join(imgDir, '09_recruiter_applications.png') });

    console.log('Capturing Interview Modal...');
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const scheduleBtn = btns.find(b => b.innerText.includes('Schedule Interview'));
        if(scheduleBtn) scheduleBtn.click();
    });
    await wait(1000);
    await page.screenshot({ path: path.join(imgDir, '10_recruiter_interview_modal.png') });

    // Close Modal
    await page.keyboard.press('Escape');
    await wait(500);

    console.log('Capturing Recruiter Interviews Table...');
    await page.goto(`${baseUrl}/recruiter/interviews`);
    await wait(2000);
    await page.screenshot({ path: path.join(imgDir, '11_recruiter_interviews.png') });

    console.log('Capturing Recruiter Notifications (Edge Case)...');
    await page.evaluate(() => {
        const bells = document.querySelectorAll('button');
        // Click the notification bell
        for (let b of bells) {
            if (b.innerHTML.includes('lucide-bell')) {
                b.click(); break;
            }
        }
    });
    await wait(1000);
    await page.screenshot({ path: path.join(imgDir, '12_recruiter_notifications.png') });

    console.log('Logging out Recruiter...');
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const logoutBtn = btns.find(b => b.innerText.includes('Logout'));
        if(logoutBtn) logoutBtn.click();
    });
    await wait(2000);

    // ==========================================
    // SEEKER FLOW
    // ==========================================
    console.log('Logging in as Seeker...');
    await page.type('input[type="email"]', 'seeker1@test.com');
    await page.type('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await wait(2000);

    console.log('Capturing Seeker Jobs Search...');
    await page.goto(`${baseUrl}/seeker/jobs`);
    await wait(2000);
    await page.screenshot({ path: path.join(imgDir, '13_seeker_jobs.png') });

    console.log('Capturing Job Details...');
    const viewJobLink = await page.$('a[href^="/seeker/jobs/"]');
    if (viewJobLink) {
        await viewJobLink.click();
        await wait(2000);
        await page.screenshot({ path: path.join(imgDir, '14_seeker_job_details.png') });
        
        console.log('Opening Apply Form & Validation (Edge Case)...');
        await page.evaluate(() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const applyBtn = btns.find(b => b.innerText.includes('Apply Now'));
            if(applyBtn) applyBtn.click();
        });
        await wait(1000);
        await page.click('button[type="submit"]'); // trigger errors
        await wait(500);
        await page.screenshot({ path: path.join(imgDir, '15_seeker_apply_form_errors.png') });
    }

    console.log('Capturing Seeker Applications Tracking...');
    await page.goto(`${baseUrl}/seeker/applications`);
    await wait(2000);
    await page.screenshot({ path: path.join(imgDir, '16_seeker_applications.png') });

    console.log('Capturing Seeker Interviews Table...');
    await page.goto(`${baseUrl}/seeker/interviews`);
    await wait(2000);
    await page.screenshot({ path: path.join(imgDir, '17_seeker_interviews.png') });

    console.log('Capturing Seeker Notifications...');
    await page.evaluate(() => {
        const bells = document.querySelectorAll('button');
        for (let b of bells) {
            if (b.innerHTML.includes('lucide-bell')) {
                b.click(); break;
            }
        }
    });
    await wait(1000);
    await page.screenshot({ path: path.join(imgDir, '18_seeker_notifications.png') });

    console.log('All comprehensive edge-case screenshots captured successfully!');
  } catch (error) {
    console.error('Error during screenshot capture:', error);
  } finally {
    await browser.close();
  }
})();
