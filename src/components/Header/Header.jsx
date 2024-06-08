import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { Children, useState } from "react";

function Header() {
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [option, setOption] = useState({ adult: 1, children: 0, room: 1 });

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
          <div className="dateDropDown">2023/06/34</div>
          <span className="seperator"></span>
        </div>

        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
            {option.adult} adult &bull; {option.children} children &bull;
            {option.room} room
          </div>
          {openOptions && (
            <GuestOptionList handleOptions={handleOptions} option={option} />
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

function GuestOptionList({ option, handleOptions }) {
  return (
    <div className="guestOptions">
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
