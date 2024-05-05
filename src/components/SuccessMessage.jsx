const SuccessMessage = ({ message }) => {
    if (message) {
      return (
        <div className='success-message'>
          {message}
        </div>
      )
    }

    return null

  }

  export default SuccessMessage