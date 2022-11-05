import Signin from '../../components/user-auth/signin/signin.component';
import Signup from '../../components/user-auth/signup/signup.component';
import { Pane } from 'evergreen-ui'
import { useLocation } from 'react-router-dom';
import LogoIcon from "../../icons/logo-icon/logo-icon.component";
import { selectGuestPending } from '../../redux/user/user.selectors';
import ContentSpinner from '../../components/content-spinner/content-spinner.component';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const viewport = window.innerHeight;

const AuthPage = () => {

  const location = useLocation();
  const { t } = useTranslation(['ui'])
  const guestPending = useSelector(selectGuestPending);

  return (
    <>
      { guestPending && <ContentSpinner waitMessage={t('waitForGuest')} zIndex={10}/> }
      <Pane
        height={viewport*0.85}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        paddingX={60}
      >
        <Pane width={'100%'}>
          <Pane display={'flex'} justifyContent={'center'} marginBottom={50}>
            <LogoIcon />
          </Pane>
          { location.pathname === '/signin' ?
            <Signin /> :
            <Signup />
          }
        </Pane>
      </Pane>
    </>
  )
}

export default AuthPage;
