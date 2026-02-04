import { Gamepad2, Cpu, TestTube2, Play } from 'lucide-react';

export default function OpModes() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl sm:text-5xl font-bold text-yellow-600 mb-6">
        OpModes: Your Robot Programs
      </h1>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
        <p className="text-lg text-neutral-800">
          An OpMode (Operation Mode) is a complete program that runs on your robot. Think of it like an app on your
          phone - you select which one to run, and it controls everything the robot does until you stop it.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">Types of OpModes</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <OpModeTypeCard
            icon={<Gamepad2 size={48} />}
            title="TeleOp"
            subtitle="Driver-Controlled"
            color="blue"
            description="TeleOp (Tele-Operated) modes let human drivers control the robot using gamepads. This is the main way you'll interact with the robot during competitions."
            whenToUse="During the driver-controlled period of matches, or when practicing manual control"
            examples={[
              'MainTeleOp.java - Primary competition driving program',
              'TestTeleOp.java - Simplified controls for testing',
              'TwoDriverTeleOp.java - Dual-controller setup',
            ]}
            keyFeatures={[
              'Reads gamepad inputs (buttons, joysticks)',
              'Maps controls to subsystem actions',
              'Runs in a continuous loop',
              'Can be stopped/started by driver',
            ]}
          />

          <OpModeTypeCard
            icon={<Cpu size={48} />}
            title="Autonomous"
            subtitle="Pre-programmed"
            color="green"
            description="Autonomous modes run without human input. The robot follows pre-programmed instructions to complete tasks automatically."
            whenToUse="During the autonomous period at the start of competitions, or for automated routines"
            examples={[
              'AutoBlueLeft.java - Blue alliance, left position',
              'AutoRedRight.java - Red alliance, right position',
              'AutoParkOnly.java - Simple parking program',
            ]}
            keyFeatures={[
              'No gamepad input required',
              'Uses vision and sensors for navigation',
              'Follows waypoints or decision trees',
              'Typically runs for 30 seconds',
            ]}
          />

          <OpModeTypeCard
            icon={<TestTube2 size={48} />}
            title="Test OpModes"
            subtitle="For Development"
            color="purple"
            description="Test OpModes are simplified programs used to verify individual subsystems or features work correctly. They're not used in competition."
            whenToUse="When debugging hardware, testing new code, or verifying subsystem functionality"
            examples={[
              'TestDrivetrain.java - Test mecanum movement',
              'TestVision.java - Verify camera detection',
              'TestMotors.java - Check all motor connections',
            ]}
            keyFeatures={[
              'Isolated testing of single features',
              'Usually has simple controls',
              'Prints diagnostic information',
              'Safe to experiment with',
            ]}
          />

          <div className="bg-neutral-100 p-6 rounded-xl border-2 border-neutral-300 flex items-center justify-center">
            <div className="text-center">
              <Play size={48} className="text-neutral-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-neutral-800 mb-2">How to Run</h3>
              <p className="text-neutral-600 text-sm">
                Select an OpMode on the Driver Station, press Init to initialize hardware, then press Play to start
                execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">OpMode Lifecycle</h2>
        <div className="bg-white p-8 rounded-xl shadow-md border-2 border-neutral-200">
          <div className="space-y-6">
            <LifecycleStep
              phase="1. Init"
              description="OpMode initializes hardware and sets up subsystems. Robot is stationary but preparing to run."
              code="public void init() { ... }"
              timing="Runs once when you press Init button"
            />
            <LifecycleStep
              phase="2. Init Loop"
              description="Optional repeated initialization phase. Useful for vision alignment or last-second adjustments before starting."
              code="public void init_loop() { ... }"
              timing="Runs repeatedly between Init and Play"
            />
            <LifecycleStep
              phase="3. Start"
              description="Called once when Play is pressed. Final preparations before main loop begins."
              code="public void start() { ... }"
              timing="Runs once when you press Play button"
            />
            <LifecycleStep
              phase="4. Loop"
              description="The main program logic. Continuously reads inputs, makes decisions, and commands subsystems."
              code="public void loop() { ... }"
              timing="Runs repeatedly (many times per second) while OpMode is active"
            />
            <LifecycleStep
              phase="5. Stop"
              description="Cleanup when OpMode ends. Stops all motors and resets subsystems to safe states."
              code="public void stop() { ... }"
              timing="Runs once when you press Stop button"
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">Example: Simple TeleOp Structure</h2>
        <div className="bg-neutral-900 text-green-400 p-6 rounded-xl font-mono text-sm overflow-x-auto">
          <pre>{`@TeleOp(name="Main TeleOp", group="Competition")
public class MainTeleOp extends OpMode {

    // Declare subsystems
    private MecanumDrive drive;
    private Intake intake;

    @Override
    public void init() {
        // Initialize hardware
        drive = new MecanumDrive(hardwareMap);
        intake = new Intake(hardwareMap);

        telemetry.addData("Status", "Initialized");
    }

    @Override
    public void loop() {
        // Read gamepad inputs
        double y = -gamepad1.left_stick_y;
        double x = gamepad1.left_stick_x;
        double rotation = gamepad1.right_stick_x;

        // Command drivetrain
        drive.drive(x, y, rotation);

        // Control intake with buttons
        if (gamepad1.a) {
            intake.collect();
        } else if (gamepad1.b) {
            intake.reverse();
        } else {
            intake.stop();
        }

        // Display info on driver station
        telemetry.addData("Drive Power", "%.2f", drive.getPower());
        telemetry.update();
    }

    @Override
    public void stop() {
        // Stop all subsystems
        drive.stop();
        intake.stop();
    }
}`}</pre>
        </div>
      </section>

      <section className="mb-12 bg-neutral-100 p-8 rounded-xl">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">Important Concepts</h2>
        <div className="space-y-4">
          <ConceptBlock
            title="Annotations"
            description="@TeleOp and @Autonomous are annotations that tell the system what type of OpMode it is and what to name it on the Driver Station."
          />
          <ConceptBlock
            title="Telemetry"
            description="Telemetry lets you send text and data to the Driver Station screen. Super useful for debugging and seeing what the robot is thinking."
          />
          <ConceptBlock
            title="Gamepad"
            description="gamepad1 and gamepad2 are pre-configured objects that give you access to controller inputs. No setup needed - they just work!"
          />
          <ConceptBlock
            title="HardwareMap"
            description="The hardwareMap object connects your code to physical devices. You pass it to subsystems so they can initialize their motors and sensors."
          />
        </div>
      </section>

      <div className="bg-yellow-500 text-neutral-900 p-8 rounded-xl">
        <h3 className="text-2xl font-bold mb-4">Quick Tips</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="font-bold mr-2">•</span>
            <span>Start with test OpModes to understand individual subsystems before modifying competition code</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-2">•</span>
            <span>Always include telemetry to see what your code is doing</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-2">•</span>
            <span>Remember to stop motors in the stop() method to prevent runaway</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-2">•</span>
            <span>Test changes in a safe environment before competition</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

