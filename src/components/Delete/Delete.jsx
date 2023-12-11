import React, { useState } from "react";
import axios from "axios";
import { Button } from "antd";

function Delete({ id, handleClick }) {
  const [statusError, setStatusError] = useState(null);

  const deleteuser = async () => {
    try {
      const response = await axios.delete(`users/${id}/`);

      if (response.status === 204) {
        handleClick();
      } else {
        setStatusError(`Error: ${response.status} - ${response.statusText}`);
        console.log("Error happened:", response);
      }
    } catch (error) {
      setStatusError("An error occurred while processing the request");
      console.error("Error happened", error);
    }
  };

  return (
    <>
      {statusError && (
        <div style={{ color: "red", marginBottom: "10px" }}>{statusError}</div>
      )}
      <Button
        style={{
          padding: "5px 10px",
          cursor: "pointer",
          backgroundColor: "red",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
        }}
        className="fa-solid fa-trash "
        onClick={deleteuser}
      >

      </Button>
    </>
  );
}

export default Delete;
