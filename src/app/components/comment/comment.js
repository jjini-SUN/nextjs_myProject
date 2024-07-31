'use client'

import { useEffect, useState } from 'react';
import './comment.css';

export default function Comment({boardId}) {
    const [comment, setComment] = useState(''); // input창에 입력한 내용
    const [commentList, setCommentList] = useState([]); // 보여줄 댓글들

    useEffect(()=>{
        fetch('/api/comment/list?id='+boardId)
        .then(res=>res.json())
        .then(result=>{
            setCommentList(result);
        })
    }, [])

    return(
        <div className="comment-container">
            <hr/><br/>
            {
                commentList.length > 0? (
                    commentList.map((item, index)=>{
                        return(
                            <div className='comment-item'>
                                <p key={index}>{item?.content}</p>
                            </div>
                        )
                    })
                ) : (
                    <p>아직 댓글이 없습니다</p>
                )
            }

            <input onChange={(e)=>{setComment(e.target.value)}} id='comment-input' placeholder='댓글을 입력하세요' className='comment-input'/>
            {/* button이 클릭되면 /api/comment/new에 저장해달라고 요청을 보내자 */}
            <button onClick={()=>{
                document.getElementById('comment-input').value = '';
                fetch('/api/comment/new', {
                    method: 'POST',
                    body: JSON.stringify({comment: comment, boardId: boardId})
                })
                .then((res)=>{
                    if(res.status == 200) {
                        return res.json();
                    }
                })
                .then((result)=>{
                    console.log(result)
                    // 여기에서 state를 업데이트해서 화면에 반영
                    setComment('');
                    setCommentList(prev => [...prev, result])
                    // 이전값을 받아서 해체한 다음에 result값 추가 (새댓글 추가)
                })
            }}>입력</button>
        </div>
    )
}