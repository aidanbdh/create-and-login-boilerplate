const client_id = null
const auth0_domain = null

const lock = new require('auth0-lock')(client_id, auth0_domain)

const button = document.getElementById('login')

const id = localStorage.getItem('id_token')
let profile = {}

const retrieveProfile = email => {
  fetch('/login', {
    method: 'POST',
    'content-type': 'application/json',
    body: JSON.stringify({ email })
  })
    .then(res => {
      profile = res
      //Display profile
      window.alert(`${profile.name} has logged in`)
    })
}

if(id) lock.getProfile(id, (err, { email }) => { retrieveProfile(email)})

lock.on('authenticated', ({ idToken }) => {
  lock.getProfile(idToken, (err, { email }) => {
    if(err) return;
    localStorage.setItem('id_token', idToken)
    button.textContent = 'logout'
    retrieveProfile(email)
  })
})

const logout = () => {
  profile = {}
  button.textContent = 'login'
  localStorage.removeItem('id_token')
  window.location.href = '/'
}

button.addEventListener('click', () => {
  button.textContent === 'login'
    ? lock.show()
    : logout()
})
