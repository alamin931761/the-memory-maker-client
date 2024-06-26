import { useEffect, useRef, useState } from "react";
import "./PrintDetails.css";
import { ImLocation2 } from "react-icons/im";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FloatingLabel, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFillPrinterFill } from "react-icons/bs";
import { GiShoppingCart } from "react-icons/gi";
import { AiOutlineHeart } from "react-icons/ai";
import { signOut } from "firebase/auth";
import auth from "../../../firebase.init";
import useWishlist from "../../../hooks/useWishlist";
import PageTitle from "../../../components/shared/PageTitle";
import Container from "../../../components/Container";
import RandomPrints from "./RandomPrints/RandomPrints";
import SectionTitle from "../../../components/shared/SectionTitle";

const PrintDetails = () => {
  const [user] = useAuthState(auth);
  const [price, setPrice] = useState(150);
  const [printData, setPrintData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { image, name, location, _id } = printData;
  const { userInfo } = useWishlist();

  // get single print data
  useEffect(() => {
    fetch(`https://the-memory-maker-server.vercel.app/prints/${id}`)
      .then((res) => {
        if (res.status === 404) {
          navigate("404");
        }
        return res.json();
      })
      .then((data) => setPrintData(data));
  }, [id, navigate]);

  // Check if the print is on the wishlist
  const exist = userInfo.arrayOfWishlistIds?.find((printId) => printId === _id);

  // print size
  let sizeAndMedium;
  if (price === 150) {
    sizeAndMedium = `18" x 12" - Fine Art Print`;
  } else if (price === 270) {
    sizeAndMedium = `24" x 16" - Fine Art Print`;
  } else if (price === 420) {
    sizeAndMedium = `30" x 20" - Fine Art Print`;
  } else {
    sizeAndMedium = `36" x 24" - Fine Art Print`;
  }

  // price
  const handleSize = (event) => {
    setPrice(parseInt(event.target.value));
  };

  // quantity
  const quantityRef = useRef("");
  const handleQuantitySubmit = (event) => {
    event.preventDefault();
    const quantity = parseInt(quantityRef.current.value);
    if (quantity > 0) {
      const order = {
        image: image,
        quantity: quantity,
        sizeAndMedium: sizeAndMedium,
      };
      fetch(
        `https://the-memory-maker-server.vercel.app/temporaryData/${user?.email}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            name: name,
            price: price,
          },
          body: JSON.stringify(order),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.upsertedCount > 0) {
            toast.success(`${name} - added to cart`);
          } else if (data.modifiedCount > 0) {
            toast.success(`${name} - quantities have been updated`);
          } else {
            toast.error(`${name} - not added to cart`);
          }
          event.target.reset();
        });
    }

    // delete user's shopping cart data after 24 hours
    setTimeout(() => {
      fetch(
        `https://the-memory-maker-server.vercel.app/temporaryData/${user?.email}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          toast.error(
            `Your cart data has been deleted, please add to cart again`
          );
        });
    }, 86400000);
  };

  // wishlist
  const handleAddToWishlist = (id) => {
    let arrayOfWishlistIds;
    if (userInfo.arrayOfWishlistIds) {
      arrayOfWishlistIds = [id, ...userInfo.arrayOfWishlistIds];
    } else {
      arrayOfWishlistIds = [id];
    }
    fetch(
      `https://the-memory-maker-server.vercel.app/myWishlist/${user?.email}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ arrayOfWishlistIds }),
      }
    )
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          signOut(auth);
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
        return res.json();
      })
      .then((data) => {
        if (data?.modifiedCount) {
          toast.success(`${name} - added to Wishlist`);
        } else {
          toast.error(`${name} - has not been added to wishlist`);
        }
      });
  };

  return (
    <Container>
      <div data-aos="fade-up" data-aos-duration="1000">
        <PageTitle title="Print Details" />

        <SectionTitle
          title="Print Details"
          icon={<BsFillPrinterFill className="mb-1" />}
        />

        <div className="print-details-container">
          {/* image */}
          <div
            className="print-image ms-1"
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-duration="1500"
            data-aos-easing="ease-in-sine"
          >
            <img className="img-fluid print-details-image" src={image} alt="" />
          </div>

          {/* details */}
          <div
            className="p-2 d-flex align-items-center me-1"
            data-aos="fade-left"
            data-aos-offset="300"
            data-aos-duration="3000"
            data-aos-easing="ease-in-sine"
          >
            <div>
              <h2 className="mb-3">{name}</h2>
              <p className="mb-3">
                <ImLocation2 />
                {location}
              </p>
              <h2 className="mb-3">{price}</h2>

              {/* size & medium */}
              <FloatingLabel
                className="select-size p-0 mb-3"
                onChange={handleSize}
                controlId="floatingSelectGrid"
                label="Size & Medium"
              >
                <Form.Select
                  className="border border-dark"
                  aria-label="Floating label select example"
                >
                  <option value="150">18" x 12" - Fine Art Print</option>
                  <option value="270">24" x 16" - Fine Art Print</option>
                  <option value="420">30" x 20" - Fine Art Print</option>
                  <option value="600">36" x 24" - Fine Art Print</option>
                </Form.Select>
              </FloatingLabel>

              {/* quantity */}
              <form onSubmit={handleQuantitySubmit}>
                <FloatingLabel
                  controlId="floatingInputGrid"
                  label="Quantity"
                  className="quantity-input mb-3"
                >
                  <Form.Control
                    className="border border-dark"
                    ref={quantityRef}
                    type="number"
                    placeholder="Quantity"
                    required
                  />
                </FloatingLabel>

                <div className="d-flex justify-content-start align-items-center">
                  <button className="me-2 btn btn-outline-dark" type="submit">
                    <GiShoppingCart className="fs-5 mb-1 me-1" />
                    Add To Cart
                  </button>

                  <button
                    type="button"
                    className={`${
                      exist ? "btn btn-dark" : "btn btn-outline-dark"
                    }`}
                    disabled={exist ? true : false}
                    onClick={() => handleAddToWishlist(_id)}
                  >
                    <AiOutlineHeart className="fs-5 mb-1 me-1" />
                    Add To Wishlist
                  </button>
                </div>
              </form>

              <div className="mt-3">
                <p className="m-0">
                  Custom orders are available (preset size, archival paper,
                  foamboard, framing, gallery wrap). Please{" "}
                  <Link to="/contact">contact me</Link>.
                </p>

                <p className="mt-3 mb-0">
                  All prints are made with Fine Art Luster paper, furnished in
                  leading professional art printing laboratories. Prints are
                  professionally packaged, handled, and shipped in a rolled
                  tube. Delivery insurance is available.
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr className="mb-5 mt-5" />
        <div style={{ margin: "0px 10px 10px 10px" }}>
          {/* random prints */}
          <div data-aos="fade-up" data-aos-duration="1000">
            <RandomPrints id={_id} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PrintDetails;
