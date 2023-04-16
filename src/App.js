import { BrowserRouter, Routes, Route } from "react-router-dom";
import LedgerTable from './components/LedgerTable';
import Navbar from "./components/Navbar";
import ExpenseGraph from './components/ExpenseGraph';
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<LedgerTable />} />
          <Route path="/expense-graph" element={<ExpenseGraph />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
