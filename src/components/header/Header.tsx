import './header.css'
import user from '../../assets/user.png';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Header() {
  return (
    <div>
      <div className='header'></div>
      <div className='head1'>User Name</div>
      <img className='user1' src={user} alt=''></img>
      <div className='drp'><KeyboardArrowDownIcon/></div>
    </div>
  )
}
