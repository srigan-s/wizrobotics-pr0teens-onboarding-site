import { Crosshair, Eye, Gauge, MapPinned, RotateCcw } from 'lucide-react';

const controlLoopSnippet = `error = targetOffset;
turretPower = kP * error + kD * derivative;
turretMotor.setPower(turretPower);

distance = calculateDistanceFromCamera();
hoodServo.setPosition(hoodAngleFromDistance(distance));`;

const turretMechanismTutorialCode = `package org.firstinspires.ftc.teamcode.subsystems.turret;

import com.qualcomm.robotcore.hardware.DcMotorEx;
import com.qualcomm.robotcore.hardware.HardwareMap;
import com.qualcomm.robotcore.hardware.Servo;
import com.qualcomm.robotcore.util.ElapsedTime;
import com.qualcomm.robotcore.util.Range;

/**
 * TurretMechanismTutorial
 *
 * This subsystem controls:
 * 1. Turret rotation using PD control and Limelight tx values
 * 2. Hood angle adjustment using Limelight ty distance estimation
 *
 * The turret attempts to align the Limelight's horizontal offset (tx) to zero.
 * The hood automatically adjusts based on calculated distance to the target.
 */
public class TurretMechanismTutorial {

    private DcMotorEx turret;
    private Servo hood;

    // ---------------- TURRET PD CONTROL ----------------
    // kP controls how strongly the turret reacts to error
    // kD dampens motion to reduce oscillation
    private double kP = 0.01;
    private double kD = 0.0;

    private double goalX = 0;
    private double lastError = 0;
    private double angleTolerance = 0.2;

    private final double MAX_POWER = 0.6;
    private double power = 0;

    private final ElapsedTime timer = new ElapsedTime();

    // ---------------- HOOD AUTO-AIM CONSTANTS ----------------
    // These values define the physical geometry of the robot + Limelight.
    private final double LIMELIGHT_HEIGHT = 0.35;     // meters
    private final double LIMELIGHT_ANGLE = Math.toRadians(25);
    private final double TARGET_HEIGHT = 0.9;         // meters

    // Servo limits determined experimentally
    private final double HOOD_MIN = 0.359;
    private final double HOOD_MAX = 0.846;

    // Expected shooting distance range (meters)
    private final double MIN_DISTANCE = 0.5;
    private final double MAX_DISTANCE = 3.0;

    /**
     * Initializes turret motor and hood servo from the hardware map.
     */
    public void init(HardwareMap hwMap) {
        turret = hwMap.get(DcMotorEx.class, "llmotor");
        turret.setMode(DcMotorEx.RunMode.RUN_WITHOUT_ENCODER);

        hood = hwMap.get(Servo.class, "hood");
    }

    public void resetTimer() {
        timer.reset();
    }

    // PD tuning helpers
    public void setkP(double newkP) { kP = newkP; }
    public void setkD(double newkD) { kD = newkD; }
    public double getkP() { return kP; }
    public double getkD() { return kD; }

    /**
     * Main update loop for turret + hood auto-alignment.
     *
     * @param tx horizontal Limelight offset (degrees)
     * @param ty vertical Limelight offset (degrees)
     */
    public void update(Double tx, Double ty) {

        double deltaTime = timer.seconds();
        timer.reset();

        // If no target is detected, stop turret motion
        if (tx == null) {
            turret.setPower(0);
            lastError = 0;
            return;
        }

        // ---------------- TURRET ALIGNMENT ----------------
        double error = goalX - tx;

        double pTerm = error * kP;
        double dTerm = 0;

        if (deltaTime > 0) {
            dTerm = ((error - lastError) / deltaTime) * kD;
        }

        if (Math.abs(error) < angleTolerance) {
            power = 0;
        } else {
            power = Range.clip(pTerm + dTerm, -MAX_POWER, MAX_POWER);
        }

        turret.setPower(power);
        lastError = error;

        // ---------------- HOOD AUTO-AIM ----------------
        // Distance is estimated using Limelight vertical angle (ty)
        if (ty != null) {

            double distance =
                    (TARGET_HEIGHT - LIMELIGHT_HEIGHT) /
                            Math.tan(LIMELIGHT_ANGLE + Math.toRadians(ty));

            // Map distance linearly to hood servo position
            double hoodPos =
                    HOOD_MIN +
                            (distance - MIN_DISTANCE) /
                                    (MAX_DISTANCE - MIN_DISTANCE) *
                                    (HOOD_MAX - HOOD_MIN);

            hoodPos = Math.max(HOOD_MIN, Math.min(HOOD_MAX, hoodPos));
            hood.setPosition(hoodPos);
        }
    }
}`;

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
              src="/logic.jpg"
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

      <div className="bg-white border-2 border-neutral-200 rounded-2xl p-6 shadow-sm mb-8">
        <h3 className="text-2xl font-bold text-neutral-900 mb-3">Build Walkthrough Video</h3>
        <p className="text-neutral-700 mb-4">
          I used this walkthrough as inspiration while building the turret system. The embedded video starts at the
          section I referenced for the implementation.
        </p>
        <div className="relative w-full overflow-hidden rounded-xl border border-neutral-300" style={{ paddingTop: '56.25%' }}>
          <iframe
            className="absolute left-0 top-0 h-full w-full"
            src="https://www.youtube.com/embed/55FDgyuhWTM?start=1718"
            title="Turret system inspiration video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>

      <div className="bg-white border-2 border-neutral-200 rounded-2xl p-6 shadow-sm mb-8">
        <h3 className="text-2xl font-bold text-neutral-900 mb-4">Code Walkthrough: TurretMechanismTutorial.java</h3>
        <p className="text-neutral-700 mb-5">
          This class combines two jobs in one update loop: the turret motor turns until the Limelight&apos;s horizontal
          error (<code>tx</code>) is near zero, and the hood servo auto-adjusts from estimated distance using vertical
          angle (<code>ty</code>).
        </p>

        <div className="bg-neutral-900 rounded-xl p-4 mb-5 overflow-x-auto">
          <pre className="text-xs sm:text-sm text-neutral-100">
            <code>{turretMechanismTutorialCode}</code>
          </pre>
        </div>

        <ol className="space-y-3 text-neutral-700 list-decimal pl-5">
          <li>
            <span className="font-semibold">Setup:</span> <code>init()</code> grabs the turret motor and hood servo
            from the hardware map, then puts the turret in <code>RUN_WITHOUT_ENCODER</code> so power can be applied
            directly.
          </li>
          <li>
            <span className="font-semibold">Timing:</span> each <code>update()</code> call measures elapsed time with
            <code>ElapsedTime</code> so derivative can be scaled correctly by loop speed.
          </li>
          <li>
            <span className="font-semibold">No target safety:</span> if <code>tx</code> is <code>null</code>, turret
            power is set to zero and the method exits so the robot does not hunt blindly.
          </li>
          <li>
            <span className="font-semibold">PD turret control:</span> error is <code>goalX - tx</code>, then
            proportional and derivative terms are combined and clipped to <code>MAX_POWER</code>.
          </li>
          <li>
            <span className="font-semibold">Tolerance handling:</span> if error is inside <code>angleTolerance</code>,
            power is forced to zero so the turret settles instead of twitching around center.
          </li>
          <li>
            <span className="font-semibold">Hood distance estimate:</span> when <code>ty</code> exists, distance is
            computed from camera geometry (height difference and total vertical angle).
          </li>
          <li>
            <span className="font-semibold">Servo mapping:</span> distance is mapped linearly into
            <code>HOOD_MIN</code> to <code>HOOD_MAX</code>, clamped to safe bounds, then sent to
            <code>hood.setPosition()</code>.
          </li>
        </ol>
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
