import { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  prompt: string;
  lines: (ChallengeLine | string)[];
  explanation: string;
}

interface ChallengeLine {
  type: 'blank' | 'code';
  answer?: string;
  hint?: string;
}

export default function Challenges() {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [transitionKey, setTransitionKey] = useState(0);

  const challenges: Challenge[] = [
    {
      id: 'button-press',
      title: 'Button Press Detection',
      difficulty: 'Beginner',
      description: 'Fill in the code to detect when the A button is pressed on the gamepad',
      prompt: 'Complete the code that checks if gamepad1.a is pressed:',
      lines: [
        'if (',
        { type: 'blank', answer: 'gamepad1.a', hint: 'gamepad1.(button)' },
        ') {',
        '    intake.collect();',
        '}',
      ],
      explanation:
        'The gamepad object has boolean values for each button. When you press a button, it becomes true. So "gamepad1.a" checks if the A button is currently pressed.',
    },
    {
      id: 'motor-power',
      title: 'Setting Motor Power',
      difficulty: 'Beginner',
      description: 'Fill in the code to make a motor spin at 50% power',
      prompt: 'Complete the code to set the motor power:',
      lines: [
        'DcMotor motor = hardwareMap.get(DcMotor.class, "intake");',
        'motor.',
        { type: 'blank', answer: 'setPower', hint: 'set(something)' },
        '(0.5);',
      ],
      explanation:
        'The setPower() method on a motor controls how fast it spins. Values range from -1.0 (full reverse) to 1.0 (full forward). 0.5 means 50% forward.',
    },
    {
      id: 'if-else',
      title: 'Button Control Logic',
      difficulty: 'Beginner',
      description: 'Fill in the code to control an intake with buttons',
      prompt: 'Complete the motor control logic:',
      lines: [
        'if (gamepad1.a) {',
        '    motor.setPower(0.8);',
        '} ',
        { type: 'blank', answer: 'else if', hint: 'else (if/blank)' },
        ' (gamepad1.b) {',
        '    motor.setPower(-0.8);',
        '} else {',
        '    motor.setPower(0);',
        '}',
      ],
      explanation:
        'The else if statement lets you check multiple conditions. First check if A is pressed, then if B is pressed, otherwise stop the motor. This pattern is fundamental to robot control.',
    },
    {
      id: 'loop-method',
      title: 'Main Loop in OpMode',
      difficulty: 'Intermediate',
      description: 'Fill in the method name that runs repeatedly while the OpMode is active',
      prompt: 'Which method runs continuously while the OpMode is active?',
      lines: [
        '@Override',
        'public void ',
        { type: 'blank', answer: 'loop', hint: 'The main execution method' },
        '() {',
        '    // This code runs many times per second',
        '    drive.drive(y, x, rotation);',
        '}',
      ],
      explanation:
        'The loop() method is called repeatedly by the FTC framework while an OpMode is running. This is where you put the logic that responds to inputs and controls the robot.',
    },
    {
      id: 'telemetry',
      title: 'Debug with Telemetry',
      difficulty: 'Intermediate',
      description: 'Fill in the code to send data to the Driver Station screen',
      prompt: 'Complete the telemetry code to display motor power:',
      lines: [
        'double motorPower = 0.5;',
        'telemetry.addData("Power", ',
        { type: 'blank', answer: 'motorPower', hint: 'The variable you created' },
        ');',
        'telemetry.update();',
      ],
      explanation:
        'Telemetry sends information to the Driver Station screen for debugging. addData() adds a label and value, and update() sends it to the screen. Essential for understanding what your code is doing.',
    },
    {
      id: 'subsystem-init',
      title: 'Initialize a Subsystem',
      difficulty: 'Intermediate',
      description: 'Fill in the code to get a hardware device from the hardwareMap',
      prompt: 'Complete the code to initialize the intake motor:',
      lines: [
        'private DcMotor intakeMotor;',
        '',
        '@Override',
        'public void init() {',
        '    intakeMotor = hardwareMap.',
        { type: 'blank', answer: 'get', hint: 'get(Type, name)' },
        '(DcMotor.class, "intakeMotor");',
        '}',
      ],
      explanation:
        'The hardwareMap.get() method connects your code to physical hardware. The first parameter is the type (DcMotor), the second is the device name from the robot configuration.',
    },
    {
      id: 'mecanum-power',
      title: 'Mecanum Drive Calculation',
      difficulty: 'Advanced',
      description: 'Fill in the formula to calculate power for a mecanum drivetrain',
      prompt: 'Complete the mecanum wheel power calculation:',
      lines: [
        '// For omnidirectional movement',
        'double frontLeft = y + x + rotation;',
        'double frontRight = y - x - rotation;',
        'double backLeft = y - x ',
        { type: 'blank', answer: '+ rotation', hint: '+ or - rotation' },
        ';',
        'double backRight = y + x - rotation;',
      ],
      explanation:
        'Mecanum wheels use kinematics to convert X-Y-rotation inputs into individual wheel speeds. Each wheel gets a slightly different combination of the three inputs. This formula enables omnidirectional movement.',
    },
    {
      id: 'encoders',
      title: 'Read Encoder Distance',
      difficulty: 'Advanced',
      description: 'Fill in the code to read how far a motor has rotated',
      prompt: 'Complete the code to get the encoder count:',
      lines: [
        'double distanceTraveled = motor.',
        { type: 'blank', answer: 'getCurrentPosition', hint: 'getCurrent...' },
        '();',
        'double inches = distanceTraveled / TICKS_PER_INCH;',
      ],
      explanation:
        'Encoders count motor rotations. getCurrentPosition() returns the number of ticks (small rotation units). Dividing by ticks-per-inch converts to distance traveled. This is how the robot knows how far it moved.',
    },
  ];

  const challenge = challenges[currentChallengeIndex];

  const handleAnswerChange = (index: number, value: string) => {
    setUserAnswers({
      ...userAnswers,
      [`challenge-${currentChallengeIndex}-blank-${index}`]: value,
    });
  };

  const checkAnswers = () => {
    let allCorrect = true;
    const answers = userAnswers;

    challenge.lines.forEach((line, index) => {
      if (typeof line !== 'string' && line.type === 'blank') {
        const userAnswer = answers[`challenge-${currentChallengeIndex}-blank-${index}`]
          ?.trim()
          .toLowerCase();
        const correctAnswer = line.answer?.toLowerCase();
        if (userAnswer !== correctAnswer) {
          allCorrect = false;
        }
      }
    });

    if (allCorrect) {
      setCompletedChallenges([...completedChallenges, challenge.id]);
    }
    setShowResults(true);
  };

  const nextChallenge = () => {
    if (currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(currentChallengeIndex + 1);
      setUserAnswers({});
      setShowResults(false);
      setTransitionKey(prev => prev + 1);
    }
  };

  const prevChallenge = () => {
    if (currentChallengeIndex > 0) {
      setCurrentChallengeIndex(currentChallengeIndex - 1);
      setUserAnswers({});
      setShowResults(false);
      setTransitionKey(prev => prev + 1);
    }
  };

  const resetChallenge = () => {
    setUserAnswers({});
    setShowResults(false);
  };

  const allAnswersCorrect = showResults && !challenge.lines.some((line, index) => {
    if (typeof line !== 'string' && line.type === 'blank') {
      const userAnswer = userAnswers[`challenge-${currentChallengeIndex}-blank-${index}`]
        ?.trim()
        .toLowerCase();
      const correctAnswer = line.answer?.toLowerCase();
      return userAnswer !== correctAnswer;
    }
    return false;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl sm:text-5xl font-bold text-yellow-600 mb-6">
        Coding Challenges
      </h1>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
        <p className="text-lg text-neutral-800">
          Test your knowledge with these fill-in-the-blank coding challenges. Start with Beginner
          challenges and work your way up to Advanced ones.
        </p>
      </div>

      <div key={transitionKey} className="bg-white rounded-xl shadow-lg p-8 border-2 border-neutral-200 mb-8 animate-in fade-in duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-2">{challenge.title}</h2>
            <p className="text-neutral-600">{challenge.description}</p>
          </div>
          <span className={`px-4 py-2 rounded-full font-semibold text-sm ${getDifficultyColor(challenge.difficulty)}`}>
            {challenge.difficulty}
          </span>
        </div>

        <div className="bg-neutral-100 p-6 rounded-lg mb-6">
          <p className="text-neutral-800 font-semibold mb-4">{challenge.prompt}</p>

          <div className="bg-neutral-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto mb-6">
            <div className="space-y-0">
              {challenge.lines.map((line, index) => (
                <div key={index} className="whitespace-pre-wrap break-words">
                  {typeof line === 'string' ? (
                    <span>{line}</span>
                  ) : line.type === 'blank' ? (
                    <>
                      <input
                        type="text"
                        value={userAnswers[`challenge-${currentChallengeIndex}-blank-${index}`] || ''}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        placeholder={line.hint || 'Answer here'}
                        disabled={showResults}
                        className={`bg-yellow-400 text-neutral-900 px-2 py-1 rounded border-2 font-mono min-w-[150px] ${
                          showResults
                            ? userAnswers[`challenge-${currentChallengeIndex}-blank-${index}`]
                                ?.trim()
                                .toLowerCase() === line.answer?.toLowerCase()
                              ? 'border-green-500'
                              : 'border-red-500'
                            : 'border-yellow-500'
                        }`}
                      />
                      {showResults &&
                        userAnswers[`challenge-${currentChallengeIndex}-blank-${index}`]
                          ?.trim()
                          .toLowerCase() !== line.answer?.toLowerCase() && (
                          <span className="text-red-400 ml-2">
                            (correct: <strong>{line.answer}</strong>)
                          </span>
                        )}
                    </>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {showResults && (
            <div className={`p-4 rounded-lg mb-6 ${allAnswersCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
              <div className="flex items-center gap-2 mb-2">
                {allAnswersCorrect ? (
                  <>
                    <CheckCircle className="text-green-600" size={24} />
                    <p className="text-green-800 font-bold text-lg">Perfect! All answers correct!</p>
                  </>
                ) : (
                  <>
                    <XCircle className="text-red-600" size={24} />
                    <p className="text-red-800 font-bold text-lg">Not quite. Check the red fields above.</p>
                  </>
                )}
              </div>
              <p className={`${allAnswersCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {challenge.explanation}
              </p>
            </div>
          )}

          {!showResults && (
            <div className="bg-neutral-50 p-4 rounded-lg mb-6 border-l-4 border-yellow-500">
              <p className="text-neutral-700 text-sm">{challenge.explanation}</p>
            </div>
          )}

          <div className="flex gap-3 flex-wrap">
            {!showResults ? (
              <button
                onClick={checkAnswers}
                className="px-6 py-2 bg-yellow-500 text-neutral-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={resetChallenge}
                className="px-6 py-2 bg-neutral-500 text-white font-bold rounded-lg hover:bg-neutral-600 transition-colors flex items-center gap-2"
              >
                <RotateCcw size={18} />
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-between items-center">
        <button
          onClick={prevChallenge}
          disabled={currentChallengeIndex === 0}
          className="px-4 py-2 bg-neutral-300 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <div className="text-center">
          <p className="text-neutral-700 font-semibold">
            Challenge {currentChallengeIndex + 1} of {challenges.length}
          </p>
          <p className="text-sm text-neutral-600">
            Completed: {completedChallenges.length} / {challenges.length}
          </p>
        </div>

        <button
          onClick={nextChallenge}
          disabled={currentChallengeIndex === challenges.length - 1}
          className="px-4 py-2 bg-yellow-500 text-neutral-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-neutral-900 mb-4">All Challenges</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {challenges.map((chal, index) => (
            <button
              key={chal.id}
              onClick={() => {
                setCurrentChallengeIndex(index);
                setUserAnswers({});
                setShowResults(false);
              }}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                currentChallengeIndex === index
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-neutral-200 hover:border-yellow-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-neutral-900">{chal.title}</h4>
                {completedChallenges.includes(chal.id) && (
                  <CheckCircle className="text-green-600" size={20} />
                )}
              </div>
              <p className={`text-xs font-semibold ${getDifficultyColor(chal.difficulty)}`}>
                {chal.difficulty}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 bg-neutral-100 p-8 rounded-xl">
        <h3 className="text-2xl font-bold text-neutral-900 mb-4">Tips for Success</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-yellow-600 mr-3 font-bold">•</span>
            <span className="text-neutral-700">Pay attention to spelling and capitalization - code is precise!</span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-600 mr-3 font-bold">•</span>
            <span className="text-neutral-700">Use the hints if you get stuck - they point you in the right direction</span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-600 mr-3 font-bold">•</span>
            <span className="text-neutral-700">Review the explanation even after you get it right</span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-600 mr-3 font-bold">•</span>
            <span className="text-neutral-700">Start with Beginner challenges before moving to Advanced</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
