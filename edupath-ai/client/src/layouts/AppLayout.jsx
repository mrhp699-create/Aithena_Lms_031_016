import { Outlet } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
const AppLayout = () => <><AnimatedBackground/><Navbar/><main><Outlet/></main><Footer/></>;
export default AppLayout;
