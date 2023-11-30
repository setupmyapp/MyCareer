import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';

import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  FormGroup,
  Form
} from "reactstrap"

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";

const  Kpi= (props) => {
  const breadcrumbItems = [
    { title: "Lexa", link: "#" },
    { title: "First Name", link: "#" },
    { title: "Kpi", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems('Kpi', breadcrumbItems)
  })

  const [toggleSwitch, settoggleSwitch] = useState(true)
  const [toggleSwitchSize, settoggleSwitchSize] = useState(true)
  

  return (
    <React.Fragment>

      <MetaTags>
        <title>profile</title>
      </MetaTags>

    
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <h4 className="card-title">KPI</h4>

              
              

            </CardBody>
          </Card>
        </Col>
      </Row>

      
     
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Kpi);