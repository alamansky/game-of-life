export default function cloneArray(arr) {
	return JSON.parse(JSON.stringify(arr));
}