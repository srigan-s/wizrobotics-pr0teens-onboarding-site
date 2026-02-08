import { useState } from 'react';
import { ChevronDown, CheckCircle, AlertCircle } from 'lucide-react';

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

interface ChecklistCategory {
  id: string;
  title: string;
  icon: string;
  items: ChecklistItem[];
}

export default function DebuggingChecklist() {
  const [categories, setCategories] = useState<ChecklistCategory[]>([
    {
      id: 'mechanical',
      title: 'Mechanical Issues',
      icon: '⚙️',
      items: [
        { id: 'm1', label: 'Check for loose screws or parts', checked: false },
        { id: 'm2', label: 'Wheels aligned properly', checked: false },
        { id: 'm3', label: 'Chain or belt tension correct', checked: false },
        { id: 'm4', label: 'Nothing blocking moving parts', checked: false },
        { id: 'm5', label: 'Robot frame stable', checked: false },
        { id: 'm6', label: 'Motors mounted securely', checked: false },
      ],
    },
    {
      id: 'electrical',
      title: 'Electrical Issues',
      icon: '⚡',
      items: [
        { id: 'e1', label: 'Battery charged', checked: false },
        { id: 'e2', label: 'Battery securely connected', checked: false },
        { id: 'e3', label: 'REV Control Hub powered on', checked: false },
        { id: 'e4', label: 'Motor wires plugged in correctly', checked: false },
        { id: 'e5', label: 'Encoder cables connected', checked: false },
        { id: 'e6', label: 'Sensor wires connected', checked: false },
        { id: 'e7', label: 'No damaged wires', checked: false },
      ],
    },
    {
      id: 'programming',
      title: 'Programming Issues',
      icon: '💻',
      items: [
        { id: 'p1', label: 'Correct OpMode selected', checked: false },
        { id: 'p2', label: 'Code compiled successfully', checked: false },
        { id: 'p3', label: 'Robot connected to Driver Hub', checked: false },
        { id: 'p4', label: 'Motor names match configuration', checked: false },
        { id: 'p5', label: 'Sensors initialized properly', checked: false },
        { id: 'p6', label: 'Telemetry showing expected values', checked: false },
      ],
    },
  ]);

  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    'mechanical',
    'electrical',
    'programming',
  ]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleItem = (categoryId: string, itemId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
              ),
            }
          : cat
      )
    );
  };

  const resetAll = () => {
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        items: cat.items.map((item) => ({ ...item, checked: false })),
      }))
    );
  };

  const getTotalProgress = () => {
    const total = categories.reduce((sum, cat) => sum + cat.items.length, 0);
    const checked = categories.reduce(
      (sum, cat) => sum + cat.items.filter((item) => item.checked).length,
      0
    );
    return { checked, total, percentage: Math.round((checked / total) * 100) };
  };

  const progress = getTotalProgress();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl sm:text-5xl font-bold text-yellow-600 mb-6">
        FTC Debugging Checklist
      </h1>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
        <p className="text-lg text-neutral-800">
          Robot not working as expected? Work through this checklist systematically. Most issues
          fall into three categories: mechanical problems, electrical issues, or programming bugs.
        </p>
      </div>

      <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-xl p-6 mb-8 border-2 border-yellow-300 shadow-lg">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-neutral-900">Overall Progress</h2>
            <span className="text-3xl font-bold text-yellow-600">{progress.percentage}%</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>
        <p className="text-neutral-700 font-semibold">
          {progress.checked} of {progress.total} items checked
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {categories.map((category) => {
          const categoryProgress = category.items.filter((item) => item.checked).length;
          const categoryTotal = category.items.length;
          const isExpanded = expandedCategories.includes(category.id);

          return (
            <div
              key={category.id}
              className="bg-white rounded-xl border-2 border-neutral-200 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{category.icon}</span>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-neutral-900">{category.title}</h3>
                    <p className="text-sm text-neutral-600">
                      {categoryProgress} of {categoryTotal} completed
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="bg-yellow-500 h-full transition-all duration-500"
                      style={{ width: `${(categoryProgress / categoryTotal) * 100}%` }}
                    />
                  </div>
                  <ChevronDown
                    size={24}
                    className={`text-neutral-600 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {isExpanded && (
                <div className="border-t-2 border-neutral-100 px-6 py-4 bg-neutral-50 space-y-3 animate-in fade-in duration-300">
                  {category.items.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white cursor-pointer transition-colors group"
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleItem(category.id, item.id)}
                        className="w-5 h-5 rounded border-2 border-yellow-500 cursor-pointer accent-yellow-500 transition-all"
                      />
                      <span
                        className={`text-lg transition-all ${
                          item.checked
                            ? 'text-neutral-500 line-through'
                            : 'text-neutral-800 group-hover:text-neutral-900'
                        }`}
                      >
                        {item.label}
                      </span>
                      {item.checked && <CheckCircle size={20} className="text-green-500 ml-auto" />}
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={resetAll}
          className="px-6 py-3 bg-neutral-500 text-white font-bold rounded-lg hover:bg-neutral-600 transition-all transform hover:scale-105 shadow-md"
        >
          Reset All
        </button>
        <button
          onClick={() => setExpandedCategories([])}
          className="px-6 py-3 bg-neutral-300 text-neutral-900 font-bold rounded-lg hover:bg-neutral-400 transition-all transform hover:scale-105 shadow-md"
        >
          Collapse All
        </button>
        <button
          onClick={() => setExpandedCategories(['mechanical', 'electrical', 'programming'])}
          className="px-6 py-3 bg-yellow-500 text-neutral-900 font-bold rounded-lg hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-md"
        >
          Expand All
        </button>
      </div>

      <div className="mt-12 bg-neutral-100 p-8 rounded-xl border-2 border-neutral-200">
        <h3 className="text-2xl font-bold text-neutral-900 mb-4">Debugging Tips</h3>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="flex gap-3">
            <AlertCircle className="text-yellow-600 flex-shrink-0" size={24} />
            <div>
              <h4 className="font-bold text-neutral-900 mb-1">Isolate the Problem</h4>
              <p className="text-neutral-700 text-sm">
                Test each subsystem independently to find the root cause.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <AlertCircle className="text-yellow-600 flex-shrink-0" size={24} />
            <div>
              <h4 className="font-bold text-neutral-900 mb-1">Use Telemetry</h4>
              <p className="text-neutral-700 text-sm">
                Print sensor values and motor states to understand what's happening.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <AlertCircle className="text-yellow-600 flex-shrink-0" size={24} />
            <div>
              <h4 className="font-bold text-neutral-900 mb-1">Check Systematically</h4>
              <p className="text-neutral-700 text-sm">
                Don't skip steps. Work through the checklist in order each time.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <AlertCircle className="text-yellow-600 flex-shrink-0" size={24} />
            <div>
              <h4 className="font-bold text-neutral-900 mb-1">Document Changes</h4>
              <p className="text-neutral-700 text-sm">
                Keep notes on what you've tested so you don't repeat the same checks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
