import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModalA = () => {
  const [quote, setQuote] = useState({ results: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [isLoading, setIsLoading] = useState(false);
  const [usContacts, setUsContacts] = useState([]);
  const [showModalC, setShowModalC] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [onlyEven, setOnlyEven] = useState(false);
  const [searchInput, setSearchInput] = useState(""); // Step 1
  const [allContactsClicked, setAllContactsClicked] = useState(false);
  const [currentContext, setCurrentContext] = useState("allContacts");

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchKeyPress = async (event) => {
    if (event.key === "Enter") {
      await filterContacts(); // Step 4
    }
  };
  const filterContacts = async () => {
    try {
      const res = await axios.get(
        `https://contact.mediusware.com/api/contacts/?page=${currentPage}`
      );
      const filteredContacts = res.data.results.filter((result) =>
        result.phone.includes(searchInput)
      );

      if (currentContext === "allContacts") {
        setQuote({ results: filteredContacts });
        setUsContacts([]);
      } else if (currentContext === "usContacts") {
        setUsContacts(filteredContacts);
        setQuote({ results: [] });
      }
      // Step 3
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const navigate = useNavigate();
  const handleCheckboxChange = () => {
    setOnlyEven(!onlyEven);
  };
  const closeModal = () => {
    console.log("dfd");
    navigate("/problem-2");
  };
  const openModalC = (contact) => {
    setSelectedContact(contact);
    setShowModalC(true);
  };

  const handleSeeMoreClick = async () => {
    try {
      setIsLoading(true);

      const nextPage = currentPage + 1;
      const res = await axios.get(
        `https://contact.mediusware.com/api/contacts/?page=${nextPage}`
      );

      const newResults = res.data.results;

      setQuote((prevQuote) => ({
        results: [...prevQuote.results, ...newResults],
      }));

      setCurrentPage(nextPage);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setIsLoading(false);
    }
  };
  const handleSeeMoreUsContactsClick = async () => {
    try {
      setIsLoading(true);

      const nextPage = currentPage + 1;
      const res = await axios.get(
        `https://contact.mediusware.com/api/contacts/?page=${nextPage}`
      );

      const newResults = res.data.results;

      setUsContacts((prevUsContacts) => [
        ...prevUsContacts,
        ...newResults.filter(
          (result) => result.country.name === "United States"
        ),
      ]);

      setCurrentPage(nextPage);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching US contacts:", error);
      setIsLoading(false);
    }
  };

  const allContactsDetails = async () => {
    try {
      setIsLoading(true);

      const res = await axios.get(
        `https://contact.mediusware.com/api/contacts/?page=${currentPage}`
      );

      const newResults = res.data.results || [];

      setQuote((prevQuote) => ({
        results: [...(prevQuote?.results || []), ...newResults],
      }));
      console.log(quote);

      setIsLoading(false);
      setUsContacts([]);
      setCurrentContext("allContacts");
      setAllContactsClicked(true); // Set the flag to true after "All Contacts" click
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setIsLoading(false);
      setQuote((prevQuote) => ({
        results: prevQuote?.results || [], // Ensure results is defined
      }));
    }
  };

  const usContactDetails = async () => {
    try {
      setIsLoading(true);

      const res = await axios.get(
        "https://contact.mediusware.com/api/contacts/"
      );

      const usContactsFiltered = res.data.results.filter(
        (result) => result.country?.name === "United States"
      );

      setUsContacts(usContactsFiltered);
      setCurrentContext("usContacts");
      setIsLoading(false);
      setAllContactsClicked(true);
      setQuote();
    } catch (error) {
      console.error("Error fetching US contacts:", error);
      setIsLoading(false);
      setUsContacts([]);
      setQuote({ results: [] });
    }
  };

  // Ensure that you are not setting both usContacts and quote at the same time
  // and check for the quote.results existence before rendering.

  return (
    <div>
      <div
        className="modal"
        id="exampleModalA"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ display: "block" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <h2 className="text-center mt-3">Modal A</h2>

            <button
              style={{ borderColor: "#46139f", color: "#46139f" }}
              className="btn btn-lg  mb-3 mx-auto d-block"
              onClick={allContactsDetails}
            >
              All Contacts
            </button>

            <button
              style={{
                borderColor: "#ff7f50",
                color: "#ff7f50",
              }}
              className="btn btn-lg   mb-3 mx-auto d-block"
              onClick={usContactDetails}
            >
              US Contacts
            </button>

            <button
              style={{ borderColor: "#46139f", color: "#46139f" }}
              className="btn btn-lg  mb-3 mx-auto d-block"
              data-dismiss="modal"
              onClick={closeModal}
            >
              Close
            </button>
            {/* Search box */}
            {(quote || usContacts) && (
              <div className="form-group mx-auto mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search contacts by phone..."
                  value={searchInput}
                  onChange={handleSearchChange}
                  onKeyUp={handleSearchKeyPress}
                />
              </div>
            )}
            {/* All Contacts Modal A*/}
            {quote && (
              <div>
                <ul className="text-center">
                  {quote.results
                    .filter(
                      (result, index) => !onlyEven || (index + 1) % 2 === 0
                    )
                    .map((result, index) => (
                      <div key={index}>
                        <button
                          className="btn btn-lg btn-outline-primary"
                          type="button"
                          data-toggle="modal"
                          data-target="#exampleModalC"
                          onClick={() => openModalC(result)}
                        >
                          {" "}
                          {result.id}. {result.phone}{" "}
                        </button>
                      </div>
                    ))}
                </ul>
              </div>
            )}
            {quote?.results.length >= currentPage * itemsPerPage && (
              <button
                className="btn btn-lg btn-outline-primary mx-auto d-block"
                onClick={handleSeeMoreClick}
                disabled={isLoading || quote.results.length >= 600}
              >
                {isLoading ? "Loading..." : "See More"}
              </button>
            )}
            {/* US Contacts Modal A */}

            {usContacts && (
              <div>
                <ul className="text-center">
                  {usContacts
                    .filter((contact, id) => !onlyEven || id % 2 === 0)
                    .map((result, index) => (
                      <div key={index}>
                        <button
                          className="btn btn-lg btn-outline-primary"
                          type="button"
                          data-toggle="modal"
                          data-target="#exampleModalC"
                          onClick={() => openModalC(result)}
                        >
                          {" "}
                          {result.id}. {result.phone}{" "}
                        </button>
                      </div>
                    ))}
                </ul>
              </div>
            )}

            {usContacts && usContacts.length > 0 && (
              <button
                className="btn btn-lg btn-outline-primary mx-auto d-block"
                onClick={handleSeeMoreUsContactsClick}
                disabled={isLoading || usContacts.length >= 600}
              >
                {isLoading ? "Loading..." : "See More (US Contacts)"}
              </button>
            )}
            {/* Checkbox for filtering even IDs */}
            {/* Checkbox for filtering even IDs - conditionally rendered */}
            {(quote || usContacts) && (
              <div className="form-check mb-3 mx-auto">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="onlyEvenCheckbox"
                  checked={onlyEven}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="onlyEvenCheckbox">
                  Only even IDs
                </label>
              </div>
            )}
            {/* ... (existing JSX code) */}
          </div>
        </div>
      </div>

      {showModalC && (
        <div
          className="modal"
          id="exampleModalC"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: "block" }}
        >
          {selectedContact && (
            <div className="modal-dialog modal-dialog-centered text-center modal-sm  ">
              <div className="modal-content">
                {/* Display contact details as needed */}
                <h2 className="text-center">Modal C</h2>
                <div>Contact number: {selectedContact.phone}</div>
                <div>Country: {selectedContact.country.name}</div>
                {/* Add more details as needed */}

                {/* Modal C content goes here */}
                <button
                  className="btn btn-sm btn-outline-danger mb-3 mx-auto d-block"
                  data-dismiss="modal"
                  onClick={() => setShowModalC(false)}
                >
                  Close Modal C
                </button>
              </div>
              {/* Display contact details in Modal C */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModalA;
