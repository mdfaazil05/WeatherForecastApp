import { auth, provider } from '../FirebaseConfig';
import { useState, useRef } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

function Email() { 
  
  const [user, setUser] = useState(null);

  const handleGoogleSignIn = () => {

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        
        setUser(user);
        console.log("user name: "+user.displayName)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div >
      <div >
        {user ? (
            <div >
              <h3 >Welcome {user.displayName}</h3>

              <div >
                <img src={user.photoURL} alt="dp" referrerPolicy='no-referrer'/>
              </div>
              <br />
              <div>
                <Button variant='outlined'  onClick={handleLogout}>
                  LOGOUT
                </Button>
              </div>    
            </div>
        ) : (
          <Button variant="outlined" onClick={handleGoogleSignIn}>
            Login
          </Button>
        )}
      </div>
    </div>
  );
}

export default Email;