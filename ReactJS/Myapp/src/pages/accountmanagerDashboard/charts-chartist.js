import React, { useEffect } from "react"
import { Col, Row, Card, CardBody } from "reactstrap"

import MetaTags from "react-meta-tags"

import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

// import charts
import BarChart from "../AllCharts/chartist/barchart"
import StackBarChart from "../AllCharts/chartist/stackedbarchart"
import DountChart from "../AllCharts/chartist/dountchart"
import PieChart from "../AllCharts/chartist/piechart"
import SmilAnimationsChart from "../AllCharts/chartist/smilanimations"
import LineChart from "../AllCharts/chartist/linechart"
import LineAreaChart from "../AllCharts/chartist/lineareachart"
import LineScatterDiagram from "../AllCharts/chartist/linescatterdiagram"

import "chartist/dist/scss/chartist.scss"

const ChartsChartist = props => {
  const breadcrumbItems = [
    { title: "Lexa", link: "#" },
    { title: "Charts", link: "#" },
    { title: "Chartist Chart", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems("Chartist Chart", breadcrumbItems)
  })

  return (
    <React.Fragment>
      <MetaTags>
        <title>Chartist Chart</title>
      </MetaTags>

      <Row>
        <Col lg="6">
          <Card>
            <CardBody>
              <h4 className="card-title mb-4">Line chart with area</h4>

              <Row className="text-center mt-4">
                <Col sm="4">
                  <h5 className="mb-0 font-size-20">4234</h5>
                  <p className="text-muted">Activated</p>
                </Col>
                <Col sm="4">
                  <h5 className="mb-0 font-size-20">64521</h5>
                  <p className="text-muted">Pending</p>
                </Col>
                <Col sm="4">
                  <h5 className="mb-0 font-size-20">94521</h5>
                  <p className="text-muted">Deactivated</p>
                </Col>
              </Row>

              <div dir="ltr">
                <LineAreaChart />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(ChartsChartist)
