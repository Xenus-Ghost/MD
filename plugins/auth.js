export default function({ app, $axios }) {
  $axios.onError((error) => {
    if (error.response && error.response.status === 401) {
      app.$auth.reset()
      // $axios.post(
      //   'https://admin.xn--80aaledd0beefeg0ch.xn--p1ai/api/auth/refresh'
      // )
    }

    return Promise.reject(error)
  })
}
