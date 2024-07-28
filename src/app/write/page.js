import { getServerSession } from 'next-auth';
import './write.css';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function WritePage() {

    // 글 작성하기 전에 session을 검사해서
    // 로그인 중이면 원래 return 띄어주고,
    // 로그인 안되어있으면 로그인 필요하다고 return으로 띄어주기.
    let session = await getServerSession(authOptions);

    if(session) {
        return (
            <div className="bg-1280px">
                <div className="write-bg">
                    {/* /api/new에 POST요청 */}
                    <form action='/api/post/new' method='POST' className="input-container">
                        <input name='title' placeholder='제목을 입력하세요' className="input-title"></input>
                        <textarea name='content' placeholder='내용을 입력하세요' className="input-content"></textarea>
                        <input name='image' type='file' placeholder='이미지를 업로드 해주세요'></input>
                        <button type='submit'>게시하기</button>
                    </form>
    
                    {/* /api/test에 GET요청 */}
                    <form action='/api/test' method='GET'>
                        <button type='submit'>GET 요청</button>
                    </form>
                </div>
    
            </div>
        )
    } else {
        return (
            <div>로그인이 필요해요</div>
        )
    }
}

// 이미지 업로드 하기 위해서 -> npm install formidable
// public 폴더에 uploads 폴더 생성 (이미지 올리면 여기로 올라감)
// form 에 encType="multipart/form-data" 