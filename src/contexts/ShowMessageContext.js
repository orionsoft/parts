import React from 'react'

export default React.createContext(() => {
  throw new Error('Message provider is not mounted')
})
