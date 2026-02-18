import { Crosshair, Eye, Gauge, MapPinned, Radar, RotateCcw } from 'lucide-react';

const controlLoopSnippet = `error = targetOffset;
turretPower = kP * error + kD * derivative;
turretMotor.setPower(turretPower);

distance = calculateDistanceFromCamera();
hoodServo.setPosition(hoodAngleFromDistance(distance));`;

export default function TurretSystem() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-yellow-600 mb-4">
          Turret Auto-Align System
        </h1>
        <p className="text-lg text-neutral-700 max-w-4xl">
          I designed and programmed a hooded turret auto-alignment system that automatically aims the shooter at the
          target based on the robot&apos;s position on the field.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border-2 border-neutral-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">System Components</h2>
          <div className="space-y-4">
            <SystemItem icon={<MapPinned className="text-yellow-600" />} title="Odometry localization" />
            <SystemItem icon={<Eye className="text-yellow-600" />} title="Vision targeting (Limelight / AprilTag detection)" />
            <SystemItem icon={<RotateCcw className="text-yellow-600" />} title="PID control" />
            <SystemItem icon={<Gauge className="text-yellow-600" />} title="Distance-based hood angle adjustment" />
          </div>
        </div>

        <div className="bg-white border-2 border-neutral-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Flowchart Diagram</h2>
          <div className="h-full min-h-64 border-2 border-dashed border-yellow-400 rounded-xl bg-yellow-50 flex items-center justify-center p-4">
            <img
              src="public/logic.jpg"
              alt="Turret diagram placeholder"
              className="max-h-64 object-contain rounded-lg opacity-90"
            />
          </div>
          <p className="text-sm text-neutral-600 mt-3 text-center">
          </p>
        </div>
      </div>

      <div className="bg-white border-2 border-yellow-500 rounded-2xl p-6 shadow-sm mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-5">Control Logic Overview</h2>
        <ol className="space-y-4 text-neutral-700">
          <LogicStep text="The robot estimates its field position using odometry." />
          <LogicStep text="The vision system detects the target and calculates horizontal offset (tx)." />
          <LogicStep text="A PID controller rotates the turret until the offset is zero." />
          <LogicStep text="Distance to the target is calculated using camera angle and mounting height." />
          <LogicStep text="The hood angle is automatically adjusted using a distance-to-angle mapping function." />
          <LogicStep text="The system continuously updates while the robot moves." />
        </ol>
      </div>

      <div className="bg-neutral-900 rounded-2xl p-6 mb-8 shadow-lg">
        <div className="flex items-center gap-2 mb-3 text-yellow-400 font-semibold">
          <Crosshair size={18} />
          Example pseudo-logic
        </div>
        <pre className="overflow-x-auto text-sm sm:text-base text-neutral-100">
          <code>{controlLoopSnippet}</code>
        </pre>
      </div>

      <div className="bg-neutral-100 border border-neutral-200 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-neutral-900 mb-3">Reflection</h3>
        <p className="text-neutral-700">
          This system allowed the robot to aim consistently without driver adjustment, improving shooting accuracy and
          reducing cycle time. It also demonstrated how control systems, localization, and computer vision can work
          together in a robotics application.
        </p>
      </div>
    </div>
  );
}

function SystemItem({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3">
      {icon}
      <span className="text-neutral-800 font-medium">{title}</span>
    </div>
  );
}

function LogicStep({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="w-6 h-6 bg-yellow-500 text-neutral-900 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
        •
      </span>
      <p className="flex-1">{text}</p>
    </li>
  );
}
