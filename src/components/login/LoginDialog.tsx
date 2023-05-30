import React, { Dispatch, SetStateAction } from 'react';
import './LoginDialog.css';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../gql/mutations';
import { Button, Dialog, DialogProps, TextField } from '@mui/material';
import { useUserContext } from '../../auth/AuthContext';
import { IUser } from '../../util/types';


export default function LoginDialog({ open, toggle, setCurrentUser }: { open: boolean, toggle: Dispatch<SetStateAction<boolean>>, setCurrentUser: Dispatch<SetStateAction<IUser | undefined>> }) {
  const { setUserFromToken } = useUserContext();
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const [login, { loading, error }] = useMutation<
    { login: { access_token: string } }
  >(LOGIN);

  const handleClose: DialogProps['onClose'] = (event, reason) => {
    toggle(false);
  }
  
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    login({
      variables: { username, password },
      onError: (error) => {
        console.error(error)
      },
      onCompleted: ({ login }) => {
        localStorage.setItem('token', login.access_token);
        // setUserFromToken(login.access_token);
        setCurrentUser({ username: username, name: username } as IUser)
        toggle(false)
      }
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className="login-wrapper">
        <h1>Please Log In</h1>
        {error && <p>Login Failed...</p> }
        <form onSubmit={handleSubmit}>
          <TextField
            required
            name="username"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            required
            name="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="dense"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 1 }}
          >Log In</Button>
        </form>
      </div>
    </Dialog>
  )
}