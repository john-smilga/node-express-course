const formDOM = document.querySelector('.form')
const usernameInputDOM = document.querySelector('.username-input')
const passwordInputDOM = document.querySelector('.password-input')
const formAlertDOM = document.querySelector('.form-alert')
const resultDOM = document.querySelector('.result')
const btnDOM = document.querySelector('#data')
const tokenDOM = document.querySelector('.token')

formDOM.addEventListener('submit', async (e) => {
  formAlertDOM.classList.remove('text-success')
  tokenDOM.classList.remove('text-success')

  e.preventDefault()
  const username = usernameInputDOM.value
  const password = passwordInputDOM.value

  try {
    const { data } = await axios.post('/api/v1/login', { username, password })

    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = data.msg

    formAlertDOM.classList.add('text-success')
    usernameInputDOM.value = ''
    passwordInputDOM.value = ''

    localStorage.setItem('token', data.token)
    resultDOM.innerHTML = ''
    tokenDOM.textContent = 'token present'
    tokenDOM.classList.add('text-success')
  } catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = error.response.data.msg
    localStorage.removeItem('token')
    resultDOM.innerHTML = ''
    tokenDOM.textContent = 'no token present'
    tokenDOM.classList.remove('text-success')
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
  }, 2000)
})

btnDOM.addEventListener('click', async () => {
  const token = localStorage.getItem('token')
  try {
    const { data } = await axios.get('/api/v1/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    resultDOM.innerHTML = `<h5>${data.msg}</h5><p>${data.secret}</p>`

    data.secret
  } catch (error) {
    localStorage.removeItem('token')
    resultDOM.innerHTML = `<p>${error.response.data.msg}</p>`
  }
})

const checkToken = () => {
  tokenDOM.classList.remove('text-success')

  const token = localStorage.getItem('token')
  if (token) {
    tokenDOM.textContent = 'token present'
    tokenDOM.classList.add('text-success')
  }
}
checkToken()
