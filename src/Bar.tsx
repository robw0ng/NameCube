import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Bar.module.css';

export default function Bar() {
  const location = useLocation();
  const isContactPage = location.pathname === "/contact";

  const frames = [
    "/src/assets/images/home1.png",
    "/src/assets/images/home2.png",
    "/src/assets/images/home3.png",
    "/src/assets/images/home4.png"
  ];

  const [hovering, setHovering] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (hovering) {
      interval = setInterval(() => {
        setFrameIndex(prev => (prev + 1) % frames.length);
      }, 350); // change frame every 150ms
    } else {
      setFrameIndex(0); // Reset to first frame when not hovering
    }

    return () => clearInterval(interval);
  }, [hovering, frames.length]);

  return (
        <header>
            <div className={styles["top-bar"]}>
                <div className={styles["header-buttons"]}>

                <div className={styles["header-item"]} id={styles["home-btn"]}>
                {isContactPage ? (
                    <Link
                    to="/"
                    className={styles["terraria-home-button"]}
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                    >
                    <img
                        src={frames[frameIndex]}
                        alt="Home Animation"
                        className={styles["frame"]}
                        width={80}
                        height={40}
                    />
                    </Link>
                ) : (
                    <Link className={location.pathname === "/" ? styles["active"] : ""} to="/">HOME</Link>
                )}
                </div>

                <div className={styles["header-item"]} id={styles["projects-btn"]}>
                    <Link className={location.pathname === "/projects" ? styles["active"] : ""} to="/projects">PROJECTS</Link>
                </div>

                <div className={styles["header-item"]} id={styles["contact-btn"]}>
                    <Link className={location.pathname === "/contact" ? styles["active"] : ""} to="/contact">CONTACT</Link>
                </div>
                </div>
            </div>
        </header>
    );
}
