import React from 'react';
import LoginButton from './LoginButton';
import SearchBar from './SearchBar';
import cloudIcon from '../svg/cloud.svg';
import "./Navbar.css";
import { User } from 'firebase/auth';

// interface User {
//   displayName: string;
//   // Add other user properties as needed
// }

interface NavbarProps {
//   user: User | null;
//   setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Navbar: React.FC< NavbarProps> = () => {
  return (
    <nav className="navbar">
      <img src={cloudIcon} alt="Cloud Icon" />
      <h1>Ondřejův mrak</h1>
      <div>
        <LoginButton   />
      </div>
    </nav>
  );
};

export default Navbar;
//user={user} setUser={setUser}
//{ user, setUser })