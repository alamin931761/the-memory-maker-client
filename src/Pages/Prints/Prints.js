import { useEffect, useState } from "react";
import "./Prints.css";
import { FloatingLabel, Form } from "react-bootstrap";
import { BsFillPrinterFill } from "react-icons/bs";
import PageTitle from "../../components/shared/PageTitle";
import SectionTitle from "../../components/shared/SectionTitle";
import Loading from "../../components/Loading";
import Container from "../../components/Container";
import Print from "../../components/Print/Print";

const Prints = () => {
  const [prints, setPrints] = useState([]);
  const [count, setCount] = useState(0);
  const [printPerPage, setPrintPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);

  // load prints data
  useEffect(() => {
    fetch(
      `https://the-memory-maker-server.vercel.app/prints?page=${currentPage}&limit=${printPerPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPrints(data.prints);
        setCount(data.count);
      });
  }, [currentPage, printPerPage]);

  if (prints.length === 0) {
    return <Loading />;
  }

  // pagination
  const totalPages = Math.ceil(count / printPerPage);
  // let pageNumbers = [];
  // for (let i = 0; i < totalPages; i++) {
  //     pageNumbers.push(i)
  // }
  // shortcut
  let pageNumbers = [...Array(totalPages).keys()];

  const handleSelectChange = (event) => {
    setPrintPerPage(parseInt(event.target.value));
    setCurrentPage(0); //***
  };

  return (
    <Container>
      <div data-aos="fade-up" data-aos-duration="1000">
        <PageTitle title="Prints" />

        <SectionTitle
          title="Prints"
          icon={<BsFillPrinterFill className="mb-1" />}
        />

        <div className="prints-container">
          {prints.map((data) => (
            <Print key={data._id} data={data} />
          ))}
        </div>

        {/* pagination */}
        <div className="d-flex align-items-center justify-content-center">
          {/* page number button */}
          <div>
            {pageNumbers.map((number) => (
              <button
                onClick={() => setCurrentPage(number)}
                key={number}
                className={
                  currentPage === number
                    ? "btn btn-dark rounded-0 p-3"
                    : "btn btn-outline-dark rounded-0 p-3"
                }
              >
                {number + 1}
              </button>
            ))}
          </div>

          {/* select */}
          <FloatingLabel
            style={{ width: "90px" }}
            className="p-0 ms-2"
            onChange={handleSelectChange}
            controlId="floatingSelectGrid"
            label="Show"
          >
            <Form.Select
              className="border border-dark"
              aria-label="Floating label select example"
            >
              <option className="text-center" value="6">
                6
              </option>
              <option className="text-center" value="9">
                9
              </option>
              <option className="text-center" value="12">
                12
              </option>
              <option className="text-center" value="15">
                15
              </option>
            </Form.Select>
          </FloatingLabel>
        </div>
      </div>
    </Container>
  );
};

export default Prints;
