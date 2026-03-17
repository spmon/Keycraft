import './ServiceCard.css';

export const ServiceCard = ({service}) => {
    return(
        <div className="card-container">
            <img src={service.iconsrc}
            alt="Service Icon"
            />

            <h4>{service.title}</h4>

            <p>{service.desc}</p>
        </div>
    );
}