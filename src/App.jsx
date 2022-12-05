import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import Header from './components/Header';
import useUserStore from './hooks/useUserStore';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OrderDetailPage from './pages/OrderDetailPage';
import OrderPage from './pages/OrderPage';
import OrdersPage from './pages/OrdersPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductsPage from './pages/ProductsPage';
import SignUpPage from './pages/SignUpPage';
import { apiService } from './services/ApiService';

import defaultTheme from './styles/defaultTheme';

import GlobalStyle from './styles/GlobalStyle';

export default function App() {
  const userStore = useUserStore();

  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    apiService.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      userStore.fetchUser();
    }
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrderDetailPage />} />
        </Routes>
      </main>
    </ThemeProvider>
  );
}
