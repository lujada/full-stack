import React from 'react'

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
        value={username}
        onChange={handleUsernameChange} />
  </div>

  <div>
    Password: 
    <input type="password" 
    value={password}
    onChange={handlePasswordChange}/>
  </div>    

  <button type="submit">login</button>
   </form>
)
    }

export default LoginForm