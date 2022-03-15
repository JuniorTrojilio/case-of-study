// get version from package
import pkg from '../../package.json'

const VERSION = pkg.version

function App() {
	return <h1>{VERSION}</h1>
}

export default App
