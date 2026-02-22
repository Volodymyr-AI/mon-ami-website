import '../styles/global.css';

import { MainLayout } from '../shared/layout/MainLayout';
import HomePage from '../pages/HomePage';
import StoryPage from '../pages/StoryPage';

function App() {
  return (
    <MainLayout>
      <HomePage />
      <StoryPage />
    </MainLayout>
  );
}

export default App;
