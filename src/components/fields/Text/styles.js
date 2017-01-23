import reactCSS from 'reactcss'

export default reactCSS({
  'default': {
    container: {
      width: '100%'
    },
    input: {
      width: '100%',
      boxSizing: 'border-box',
      fontSize: '20px',
      fontFamily: 'inherit',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#eee',
      padding: '10px',
      outline: 'none'
    },
    error: {
      color: '#ff3030',
      marginTop: 10
    }
  }
})
