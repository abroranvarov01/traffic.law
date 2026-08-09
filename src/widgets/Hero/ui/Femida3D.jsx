"use client";
import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  Center,
  Environment,
  Lightformer,
  AdaptiveDpr,
  useProgress,
} from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/femida.glb";
const DRACO_PATH = "/draco/";

/** Femida to'g'ridan-to'g'ri qarab turadigan burchak.
 *  Modelni almashtirsangiz, bu qiymatni qaytadan tanlash kerak bo'lishi mumkin. */
const BASE_ROTATION_Y = 0.05;

/** Yon tomonga sekin tebranish amplitudasi (radian) — juda kichik bo'lishi kerak,
 *  aks holda haykal yuzini burib ketadi. */
const IDLE_SWAY = 0.1;

const GOLD = "#C59D5F";

useGLTF.preload(MODEL_URL, DRACO_PATH);

const damp = (current, target, lambda, dt) =>
  THREE.MathUtils.damp(current, target, lambda, dt);

/* ------------------------------------------------------------------ */
/*  Haykal                                                             */
/* ------------------------------------------------------------------ */

const Statue = ({ drag, idleMotion, baseRotationY }) => {
  const { scene } = useGLTF(MODEL_URL, DRACO_PATH);
  const group = useRef(null);
  const inner = useRef(null);
  const enter = useRef(0);

  const model = useMemo(() => {
    const root = scene.clone(true);
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    root.scale.setScalar(size.y > 0 ? 3.9 / size.y : 1);

    root.traverse((obj) => {
      if (!obj.isMesh) return;
      obj.castShadow = true;
      obj.receiveShadow = true;
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      mats.forEach((m) => {
        if (!m) return;
        // Bronza uchun: aks etishni kuchaytiramiz, sirtni biroz silliqlaymiz.
        // Metall qiymatini oshirib yubormaymiz — aks holda xrom kabi ko'rinadi.
        m.envMapIntensity = 1.35;
        m.roughness = Math.max(0.3, (m.roughness ?? 1) * 0.78);
        m.metalness = Math.min(0.85, (m.metalness ?? 0) * 0.9 + 0.14);
        m.side = THREE.FrontSide;
        m.needsUpdate = true;
      });
    });

    return root;
  }, [scene]);

  useFrame((state, delta) => {
    const g = group.current;
    const i = inner.current;
    if (!g || !i) return;
    const dt = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;

    // Kirish animatsiyasi: pastdan ko'tarilib, biroz burilib joyiga keladi
    enter.current = Math.min(1, enter.current + dt / 1.1);
    const e = 1 - Math.pow(1 - enter.current, 3);

    // Drag inersiyasi
    if (!drag.current.active) {
      drag.current.velY *= Math.pow(0.94, dt * 60);
      drag.current.offsetY += drag.current.velY * dt;
      // Sekin "hero" burchagiga qaytish
      drag.current.offsetY = damp(drag.current.offsetY, 0, 0.6, dt);
      drag.current.offsetX = damp(drag.current.offsetX, 0, 2.2, dt);
    }

    const idle = idleMotion ? Math.sin(t * 0.35) * IDLE_SWAY : 0;
    const float = idleMotion ? Math.sin(t * 0.7) * 0.035 : 0;

    g.rotation.y = baseRotationY + idle + drag.current.offsetY + (1 - e) * 0.2;
    g.rotation.x = THREE.MathUtils.clamp(drag.current.offsetX, -0.25, 0.25);

    i.position.y = float + (1 - e) * -0.6;
    i.scale.setScalar(0.94 + 0.06 * e);

    // Ko'rinish (fade-in) — materiallar orqali emas, guruh masshtabi orqali
    g.visible = e > 0.001;
  });

  return (
    <group ref={group}>
      <group ref={inner}>
        <Center>
          <primitive object={model} />
        </Center>
      </group>
    </group>
  );
};

/* ------------------------------------------------------------------ */
/*  Oltin chang zarralari                                              */
/* ------------------------------------------------------------------ */

