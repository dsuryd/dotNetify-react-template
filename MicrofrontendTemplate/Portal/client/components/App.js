import { Fragment, useState, useEffect } from 'react';
import { getAccessToken, validateToken } from '../auth';
import Portal from './Portal';
import Landing from './Landing';

export const CompanyLogo = styled.a`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  background-image: url(https://dotnetify.net/content/images/dotnetify-logo.png);
  background-size: 100% 100%;
  width: 200px;
  height: 39px;
`;

const App = _ => {
  const [ accessToken ] = useState(getAccessToken());
  const [ validatingToken, setValidatingToken ] = useState(null);
  const [ loggedIn, setLoggedIn ] = useState(false);

  useEffect(() => {
    if (validatingToken === null) {
      setValidatingToken(!!accessToken);
      if (accessToken) {
        validateToken(accessToken).then(valid => {
          setLoggedIn(valid);
          setValidatingToken(false);
        });
      }
    }
  });

  if (validatingToken !== false) return <Fragment />;
  return loggedIn ? <Portal /> : <Landing onLoggedIn={() => setLoggedIn(true)} />;
};

export default App;
