import { useState } from 'react';
import Logo from '../../assets/logo.png'
import Banner from '../../assets/banner.jpg'
import { Input } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Alert } from '../../utils/alert/Alert';
import { useUser } from '../../contexts/UserContext';
import { UserLogin } from '../../services/User';
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const { login } = useUser()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        if (!email) {
            Alert('Informe seu e-mail', '', false, false, true);
            return;
        }
        if (!password) {
            Alert('Informe sua senha', '', false, false, true);
            return;
        }
        UserLogin({
            email,
            password
        }, user => {
            login(user);
            Alert('Login realizado com sucesso!', 'logo você será redirecionado')
            window.location.href = "/";
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
            <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-lg overflow-hidden max-w-5xl w-full">
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    <div className="flex justify-center mb-6">
                        <img
                            src={Logo}
                            alt="Logo"
                            className="w-1/2 rounded-lg"
                        />
                    </div>
                    <form onSubmit={e => { e.preventDefault(); handleSubmit() }}>
                        <Input
                            label='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="seu@email.com"
                        />
                        <Input
                            label='Senha'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Senha"
                        />
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                id="showPassword"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                                className="mr-2"
                            />
                            <label htmlFor="showPassword" className="text-sm">Visualizar Senha</label>
                        </div>
                        <Button className='w-full'>Entrar</Button>
                    </form>
                </div>

                <div className="md:w-1/2 relative hidden md:block">
                    <img
                        src={Banner}
                        alt="Login Background"
                        className="object-cover w-full h-full"
                    />
                    <div className="front-bold absolute inset-0 bg-black/50 flex flex-col justify-center px-8 text-white">
                        <h2 className="text-3xl font-semibold mb-2">Bem-vindo!</h2>
                        <p className="text-xl">Unidos, conquistamos mais</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
