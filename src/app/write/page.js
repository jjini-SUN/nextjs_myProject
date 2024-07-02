import './write.css';

export default function WritePage() {

    return (
        <div className="bg-1280px">

            <div className="write-bg">
                {/* /api/test에 POST요청 */}
                <form action='/api/post/new' method='POST' className="input-container">
                    <input name='title' placeholder='제목을 입력하세요' className="input-title"></input>
                    <input name='content' placeholder='내용을 입력하세요' className="input-content"></input>
                    <button type='submit'>게시하기</button>
                </form>

                <form action='/api/test' method='GET'>
                    <button type='submit'>GET 요청</button>
                </form>
            </div>

        </div>
    )
}