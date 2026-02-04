import { useState } from 'react';
import { ArrowRight, Circle } from 'lucide-react';

export default function HowItWorks() {
  const [selectedWalkthrough, setSelectedWalkthrough] = useState<string>('button');

  const walkthroughs = [
    {
      id: 'button',
      title: 'What happens when you press A?',
      description: 'Follow the journey from controller button to robot action',
      steps: [
        {
          file: 'Driver Station',
          location: 'Controller Hardware',
          description: 'You physically press the A button on gamepad1',
          code: null,
        },
        {
          file: 'MainTeleOp.java',
          location: 'loop() method',
          description: 'The OpMode checks if button A is pressed using gamepad1.a',
          code: 'if (gamepad1.a) {\n    intake.collect();\n}',
        },
        {
          file: 'Intake.java',
          location: 'collect() method',
          description: 'The intake subsystem receives the collect command and prepares to run',
          code: 'public void collect() {\n    intakeMotor.setPower(0.8);\n}',
        },
        {
          file: 'Hardware',
          location: 'Physical Motor',
          description: 'The intake motor spins at 80% power, pulling game pieces into the robot',
          code: null,
        },
      ],
    },
    {
      id: 'vision',
      title: 'What happens when the camera sees an object?',
      description: 'Trace how vision detection leads to robot alignment',
      steps: [
        {
          file: 'Camera Hardware',
          location: 'Physical Camera',
          description: 'Camera captures image frames continuously (30+ times per second)',
          code: null,
        },
        {
          file: 'Cameras.java',
          location: 'detectObjects() method',
          description: 'Vision processing identifies game pieces and calculates their positions',
          code: 'List<Detection> objects = detectObjects();\nif (!objects.isEmpty()) {\n    targetX = objects.get(0).getX();\n}',
        },
        {
          file: 'AutoAlign.java (OpMode)',
          location: 'loop() method',
          description: 'Autonomous code reads detection data and calculates correction needed',
          code: 'double error = targetX - robotX;\ndouble correction = error * 0.1;',
        },
        {
          file: 'MecanumDrive.java',
          location: 'drive() method',
          description: 'Drivetrain receives movement commands to align with detected object',
          code: 'drive(correction, 0, 0);',
        },
        {
          file: 'Motors',
          location: 'Physical Wheels',
          description: 'Mecanum wheels spin to strafe the robot sideways toward the target',
          code: null,
        },
      ],
    },
    {
      id: 'autonomous',
      title: 'What happens when autonomous starts?',
      description: 'See how the robot executes pre-programmed actions',
      steps: [
        {
          file: 'Driver Station',
          location: 'Init Button',
          description: 'Driver presses Init button on the Driver Station',
          code: null,
        },
        {
          file: 'AutoBlueLeft.java',
          location: 'init() method',
          description: 'OpMode initializes all subsystems and loads the autonomous path',
          code: '@Override\npublic void init() {\n    drive = new MecanumDrive(hardwareMap);\n    odometry = new Odometry(hardwareMap);\n    loadPath("blue_left");\n}',
        },
        {
          file: 'Driver Station',
          location: 'Play Button',
          description: 'Driver presses Play to start autonomous execution',
          code: null,
        },
        {
          file: 'AutoBlueLeft.java',
          location: 'start() method',
          description: 'Autonomous begins following the pre-programmed path',
          code: '@Override\npublic void start() {\n    pathFollower.start();\n}',
        },
        {
          file: 'AutoBlueLeft.java',
          location: 'loop() method',
          description: 'Each loop iteration updates position and follows the next waypoint',
          code: '@Override\npublic void loop() {\n    odometry.update();\n    Point next = path.getNext();\n    drive.moveTo(next);\n}',
        },
        {
          file: 'Odometry.java',
          location: 'update() method',
          description: 'Odometry tracks robot position using encoders and IMU sensor',
          code: 'public void update() {\n    x += deltaX;\n    y += deltaY;\n    heading = imu.getAngle();\n}',
        },
        {
          file: 'MecanumDrive.java',
          location: 'moveTo() method',
          description: 'Drivetrain calculates motor powers needed to reach target position',
          code: 'double[] powers = calculatePowers(target, current);',
        },
        {
          file: 'Motors',
          location: 'Physical Movement',
          description: 'Robot moves along the programmed path to complete autonomous tasks',
          code: null,
        },
      ],
    },
    {
      id: 'joystick',
      title: 'How does the joystick control movement?',
      description: 'Understand the path from analog stick to mecanum wheel motion',
      steps: [
        {
          file: 'Controller',
          location: 'Left Joystick',
          description: 'Driver moves the left joystick (X and Y axes)',
          code: null,
        },
        {
          file: 'MainTeleOp.java',
          location: 'loop() method',
          description: 'OpMode reads joystick values (range -1.0 to +1.0)',
          code: 'double y = -gamepad1.left_stick_y;\ndouble x = gamepad1.left_stick_x;\ndouble rotation = gamepad1.right_stick_x;',
        },
        {
          file: 'MainTeleOp.java',
          location: 'loop() method',
          description: 'Values are passed to the drivetrain subsystem',
          code: 'drive.drive(x, y, rotation);',
        },
        {
          file: 'MecanumDrive.java',
          location: 'drive() method',
          description: 'Mecanum kinematics convert XYR into individual wheel powers',
          code: 'double fl = y + x + rotation;\ndouble fr = y - x - rotation;\ndouble bl = y - x + rotation;\ndouble br = y + x - rotation;',
        },
        {
          file: 'MecanumDrive.java',
          location: 'setPower() method',
          description: 'Calculated powers are sent to each motor',
          code: 'frontLeft.setPower(fl);\nfrontRight.setPower(fr);\nbackLeft.setPower(bl);\nbackRight.setPower(br);',
        },
        {
          file: 'Motors',
          location: 'Mecanum Wheels',
          description: 'Four mecanum wheels spin at different speeds, creating omnidirectional movement',
          code: null,
        },
      ],
    },
  ];

  const currentWalkthrough = walkthroughs.find(w => w.id === selectedWalkthrough);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl sm:text-5xl font-bold text-yellow-600 mb-6">
        How It Works: Follow the Robot
      </h1>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
        <p className="text-lg text-neutral-800">
          The best way to understand code is to follow a real action from start to finish. Select a scenario below
          and trace the exact path through the codebase.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {walkthroughs.map((walkthrough) => (
          <button
            key={walkthrough.id}
            onClick={() => setSelectedWalkthrough(walkthrough.id)}
            className={`p-6 rounded-xl text-left transition-all ${
              selectedWalkthrough === walkthrough.id
                ? 'bg-yellow-500 text-neutral-900 shadow-lg scale-105'
                : 'bg-white border-2 border-neutral-200 hover:border-yellow-500'
            }`}
          >
            <h3 className="text-xl font-bold mb-2">{walkthrough.title}</h3>
            <p className={`text-sm ${
              selectedWalkthrough === walkthrough.id ? 'text-neutral-800' : 'text-neutral-600'
            }`}>
              {walkthrough.description}
            </p>
          </button>
        ))}
      </div>

      {currentWalkthrough && (
        <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-yellow-500">
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">{currentWalkthrough.title}</h2>
          <p className="text-neutral-600 mb-8">{currentWalkthrough.description}</p>

          <div className="space-y-6">
            {currentWalkthrough.steps.map((step, index) => (
              <div key={index}>
                <WalkthroughStep
                  stepNumber={index + 1}
                  file={step.file}
                  location={step.location}
                  description={step.description}
                  code={step.code}
                  isLast={index === currentWalkthrough.steps.length - 1}
                />
                {index < currentWalkthrough.steps.length - 1 && (
                  <div className="flex justify-center my-4">
                    <ArrowRight className="text-yellow-500" size={32} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 bg-neutral-100 p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Key Takeaways</h2>
        <div className="space-y-3">
          <Takeaway text="Every action follows a predictable path through the code" />
          <Takeaway text="OpModes are always the starting point for user interactions" />
          <Takeaway text="Subsystems handle the details of controlling hardware" />
          <Takeaway text="Code runs in loops, checking inputs and updating outputs constantly" />
          <Takeaway text="Each file has a specific job and doesn't need to know about everything" />
        </div>
      </div>

      <div className="mt-8 bg-yellow-500 text-neutral-900 p-8 rounded-xl">
        <h3 className="text-2xl font-bold mb-4">Practice Exercise</h3>
        <p className="mb-4">
          Try tracing through the code yourself! Pick any button or action and follow it through the files.
          Use this pattern:
        </p>
        <ol className="space-y-2 ml-4">
          <li><span className="font-bold">1.</span> Find where the input is read (usually in an OpMode)</li>
          <li><span className="font-bold">2.</span> See what method is called</li>
          <li><span className="font-bold">3.</span> Open that subsystem file</li>
          <li><span className="font-bold">4.</span> Read what the method does to hardware</li>
          <li><span className="font-bold">5.</span> Understand the physical result</li>
        </ol>
      </div>
    </div>
  );
}

interface WalkthroughStepProps {
  stepNumber: number;
  file: string;
  location: string;
  description: string;
  code: string | null;
  isLast: boolean;
}

function WalkthroughStep({ stepNumber, file, location, description, code, isLast }: WalkthroughStepProps) {
  return (
    <div className={`bg-neutral-50 p-6 rounded-xl border-l-4 ${isLast ? 'border-green-500' : 'border-yellow-500'}`}>
      <div className="flex items-start gap-4 mb-4">
        <div className={`flex-shrink-0 w-10 h-10 ${isLast ? 'bg-green-500' : 'bg-yellow-500'} text-white rounded-full flex items-center justify-center font-bold`}>
          {stepNumber}
        </div>
        <div className="flex-1">
          <h4 className="text-xl font-bold text-neutral-900">{file}</h4>
          <p className="text-sm text-neutral-600">{location}</p>
        </div>
      </div>
      <p className="text-neutral-700 mb-4">{description}</p>
      {code && (
        <div className="bg-neutral-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{code}</pre>
        </div>
      )}
    </div>
  );
}

interface TakeawayProps {
  text: string;
}

function Takeaway({ text }: TakeawayProps) {
  return (
    <div className="flex items-start gap-3 bg-white p-4 rounded-lg">
      <Circle className="text-yellow-600 flex-shrink-0 mt-1" size={16} fill="currentColor" />
      <p className="text-neutral-700">{text}</p>
    </div>
  );
}
