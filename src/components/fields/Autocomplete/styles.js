
export default {
  container: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    boxSizing: 'border-box',
    fontSize: '16px',
    fontFamily: 'inherit',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#fff'
  },
  input: {
    flex: 1,
    boxSizing: 'border-box',
    fontSize: '16px',
    fontFamily: 'inherit',
    borderRadius: '4px',
    backgroundColor: '#fff',
    padding: '11px',
    outline: 'none',
    width: '100%',
    border: '1px solid #c2c2c2',
    boxShadow: '0 0 0 1px rgba(220, 220, 220, 0.2)'
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
    marginTop: 10,
    marginBottom: 10
  },
  wrapper: {
    flex: 1
  },
  menu: {
    zIndex: 10,
    position: 'absolute',
    left: 0,
    top: 40,
    maxHeight: 200,
    borderBottomLeftRadius: '3px',
    borderBottomRightRadius: '3px',
    background: '#fff',
    overflow: 'auto',
    border: '1px solid #c2c2c2',
    boxShadow: '0 0 0 1px rgba(220, 220, 220, 0.2)',
    boxSizing: 'border-box'
  }
}
