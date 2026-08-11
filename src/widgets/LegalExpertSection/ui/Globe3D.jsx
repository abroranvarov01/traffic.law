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
	ContactShadows,
	AdaptiveDpr,
	useProgress,
} from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/globe.glb";
const DRACO_PATH = "/draco/";

/** Globus qaysi tomoni bilan qarab turishi (radian). */
const BASE_ROTATION_Y = 0.0;

/** Avtomatik aylanish tezligi (radian/soniya). Sekin bo'lsin — bezak, karusel emas. */
const AUTO_SPIN = 0.15;

/** Sichqoncha ustida turganda aylanish shuncha marta sekinlashadi. */
const HOVER_SLOWDOWN = 0.3;

const GOLD = "#C59D5F";

useGLTF.preload(MODEL_URL, DRACO_PATH);

const damp = (current, target, lambda, dt) =>
	THREE.MathUtils.damp(current, target, lambda, dt);

const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

/* ------------------------------------------------------------------ */
/*  Globus                                                             */
/* ------------------------------------------------------------------ */

const Globe = ({ drag, idleMotion, hovered }) => {
	const { scene } = useGLTF(MODEL_URL, DRACO_PATH);
	const group = useRef(null);
	const inner = useRef(null);
	const enter = useRef(0);
	const spin = useRef(0);

	const model = useMemo(() => {
		const root = scene.clone(true);
		const box = new THREE.Box3().setFromObject(root);
		const size = box.getSize(new THREE.Vector3());
		root.scale.setScalar(size.y > 0 ? 3.6 / size.y : 1);

		root.traverse((obj) => {
			if (!obj.isMesh) return;
			obj.castShadow = true;
			obj.receiveShadow = true;
			const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
			mats.forEach((m) => {
				if (!m) return;
				// Skan qilingan globus: qog'oz xarita mat, latun oyoq yaltiroq bo'lishi kerak.
				// Shuning uchun metalness'ni ko'tarmaymiz — u modelning o'z teksturasidan keladi.
				m.envMapIntensity = 1.3;
				m.roughness = THREE.MathUtils.clamp((m.roughness ?? 1) * 0.75, 0.25, 1);
				// Iliq grading: xarita ranglari saytning qora-oltin palitrasiga moslashadi
				m.color.set("#E8DFD0");
				// Yon tomondan qaralganda tekstura yoyilib ketmasligi uchun
				if (m.map) m.map.anisotropy = 8;
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
		const d = drag.current;

		// Kirish: pastdan ko'tarilib, sekin tezlashib aylana boshlaydi
		enter.current = Math.min(1, enter.current + dt / 1.4);
		const e = easeOutCubic(enter.current);

		if (d.active) {
			// Barmoq/sichqoncha bilan burash — to'g'ridan-to'g'ri
			spin.current += d.deltaY;
			d.deltaY = 0;
		} else {
			// Qo'yib yuborilgandan keyingi inersiya
			spin.current += d.vel * dt;
			d.vel *= Math.pow(0.94, dt * 60);
			if (Math.abs(d.vel) < 0.001) d.vel = 0;

			// Doimiy sekin aylanish (hover'da sekinlashadi)
			const auto = idleMotion
				? AUTO_SPIN * (hovered.current ? HOVER_SLOWDOWN : 1)
				: 0;
			spin.current += auto * e * dt;

			d.tilt = damp(d.tilt, 0, 1.4, dt);
		}

		// Nafas olayotgandek juda kichik tebranish
		const breathe = idleMotion ? Math.sin(t * 0.5) * 0.02 : 0;
		const float = idleMotion ? Math.sin(t * 0.65) * 0.03 : 0;

		g.rotation.y = BASE_ROTATION_Y + spin.current + (1 - e) * 0.45;
		g.rotation.x = THREE.MathUtils.clamp(d.tilt + breathe, -0.32, 0.32);

		i.position.y = float + (1 - e) * -0.5;
		i.scale.setScalar(0.9 + 0.1 * e);
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

const Dust = ({ count = 70 }) => {
	const points = useRef(null);

	const { positions, speeds } = useMemo(() => {
		const positions = new Float32Array(count * 3);
		const speeds = new Float32Array(count);
		for (let i = 0; i < count; i++) {
			positions[i * 3] = (Math.random() - 0.5) * 5;
			positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
			positions[i * 3 + 2] = (Math.random() - 0.5) * 3.2;
			speeds[i] = 0.04 + Math.random() * 0.1;
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
			arr[i * 3] += Math.sin(state.clock.elapsedTime * 0.4 + i) * 0.001;
			if (arr[i * 3 + 1] > 2.5) arr[i * 3 + 1] = -2.5;
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
				size={0.028}
				color={GOLD}
				transparent
				opacity={0.25}
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
		camera.position.x = damp(camera.position.x, state.pointer.x * 0.4, 2, dt);
		camera.position.y = damp(
			camera.position.y,
			0.2 + state.pointer.y * 0.25,
			2,
			dt
		);
		camera.lookAt(0, 0.05, 0);
	});
	return null;
};

const Scene = ({ drag, idleMotion, hovered }) => {
	const key = useRef(null);
	const rim = useRef(null);

	useFrame((state, delta) => {
		const dt = Math.min(delta, 0.1);
		// Sichqoncha yaqinlashganda yorug'lik biroz "jonlanadi"
		if (rim.current) {
			rim.current.intensity = damp(
				rim.current.intensity,
				hovered.current ? 34 : 22,
				3,
				dt
			);
		}
		if (key.current) {
			key.current.intensity = damp(
				key.current.intensity,
				hovered.current ? 2.1 : 1.7,
				3,
				dt
			);
		}
	});

	return (
		<>
			<ambientLight intensity={0.14} />

			{/* Asosiy iliq yorug'lik */}
			<directionalLight
				ref={key}
				position={[3.4, 5, 4.6]}
				intensity={1.7}
				color="#ffe6bd"
				castShadow
				shadow-mapSize={[1024, 1024]}
				shadow-bias={-0.0006}
			/>

			{/* Oltin rim-light — siluetni qorong'i fondan ajratadi */}
			<spotLight
				ref={rim}
				position={[-4.6, 2.6, -3.4]}
				angle={0.9}
				penumbra={1}
				intensity={22}
				color={GOLD}
				distance={20}
			/>

			{/* Sovuq to'ldiruvchi — okeanlarni ko'kimtir qiladi */}
			<pointLight position={[-3.2, -0.8, 3.4]} intensity={7} color="#6f8bb0" />

			<Globe drag={drag} idleMotion={idleMotion} hovered={hovered} />
			<Dust />

			{/* Yerga tushadigan yumshoq soya — obyektni "havoda osilgan"dan qutqaradi */}
			<ContactShadows
				position={[0, -1.95, 0]}
				opacity={0.5}
				scale={7}
				blur={2.8}
				far={3}
				resolution={512}
				color="#000000"
			/>

			{/* HDRI fayli o'rniga — lightformer'lardan yig'ilgan studiya muhiti */}
			<Environment resolution={256}>
				<Lightformer
					intensity={2.6}
					color="#fff3e0"
					position={[0, 4, -6]}
					scale={[10, 6, 1]}
				/>
				<Lightformer
					intensity={2.4}
					color={GOLD}
					position={[-5, 1, 2]}
					rotation={[0, Math.PI / 2, 0]}
					scale={[9, 5, 1]}
				/>
				<Lightformer
					intensity={1}
					color="#33415a"
					position={[5, 0.5, 2.5]}
					rotation={[0, -Math.PI / 2, 0]}
					scale={[9, 5, 1]}
				/>
				<Lightformer
					intensity={0.7}
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

const Globe3D = ({
	posterSrc = "/news/globe.png",
	posterAlt = "Globe",
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
		deltaY: 0,
		tilt: 0,
		vel: 0,
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
		const d = drag.current;
		d.active = true;
		d.lastX = e.clientX;
		d.lastY = e.clientY;
		d.vel = 0;
		d.deltaY = 0;
		setGrabbing(true);
		setInteracted(true);
		e.currentTarget.setPointerCapture?.(e.pointerId);
	}, []);

	const onPointerMove = useCallback((e) => {
		const d = drag.current;
		if (!d.active) return;
		const dx = e.clientX - d.lastX;
		const dy = e.clientY - d.lastY;
		d.lastX = e.clientX;
		d.lastY = e.clientY;
		d.deltaY += dx * 0.008;
		d.tilt = THREE.MathUtils.clamp(d.tilt + dy * 0.0035, -0.32, 0.32);
		d.vel = dx * 0.32;
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
			{/* Yuklanguncha — statik rasm */}
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
				camera={{ position: [0, 0.2, 8.2], fov: 30, near: 0.1, far: 100 }}
				gl={{
					antialias: true,
					alpha: true,
					powerPreference: "high-performance",
				}}
				onCreated={({ gl }) => {
					gl.toneMapping = THREE.ACESFilmicToneMapping;
					gl.toneMappingExposure = 0.9;
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

export default Globe3D;
