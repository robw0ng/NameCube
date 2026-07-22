import './Cube.css';
import { useRef, useEffect, Fragment } from 'react';
import iconMinecraft from './assets/games/icon-minecraft.png';
import iconTerraria from './assets/games/icon-terraria.png';
import iconSunshine from './assets/games/icon-sunshine.png';
import iconPalworld from './assets/games/icon-palworld.png';
import iconSkate3 from './assets/games/icon-skate3.png';

import iconWindows from './assets/stack/windows.png';
import iconVscode from './assets/stack/vscode.png';
import iconRider from './assets/stack/rider.png';
import iconConemu from './assets/stack/conemu.png';
import iconClaude from './assets/stack/claude.png';
import iconShura from './assets/stack/shura.png';

/** Each row is a run of icon+label pairs joined by a slash, with an optional trailing
 *  link — so the editors share a line and Vetty rides along instead of taking a row. */
const techStack: {
    parts: { icon: string; label: string }[];
    link?: { text: string; href: string };
}[] = [
    { parts: [{ icon: iconWindows, label: 'Windows' }] },
    {
        parts: [
            { icon: iconVscode, label: 'VS Code' },
            { icon: iconRider, label: 'Rider' },
        ],
        link: { text: '+ Vetty :)', href: '#vetty' },
    },
    { parts: [{ icon: iconConemu, label: 'ConEmu, Git Bash + PowerShell' }] },
    { parts: [{ icon: iconClaude, label: 'Claude Code' }] },
    { parts: [{ icon: iconShura, label: 'TEX Shura, DIY build' }] },
];

const topGames = [
    { name: 'Minecraft', icon: iconMinecraft },
    { name: 'Terraria', icon: iconTerraria },
    { name: 'Super Mario Sunshine', icon: iconSunshine },
    { name: 'Palworld', icon: iconPalworld },
    { name: 'Skate 3', icon: iconSkate3 },
];

/* ---------- rotation maths ----------
   Row-major 3x3. CSS axes: +X right, +Y down, +Z toward the viewer. */

type Mat3 = number[];
type FaceKey = 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom';

const IDENTITY: Mat3 = [1, 0, 0, 0, 1, 0, 0, 0, 1];

function mul(a: Mat3, b: Mat3): Mat3 {
    const out: Mat3 = new Array(9);
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            out[r * 3 + c] = a[r * 3] * b[c] + a[r * 3 + 1] * b[3 + c] + a[r * 3 + 2] * b[6 + c];
        }
    }
    return out;
}

function rotX(deg: number): Mat3 {
    const t = (deg * Math.PI) / 180, c = Math.cos(t), s = Math.sin(t);
    return [1, 0, 0, 0, c, -s, 0, s, c];
}

function rotY(deg: number): Mat3 {
    const t = (deg * Math.PI) / 180, c = Math.cos(t), s = Math.sin(t);
    return [c, 0, s, 0, 1, 0, -s, 0, c];
}

/** matrix3d() is column-major, so columns are the images of the basis vectors. */
function toCss(m: Mat3): string {
    return `matrix3d(${m[0]},${m[3]},${m[6]},0,${m[1]},${m[4]},${m[7]},0,${m[2]},${m[5]},${m[8]},0,0,0,0,1)`;
}

/** Z component of m * n — how directly a face normal points at the viewer. */
function forwardness(m: Mat3, n: readonly number[]): number {
    return m[6] * n[0] + m[7] * n[1] + m[8] * n[2];
}

/** Each face's outward normal, plus the orientation that brings it forward and upright.
 *  The back face is deliberately absent — it has no content, so it isn't reachable. */
const FACES: { key: FaceKey; normal: readonly number[]; upright: Mat3 }[] = [
    { key: 'front',  normal: [0, 0, 1],  upright: IDENTITY },
    { key: 'right',  normal: [1, 0, 0],  upright: rotY(-90) },
    { key: 'left',   normal: [-1, 0, 0], upright: rotY(90) },
    { key: 'top',    normal: [0, -1, 0], upright: rotX(-90) },
    { key: 'bottom', normal: [0, 1, 0],  upright: rotX(90) },
];


