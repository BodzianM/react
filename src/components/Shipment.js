import React from "react";
import PropTypes from "prop-types";

class Shipment extends React.Component {

  static propTypes = {
    total: PropTypes.number
  }
  render() {
    const { total } = this.props;
    const shipping = total > 0 && total < 350 ? 200 : 69;
    const shippingNeon =
      shipping === 69 ? (
        <span className="font-effect-neon total_wrap-cheap">{shipping} ₴</span>
      ) : (
        <span>{shipping} ₴</span>
      );
    return (
      <div className="total">
        <div className="total_wrap">
          <div>
            <div>Delivery: {total > 0 ? shippingNeon : null}</div>
            <div className="total_wrap-free">
              {total < 350 ? `Please, order more for ${350 - total} ₴ for delivery for 69 ₴` : null}
            </div>
          </div>
          <div className="total_wrap-final">Total: {total} ₴</div>
        </div>
      </div>
    );
  }
}

export default Shipment;