interface OpModeTypeCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
  description: string;
  whenToUse: string;
  examples: string[];
  keyFeatures: string[];
}

function OpModeTypeCard({
  icon,
  title,
  subtitle,
  color,
  description,
  whenToUse,
  examples,
  keyFeatures,
}: OpModeTypeCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border-2 border-neutral-200 hover:border-yellow-500 transition-colors">
      <div className={`text-${color}-600 mb-4`}>{icon}</div>
      <h3 className="text-2xl font-bold text-neutral-900 mb-1">{title}</h3>
      <p className="text-sm text-neutral-500 mb-4">{subtitle}</p>
      <p className="text-neutral-700 mb-4">{description}</p>

      <div className="mb-4">
        <p className="font-semibold text-neutral-900 text-sm mb-2">When to use:</p>
        <p className="text-sm text-neutral-600">{whenToUse}</p>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-neutral-900 text-sm mb-2">Examples:</p>
        <ul className="space-y-1">
          {examples.map((example, index) => (
            <li key={index} className="text-xs text-neutral-600 font-mono bg-neutral-50 p-2 rounded">
              {example}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="font-semibold text-neutral-900 text-sm mb-2">Key features:</p>
        <ul className="space-y-1">
          {keyFeatures.map((feature, index) => (
            <li key={index} className="flex items-start text-sm">
              <span className="text-yellow-600 mr-1">•</span>
              <span className="text-neutral-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface LifecycleStepProps {
  phase: string;
  description: string;
  code: string;
  timing: string;
}

function LifecycleStep({ phase, description, code, timing }: LifecycleStepProps) {
  return (
    <div className="border-l-4 border-yellow-500 pl-4">
      <h4 className="text-lg font-bold text-neutral-900 mb-2">{phase}</h4>
      <p className="text-neutral-700 mb-2">{description}</p>
      <code className="block bg-neutral-100 px-3 py-2 rounded text-sm text-neutral-800 mb-2 font-mono">
        {code}
      </code>
      <p className="text-xs text-neutral-500 italic">{timing}</p>
    </div>
  );
}

interface ConceptBlockProps {
  title: string;
  description: string;
}

function ConceptBlock({ title, description }: ConceptBlockProps) {
  return (
    <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500">
      <h4 className="font-bold text-neutral-900 mb-1">{title}</h4>
      <p className="text-sm text-neutral-700">{description}</p>
    </div>
  );
}