const Dust = ({ count = 90 }) => {
  const points = useRef(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 5.2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3.4;
      speeds[i] = 0.05 + Math.random() * 0.12;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((state, delta) => {
    const p = points.current;
    if (!p) return;
    const dt = Math.min(delta, 0.1);
    const arr = p.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * dt;
      arr[i * 3] += Math.sin(state.clock.elapsedTime * 0.4 + i) * 0.0012;
      if (arr[i * 3 + 1] > 2.6) arr[i * 3 + 1] = -2.6;
    }
    p.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={GOLD}
        transparent
        opacity={0.28}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

/* ------------------------------------------------------------------ */
/*  Sahna                                                              */
/* ------------------------------------------------------------------ */

const Rig = ({ enabled }) => {
  const { camera } = useThree();
  useFrame((state, delta) => {
    if (!enabled) return;
    const dt = Math.min(delta, 0.1);
    camera.position.x = damp(camera.position.x, state.pointer.x * 0.45, 2, dt);
    camera.position.y = damp(
      camera.position.y,
      0.15 + state.pointer.y * 0.28,
      2,
      dt
    );
    camera.lookAt(0, 0.05, 0);
  });
  return null;
};

const Scene = ({ drag, idleMotion, baseRotationY, hovered }) => {
  const rim = useRef(null);
  const key = useRef(null);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    if (rim.current) {
      rim.current.intensity = damp(
        rim.current.intensity,
        hovered.current ? 42 : 30,
        3,
        dt
      );
    }
    if (key.current) {
      key.current.intensity = damp(
        key.current.intensity,
        hovered.current ? 2.6 : 2.2,
        3,
        dt
      );
    }
  });

  return (
    <>
      <ambientLight intensity={0.22} />

      {/* Asosiy iliq yorug'lik — yuz va tarozini yoritadi */}
      <directionalLight
        ref={key}
        position={[3.2, 5.5, 5]}
        intensity={2.2}
        color="#ffe3b0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />

      {/* Oltin rim-light: siluetni ajratib turadi */}
      <spotLight
        ref={rim}
        position={[-4.8, 3.4, -3.2]}
        angle={0.85}
        penumbra={1}
        intensity={30}
        color={GOLD}
        distance={22}
      />

      {/* Yuqoridan tushuvchi "ibodatxona" nuri */}
      <spotLight
        position={[0.5, 7, 1.5]}
        angle={0.45}
        penumbra={0.9}
        intensity={22}
        color="#fff0d0"
        distance={20}
      />

      {/* Sovuq to'ldiruvchi — soyalarni ko'kimtir qiladi */}
      <pointLight position={[-3, -1.2, 3.2]} intensity={9} color="#6f83a3" />

      <Statue
        drag={drag}
        idleMotion={idleMotion}
        baseRotationY={BASE_ROTATION_Y}
      />
      <Dust />

      {/* HDRI fayli o'rniga — lightformer'lardan yig'ilgan studiya muhiti */}
      <Environment resolution={256}>
        <Lightformer
          intensity={3}
          color="#fff2da"
          position={[0, 4.5, -6]}
          scale={[10, 6, 1]}
        />
        <Lightformer
          intensity={2.2}
          color={GOLD}
          position={[-5, 1, 2]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[9, 5, 1]}
        />
        <Lightformer
          intensity={1.1}
          color="#2f3a4d"
          position={[5, 0.5, 2.5]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[9, 5, 1]}
        />
        <Lightformer
          intensity={0.85}
          color="#e8d3b0"
          position={[0, -3, 2]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[6, 6, 1]}
        />
      </Environment>

      <AdaptiveDpr pixelated />
    </>
  );
};

/* ------------------------------------------------------------------ */
/*  Wrapper                                                            */
/* ------------------------------------------------------------------ */

const Femida3D = ({
  posterSrc = "/news/femida.png",
  posterAlt = "Фемида",
  hint = "",
}) => {
  const { progress } = useProgress();
  const loaded = progress >= 100;

  const [reducedMotion, setReducedMotion] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [grabbing, setGrabbing] = useState(false);

  const drag = useRef({
    active: false,
    lastX: 0,
    lastY: 0,
    offsetX: 0,
    offsetY: 0,
    velY: 0,
  });
  const hovered = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const onPointerDown = useCallback((e) => {
    drag.current.active = true;
    drag.current.lastX = e.clientX;
    drag.current.lastY = e.clientY;
    drag.current.velY = 0;
    setGrabbing(true);
    setInteracted(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.lastX;
    const dy = e.clientY - drag.current.lastY;
    drag.current.lastX = e.clientX;
    drag.current.lastY = e.clientY;
    drag.current.offsetY += dx * 0.009;
    drag.current.offsetX = THREE.MathUtils.clamp(
      drag.current.offsetX + dy * 0.004,
      -0.25,
      0.25
    );
    drag.current.velY = dx * 0.35;
  }, []);

  const endDrag = useCallback(() => {
    drag.current.active = false;
    setGrabbing(false);
  }, []);

  return (
    <div
      className="relative h-full w-full"
      onPointerEnter={() => (hovered.current = true)}
      onPointerLeave={() => {
        hovered.current = false;
        endDrag();
      }}
    >
      {/* Yuklanguncha — eski rasm */}
      <img
        src={posterSrc}
        alt={posterAlt}
        aria-hidden={loaded}
        className={`pointer-events-none absolute inset-0 h-full w-full object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)] transition-opacity duration-700 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />

      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.15, 8.5], fov: 30, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1;
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        style={{ touchAction: "pan-y" }}
        className={`!absolute inset-0 transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${grabbing ? "cursor-grabbing" : "cursor-grab"}`}
      >
        <React.Suspense fallback={null}>
          <Rig enabled={!reducedMotion} />
          <Scene
            drag={drag}
            idleMotion={!reducedMotion}
            baseRotationY={BASE_ROTATION_Y}
            hovered={hovered}
          />
        </React.Suspense>
      </Canvas>

      {/* "Aylantirish" maslahati — birinchi tegishdan keyin yo'qoladi */}
      {hint && (
        <div
          className={`pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-white/35 transition-opacity duration-500 ${
            loaded && !interacted ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <span className="h-[1px] w-5 bg-[#C59D5F]/50" />
            {hint}
            <span className="h-[1px] w-5 bg-[#C59D5F]/50" />
          </span>
        </div>
      )}
    </div>
  );
};

export default Femida3D;
