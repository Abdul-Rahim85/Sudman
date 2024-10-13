// This code process the login request and respons
const form = document.querySelector('form');
const userNameError = document.querySelector('.userName.error')
const passwordError = document.querySelector('.password.error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // reset errors
  userNameError.textContent = '';
  passwordError.textContent = '';

  // get the input feild data
  const userName = form.userName.value;
  const password = form.password.value;

  try {
    const res = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({userName, password}),
      headers: {'Content-Type': 'application/json'}
    });
    const data = await res.json();    
    if (data.errors) {
      userNameError.textContent = data.errors.userName;
      passwordError.textContent = data.errors.password;
    }

    if(data.admin) {
      location.assign('/dashboard');
    }

  } catch (err) {
    console.log(err);
  }
});

// This part of code is used to send request to get a device details
const detectDeviceForm = document.getElementById('detectDevice');

detectDeviceForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const deviceSerialNumber = detectDeviceForm.serialNumber.value;

  try {
    const res = await fetch(`/dashboard/detectDevice/${deviceSerialNumber}`,{
      method: 'GET',
    });
  } catch (err) {
    console.log(err);
    
  }

});

