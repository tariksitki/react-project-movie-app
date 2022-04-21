
import './App.css';
import AuthContextProvider from './context/AuthContext';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <div className="App">
      <AuthContextProvider >
          <AppRouter />
      </AuthContextProvider>
      {/* Aslinda bu yapinin asil hali sudur 
      <AuthContextProvider children = { <AppRouter />}  */}
    </div>
  );
}

export default App;

// biz app js icinde birsey yapmiyoruz. hersey AppRouter icinde. o nedenle router i sarmallamamiz yeterli.

// Burada Approuter, provider in children i oldu ve bunu provider props olarak kullanacak.