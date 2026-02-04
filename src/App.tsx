import { useState } from 'react';
import LandingPage from './components/LandingPage';
import GettingStarted from './components/GettingStarted';
import CodebaseOverview from './components/CodebaseOverview';
import Subsystems from './components/Subsystems';
import OpModes from './components/OpModes';
import HowItWorks from './components/HowItWorks';
import CommonMistakes from './components/CommonMistakes';
import Navigation from './components/Navigation';

export type Page = 'landing' | 'getting-started' | 'codebase' | 'subsystems' | 'opmodes' | 'how-it-works' | 'mistakes';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'getting-started':
        return <GettingStarted />;
      case 'codebase':
        return <CodebaseOverview />;
      case 'subsystems':
        return <Subsystems />;
      case 'opmodes':
        return <OpModes />;
      case 'how-it-works':
        return <HowItWorks />;
      case 'mistakes':
        return <CommonMistakes />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {currentPage !== 'landing' && (
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      )}
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
