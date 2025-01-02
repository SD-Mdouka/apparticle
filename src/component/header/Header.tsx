import Link from 'next/link'
import styles from "./header.module.css";
import Navbar from './Navbar';
import { cookies } from 'next/headers';
import { verifyTokenForPage } from '@/util/verifyToken';
import LogoutButton from './LogoutButton';

const Header = async () => {

  const cookie = await cookies();
  const token = cookie.get('jwtToken')?.value || "";

  const payload = verifyTokenForPage(token)
  return (
    <header className={styles.header}>
      <Navbar isAdmin={payload?.isAdmin || false} />
      <div className={styles.right}>
        {payload ?
          (
            <>
              <h1
                className={
                  "font-medium text-blackAlpha lg:text-[26px] lg:leading-[39px] tracking-tight text-[15px] leading-[20px]"}
              >
                {payload.username}
              </h1>
              <LogoutButton/>
            </>
          ) :
          (
            <>
              <Link className={styles.btn} href="/login">Login</Link>
              <Link className={styles.btn} href="/register">Register</Link>
            </>)}

      </div>
    </header>
  )
}

export default Header