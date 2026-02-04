import { Folder, FileCode, Wrench, Map as MapIcon, Settings } from 'lucide-react';

export default function CodebaseOverview() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl sm:text-5xl font-bold text-yellow-600 mb-6">
        Codebase Map: Where Everything Lives
      </h1>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
        <p className="text-lg text-neutral-800">
          Think of this codebase as a city. Each neighborhood (folder) has a specific purpose, and each building (file)
          contains specific functionality. Let's take a tour!
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">High-Level Structure</h2>
        <div className="bg-neutral-900 text-green-400 p-6 rounded-xl font-mono text-sm overflow-x-auto mb-6">
          <pre>{`Pr0Teens-Decode-2025-2026/
├── FtcRobotController/    (Official FTC SDK - don't modify)
├── TeamCode/              (Our team's code - this is where you work!)
│   └── src/main/java/org/firstinspires/ftc/teamcode/
│       ├── opmodes/       (Programs that run on the robot)
│       ├── subsystems/    (Individual robot parts)
│       ├── util/          (Helper tools and utilities)
│       ├── Hardware.java  (Hardware configuration)
│       └── Specifications.java (Constants and settings)
└── gradle/                (Build tools - ignore this)`}</pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">The Important Folders</h2>
        <div className="space-y-6">
          <FolderCard
            icon={<Folder className="text-yellow-600" size={32} />}
            name="TeamCode/"
            purpose="Your team's custom code"
            description="This is THE folder where all your robot programming lives. Everything outside this folder is the official FTC framework that you shouldn't modify."
            whatYouFind="All your OpModes, subsystems, utilities, and configuration files"
            whenItRuns="Always - this is your entire codebase"
            safeToModify={true}
          />

          <FolderCard
            icon={<FileCode className="text-blue-500" size={32} />}
            name="opmodes/"
            purpose="Programs that run on the robot"
            description="OpModes are like apps on your phone. Each one is a complete program. You select which OpMode to run from the robot controller."
            whatYouFind="TeleOp programs (driver control), Autonomous programs (robot runs itself), and test programs"
            whenItRuns="When you select and start an OpMode from the Driver Station"
            safeToModify={true}
          />

          <FolderCard
            icon={<Wrench className="text-green-500" size={32} />}
            name="subsystems/"
            purpose="Individual robot components"
            description="Each folder here represents a physical part of the robot. Like how a car has an engine, transmission, and brakes as separate systems."
            whatYouFind="Mecanum (drivetrain), Intake, Outtake, Shooting, Cameras, Turret, Odometry, and Sorting"
            whenItRuns="Continuously while an OpMode is running"
            safeToModify={true}
          />

          <FolderCard
            icon={<MapIcon className="text-purple-500" size={32} />}
            name="util/"
            purpose="Helper tools and shared code"
            description="Utilities are like a toolbox. Instead of writing the same code multiple times, you put commonly-used functions here."
            whatYouFind="Math helpers, conversion functions, common calculations, and shared utilities"
            whenItRuns="When called by other code (OpModes or subsystems)"
            safeToModify={true}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">The Important Files</h2>
        <div className="space-y-6">
          <FileCard
            icon={<Settings className="text-red-500" size={28} />}
            name="Hardware.java"
            purpose="Connects code names to physical devices"
            description="This file maps logical names in your code (like 'frontLeftMotor') to actual hardware ports on the robot. Think of it as the wiring diagram."
            codeExample={`public DcMotor frontLeft;
public DcMotor frontRight;

frontLeft = hardwareMap.get(DcMotor.class, "frontLeft");`}
            keyPoint="Change this when you rewire motors or add new hardware"
            location="TeamCode/src/main/java/org/firstinspires/ftc/teamcode/"
          />

          <FileCard
            icon={<Settings className="text-orange-500" size={28} />}
            name="Specifications.java"
            purpose="Constants and robot measurements"
            description="All the numbers that define your robot: wheel sizes, motor speeds, distances, timing values, etc. Keeping them in one place makes tuning easier."
            codeExample={`public static final double WHEEL_DIAMETER = 4.0;
public static final double MAX_SPEED = 0.8;
public static final int CAMERA_WIDTH = 1920;`}
            keyPoint="Adjust these values to tune robot behavior without touching logic code"
            location="TeamCode/src/main/java/org/firstinspires/ftc/teamcode/"
          />
        </div>
      </section>

      <section className="mb-12 bg-neutral-100 p-8 rounded-xl">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">How Files Work Together</h2>
        <div className="space-y-4">
          <FlowStep
            step={1}
            title="OpMode starts running"
            description="You select an OpMode on the Driver Station and press Init, then Play"
          />
          <FlowStep
            step={2}
            title="Hardware is initialized"
            description="Hardware.java connects your code to physical motors, servos, and sensors"
          />
          <FlowStep
            step={3}
            title="Subsystems wake up"
            description="Each robot component (drivetrain, intake, etc.) initializes and prepares to receive commands"
          />
          <FlowStep
            step={4}
            title="Main loop runs"
            description="The OpMode continuously reads inputs, makes decisions, and commands subsystems"
          />
          <FlowStep
            step={5}
            title="Subsystems execute"
            description="Each subsystem controls its motors/servos based on commands from the OpMode"
          />
        </div>
      </section>

      <div className="bg-yellow-500 text-neutral-900 p-8 rounded-xl">
        <h3 className="text-2xl font-bold mb-4">Navigation Tips</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="font-bold mr-2">•</span>
            <span>Start with OpModes to see the big picture of what programs exist</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-2">•</span>
            <span>Then explore Subsystems to understand how each robot part works</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-2">•</span>
            <span>Check Hardware.java if you need to understand device names</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-2">•</span>
            <span>Look in Specifications.java to find tunable constants</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

