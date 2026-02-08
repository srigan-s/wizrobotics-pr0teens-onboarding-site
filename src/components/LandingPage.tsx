import { ArrowRight, Book, Code, Lightbulb, Map, Zap, Wrench } from 'lucide-react';
import { Page } from '../App';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16 pt-16">
          <img
            src="/pr0teens-drive-gears-logo-224x300.png"
            alt="Pr0teens Logo"
            className="h-30 w-24 mx-auto mb-6"
          />
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-yellow-500 mb-6">
            Pr0teens Programming Onboarding
          </h1>
          <p className="text-xl sm:text-2xl text-neutral-700 max-w-3xl mx-auto mb-4">
            You don't need experience to start.
          </p>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto mb-12">
            This site helps you understand how our robot code actually works.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('getting-started')}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-neutral-900 bg-yellow-500 rounded-lg hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Here
              <ArrowRight className="ml-2" size={24} />
            </button>
            <button
              onClick={() => onNavigate('codebase')}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-yellow-500 bg-transparent border-2 border-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-neutral-900 transition-all transform hover:scale-105"
            >
              Explore the Codebase
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <FeatureCard
            icon={<Book size={32} />}
            title="Start Here"
            description="Learn the basics of how our robot and code work together"
            onClick={() => onNavigate('getting-started')}
          />
          <FeatureCard
            icon={<Map size={32} />}
            title="Codebase Map"
            description="Navigate through our project files and understand what each does"
            onClick={() => onNavigate('codebase')}
          />
          <FeatureCard
            icon={<Code size={32} />}
            title="Subsystems"
            description="Deep dive into each robot component and how it's controlled"
            onClick={() => onNavigate('subsystems')}
          />
          <FeatureCard
            icon={<Lightbulb size={32} />}
            title="How It Works"
            description="Follow the robot's decision-making from input to action"
            onClick={() => onNavigate('how-it-works')}
          />
          <FeatureCard
            icon={<Zap size={32} />}
            title="Challenges"
            description="Test your skills with interactive coding challenges"
            onClick={() => onNavigate('challenges')}
          />
          <FeatureCard
            icon={<Wrench size={32} />}
            title="Debugging"
            description="Systematic checklist for troubleshooting robot issues"
            onClick={() => onNavigate('debugging')}
          />
        </div>

        <div className="bg-white rounded-2xl p-8 border-2 border-yellow-500 shadow-xl">
          <h2 className="text-3xl font-bold text-yellow-600 mb-4">Our Philosophy</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-neutral-700">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p>Mental models before syntax</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p>Explain why before how</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p>No prior experience assumed</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p>Code should feel approachable, not sacred</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

function FeatureCard({ icon, title, description, onClick }: FeatureCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white p-6 rounded-xl hover:bg-yellow-50 transition-all border-2 border-neutral-200 hover:border-yellow-500 hover:shadow-xl hover:scale-105 text-left group"
    >
      <div className="text-yellow-600 mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-700">{description}</p>
    </button>
  );
}
