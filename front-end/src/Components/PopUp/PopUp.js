
export const PopUp = (props) => {    
    return (
        (props.trigger) ? (
            <div style={{
                width: "100vw",
                height: "100vh",
                top: "0",
                left: "0", 
                right: "0",
                bottom: "0",
                position: "fixed",
                display: "flex", 
                background: "rgba(49, 49, 49, 0.8)",
                justifyContent: "center",
                alignContent: "center",
                zIndex:"3",
            }}>
                <div style={{
                    position: "relative",
                    top: "20%",
                    display:"flex",
                    flexDirection:"column",
                    paddingInline: "32px",
                    paddingBlock:"10px",
                    height: "40vh",
                    width:"40vw",
                    background: "#2a2939",
                    borderadius: "15px",
                    gap: "20px",
                    alignContent:"center",
                    justifyContent:"center"
                }}>
                    <p id="website-title-text">Keycraft</p>
                    <p style={{textAlign:"center"}}>{props.message}</p>

                    <button style={{marginTop:"10px",alignSelf:"center"}} onClick={()=>{props.setTrigger(false)}}>Đóng</button>
                </div>
            </div>
            ) : ""
        );
}
