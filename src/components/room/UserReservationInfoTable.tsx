import React, { useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import { withStyles, Theme } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";
import "./Card.scss";

// Custom styles for the TableCell
const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "lightblue",
      color: "white",
      fontWeight: "bold",
      padding: "10px",
      TextAlign: "center",
      border: "1px solid #ccc",
    },
    modalContainer: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    updateButton: {
      marginLeft: theme.spacing(2),
    },
    cell: {
      padding: "10px",
      TextAlign: "center",
      border: "1px solid #ccc",
    },
  });

// Customized TableCell component
const CustomTableCell = withStyles(styles)(
  ({ classes, cellData, onCellUpdate, ...props }: any) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [inputValues, setInputValues] = useState(cellData);

    const handleUpdateClick = () => {
      setModalOpen(true);
    };

    const handleModalClose = () => {
      setModalOpen(false);
    };

    const handleInputChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      index: number
    ) => {
      const updatedValues = [...inputValues];
      updatedValues[index] = event.target.value;
      setInputValues(updatedValues);
    };

    const handleFormSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      onCellUpdate(inputValues);
      setModalOpen(false);
    };

    return (
      <>
        <TableCell className={classes.root} {...props}>
          {cellData.map((data: string, index: number) => (
            <span key={index}>{data}</span>
          ))}
          <Button className={classes.updateButton} onClick={handleUpdateClick}>
            Update
          </Button>
        </TableCell>
        <Modal open={modalOpen} onClose={handleModalClose}>
          <div className={classes.modalContainer}>
            <form onSubmit={handleFormSubmit}>
              {inputValues.map((value: string, index: number) => (
                <TextField
                  key={index}
                  label={`Cell ${index + 1} Data`}
                  value={value}
                  onChange={(event: any) => handleInputChange(event, index)}
                  fullWidth
                  required
                />
              ))}
              <Button type="submit">Save</Button>
            </form>
          </div>
        </Modal>
      </>
    );
  }
);

// Usage example
const MyTable = () => {
  const handleCellUpdate = (newValues: string[]) => {
    // Handle the cell update logic here
    console.log("Updated values:", newValues);
  };

  return (
    <table>
      <thead>
        <tr>
          <CustomTableCell
            cellData={[
              "Team",
              "Title",
              "Description",
              "Date",
              "Start Time",
              "End Time",
              "Action",
            ]}
            onCellUpdate={handleCellUpdate}
          />
        </tr>
      </thead>
      <tbody>
        <tr>
          <CustomTableCell
            cellData={["Cell 1", "Cell 2", "Cell 3"]}
            onCellUpdate={handleCellUpdate}
          />
          <td>
            <Button onClick={() => alert("Update button clicked!")}>
              Update
            </Button>
          </td>
        </tr>
        <tr>
          <CustomTableCell
            cellData={["Cell 4", "Cell 5", "Cell 6"]}
            onCellUpdate={handleCellUpdate}
          />
          <td>
            <Button onClick={() => alert("Update button clicked!")}>
              Update
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MyTable;
