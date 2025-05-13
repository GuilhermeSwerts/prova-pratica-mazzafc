import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './routes/routes';
import NotFound from './pages/notFound/NotFound';
import { LoaderProvider } from './contexts/LoaderContext';
import { UserProvider } from './contexts/UserContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <LoaderProvider >
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            {routes.map(route =>
              <Route path={`${route.path}`} element={route.component} />
            )}
            <Route path="/" element={<Navigate to={`${routes[1].path}`} replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LoaderProvider>
    </UserProvider >
  </StrictMode>
)
