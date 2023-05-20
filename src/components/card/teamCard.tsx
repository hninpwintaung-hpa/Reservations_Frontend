// import './teamCard.css';

export const TeamCard = () => {
  return(
    <>
      <div className="teamCard">
        <div className="teamCardTitle">
          <h1>Team A : </h1>
        </div>

        <div className="teamCardBody">
          <span>Room Reservation time : </span>
          <span>4</span>
        </div>

        <div className="teamCardBody">
          <span>Car Reservation time : </span>
          <span>3</span>
        </div>
      </div>

    </>
  )
}