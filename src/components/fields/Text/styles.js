import reactCSS from 'reactcss'

export default reactCSS({
  'default': {
    container: {
      display: 'flex',
      width: '100%',
      boxSizing: 'border-box',
      fontSize: '20px',
      fontFamily: 'inherit',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#eee'
    },
    input: {
      flex: 1,
      boxSizing: 'border-box',
      fontSize: '20px',
      fontFamily: 'inherit',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#eee',
      padding: '10px',
      outline: 'none'
    },
    otherContainer: {
      textAlign: 'right',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10
    },
    error: {
      color: '#ff3030',
      marginTop: 10
    }
  }
})
