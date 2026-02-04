import { AlertCircle, CheckCircle, Wrench } from 'lucide-react';

export default function CommonMistakes() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl sm:text-5xl font-bold text-yellow-600 mb-6">
        Common Mistakes & Debugging
      </h1>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
        <p className="text-lg text-neutral-800">
          Everyone makes mistakes when learning to program. That's completely normal and expected! This guide will help
          you recognize common issues and fix them quickly.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">Robot Behavior Issues</h2>
        <div className="space-y-6">
          <MistakeCard
            title="Robot doesn't move at all"
            symptoms={["Motors don't spin", 'No response to controller', 'Robot just sits there']}
            commonCauses={[
              'OpMode not started (press Play button)',
              'Motors not initialized in Hardware.java',
              'Wrong device names in hardwareMap',
              'Motor power set to 0 or very low',
              'Emergency stop engaged',
            ]}
            howToFix={[
              'Check Driver Station - is OpMode running?',
              'Verify motor names match between code and robot configuration',
              'Add telemetry to see if loop is running',
              'Check that setPower() is actually being called',
            ]}
            codeExample={`// Add this to see if code is running
telemetry.addData("Status", "Loop running");
telemetry.addData("Motor Power", motorPower);
telemetry.update();`}
          />

          <MistakeCard
            title="Robot moves in wrong direction"
            symptoms={['Forward makes robot go backward', 'Left joystick moves robot right', 'Rotation goes wrong way']}
            commonCauses={[
              'Motor reversed in configuration',
              'Joystick Y-axis is inverted (common issue)',
              'Motor wired backward physically',
              'Wrong sign on power values',
            ]}
            howToFix={[
              'Add motor.setDirection(DcMotorSimple.Direction.REVERSE) in Hardware.java',
              'Remember gamepad Y-axis is negative when pushing up',
              'Check motor direction one at a time with a test OpMode',
              'Verify mecanum wheel mounting orientation',
            ]}
            codeExample={`// Fix inverted Y-axis
double y = -gamepad1.left_stick_y;  // Note the negative!

// Reverse a motor if needed
motor.setDirection(DcMotorSimple.Direction.REVERSE);`}
          />

          <MistakeCard
            title="Code compiles but nothing happens"
            symptoms={['No errors shown', 'OpMode runs but robot inactive', 'Telemetry shows data but no movement']}
            commonCauses={[
              'Logic error in if statements',
              'Power values are 0 or too small',
              'Safety checks preventing action',
              'Wrong gamepad (using gamepad2 instead of gamepad1)',
            ]}
            howToFix={[
              'Add telemetry inside if statements to see if they execute',
              'Print button states to verify input detection',
              'Test with hardcoded values instead of calculations',
              'Simplify code to minimal test case',
            ]}
            codeExample={`// Debug if statements
if (gamepad1.a) {
    telemetry.addData("Button A", "PRESSED");
    intake.collect();
} else {
    telemetry.addData("Button A", "not pressed");
}`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">Vision & Sensor Issues</h2>
        <div className="space-y-6">
          <MistakeCard
            title="Vision works but robot ignores it"
            symptoms={['Camera detects objects', 'Telemetry shows detection data', 'Robot doesn\'t react']}
            commonCauses={[
              'Detection code in wrong place (init instead of loop)',
              'Vision data not passed to drivetrain',
              'Threshold values too strict',
              'Auto-alignment logic not called',
            ]}
            howToFix={[
              'Move detection into loop() method, not init()',
              'Verify subsystem methods are called with vision data',
              'Print detection coordinates to verify data flow',
              'Test alignment with manual controls first',
            ]}
            codeExample={`// Make sure vision runs continuously
@Override
public void loop() {
    List<Detection> objects = camera.detectObjects();
    if (!objects.isEmpty()) {
        double targetX = objects.get(0).getX();
        telemetry.addData("Target X", targetX);
        drive.alignTo(targetX);
    }
}`}
          />

          <MistakeCard
            title="Sensors give weird readings"
            symptoms={['Distance sensor shows 0 always', 'Color sensor never changes', 'Encoder stuck at same value']}
            commonCauses={[
              'Sensor not initialized',
              'Wrong port configuration',
              'Sensor blocked or damaged',
              'Reading sensor once instead of continuously',
            ]}
            howToFix={[
              'Check sensor wiring and ports',
              'Verify sensor name in hardwareMap',
              'Read sensor value inside loop(), not init()',
              'Print raw sensor values to diagnose',
            ]}
            codeExample={`// Read sensor in loop
@Override
public void loop() {
    double distance = distanceSensor.getDistance(DistanceUnit.INCH);
    telemetry.addData("Distance", "%.1f in", distance);
}`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">Autonomous Issues</h2>
        <div className="space-y-6">
          <MistakeCard
            title="Autonomous runs but does nothing"
            symptoms={['OpMode starts', 'Time counts down', 'Robot sits still']}
            commonCauses={[
              'Path or command not triggered in start()',
              'Loop exits immediately',
              'Waiting for condition that never happens',
              'Commands sent to wrong subsystems',
            ]}
            howToFix={[
              'Add telemetry in every major step',
              'Verify start() method is implemented',
              'Check for logic errors in state machine',
              'Test each movement command individually',
            ]}
            codeExample={`@Override
public void start() {
    telemetry.addData("Auto", "Starting");
    telemetry.update();
    // Actually start your path here!
    pathFollower.start();
}`}
          />

          <MistakeCard
            title="Robot overshoots target or never reaches it"
            symptoms={['Drives past destination', 'Stops too early', 'Wobbles back and forth']}
            commonCauses={[
              'Odometry not calibrated',
              'PID constants too aggressive or weak',
              'Target threshold too tight',
              'Slippage not accounted for',
            ]}
            howToFix={[
              'Tune Specifications.java constants',
              'Increase target tolerance values',
              'Test odometry accuracy with simple movements',
              'Add timeout to prevent infinite loops',
            ]}
            codeExample={`// Add tolerance and timeout
double distanceToTarget = calculateDistance(current, target);
if (distanceToTarget < 2.0) {  // 2 inch tolerance
    // Reached target!
    stop();
}`}
          />
        </div>
      </section>

      <section className="mb-12 bg-neutral-100 p-8 rounded-xl">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">Debugging Checklist</h2>
        <div className="space-y-4">
          <ChecklistItem text="OpMode is selected and Play button pressed" />
          <ChecklistItem text="Driver Station shows 'Running' status" />
          <ChecklistItem text="No errors in telemetry or logs" />
          <ChecklistItem text="Robot controller is connected (green light)" />
          <ChecklistItem text="Battery is charged and connected" />
          <ChecklistItem text="Motor names match robot configuration" />
          <ChecklistItem text="Code has been uploaded to robot controller" />
          <ChecklistItem text="Telemetry shows expected values" />
          <ChecklistItem text="Emergency stop is not engaged" />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">Debugging Techniques</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <TechniqueCard
            icon={<Wrench size={32} />}
            title="Use Telemetry Everywhere"
            description="Print values to the Driver Station screen to see what your code is thinking. Add telemetry before and after important operations."
            example={`telemetry.addData("Status", "Running");
telemetry.addData("Power", motorPower);
telemetry.update();`}
          />
          <TechniqueCard
            icon={<Wrench size={32} />}
            title="Test One Thing at a Time"
            description="Isolate the problem by testing individual subsystems. Create simple test OpModes that only control one motor or sensor."
            example={`// TestIntake.java
if (gamepad1.a) {
    intakeMotor.setPower(0.5);
} else {
    intakeMotor.setPower(0);
}`}
          />
          <TechniqueCard
            icon={<Wrench size={32} />}
            title="Comment Out Code"
            description="Temporarily disable sections of code to narrow down where the problem is. Use // to comment out lines."
            example={`// drive.forward();  // Commented out for testing
// intake.collect();  // Commented out for testing
shooter.shoot();  // Only test shooter`}
          />
          <TechniqueCard
            icon={<Wrench size={32} />}
            title="Use Hardcoded Values"
            description="Replace calculations with fixed numbers to verify logic works before adding complexity."
            example={`// Instead of complex calculation:
// double power = calculatePower();

// Use simple value:
double power = 0.5;`}
          />
        </div>
      </section>

      <div className="bg-green-100 border-2 border-green-500 p-8 rounded-xl">
        <div className="flex items-start gap-4">
          <CheckCircle size={48} className="text-green-600 flex-shrink-0" />
          <div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">Remember: Mistakes Are Learning Opportunities</h3>
            <p className="text-neutral-700 mb-4">
              Every experienced programmer has spent hours debugging. The skills you develop while fixing mistakes are
              just as valuable as writing code in the first place.
            </p>
            <p className="text-neutral-700 font-semibold">
              When stuck, ask for help! Your teammates and mentors have likely encountered the same issues before.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MistakeCardProps {
  title: string;
  symptoms: string[];
  commonCauses: string[];
  howToFix: string[];
  codeExample?: string;
}

function MistakeCard({ title, symptoms, commonCauses, howToFix, codeExample }: MistakeCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border-2 border-neutral-200 hover:border-yellow-500 transition-colors">
      <div className="flex items-start gap-3 mb-4">
        <AlertCircle className="text-red-500 flex-shrink-0 mt-1" size={28} />
        <h3 className="text-2xl font-bold text-neutral-900">{title}</h3>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-neutral-900 mb-2">Symptoms:</p>
        <ul className="space-y-1">
          {symptoms.map((symptom, index) => (
            <li key={index} className="flex items-start text-sm">
              <span className="text-neutral-400 mr-2">•</span>
              <span className="text-neutral-600">{symptom}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-neutral-900 mb-2">Common Causes:</p>
        <ul className="space-y-1">
          {commonCauses.map((cause, index) => (
            <li key={index} className="flex items-start text-sm">
              <span className="text-yellow-600 mr-2">▸</span>
              <span className="text-neutral-700">{cause}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-neutral-900 mb-2">How to Fix:</p>
        <ol className="space-y-2">
          {howToFix.map((fix, index) => (
            <li key={index} className="flex items-start text-sm">
              <span className="font-bold text-green-600 mr-2">{index + 1}.</span>
              <span className="text-neutral-700">{fix}</span>
            </li>
          ))}
        </ol>
      </div>

      {codeExample && (
        <div className="bg-neutral-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
          <pre>{codeExample}</pre>
        </div>
      )}
    </div>
  );
}

interface ChecklistItemProps {
  text: string;
}

function ChecklistItem({ text }: ChecklistItemProps) {
  return (
    <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
      <input type="checkbox" className="w-5 h-5 accent-yellow-500" />
      <label className="text-neutral-700 cursor-pointer">{text}</label>
    </div>
  );
}

interface TechniqueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  example: string;
}

function TechniqueCard({ icon, title, description, example }: TechniqueCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border-2 border-neutral-200 hover:border-yellow-500 transition-colors">
      <div className="text-yellow-600 mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-neutral-900 mb-3">{title}</h3>
      <p className="text-neutral-700 mb-4">{description}</p>
      <div className="bg-neutral-900 text-green-400 p-3 rounded-lg font-mono text-xs overflow-x-auto">
        <pre>{example}</pre>
      </div>
    </div>
  );
}
