import './navbar.css';
const Navbar=()=> {
  return (
    <div className='header'>
      <img src='/images/1.png'/>
      <div className='navbar'>
        <ul>
          <li>HOME</li>
          <li>ABOUT</li>
          <li>DEVELOPER</li>
          <li><div className="search">
          <input type="text" placeholder="Search..." />
        </div></li>
          <li><img src='/images/sign_in.png'/></li>
        </ul>
        
      </div>
    </div>
  );
}

export default Navbar;