
export default {
  container: {
    position: 'relative',
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
    outline: 'none',
    width: '100%'
  },
  otherContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: 0,
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    opacity: 1,
    transition: 'opacity 0.2s linear'
  },
  error: {
    color: '#ff3030',
    marginTop: 10
  },
  wrapper: {
    flex: 1
  },
  menu: {
    zIndex: 10,
    position: 'fixed',
    borderBottomLeftRadius: '3px',
    borderBottomRightRadius: '3px',
    background: '#fff',
    overflow: 'auto',
    maxHeight: '50%',
    border: '1px solid #eee',
    boxSizing: 'border-box',
    marginTop: -3
  }
}
