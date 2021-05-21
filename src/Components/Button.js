const Button = ({ getUserGeoLocation }) => {
  return (
    <div className="container">
      <button onClick={getUserGeoLocation}>Find My Information</button>
    </div>
  );
};

export default Button;
