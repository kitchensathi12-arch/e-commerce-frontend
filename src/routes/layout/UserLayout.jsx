import { Footer } from '@/components/footer';
import { Header } from '@/components/Header';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div>
      {/*----------------------------- header start here ------------ */}
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserLayout;
