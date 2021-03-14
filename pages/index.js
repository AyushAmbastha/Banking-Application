import styles from '../styles/Home.module.css'
import Button from "@material-ui/core/Button";
import Link from 'next/link'

export default function Home() {
    return (
        <div className={styles.container}>
            <h1 className={styles.bankWelcome}>Hey there!</h1>
            <div className={styles.rowAlign}>
                <div className={styles.welcomeBtn}>
                    <Button variant="contained" color="primary">
                        <Link href='/login'>Login</Link>
                    </Button>
                </div>
                <div className={styles.welcomeBtn}>
                    <Button variant="contained" color="primary">
                        <Link href='/register'>Register</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}