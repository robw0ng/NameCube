import styles from "./Contact.module.css"

export default function Contact(){
    return (
        <div className={styles["parent"]}>
            <div className={styles["contact"]}>
                <div className={styles["row"]}>
                    <div className={styles["contact-container"]}>
                        <label id={styles["contact-label"]}>Contact me at:</label>
                        <a href="mailto:robwong15@gmail.com">
                            ✉️ robwong15@gmail.com
                        </a>

                        <a href="tel:917-993-4624">
                            📞 917-993-4624
                        </a>
                    </div>
                </div>

                <div id="row2" className="row">    
                    <div className={styles["resume-container"]}>
                        <label id={styles["resume-label"]}>↓↓ Check out my resume! ↓↓</label>
                        <embed id={styles["resume"]} src="./src/assets/Resume.pdf#zoom=90" width="200%" height="650px" type="application/pdf" />
                    </div>
                </div>
            </div>
        </div>
    )
};