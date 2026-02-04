import { Brain, Eye, Gamepad2, Cpu } from 'lucide-react';

export default function GettingStarted() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl sm:text-5xl font-bold text-yellow-600 mb-6">
        Start Here: Understanding Your Robot
      </h1>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
        <p className="text-lg text-neutral-800">
          Think of the robot as a body, and your code as its brain. Just like your brain tells your body what to do,
          your code tells the robot how to move, react, and accomplish tasks.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">The Big Picture</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <ConceptCard
            icon={<Gamepad2 size={40} />}
            title="Inputs"
            subtitle="How the robot receives information"
            items={[
              'Controller buttons and joysticks',
              'Cameras that see game pieces',
              'Sensors that detect position',
              'Touch sensors for limits',
            ]}
          />
          <ConceptCard
            icon={<Brain size={40} />}
            title="Processing"
            subtitle="How the robot makes decisions"
            items={[
              'Code reads controller inputs',
              'Vision system identifies objects',
              'Autonomous programs plan paths',
              'Safety checks prevent damage',
            ]}
          />
          <ConceptCard
            icon={<Cpu size={40} />}
            title="Outputs"
            subtitle="How the robot acts on decisions"
            items={[
              'Motors spin wheels to move',
              'Servos rotate arms and claws',
              'Mechanisms intake and shoot',
              'Lights indicate robot status',
            ]}
          />
          <ConceptCard
            icon={<Eye size={40} />}
            title="Feedback"
            subtitle="How the robot knows what happened"
            items={[
              'Odometry tracks position',
              'Sensors confirm actions',
              'Vision verifies alignment',
              'Encoders measure rotation',
            ]}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">How Programming Controls the Robot</h2>
        <div className="space-y-6">
          <StepCard
            number={1}
            title="You Press a Button"
            description="When you press the A button on the controller, the robot controller (brain) receives that signal."
            example="gamepad1.a == true"
          />
          <StepCard
            number={2}
            title="Code Processes the Input"
            description="Your code checks which button was pressed and decides what should happen. This is where your programming logic lives."
            example="if (controller pressed A) { do something }"
          />
          <StepCard
            number={3}
            title="Code Commands Hardware"
            description="Your code sends instructions to specific robot parts (subsystems) like the drivetrain, intake, or shooter."
            example="intake.collect() or drivetrain.forward()"
          />
          <StepCard
            number={4}
            title="Hardware Executes"
            description="Motors spin, servos move, and mechanisms activate based on your code's commands. The physical robot moves!"
            example="Motor spins at 0.8 power"
          />
        </div>
      </section>

      <section className="mb-12 bg-neutral-100 p-8 rounded-xl">
        <h2 className="text-3xl font-bold text-neutral-900 mb-4">Important Mental Models</h2>
        <div className="space-y-4">
          <MentalModel
            title="Code Runs in Loops"
            description="Your robot code doesn't run once and stop. It runs continuously in loops, checking inputs and updating outputs many times per second. Think of it like breathing - it happens automatically and repeatedly."
          />
          <MentalModel
            title="Subsystems Are Independent"
            description="Each robot part (drivetrain, intake, shooter) has its own code file. They work independently but can communicate. Like how your legs can walk while your hands open a door."
          />
          <MentalModel
            title="There Are Two Main Modes"
            description="TeleOp (driver-controlled) is when you use controllers. Autonomous is when the robot runs pre-programmed instructions without human input."
          />
          <MentalModel
            title="Safety First"
            description="The code includes many safety checks to prevent damage. If something seems wrong, the robot will stop itself. This is intentional and protects the hardware."
          />
        </div>
      </section>

      <div className="bg-yellow-500 text-neutral-900 p-8 rounded-xl">
        <h3 className="text-2xl font-bold mb-4">You're Ready!</h3>
        <p className="text-lg mb-4">
          Now that you understand the basic concepts, you can explore how our specific code is organized.
          Don't worry if you don't understand everything at first - programming is learned by doing, not just reading.
        </p>
        <p className="font-semibold">
          Next step: Check out the Codebase Map to see where everything lives.
        </p>
      </div>
    </div>
  );
}

interface ConceptCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  items: string[];
}

function ConceptCard({ icon, title, subtitle, items }: ConceptCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border-2 border-neutral-200 hover:border-yellow-500 transition-colors">
      <div className="text-yellow-600 mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-neutral-900 mb-1">{title}</h3>
      <p className="text-sm text-neutral-600 mb-4">{subtitle}</p>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="text-yellow-600 mr-2">•</span>
            <span className="text-neutral-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  example: string;
}

function StepCard({ number, title, description, example }: StepCardProps) {
  return (
    <div className="flex gap-4 bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
      <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
        {number}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-neutral-900 mb-2">{title}</h3>
        <p className="text-neutral-700 mb-3">{description}</p>
        <code className="block bg-neutral-100 px-4 py-2 rounded text-sm text-neutral-800 border border-neutral-300">
          {example}
        </code>
      </div>
    </div>
  );
}

interface MentalModelProps {
  title: string;
  description: string;
}

function MentalModel({ title, description }: MentalModelProps) {
  return (
    <div className="bg-white p-6 rounded-lg border-l-4 border-yellow-500">
      <h3 className="text-lg font-bold text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-700">{description}</p>
    </div>
  );
}
