import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import MaterialTable from "material-table";
import ButterToast, { Cinnamon } from "butter-toast";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
//import FileSaver from 'file-saver';
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

function AllRoutes() {
  const [route, setRoutes] = useState([]);

  useEffect(() => onReload(), []);

  const onReload = () => {
    const url = "http://localhost:3500/route";
    axios.get(url).then((response) => setRoutes(response["data"]));
  };

  const validation = (name,vehicle_num,time,date,driver,price,descrption) => {
    console.log("bb");
    var Error = false;

    if (name === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Name Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    }

    if (vehicle_num === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Vehicle Number Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    }

    if (time === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Time Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    }

    if (date === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Date Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    }

    if (price === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Price Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    }

    if (descrption === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Descrption Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    }

    if (driver === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Driver Name Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    }

    if (Error) {
      return false;
    }

    return true;
  };

  const SubmitForm = async (newRow, oldRow) => {
    if (
      validation(
        newRow["name"],
        newRow["vehicle_num"],
        newRow["time"],
        newRow["date"],
        newRow["driver"],
        newRow["price"],
        newRow["descrption"]
      )
    ) {
      const url = "http://localhost:3500/route/" + oldRow["_id"];
      const time = new Date(newRow["time"])
      const date = new Date(newRow["date"])
      const horas12h = (time.getHours().toString().padStart(2, '0')*1) % 12 || 12;
      const ampm = (time.getHours().toString().padStart(2, '0')*1) >= 12 ? 'PM' : 'AM';
      var newTime
      if(newRow["time"]!==oldRow["time"]){
        newTime =horas12h+":"+time.getMinutes().toString().padStart(2, '0')+" "+ampm
      }else{
        newTime=oldRow["time"]
      }
      const data = JSON.stringify({
        name: newRow["name"],
        vehicle_num: newRow["vehicle_num"],
        time: newTime,
        date: date.getFullYear()+"-"+(date.getMonth()*1+1)+"-"+date.getDate(),
        driver: newRow["driver"],
        price: newRow["price"],
        descrption: newRow["descrption"]
      });
      console.log(data);
      await axios
        .put(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res.data);
          onReload();
          ButterToast.raise({
            content: (
              <Cinnamon.Crisp
                title="Success!"
                content="Update Successful!"
                scheme={Cinnamon.Crisp.SCHEME_GREEN}
                icon={<CheckCircleOutlineIcon />}
              />
            ),
          });
        });
    }
  };

  const onDelete = (id) => {
    const url = "http://localhost:3500/route/";
    axios.delete(url + id).then((res) => {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Success!"
            content="Delete Successful!"
            scheme={Cinnamon.Crisp.SCHEME_GREEN}
            icon={<CheckCircleOutlineIcon />}
          />
        ),
      });
      onReload();
    });
  };

  const columns = [
    { title: "Name", field: "name" },
    { title: "Vehicle Number", field: "vehicle_num" },
    { title: "Date", field: "date",type:'date'},
    { title: "Time", field: "time" , type:'time'},
    { title: "Driver", field: "driver" },
    { title: "Price", field: "price" },
    { title: "descrption", field: "descrption" }
  ];

  const handleDownloadReport = async () => {
    try {
      const response = await axios.get('http://localhost:3500/route/', { //generate-report
        responseType: 'blob', // Specify that the response is a binary blob
      });
  
      // Trigger the download using FileSaver.js
      FileSaver.saveAs(response.data, 'routes-report.xlsx');
    } catch (error) {
      console.log(error);
    }
  };



  return (
    
    <div>
      <br />
      <button onClick={handleDownloadReport} style={{ 
  outline: 'none',
  backgroundColor: '#2e9e55',
  borderRadius: '5px',
  color: '#ffffff',
  position: 'fixed',
  //top: '20px', // Adjust the bottom value to set the desired spacing
  right: '180px', // Adjust the right value to set the desired spacing
  //zIndex: 1, // Ensure it's above other content
}}>
  Download Report
</button>
      <br />
      <br />
      <MaterialTable
        title="Routess Table"
        columns={columns}
        data={route}
        style={{
          maxWidth: "80%",
          padding: "20px 5px",
          margin: "0 auto",
          fontFamily: "Arial, sans-serif",
        }}
        options={{
          filtering: true,
          sorting: true,
          actionsColumnIndex: -1,
        }}
        editable={{
          onRowUpdate: (newRow, oldRow) =>
            new Promise(async (resolve, reject) => {
              SubmitForm(newRow, oldRow);
              console.log(oldRow._id);
              setTimeout(() => resolve(), 300);
            }),
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              console.log(selectedRow);
              onDelete(selectedRow._id);
              setTimeout(() => resolve(), 300);
            }),
        }}
      />
      <br />
      
    </div>
  );


  

}

export default AllRoutes;
