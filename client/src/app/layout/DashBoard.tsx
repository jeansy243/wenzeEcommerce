import { useSelector } from 'react-redux';
import { selectUser } from '../../features/account/accountSlice';

const Dashboard = () => {
  const user = useSelector(selectUser);

  if (!user) {
    return <div>Veuillez vous connecter</div>;
  }

  return (
    <div>
      <h1>Bienvenue {user.username}</h1>
      {user.role === 'admin' && <button>Accéder à l'administration</button>}
      {user.role === 'user' && <p>Accédez à vos informations personnelles.</p>}
    </div>
  );
};
export default Dashboard;