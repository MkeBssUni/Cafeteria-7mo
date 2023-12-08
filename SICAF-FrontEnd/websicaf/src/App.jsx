import './App.css';
import AppRouter from './shared/components/AppRouter';

localStorage.setItem("userRole","Empleado")

function App() {
  return (
    <AppRouter/>
  );
}

export default App;
