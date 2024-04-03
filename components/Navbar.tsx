import LoginButton from './LoginButton';
import foodIcon from '../svg/food.svg';
import { User } from 'firebase/auth';
import Image from 'next/image';



const Navbar  = () => {
  return (
    <nav className="navbar">
      <Image src={foodIcon} alt="Cloud Icon" />
      <h1>Rate Da Food!!</h1>
      <div>
        <LoginButton   />
      </div>
    </nav>
  );
};

export default Navbar;
//user={user} setUser={setUser}
//{ user, setUser })