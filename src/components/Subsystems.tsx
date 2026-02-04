import { Camera, Maximize, Target, Upload, Download, Crosshair, Grid3x3, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function Subsystems() {
  const [selectedSubsystem, setSelectedSubsystem] = useState<string | null>(null);

  const subsystems = [
    {
      id: 'mecanum',
      name: 'Mecanum Drivetrain',
      icon: <Grid3x3 size={40} />,
      color: 'blue',
      analogy: 'The robot\'s legs and feet',
      purpose: 'Moves the robot in any direction',
      whatItDoes: 'Controls four mecanum wheels that allow omnidirectional movement (forward, backward, sideways, and rotation).',
      keyMethods: [
        { name: 'drive(x, y, rotation)', desc: 'Moves robot based on joystick input' },
        { name: 'setPower()', desc: 'Sets individual wheel speeds' },
        { name: 'stop()', desc: 'Stops all motors immediately' },
      ],
      physicalParts: ['4 motors (front-left, front-right, back-left, back-right)', 'Mecanum wheels with rollers', 'Motor encoders for position tracking'],
      location: 'TeamCode/subsystems/Mecanum/',
    },
    {
      id: 'cameras',
      name: 'Vision System',
      icon: <Camera size={40} />,
      color: 'purple',
      analogy: 'The robot\'s eyes',
      purpose: 'Detects and tracks game pieces and field elements',
      whatItDoes: 'Uses cameras and computer vision to identify objects, read AprilTags, and guide autonomous navigation.',
      keyMethods: [
        { name: 'detectObjects()', desc: 'Finds game pieces in camera view' },
        { name: 'getPosition()', desc: 'Returns object location coordinates' },
        { name: 'readAprilTag()', desc: 'Identifies field position markers' },
      ],
      physicalParts: ['Camera mounted on robot', 'Control Hub processing unit', 'LED ring lights (optional)'],
      location: 'TeamCode/subsystems/Cameras/',
    },
    {
      id: 'intake',
      name: 'Intake System',
      icon: <Download size={40} />,
      color: 'green',
      analogy: 'The robot\'s hands grabbing objects',
      purpose: 'Collects game pieces from the field',
      whatItDoes: 'Uses spinning wheels or rollers to pull game pieces into the robot.',
      keyMethods: [
        { name: 'collect()', desc: 'Spins intake to grab game pieces' },
        { name: 'reverse()', desc: 'Ejects stuck game pieces' },
        { name: 'stop()', desc: 'Stops intake motors' },
      ],
      physicalParts: ['Intake motor', 'Rubber rollers or wheels', 'Touch/color sensors (optional)'],
      location: 'TeamCode/subsystems/Intake/',
    },
    {
      id: 'outtake',
      name: 'Outtake System',
      icon: <Upload size={40} />,
      color: 'orange',
      analogy: 'The robot\'s hands releasing objects',
      purpose: 'Places game pieces in scoring positions',
      whatItDoes: 'Uses arms, lifts, or mechanisms to position and release game pieces into goals.',
      keyMethods: [
        { name: 'score()', desc: 'Extends and releases game piece' },
        { name: 'retract()', desc: 'Returns to starting position' },
        { name: 'setHeight(level)', desc: 'Positions at scoring height' },
      ],
      physicalParts: ['Lift motor or servo', 'Claw or gripper mechanism', 'Position sensors or encoders'],
      location: 'TeamCode/subsystems/Outtake/',
    },
    {
      id: 'shooting',
      name: 'Shooting Mechanism',
      icon: <Target size={40} />,
      color: 'red',
      analogy: 'The robot\'s throwing arm',
      purpose: 'Launches game pieces at targets',
      whatItDoes: 'Uses spinning flywheels or launchers to shoot game pieces at specific targets.',
      keyMethods: [
        { name: 'shoot(power)', desc: 'Fires game piece at set power' },
        { name: 'spinUp()', desc: 'Gets flywheels up to speed' },
        { name: 'aim(angle)', desc: 'Adjusts launch angle' },
      ],
      physicalParts: ['Flywheel motors (1-2)', 'Launch angle servo', 'Game piece feeder mechanism'],
      location: 'TeamCode/subsystems/Shooting/',
    },
    {
      id: 'turret',
      name: 'Turret',
      icon: <Crosshair size={40} />,
      color: 'teal',
      analogy: 'The robot\'s rotating head',
      purpose: 'Rotates mechanisms to aim at targets',
      whatItDoes: 'Allows the shooter or camera to rotate independently from the robot body for better targeting.',
      keyMethods: [
        { name: 'rotateTo(angle)', desc: 'Turns turret to specific angle' },
        { name: 'trackTarget()', desc: 'Follows detected vision target' },
        { name: 'resetPosition()', desc: 'Returns to center position' },
      ],
      physicalParts: ['Rotation motor', 'Encoder for angle tracking', 'Limit switches for safety'],
      location: 'TeamCode/subsystems/Turret/',
    },
    {
      id: 'odometry',
      name: 'Odometry',
      icon: <MapPin size={40} />,
      color: 'indigo',
      analogy: 'The robot\'s internal GPS',
      purpose: 'Tracks robot position on the field',
      whatItDoes: 'Uses encoders and sensors to calculate exactly where the robot is and which direction it faces.',
      keyMethods: [
        { name: 'getPosition()', desc: 'Returns current X, Y coordinates' },
        { name: 'getHeading()', desc: 'Returns robot rotation angle' },
        { name: 'update()', desc: 'Recalculates position based on movement' },
      ],
      physicalParts: ['Odometry wheels with encoders', 'IMU (gyroscope) sensor', 'Dead wheels (non-driven tracking)'],
      location: 'TeamCode/subsystems/Odometry/',
    },
    {
      id: 'sorting',
      name: 'Sorting System',
      icon: <Maximize size={40} />,
      color: 'pink',
      analogy: 'The robot\'s decision-making filter',
      purpose: 'Identifies and routes correct game pieces',
      whatItDoes: 'Uses sensors to detect game piece properties (color, shape) and directs them to the right output.',
      keyMethods: [
        { name: 'identifyPiece()', desc: 'Detects game piece type' },
        { name: 'routeTo(destination)', desc: 'Directs piece to correct path' },
        { name: 'reject()', desc: 'Ejects incorrect game pieces' },
      ],
      physicalParts: ['Color sensor', 'Sorting gate servo', 'Conveyor or routing mechanism'],
      location: 'TeamCode/subsystems/Sorting/',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl sm:text-5xl font-bold text-yellow-600 mb-6">
        Robot Subsystems: The Building Blocks
      </h1>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
        <p className="text-lg text-neutral-800">
          Each subsystem is like an organ in your body. They work independently but coordinate together to make the
          robot function. Click on any subsystem below to learn more about how it works.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {subsystems.map((subsystem) => (
          <SubsystemCard
            key={subsystem.id}
            subsystem={subsystem}
            isSelected={selectedSubsystem === subsystem.id}
            onClick={() => setSelectedSubsystem(selectedSubsystem === subsystem.id ? null : subsystem.id)}
          />
        ))}
      </div>

      {selectedSubsystem && (
        <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-yellow-500">
          {subsystems.filter(s => s.id === selectedSubsystem).map((subsystem) => (
            <div key={subsystem.id}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`text-${subsystem.color}-600`}>{subsystem.icon}</div>
                <div>
                  <h2 className="text-3xl font-bold text-neutral-900">{subsystem.name}</h2>
                  <p className="text-lg text-neutral-600 italic">{subsystem.analogy}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Purpose</h3>
                <p className="text-lg text-neutral-700">{subsystem.purpose}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-2">What It Does</h3>
                <p className="text-neutral-700">{subsystem.whatItDoes}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Key Methods (Functions)</h3>
                <div className="space-y-3">
                  {subsystem.keyMethods.map((method, index) => (
                    <div key={index} className="bg-neutral-50 p-4 rounded-lg border-l-4 border-yellow-500">
                      <code className="font-mono text-neutral-900 font-semibold">{method.name}</code>
                      <p className="text-sm text-neutral-600 mt-1">{method.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Physical Components</h3>
                <ul className="space-y-2">
                  {subsystem.physicalParts.map((part, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-yellow-600 mr-2 font-bold">•</span>
                      <span className="text-neutral-700">{part}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-neutral-900 text-green-400 p-4 rounded-lg">
                <p className="text-sm mb-1">Location in codebase:</p>
                <code className="font-mono">{subsystem.location}</code>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 bg-neutral-100 p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">How Subsystems Communicate</h2>
        <p className="text-neutral-700 mb-4">
          Subsystems don't directly control each other. Instead, your OpMode (the main program) sends commands to
          multiple subsystems. For example:
        </p>
        <div className="bg-white p-6 rounded-lg border-2 border-neutral-200">
          <p className="text-neutral-800 mb-2 font-semibold">Example: Scoring a game piece</p>
          <ol className="space-y-2 text-neutral-700">
            <li><span className="font-bold text-yellow-600">1.</span> OpMode tells Intake to collect()</li>
            <li><span className="font-bold text-yellow-600">2.</span> OpMode tells Mecanum to drive to scoring zone</li>
            <li><span className="font-bold text-yellow-600">3.</span> OpMode tells Turret to aim at target</li>
            <li><span className="font-bold text-yellow-600">4.</span> OpMode tells Shooter to shoot()</li>
          </ol>
          <p className="text-sm text-neutral-600 mt-4 italic">
            The OpMode is the conductor, and each subsystem is an instrument in the orchestra.
          </p>
        </div>
      </div>
    </div>
  );
}

interface SubsystemCardProps {
  subsystem: {
    id: string;
    name: string;
    icon: React.ReactNode;
    color: string;
    purpose: string;
  };
  isSelected: boolean;
  onClick: () => void;
}

function SubsystemCard({ subsystem, isSelected, onClick }: SubsystemCardProps) {
  return (
    <button
      onClick={onClick}
      className={`p-6 rounded-xl transition-all text-left ${
        isSelected
          ? 'bg-yellow-500 text-neutral-900 shadow-lg scale-105'
          : 'bg-white hover:bg-neutral-50 border-2 border-neutral-200 hover:border-yellow-500'
      }`}
    >
      <div className={`mb-3 ${isSelected ? 'text-neutral-900' : `text-${subsystem.color}-600`}`}>
        {subsystem.icon}
      </div>
      <h3 className={`text-lg font-bold mb-2 ${isSelected ? 'text-neutral-900' : 'text-neutral-900'}`}>
        {subsystem.name}
      </h3>
      <p className={`text-sm ${isSelected ? 'text-neutral-800' : 'text-neutral-600'}`}>
        {subsystem.purpose}
      </p>
    </button>
  );
}
