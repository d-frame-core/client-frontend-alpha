/** @format */

import './header.css';
import user from '../../assets/user.png';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';

import { Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import { useContext } from 'react';
import { MyContext } from '../context/Context';
export default function Header() {
  const { companyName, companyImage } = useContext(MyContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDisconnect = async () => {
    // Disconnect from the provider when the button is clicked
    if ((window as any).ethereum) {
      (window as any).ethereum.removeAllListeners();
    }
    // Disconnect from the provider.
    console.log('Disconnecting the provider');
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('tokenForClient');

    // navigate to home page
    navigate('/');
  };
  return (
    <div className='header'>
      {companyImage.length > 2 ? (
        <img
          src={companyImage}
          alt='user'
          className='user1'
          id='profilePicture'
        />
      ) : (
        <img
          src={user}
          alt='user'
          className='user1'
          id='profilePicture'
        />
      )}
      {/* split and display first two words if words are small, else only first word */}
      <div
        className='head1'
        title={
          companyName.split(' ').length > 1
            ? companyName.split(' ')[0] + ' ' + companyName.split(' ')[1]
            : companyName.split(' ')[0]
        }>
        {companyName.split(' ').length > 1
          ? (companyName.split(' ')[0] + ' ' + companyName.split(' ')[1]).slice(
              0,
              8
            )
          : companyName.split(' ')[0].slice(0, 8)}
        ...
      </div>
      <div
        className='drp'
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={(e) => handleClick(e as any)}>
        <KeyboardArrowDownIcon />
      </div>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem onClick={() => handleClose()}>
          <div onClick={() => handleDisconnect()}>Logout</div>
        </MenuItem>
      </Menu>
    </div>
  );
}
