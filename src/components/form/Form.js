import React from "react"
import "./Form.css"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"

const Form = (props) => {
  return (
    <div className="form">
      <div className="card">
        <Card>
          <CardContent>{props.children}</CardContent>
        </Card>
      </div>
    </div>
  )
}
export default Form
