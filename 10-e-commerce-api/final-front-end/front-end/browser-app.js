const loginFormDOM = document.querySelector('.form');
const emailInput = document.querySelector('.email-input');
const passwordInput = document.querySelector('.password-input');
const testingBtn = document.querySelector('.testing-btn');
const logoutBtn = document.querySelector('.logout-btn');

loginFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!emailInput.value || !passwordInput.value) return;
  const email = emailInput.value;
  const password = passwordInput.value;
  const user = { email, password };
  try {
    const response = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (response.status === 200) {
      emailInput.value = '';
      passwordInput.value = '';
    }
  } catch (error) {
    console.log(error);
  }
});

testingBtn.addEventListener('click', async () => {
  try {
    const response = await fetch('/api/v1');
  } catch (error) {
    console.log(error);
  }
});
logoutBtn.addEventListener('click', async () => {
  try {
    const response = await fetch('/api/v1/auth/logout');
  } catch (error) {
    console.log(error);
  }
});
