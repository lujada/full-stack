import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange
}) => {
  return(
    <form onSubmit={handleSubmit}>
      <div>
        Username:
        <input
          id='username'
          value={username}
          onChange={handleUsernameChange} />
      </div>

      <div>
    Password:
        <input
          id='password'
          type='password'
          value={password}
          onChange={handlePasswordChange}/>
      </div>

      <button id='login-button' type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm