export default function (component, errorInput) {
  if (!errorInput.graphQLErrors) return
  const error = errorInput.graphQLErrors[0]
  if (!error || !error.details) return
  const errorMessages = error.details.invalidKeys
  if (!errorMessages) return
  component.setState({errorMessages})
}
