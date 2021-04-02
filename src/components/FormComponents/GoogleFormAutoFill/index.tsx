import React, { useCallback } from 'react';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import IGoogleProfileObjectDTO from '../../../dtos/IGoogleProfileObjectDTO';

import { Container } from './styles';

interface IProps {
  buttonText: string;
  handleGetUserInfo: (data: IGoogleProfileObjectDTO) => void;
}

const GoogleFormAutoFill: React.FC<IProps> = ({
  buttonText,
  handleGetUserInfo,
}) => {
  const url = process.env.REACT_APP_URL;
  const client = process.env.REACT_APP_URL_GOOGLE_CLIENT_ID;

  const onSuccess = useCallback(
    (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      if ('googleId' in res) {
        // console.log('[Google Success] user =>', res);
        handleGetUserInfo(res.profileObj);
      }
    },
    [handleGetUserInfo],
  );

  const onFailure = useCallback(
    async (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      console.log('[Login Failed] response:', res);
    },
    [],
  );

  return (
    <Container>
      {url && client && (
        <GoogleLogin
          clientId={client}
          buttonText={buttonText}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={url}
          isSignedIn
        />
      )}
    </Container>
  );
};

export default GoogleFormAutoFill;
