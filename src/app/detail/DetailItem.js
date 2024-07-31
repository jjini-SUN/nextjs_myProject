'use client'

import Link from "next/link"
import { useState } from "react"

export default function DetailItem({slug, result}){

    return(
        <>
            <Link href={'/edit/' + slug}>수정</Link>
            <div onClick={()=>{
                fetch('/api/delete/delete',{
                    method:'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: result._id, email:result.email }) // id를 JSON으로 전송
                }).then((res)=>{
                    if(res.status == 200){
                        // 성공했으면 /community 로 이동시키기
                        return res.redirect(302, '/community');
                    }
                    else if(res.status == 400) {
                        alert('글 작성자만 삭제할 수 있습니다');
                        return res.json();
                    }
                    else {
                        return res.json();
                    }
                }).then((resJson)=>{
                    console.log(resJson);
                }).catch((error)=>{
                    console.log(error);
                })
            }
                
            }>삭제</div>
        </>
        
    )
}