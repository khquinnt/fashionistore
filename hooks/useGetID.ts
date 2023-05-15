import { v4 as uuidv4 } from 'uuid'
// Import useResizeWindow to Header component
export default function useGetID() {
	return uuidv4()
}
