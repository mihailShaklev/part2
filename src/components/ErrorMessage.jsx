const ErrorMessage = ({ message }) => {
    if (message) {
      return (
        <div className='error-message'>
          {message}
        </div>
      )
    }

    return null

  }

  export default ErrorMessage