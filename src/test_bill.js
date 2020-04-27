import { PayPalButton } from "react-paypal-button-v2";
import React, {Component} from "react"
export default class Example extends Component {

    success = ()=>{
        this.props.history.push("/homepage")
    }

  render() {
    return (
        <PayPalButton
        amount="1000000.00"
        onSuccess={(details, data) => {
            console.log(details)
            console.log(data)
            this.success()
 
          // OPTIONAL: Call your server to save the transaction
          return fetch("/paypal-transaction-complete", {
            method: "post",
            body: JSON.stringify({
              orderId: data.orderID
            })
          }).then((res)=>{
              console.log(res)
          });
        }}
        
        // options={{
        // //   clientId: "PRODUCTION_CLIENT_ID"
        // }}
      />
    );
  }
}