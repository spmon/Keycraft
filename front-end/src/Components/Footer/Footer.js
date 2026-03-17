import './Footer.css';

export const Footer = () => {
    return(
        <footer>
            <div class="footer">
                <div class="footer-content">
                    <a href="#"><i class="fa fa-facebook"></i></a>
                    <a href="#"><i class="fa fa-instagram"></i></a>
                    <a href="#"><i class="fa fa-youtube"></i></a>
                    <a href="#"><i class="fa fa-twitter"></i></a>
                </div>

                <div class="footer-content">
                    <ul style={{width:"100%"}}>
                    <li><a href="#">Liên hệ</a></li>
                    <li><a href="#">Dịch vụ</a></li>
                    <li><a href="#">Chính sách bảo mật</a></li>
                    <li><a href="#">Điều khoản sử dụng</a></li>
                    </ul>
                </div>

                <div class="footer-content">
                    @2024 || Nhóm 2 - Web Development PTIT N04
                </div>
            </div>
        </footer>
    );
}