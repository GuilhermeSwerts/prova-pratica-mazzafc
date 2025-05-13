import { IoMenu } from 'react-icons/io5';
import Help from './DropdownHelp';
import UserMenu from './DropdownProfile';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { useUser } from '../../contexts/UserContext';

type headerProps = {
    sidebarOpen: boolean,
    setSidebarOpen: Function
};

function Header({
    sidebarOpen,
    setSidebarOpen,
}: headerProps) {
    const navigate = useNavigate();
    return (
        <header className={`sticky top-0 before:absolute before:inset-0 before:backdrop-blur-md max-lg:before:bg-white/90 dark:max-lg:before:bg-gray-800/90 before:-z-10 z-30`}>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className={`flex items-center justify-between h-16 lg:border-b border-gray-200 dark:border-gray-700/60`}>
                    <Button
                        variant='outline'
                        onClick={() => navigate(-1)}
                    >Voltar</Button>
                    <div className="flex">
                        <button
                            className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 lg:hidden"
                            aria-controls="sidebar"
                            aria-expanded={sidebarOpen}
                            onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen); }}
                        >
                            <IoMenu size={25} />
                        </button>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Help align="right" />
                        <hr className="w-px h-6 bg-gray-200 dark:bg-gray-700/60 border-none" />
                        <UserMenu align="right" />
                    </div>

                </div>
            </div>
        </header>
    );
}

export default Header;