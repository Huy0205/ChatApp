import 'react-phone-input-2/lib/style.css';
import './formLogin.scss';
import PhoneInput from 'react-phone-input-2';
import clsx from 'clsx';
import * as authServices from '../../../services/authService';
import { useState, useContext, useEffect, useRef } from 'react';
import { useLang } from '../../../hooks';
import { toast, Toaster } from 'react-hot-toast';
import { AuthContext } from '../../../providers/Auth/AuthProvider';
import { checkValidPhoneNumber } from '../../../utils/phoneUltil';
import Loading from '../../../components/Loading/Loading';
import Overlay from '../../../components/Overlay/Overlay';
import { use } from 'i18next';
import { ref } from 'firebase/storage';
export default function FormLogin({ phoneRegister }) {
    const { i18n, t } = useLang();
    const [phonenumber, setPhone] = useState(phoneRegister);
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const refPassword = useRef();
    const { login, getUser } = useContext(AuthContext);


    useEffect(() => {
       if(phoneRegister){
        setPhone(`+${phoneRegister}`);
        refPassword.current.focus();
       }
    }, [phoneRegister]);

    const handleLogin = async () => {
        try {
            if (!checkValidPhoneNumber(`${phonenumber}`, 'VN')) {
                toast.error('Số điện thoại không đúng định dạng hoặc không hợp lệ!!!');
                return;
            }

            setIsLoading(true);
            const res = await authServices.login({ phonenumber, password });
            console.log(res);
            if (res.errCode === 0) {
                login();
                toast.success(res.message);
                return;
            }
            toast.error(res.message);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div id="form-login">
            {isLoading && (
                <Overlay>
                    <Loading pendingAction />
                </Overlay>
            )}
            <div>
                <PhoneInput
                    country="vn"
                    placeholder={t('Login.placeholder.phone')}
                    value={phonenumber}
                    onChange={(value) => {
                        setPhone(`+${value}`);
                    }}
                />
            </div>
            <div className="input-group flex-nowrap mt-3" style={{ paddingRight: '10px', zIndex: 0 }}>
                <span
                    style={{
                        padding: '0 0 0 10px',
                        width: '39.5px',
                        background: '#f5f5f5',
                    }}
                    className="input-group-text"
                    id="addon-wrapping"
                >
                    <i className="fa-solid fa-lock"></i>
                </span>
                <input
                    ref={refPassword}
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    style={{ height: '35px', zIndex: 0 }}
                    type="password"
                    className="form-control"
                    placeholder={t('Login.placeholder.password')}
                />
            </div>
            <div
                onClick={handleLogin}
                className={clsx('btn btn-primary mt-3 w-100', password && phonenumber.length > 4 ? '' : 'disabled')}
            >
                {t('Login.button.login')}
            </div>

            <div className="forgot-password mt-4">
                <a href="#" className="text-center d-block fs-6 ">
                    {t('Login.button.forgot_password')}{' '}
                </a>
            </div>
        </div>
    );
}
