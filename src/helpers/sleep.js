export default async function (waitTime) {
  return new Promise(function (resolve) {
    setTimeout(resolve, waitTime)
  })
}
