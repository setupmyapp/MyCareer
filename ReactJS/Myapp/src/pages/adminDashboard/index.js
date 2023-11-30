import React, { useEffect } from "react"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"
import { Row, Col, CardBody, Card } from "reactstrap"

// Pages Components
import Miniwidget from "./Miniwidget"
import MonthlyEarnings from "./montly-earnings"
import Piechart from "./piechart"

// import EmailSent from "./email-sent"
// import MonthlyEarnings2 from "./montly-earnings2"
// import Inbox from "./inbox"
// import RecentActivity from "./recent-activity"
// import WidgetUser from "./widget-user"
// import YearlySales from "./yearly-sales"
// import LatestTransactions from "./latest-transactions"
// import LatestOrders from "./latest-orders"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

const Dashboardhr = props => {
  const breadcrumbItems = [
    { title: "My CareerApp", link: "#" },
    { title: "Dashboard", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems("Dashboard", breadcrumbItems)
  })

  const reports = [
    {
      title: "Employees",
      iconClass: "cube-outline",
      total: "1,587",
      average: "+11%",
      badgecolor: "info",
    },
    {
      title: "Revenue",
      iconClass: "buffer",
      total: "$46,782",
      average: "-29%",
      badgecolor: "danger",
    },
    {
      title: "Performance Ratings",
      iconClass: "tag-text-outline",
      total: "$15.9",
      average: "0%",
      badgecolor: "warning",
    },
    {
      title: "Employee Overview",
      iconClass: "briefcase-check",
      total: "1890",
      average: "+89%",
      badgecolor: "info",
    },
  ]

  return (
    <React.Fragment>
      <MetaTags>
        <title>MY CAREER</title>
      </MetaTags>

      {/* mimi widgets */}
      <Miniwidget reports={reports} />
      <Row>
        <Col lg="4">
          <Card>
            <CardBody>
              <div className="row text-center mt-4">
                <h5 className="mb-4">Total Employees</h5>
                <div className="col-sm-5">
                  <h5 className="mb-0 font-size-20">20</h5>
                  <p className="text-muted">Activate</p>
                </div>

                <div className="col-sm-6">
                  <h5 className="mb-0 font-size-20">0</h5>
                  <p className="text-muted">Inactive</p>
                </div>
              </div>
              <Piechart />
            </CardBody>
          </Card>
        </Col>

        <Col xl="3">
          <MonthlyEarnings />
        </Col>
      </Row>

      {/* <Col xl="6">
          Email sent
          <EmailSent />
        </Col>

        <Col xl="3">
          <MonthlyEarnings2 />
        </Col>

      </Row>
      <Row>

        <Col xl="4" lg="6">
          inbox
          <Inbox />
        </Col>
        <Col xl="4" lg="6">
          recent activity
          <RecentActivity />

        </Col>
        <Col xl="4">
          widget user
          <WidgetUser />

          yearly sales
          <YearlySales />
        </Col>
      </Row>

      <Row>
        <Col xl="6">
          latest transactions
          <LatestTransactions />
        </Col>

        <Col xl="6">
          latest orders
          <LatestOrders />
        </Col>
      </Row>   */}
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Dashboardhr)
