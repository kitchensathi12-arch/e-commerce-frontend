import { Link } from 'react-router-dom';
import Logo from '../../assets/Images/Logos/Logo.jpg';
import { Icon, Search, ShoppingCart } from 'lucide-react';

interface NavItem {
  title: string;
  link: string;
}

const navItems: NavItem[] = [
  { title: 'Home', link: '/' },
  { title: 'Shop', link: '/all-products' },
  { title: 'Brands', link: '/brand-detail' },
  { title: 'About Us', link: '/about' },
  { title: 'Contact', link: '/contact' },
];

const Header = () => {
  return (
    <div className="max-w-[100vw] h-20 bg-green-400">
      <div className=" flex h-full items-center justify-evenly gap-10" >
        <img src={Logo} alt="logo" className="h-10 w-10" />
        <div>
          {
            navItems.map((item: NavItem) => (
              <Link key={item.title} to={item.link} className="mx-4 text-white font-semibold hover:text-gray-200">
                {item.title}
              </Link>
            ))
          }
        </div>
        <div className='flex gap-5 ' >
        <ShoppingCart />
        <Search />
        </div>
      </div>

    </div>
  )
}

export default Header