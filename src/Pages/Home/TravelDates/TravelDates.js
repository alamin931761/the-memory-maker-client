import "./TravelDates.css";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import travelImage from "../../../images/travel.png";
import SectionTitle from "../../../components/shared/SectionTitle";

const TravelDates = () => {
  return (
    <div className="mt-5" data-aos="fade-up" data-aos-duration="1000">
      <SectionTitle
        title={`Travel Dates ${new Date().getFullYear()}`}
        icon={<FaCalendarAlt className="mb-3" />}
      />

      <div className="travel-dates-container">
        <div
          className="ms-1"
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-duration="1500"
          data-aos-easing="ease-in-sine"
        >
          <p>
            This year I am very fortunate to be traveling to so many incredible
            locations. If you live or will be visiting one of these locations
            and would like to schedule a session, please reach out{" "}
            <Link className="text-uppercase" to="/contact">
              here
            </Link>
            .
          </p>
          <img className="img-fluid" src={travelImage} alt="" />
        </div>

        <div
          className="months-and-locations me-1 w-100"
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-duration="1500"
          data-aos-easing="ease-in-sine"
        >
          <div>
            <p>February 15-17</p>
            <p>April 3-6</p>
            <p>June 28-1</p>
            <p>August 12-15</p>
            <p>October 16-19</p>
            <p>December 12-15</p>
          </div>
          <div>
            <p>USA / San Francisco</p>
            <p>Mexico / Cancun</p>
            <p>USA / Rhode Island</p>
            <p>Ireland / dublin</p>
            <p>USA / Florida Keys</p>
            <p>Turks / Caicos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelDates;
