import { Footer } from '@/components/footer';
import { Header } from '@/components/Header';
const UserLayout = ({ children }) => {
  return (
    <div>
      {/*----------------------------- header start here ------------ */}
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default UserLayout;
