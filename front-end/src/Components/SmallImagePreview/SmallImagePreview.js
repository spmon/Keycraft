import "./SmallImagePreview.css";

export const SmallImagePreview = ({image, hasBorder}) => {
    const style = (hasBorder) ? "white solid 4px" : "none";

    return(
        <div className="small-image-preview" >
            <img src={image}
            style={{
                border:style
            }}
            alt="Image Preview"
            />
        </div>
    );
}