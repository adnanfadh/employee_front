import Detail from "./pages/Detail"
import Form from "./pages/Form"
import Index from "./pages/Index"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
function App() {

  return (
    <div style={{padding: "50px 10%", backgroundColor:"#f4f4f4"}}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />}/>
          <Route path="/detail/:id" element={<Detail />}/>
          <Route path="/edit/:id" element={<Form />}/>
          <Route path="/create" element={<Form />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
