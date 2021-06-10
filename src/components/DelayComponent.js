import React from 'react'

const DelayComponent = () => {
  const [show, setShow] = React.useState(true)

  React.useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, 5000)
  }, [show])

  if (!show) return null

  return <>OK, Joke Posted</>
}

export default DelayComponent