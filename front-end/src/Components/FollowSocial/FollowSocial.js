import './FollowSocial.css';

export const FollowSocial = () => {
    return(
        <div className="followsocial-wrapper">
            <div className="followsocial-decor" id="left"></div>
            <div className="followsocial-decor" id="right"></div>

            <div className="followsocial-content">
                <div style={{paddingInline:"20%"}}>
                    <h1>Hãy theo dõi chúng tôi!</h1>
                    <p>Hãy tham gia gia đình Facebook của chúng tôi để có quyền truy cập nội bộ vào chương trình giảm giá nhanh, giảm giá độc quyền và xu hướng bàn phím mới nhất. Đừng bỏ lỡ - những ưu đãi tốt nhất bắt đầu từ đây!</p>
                    <a href="https://www.facebook.com/profile.php?id=100020214879849" target="blank">
                        <button>Đi ngay!</button>     
                    </a>
                </div>
            </div>
        </div>
    );
}