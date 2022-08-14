import { Outlet } from 'react-router-dom';
import { BigSidebar, Navbar, SmallSidebar } from '../../components';
import Wrapper from '../../assets/wrappers/SharedLayout';
const SharedLayout = () => {
  return (
    <Wrapper>
      <main className='dashboard'>
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};
export default SharedLayout;
