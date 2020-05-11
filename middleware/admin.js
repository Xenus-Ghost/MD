export default function ({ store }) {
  return !!store.state.auth.user.roles.find((result) => result.id === 1)
}
