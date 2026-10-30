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
  const appsScriptEndpoint = 'https://script.google.com/macros/s/AKfycbzNG4BmUl_JVWMVLLbvMRF_UcgiXw9gHOvr0P1ESIiPJdMO_SylPQxUcWOeX2FsNteI/exec';

  const response = await fetch(appsScriptEndpoint, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    },
    body: JSON.stringify(payload)
  });

  if (response.type === 'opaque') {
    return { status: 'sent', confirmed: false, source: 'apps-script' };
  }

  throw new Error('Google Apps Script submission did not return an accessible response');
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
    const result = await saveRegistration(payload);
    if (result.confirmed) {
      form.reset();
      showMessage('報名成功，資料已寫入 Google 試算表。');
    } else {
      showMessage('報名請求已送出，但無法讀取 Google 回覆。請先確認試算表，勿立即重送以免重複。');
    }
  } catch (error) {
    console.error(error);
    showMessage('資料送出發生錯誤，請稍後再試。', true);
  }
});
