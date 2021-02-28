import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div className={styles.nameContainer}>
            <Link href='/'>
                <h1 className={styles.bankName}>Bank of Mystery!</h1>
            </Link>
        </div>
    )
}

export default Navbar