import React from "react"
import { Card, CardBody, Row, Col, CardTitle } from "reactstrap"

import DonutChart from "./DonutChart"
const MonthlyEarnings = props => {
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="h4 mb-4"> Cost Center </CardTitle>

          <Row className="text-center mt-4">
            <div className="col-6">
              <h5 className="font-size-20">20</h5>
              <p className="text-muted">Inhouse</p>
            </div>
            <div className="col-6">
              <h5 className="font-size-20">0</h5>
              <p className="text-muted">Client</p>
            </div>
          </Row>
          <div dir="ltr">
            <DonutChart />
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default MonthlyEarnings
