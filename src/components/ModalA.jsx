import React from "react";

export default function ModalA() {
  const [quote, setQuote] = useState({ results: [] });
  const [usContacts, setUsContacts] = useState([]);

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
          </div>
        </div>
      </div>
    </div>
  );
}
