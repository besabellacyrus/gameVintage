import React from 'react'
import '../assets/css/error.scss'
function ErrorPopUp({ errorTitle, errorContent, hasError = false }) {
  console.log({ errorContent })
  return  (
    <>
      { hasError &&

        <div id="error-container">
            <div className="error-body">
              <div className="title">{ errorTitle }</div>
              <div className="content">{ errorContent }</div>
            </div>
          </div>
      }
    </>
  )
}

export default ErrorPopUp
