import React from "react";
import "./Card.scss";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

interface MaterialCardProps {
  title: string;
  description: string;
  date: string;
  start_time: number;
  end_time: number;
  room: number;
  onClick: () => void;
}

const MaterialCard: React.FC<MaterialCardProps> = ({
  title,
  description,
  date,
  start_time,
  end_time,
  room,
  onClick,
}) => {
  //console.log(userReservationData);
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <ul className="dataList">
            <li>
              <span>Title </span>: &nbsp;{title}
            </li>
            <li>
              <span>Description </span>:&nbsp;{description}
            </li>
            <li>
              <span>Date </span>:&nbsp;{date}
            </li>
            <li>
              <span>Start Time</span>:&nbsp;{start_time}
            </li>
            <li>
              <span>End Time</span>:&nbsp;{end_time}
            </li>
            <li>
              <span> Room </span>:&nbsp;{room}
            </li>
          </ul>
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={onClick}>Edit</Button>
      </CardActions>
    </Card>
  );
};

export default MaterialCard;
