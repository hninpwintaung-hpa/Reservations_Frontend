import { roomReservationData } from '../../page/dashboard/dashboard';
// import './card.css';

// export interface data {
//   data: roomReservationData[];
// }

export const Card: React.FC = () => {
  // console.log(data, "Card Data");
  return(
    <>
    <div className="card">
      <div className="cardTitle">
        <span>Total Room : </span>
        {/* <span>{
          data.map((item) => {
            item.title
          })
        }</span> */}
      
      </div>
    </div>
    </>
  )
}