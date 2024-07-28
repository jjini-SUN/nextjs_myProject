'use client'

import Link from "next/link"
import './LoginBtn.css';
import {signIn, signOut, useSession} from 'next-auth/react';

export default function LoginBtn({login}) {
    return(
        <>
            {
                !login ? (
                    <>
                        <button onClick={()=>{signIn()}}>로그인</button>
                    </>
                ) : (
                    <>
                        <button onClick={()=>{signOut()}}>로그아웃</button>
                    </>
                )
            }

            {
                !login ? (
                    <Link href = '/register' className='signup-btn'>회원가입</Link>
                ) : (
                    <span>{login?.user?.name}</span>
                )
            }
        </>
    )
}