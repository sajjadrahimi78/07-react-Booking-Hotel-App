import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";

function Header() {
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [option, setOption] = useState({ adult: 1, children: 0, room: 1 });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);

  const handleOptions = (name, operation) => {
    setOption((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? option[name]++ : option[name]--, //???
      };
    });
  };

  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="where to go?"
            className="headerSearchInput"
            name="destination"
            id="destination"
          />
          <span className="seperator"></span>
        </div>

        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div className="dateDropDown" onClick={() => setOpenDate(!openDate)}>
            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}
          </div>
          {openDate && (
            <DateRange
              ranges={date}
              onChange={(item) => setDate([item.selection])}
              className="date"
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
            />
          )}
          <span className="seperator"></span>
        </div>

        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
            {option.adult} adult &bull; {option.children} children &bull;{" "}
            {option.room} room
          </div>
          {openOptions && (
            <GuestOptionList
              handleOptions={handleOptions}
              option={option}
              setOpenOptions={setOpenOptions}
            />
          )}
          <span className="seperator"></span>
        </div>

        <div className="headerSearchItem">
          <button className="headerSearchBtn">
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOptionList({ option, handleOptions, setOpenOptions }) {
  const optionsRef = useRef();

  useOutsideClick(optionsRef, () => setOpenOptions(false), "optionDropDown");

  return (
    <div className="guestOptions" ref={optionsRef}>
      <OptionItem
        handleOptions={handleOptions}
        type="adult"
        option={option}
        minLimit={1}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="children"
        option={option}
        minLimit={0}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="room"
        option={option}
        minLimit={1}
      />
    </div>
  );
}

function OptionItem({ option, type, minLimit, handleOptions }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          onClick={() => handleOptions(type, "dec")}
          className="optionCounterBtn"
          disabled={option[type] <= minLimit}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{option[type]}</span>
        <button
          onClick={() => handleOptions(type, "inc")}
          className="optionCounterBtn"
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}
