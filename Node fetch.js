// Shim for node-fetch
// This ensures we always use the built-in fetch in React Native
export default (...args) => globalThis.fetch(...args);
