import { useState, useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from "./userContext";
import Footer from './components/Footer';
import Header from "./components/Header";
import Boxes from "./components/Boxes";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import AddBox from './components/AddBox';
import EditBox from './components/EditBox';
import EditBoxForm from './components/EditBox';
import Logs from './components/Logs';
import BoxesAndLogs from './components/BoxesAndLogs';
import LandingPage from './components/Landing';
import Admin from './components/Admin';
import User from './components/User';
import EditUser from './components/editUser';
import Info from './components/Info';
import AddUser from './components/AddUser';

function App() {
  /**
   * Podatek o tem, ali je uporabnik prijavljen ali ne, bomo potrebovali v vseh komponentah.
   * State je dosegljiv samo znotraj trenutne komponente. Če želimo deliti spremenljivke z
   * ostalimi komponentami, moramo uporabiti Context.
   * Vsebino Contexta smo definirali v datoteki userContext.js. Poleg objekta 'user', potrebujemo
   * še funkcijo, ki bo omogočala posodabljanje te vrednosti. To funkcijo definiramo v komponenti App
   * (updateUserData). V render metodi pripravimo UserContext.Provider, naš Context je potem dosegljiv
   * v vseh komponentah, ki se nahajajo znotraj tega providerja.
   * V komponenti Login ob uspešni prijavi nastavimo userContext na objekt s trenutno prijavljenim uporabnikom.
   * Ostale komponente (npr. Header) lahko uporabijo UserContext.Consumer, da dostopajo do prijavljenega
   * uporabnika.
   * Context se osveži, vsakič ko osvežimo aplikacijo v brskalniku. Da preprečimo neželeno odjavo uporabnika,
   * lahko context trajno hranimo v localStorage v brskalniku.
   */
  const [user, setUser] = useState(localStorage.user ? JSON.parse(localStorage.user) : null);
  const updateUserData = (userInfo) => {
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUser(userInfo);
  }

  /**
   * Na vrhu vključimo komponento Header, z naslovom in menijem.
   * Nato vključimo Router, ki prikaže ustrezno komponento v odvisnosti od URL naslova.
   * Pomembno je, da za navigacijo in preusmeritve uporabljamo komponenti Link in Navigate, ki sta
   * definirani v react-router-dom modulu. Na ta način izvedemo navigacijo brez osveževanja
   * strani. Klasične metode (<a href=""> in window.location) bi pomenile osvežitev aplikacije
   * in s tem dodatno obremenitev (ponovni izris komponente Header, ponastavitev Contextov,...)
   */
  return (
    <BrowserRouter>
      <UserContext.Provider value={{
        user: user,
        setUserContext: updateUserData
      }}>
        <div className="App">
          <Header title="Pametni Paketnik"></Header>
          <Routes>
            <Route path="/" exact element={<LandingPage />}></Route>
            <Route path="/admin" exact element={<Admin />}></Route>
            <Route path="/home" exact element={<BoxesAndLogs />}></Route>
            <Route path="/login" exact element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/publish" element={<AddBox />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/editBox" element={<EditBoxForm />}></Route>
            <Route path="/editUser" element={<EditUser />}></Route>
            <Route path="/info" element={<Info />}></Route>
            <Route path="/AddUser" element={<AddUser />}></Route>
          </Routes>
          <Footer></Footer>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