export default function Cube() {
    const cubeRef = useRef<HTMLDivElement | null>(null);
    const topFaceTextRef = useRef<HTMLDivElement | null>(null);
    const bottomFaceTextRef = useRef<HTMLDivElement | null>(null);
    const leftFaceTextRef = useRef<HTMLDivElement | null>(null);
    const rightFaceTextRef = useRef<HTMLDivElement | null>(null);
    const frontFaceTextRef = useRef<HTMLDivElement | null>(null);

    const isDragging = useRef<boolean>(false);
    const lastMouseX = useRef<number>(0);
    const lastMouseY = useRef<number>(0);
    // Orientation as a rotation matrix instead of Euler angles. Euler angles gimbal:
    // with `rotateX(a) rotateY(b)`, the Y spin happens in the cube's own frame, so once
    // you're 90deg over onto the top face that axis points at the viewer and horizontal
    // dragging rolls instead of turns. Pre-multiplying a matrix applies each drag
    // increment about the *screen* axes, so every face drags like the front does.
    const orientation = useRef<Mat3>(IDENTITY);

    const handlePointerDown = (e: PointerEvent) => {
        if (!cubeRef.current || !cubeRef.current.contains(e.target as Node)){
            return
        }

        isDragging.current = true;
        lastMouseX.current = e.clientX;
        lastMouseY.current = e.clientY;

        if (cubeRef.current) {
            cubeRef.current.style.transition = 'none'; // Disable transition while dragging
        }
    };

    const handlePointerMove = (e: PointerEvent) => {
        if (!isDragging.current) return;

        const deltaX = e.clientX - lastMouseX.current;
        const deltaY = e.clientY - lastMouseY.current;

        // screen-space increment, pre-multiplied onto the current orientation
        const step = mul(rotY(deltaX * 0.3), rotX(-deltaY * 0.3));
        orientation.current = mul(step, orientation.current);

        lastMouseX.current = e.clientX;
        lastMouseY.current = e.clientY;

        if (cubeRef.current) {
            cubeRef.current.style.transform = toCss(orientation.current);
        }
    };

    const handlePointerUp = () => {
        if (!isDragging.current) return;
        isDragging.current = false;
        snapToFace();
    };

    function hideFaces(){
        for (const r of [topFaceTextRef, bottomFaceTextRef, leftFaceTextRef, rightFaceTextRef, frontFaceTextRef]) {
            if (r.current) r.current.style.opacity = "0";
        }
    };

    function showActiveFace(key: FaceKey){
        hideFaces();
        const ref = {
            front: frontFaceTextRef,
            left: leftFaceTextRef,
            right: rightFaceTextRef,
            top: topFaceTextRef,
            bottom: bottomFaceTextRef,
            back: null,
        }[key];
        if (ref?.current) ref.current.style.opacity = "1";
    }

    const snapToFace = () => {
        // Whichever face normal ends up pointing most at the viewer wins, and we snap to
        // that face's upright orientation — so you never land rolled or upside down.
        // The back isn't in FACES, so you can spin freely through it but never rest on it.
        let best = FACES[0];
        let bestZ = -Infinity;
        for (const f of FACES) {
            const z = forwardness(orientation.current, f.normal);
            if (z > bestZ) { bestZ = z; best = f; }
        }

        orientation.current = best.upright;
        showActiveFace(best.key);

        if (cubeRef.current) {
            cubeRef.current.style.transition = 'transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            cubeRef.current.style.transform = toCss(orientation.current);
        }
    };

    useEffect(() => {
        document.body.addEventListener('pointerdown', handlePointerDown);
        document.body.addEventListener('pointermove', handlePointerMove);
        document.body.addEventListener('pointerup', handlePointerUp);

        if (cubeRef.current) {
            cubeRef.current.style.transform = toCss(orientation.current);
        }
        if (frontFaceTextRef.current){
            frontFaceTextRef.current.style.opacity = "1";
        }

        return () => {
            document.body.removeEventListener('pointerdown', handlePointerDown);
            document.body.removeEventListener('pointermove', handlePointerMove);
            document.body.removeEventListener('pointerup', handlePointerUp);
        };
    }, []);

    return (
        <div id="cube-area">
            <div className="cube-container">
                <div ref={cubeRef} className="cube">
                    {/* The page below carries everything load-bearing (bio, projects,
                        resume, contact). The cube just carries interests, so nothing
                        important is hidden behind an interaction and nothing repeats. */}
                    <div className="cube-face front">
                        <div ref={frontFaceTextRef} className="cube-text front" style={{opacity: 1}}>
                            <div className="text center">
                                <p className="paragraph face-copy">
                                    <label className="face-title">👋 Hi, I'm Robert.</label>
                                    <span className="face-sub">
                                        This cube holds my personal interests. Scroll down for my
                                        work.
                                    </span>
                                    <span className="face-hint">drag to spin</span>
                                </p>
                            </div>
                            <div className="text top">Hobbies</div>
                            <div className="text bottom">Gaming</div>
                            <div className="text left">Tech Stack</div>
                            <div className="text right">Collecting</div>
                        </div>
                    </div>
                    <div className="cube-face back">
                    </div>
                    <div className="cube-face left">
                        <div ref={leftFaceTextRef} className="cube-text left">
                            <div className="text center">
                                <p className="paragraph face-copy">
                                    <span className="face-lead">
                                        My tech stack:
                                    </span>
                                    <span className="interest-list with-icons">
                                        {techStack.map((t) => (
                                            <span key={t.parts[0].label}>
                                                {t.parts.map((p, i) => (
                                                    <Fragment key={p.label}>
                                                        {i > 0 && <span className="stack-sep">/</span>}
                                                        <img className="stack-icon" src={p.icon} alt="" draggable={false} />
                                                        <span className="stack-label">{p.label}</span>
                                                    </Fragment>
                                                ))}
                                                {t.link && (
                                                    <span className="stack-label">
                                                        ,{' '}
                                                        <a className="face-link" href={t.link.href}>
                                                            {t.link.text}
                                                        </a>
                                                    </span>
                                                )}
                                            </span>
                                        ))}
                                    </span>
                                </p>
                            </div>
                            <div className="text top">Hobbies</div>
                            <div className="text bottom">Gaming</div>
                            <div className="text right">Welcome</div>
                        </div>
                    </div>
                    <div className="cube-face right">
                        <div ref={rightFaceTextRef} className="cube-text right">
                            <div className="text center">
                                <p className="paragraph face-copy">
                                    <span className="face-lead">I love collecting things.</span>
                                    <span className="face-sub">
                                        Pok&eacute;mon, retro handhelds, and Android and PC
                                        handhelds. My favorite piece is my AYN Thor.
                                    </span>
                                    <span className="face-sub">
                                        I collect Pok&eacute;mon cards too. I might have gotten a
                                        bit carried away with those.
                                    </span>
                                    <a
                                        className="face-link"
                                        href="https://app.getcollectr.com/showcase/profile/ada3af25-f0a5-49ad-86c5-3711bb062fa0"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        My card collection ↗
                                    </a>
                                </p>
                            </div>
                            <div className="text top">Hobbies</div>
                            <div className="text bottom">Gaming</div>
                            <div className="text left">Welcome</div>
                        </div>
                    </div>
                    <div className="cube-face top">
                        <div ref={topFaceTextRef} className="cube-text top">
                            <div className="text center">
                                <p className="paragraph face-copy">
                                    <span className="face-lead">
                                        Here's what I get up to away from a keyboard:
                                    </span>
                                    <span className="interest-list">
                                        <span>Home electronics &amp; tinkering</span>
                                        <span>Skateboarding</span>
                                        <span>Lifting</span>
                                        <span>Running</span>
                                        <span>Drawing &amp; painting</span>
                                        <span>Sewing</span>
                                    </span>
                                </p>
                            </div>
                            <div className="text bottom">Welcome</div>
                        </div>
                    </div>
                    <div className="cube-face bottom">
                        <div ref={bottomFaceTextRef} className="cube-text bottom">
                            <div className="text center">
                                <p className="paragraph face-copy">
                                    <span className="face-lead">
                                        Here are some of my favorite games:
                                    </span>
                                    <span className="interest-list ranked">
                                        {topGames.map((g) => (
                                            <span key={g.name}>
                                                <img className="game-icon" src={g.icon} alt="" draggable={false} />
                                                {g.name}
                                            </span>
                                        ))}
                                    </span>
                                    <span className="face-note">
                                        The GameCube BIOS screen is what inspired this navigable
                                        cube as my front page.
                                    </span>
                                </p>
                            </div>
                            <div className="text top">Welcome</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
