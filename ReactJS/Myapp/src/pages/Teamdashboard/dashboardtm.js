import React, { useEffect } from "react"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"
import { Row, Col } from "reactstrap"

// Pages Components
import Miniwidget from "./Miniwidget"
import MonthlyEarnings from "./montly-earnings"
import EmailSent from "./email-sent"
import MonthlyEarnings2 from "./montly-earnings2"
import Inbox from "./inbox"
import RecentActivity from "./recent-activity"
import WidgetUser from "./widget-user"
import YearlySales from "./yearly-sales"
import LatestTransactions from "./latest-transactions"
import LatestOrders from "./latest-orders"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

const dashboardtm = props => {
  const breadcrumbItems = [
    { title: "My CareerApp", link: "#" },
    { title: "Dashboard", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems("Dashboard", breadcrumbItems)
  })

  return (
    <React.Fragment>
      <MetaTags>
        <title>MY CAREER</title>
      </MetaTags>

      {/* mimi widgets */}
      {/* <Miniwidget reports={reports} /> */}

      <Row>
        {/* <Col xl="3">
          Monthly Earnings
          <MonthlyEarnings />
        </Col> */}

        {/* <Col xl="6">
          Email sent
          <EmailSent />
        </Col>

        <Col xl="3">
          <MonthlyEarnings2 />
        </Col> */}
      </Row>
      {/* <Row>

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
      </Row> */}

      {/* <Row>
        <Col xl="6">
          latest transactions
          <LatestTransactions />
        </Col>

        <Col xl="6">
          latest orders
          <LatestOrders />
        </Col>
      </Row>  */}
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(dashboardtm)
