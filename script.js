const slides = Array.from(document.querySelectorAll('.slide'));
const dots = Array.from(document.querySelectorAll('.dot'));
const form = document.querySelector('#signupForm');
const formMessage = document.querySelector('#formMessage');

let activeIndex = 0;

function showSlide(index) {
  activeIndex = (index + slides.length) % slides.length;

  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === activeIndex);
  });

  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === activeIndex);
  });
}

if (slides.length && dots.length) {
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });

  setInterval(() => showSlide(activeIndex + 1), 3200);
}

function resetMessage(isError = false) {
  formMessage.classList.toggle('error', isError);
}

function showMessage(message, isError = false) {
  formMessage.textContent = message;
  formMessage.classList.toggle('error', isError);
}

async function saveRegistration(payload) {
  const appsScriptEndpoint = 'PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';

  if (appsScriptEndpoint && appsScriptEndpoint !== 'PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE') {
    const response = await fetch(appsScriptEndpoint, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Google Apps Script submission failed');
    }

    return { status: 'success', source: 'apps-script' };
  }

  const storageKey = 'travel-registration-fallback';
  const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
  existing.push(payload);
  localStorage.setItem(storageKey, JSON.stringify(existing));

  return { status: 'success', source: 'local-storage' };
}

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  resetMessage(false);

  const formData = new FormData(form);
  const payload = {
    name: String(formData.get('name') || '').trim(),
    email: String(formData.get('email') || '').trim(),
    department: String(formData.get('department') || '').trim(),
    phone: String(formData.get('phone') || '').trim(),
    title: String(formData.get('title') || '').trim()
  };

  if (!payload.name || !payload.email || !payload.phone) {
    showMessage('請填寫姓名、Email 及手機欄位。', true);
    return;
  }

  try {
    await saveRegistration(payload);
    form.reset();
    showMessage('報名成功，資料已送出。');
  } catch (error) {
    console.error(error);
    showMessage('資料送出發生錯誤，請稍後再試。', true);
  }
});
