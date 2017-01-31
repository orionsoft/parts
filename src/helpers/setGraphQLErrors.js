const showMessage = function (component, error) {
  const show = component.props.showMessage
  if (!show) return
  show(error.message, {level: 'error'})
}

export default function (component, errorInput) {
  if (!errorInput.graphQLErrors) return showMessage(component, errorInput)
  for (const error of errorInput.graphQLErrors) {
    if (!error || !error.details) return showMessage(component, error)
    const errorMessages = error.details.invalidKeys
    if (!errorMessages) return showMessage(component, error)
    component.setState({errorMessages})
  }
}
