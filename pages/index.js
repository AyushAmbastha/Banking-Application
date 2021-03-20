import styles from '../styles/Home.module.css'
import Button from "@material-ui/core/Button";
import Link from 'next/link'

// import {
//     getAppCookies,
//     setLogout,
//   } from '../components/utils';

export default function Home(props) {
    //const { token } = props;
    return (
        <div className={styles.container}>
            <h1 className={styles.bankWelcome}>Hey there!</h1>
            <div className={styles.rowAlign}>
                <div className={styles.welcomeBtn}>
                <Link href="/login">
                    <Button variant="contained" color="primary">
                        Login
                    </Button>
                </Link>
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

// export async function getServerSideProps(context) {
//     const { req } = context;
//     //const { origin } = absoluteUrl(req);
  
//     //const baseApiUrl = `${origin}/api`;
  
//     const { token } = getAppCookies(req);
//     //const profile = token ? verifyToken(token.split(' ')[1]) : '';
//     return {
//       props: {
//         token,
//       },
//     };
//   }
  