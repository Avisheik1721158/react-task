import React, { useState } from "react";
import ModalA from "./ModalA";
import { useNavigate } from "react-router-dom";
import ModalB from "./ModalB";

const Problem2 = () => {
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const navigate = useNavigate();

  const openModalA = () => {
    navigate("/modalA");
    setShowModalA(true);
    setShowModalB(false);
  };

  const openModalB = () => {
    navigate("/modalB");
    setShowModalB(true);
    setShowModalA(false);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            data-toggle="modal"
            data-target="#exampleModalA"
            onClick={openModalA}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            data-toggle="modal"
            data-target="#exampleModalB"
            onClick={openModalB}
          >
            US Contacts
          </button>
        </div>

        {/* Modal A */}
        {showModalA && <ModalA />}
        {showModalB && <ModalB />}
      </div>
    </div>
  );
};

export default Problem2;
