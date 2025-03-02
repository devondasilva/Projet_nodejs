
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import Register from './components/auth/Register';
// import Home from './Home';
 import Login from './components/auth/Login';
// import Etudiants from './components/utilisateur/utilisateurs';
// import Ajout from './components/projecteur/ajout';
// import Afficher from './components/projecteur/afficher';
// import Voir from './components/utilisateur/voir';
// import Header from './components/header';
// import Add from './components/action/Ajout';
import Dashboard from './components/Dashboard';
import Afficher from './components/action/affichage';
import React from 'react';



function App() {
  return (
   <>
   <BrowserRouter>
       <Routes>
        {/* <Route path='/register' element={<Register/>}  > </Route>
        <Route path='/home' element={<Home/>}  > </Route>
        <Route path='/Login' element={<Login/>}  > </Route>
        <Route path='/users' element={<Etudiants/>}  > </Route>
        <Route path='/users/:id' element={<Voir/>}  > </Route>
        <Route path='/projecteur/add' element={<Ajout/>}  > </Route>
        <Route path='/projecteur' element={<Afficher/>}  > </Route>
        <Route path='/Header' element={
      <Header>
        <div>Salut</div>
      // </Header>}  > </Route> 
       <Route path='/action/add' element={<Add/>}  > </Route>*/}
       
       
       <Route path='/Login' element={<Login/>}  > </Route>
      <Route path='/' element={<Dashboard/>}  > </Route>
      <Route path='/action' element={<Afficher/>}  > </Route>

      </Routes>
    
   
   </BrowserRouter>
    
   </>
  );
}

export default App;
