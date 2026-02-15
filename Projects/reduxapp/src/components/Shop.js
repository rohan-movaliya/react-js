import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux"; 
import {actionCreators} from "../state/index";

const Shop = () => {
  const dispatch = useDispatch();
  const {depositMoney, withdrawMoney} = bindActionCreators(actionCreators, dispatch);

  return (
    <div className="container text-center my-5">
      <h2>Deposit/Withdrawals Money</h2>
        <button className="btn btn-primary m-2" onClick={() => withdrawMoney(100)}>-</button>
        Your Balance
        <button className="btn btn-primary m-2" onClick={() => depositMoney(100)}>+</button>
    </div>
  );
};

export default Shop;