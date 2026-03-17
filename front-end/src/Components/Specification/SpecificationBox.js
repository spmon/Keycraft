import "./Specification.css";

export const  Specification = ({specs, category}) => {
    return(
        <div className="spec-box-container">
            <div className="spec-box-wrapper">
                <h4>Thông số</h4>
                <div className="spec-row"> 
                        <p>Nhà sản xuất</p>
                        <p>{specs.manufacturer.name}</p>
                </div>
                <div className="spec-row"> 
                        <p>Loại</p>
                        <p>{category}</p>
                </div>
                {
                    (category === "keyboard") ? <div> 
                        <div className="spec-row"> 
                            <p>Kích thước</p>
                            <p>{specs.size}</p>
                        </div>
                        <div className="spec-row"> 
                            <p>Màu vỏ</p>
                            <p>{specs.case_color}</p>
                        </div>
                        <div className="spec-row"> 
                            <p>Loại switch</p>
                            <p>{specs.switch_type}</p>
                        </div>
                        <div className="spec-row"> 
                            <p>Lực ấn</p>
                            <p>{specs.actuation_force}</p>
                        </div>
                        <div className="spec-row"> 
                            <p>Nhà sản xuất switch</p>
                            <p>{specs.switch_manufacturer.name}</p>
                        </div>
                    </div>:  
                    (category === "switch") ? <div>
                        <div className="spec-row"> 
                            <p>Loại switch</p>
                            <p>{specs.switch_type}</p>
                        </div>
                        <div className="spec-row"> 
                            <p>Lực</p>
                            <p>{specs.actuation_force}</p>
                        </div>
                    </div>:
                    <div>
                        <div className="spec-row"> 
                            <p>Chất liệu</p>
                            <p>{specs.material}</p>
                        </div>
                        <div className="spec-row"> 
                            <p>Profile</p>
                            <p>{specs.profile}</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
} 