import { usePostIsFull } from './ThoughtsEntry2'

export default ({ summary, children }) => {
  const isFull = usePostIsFull()
  return isFull ? children : summary
}