interface FolderCardProps {
  icon: React.ReactNode;
  name: string;
  purpose: string;
  description: string;
  whatYouFind: string;
  whenItRuns: string;
  safeToModify: boolean;
}

function FolderCard({ icon, name, purpose, description, whatYouFind, whenItRuns, safeToModify }: FolderCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border-2 border-neutral-200 hover:border-yellow-500 transition-colors">
      <div className="flex items-start gap-4 mb-4">
        {icon}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold text-neutral-900 font-mono">{name}</h3>
            {safeToModify && (
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                Safe to modify
              </span>
            )}
          </div>
          <p className="text-yellow-700 font-semibold mb-3">{purpose}</p>
        </div>
      </div>
      <p className="text-neutral-700 mb-4">{description}</p>
      <div className="grid sm:grid-cols-2 gap-4 text-sm">
        <div className="bg-neutral-50 p-3 rounded">
          <p className="font-semibold text-neutral-900 mb-1">What you'll find:</p>
          <p className="text-neutral-700">{whatYouFind}</p>
        </div>
        <div className="bg-neutral-50 p-3 rounded">
          <p className="font-semibold text-neutral-900 mb-1">When it runs:</p>
          <p className="text-neutral-700">{whenItRuns}</p>
        </div>
      </div>
    </div>
  );
}

interface FileCardProps {
  icon: React.ReactNode;
  name: string;
  purpose: string;
  description: string;
  codeExample: string;
  keyPoint: string;
  location: string;
}

function FileCard({ icon, name, purpose, description, codeExample, keyPoint, location }: FileCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border-2 border-neutral-200 hover:border-yellow-500 transition-colors">
      <div className="flex items-start gap-4 mb-4">
        {icon}
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-neutral-900 font-mono mb-2">{name}</h3>
          <p className="text-yellow-700 font-semibold mb-3">{purpose}</p>
        </div>
      </div>
      <p className="text-neutral-700 mb-4">{description}</p>
      <div className="bg-neutral-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre>{codeExample}</pre>
      </div>
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-3">
        <p className="text-sm font-semibold text-neutral-900">Key Point: {keyPoint}</p>
      </div>
      <p className="text-xs text-neutral-500 font-mono">{location}</p>
    </div>
  );
}

interface FlowStepProps {
  step: number;
  title: string;
  description: string;
}

function FlowStep({ step, title, description }: FlowStepProps) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex-shrink-0 w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">
        {step}
      </div>
      <div className="flex-1 pt-1">
        <h4 className="text-lg font-bold text-neutral-900 mb-1">{title}</h4>
        <p className="text-neutral-700">{description}</p>
      </div>
    </div>
  );
}
