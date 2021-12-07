import React from "react";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import data from "../data.json";

const StyledBody = styled.div`
  border: 1px solid gray;
`;

const StyledImage = styled.div`
  text-align: center;
`;
const columns = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Age",
    selector: (row) => row.age,
    sortable: true,
  },
  {
    name: "Ninja Level",
    selector: (row) => row.level,
    sortable: true,
  },
];

function customSort(rows, selector, direction) {
  return rows.sort((a, b) => {
    const aField = selector(a).toLowerCase();
    const bField = selector(b).toLowerCase();

    let comparison = 0;

    if (aField > bField) {
      comparison = 1;
    } else if (aField < bField) {
      comparison = -1;
    }

    return direction === "desc" ? comparison * -1 : comparison;
  });
}

function Kittens() {
  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const theme = useTheme();
  const nodeRef = React.useRef(null);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpen = () => {
    setOpen(true);
    fetch("https://api.thecatapi.com/v1/images/search")
      .then(
        (res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Request Failed");
        },
        (networkError) => console.log(networkError.message)
      )
      .then((jsonRes) => setUrl(jsonRes[0].url));
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSort = (column, sortDirection) =>
    console.log(column.selector, sortDirection);
  return (
    <div>
      <StyledBody>
        <DataTable
          columns={columns}
          onRowClicked={handleOpen}
          data={data}
          onSort={handleSort}
          sortFunction={customSort}
        />
      </StyledBody>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        noderef={nodeRef}
        fullScreen={fullScreen}
      >
        <DialogTitle id="responsive-dialog-title">Kitten Image</DialogTitle>
        <DialogContent noderef={nodeRef}>
          <StyledImage>
            <img src={url} alt="cat" width="50%" height="50%" />
          </StyledImage>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Kittens;
