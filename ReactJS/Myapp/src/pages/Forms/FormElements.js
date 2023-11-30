// import React, { useEffect, useState } from "react"
// import MetaTags from 'react-meta-tags';

// import {
//   Card,
//   CardBody,
//   Col,
//   Row,
//   CardTitle,
//   FormGroup,
//   Form
// } from "reactstrap"

// import { connect } from "react-redux";

// //Import Action to copy breadcrumb items from local state to redux state
// import { setBreadcrumbItems } from "../../store/actions";

// const FormElements = (props) => {
//   const breadcrumbItems = [
//     { title: "Lexa", link: "#" },
//     { title: "First Name", link: "#" },
//     { title: "Profile", link: "#" },
//   ]

//   useEffect(() => {
//     props.setBreadcrumbItems('Form Elements', breadcrumbItems)
//   })

//   const [toggleSwitch, settoggleSwitch] = useState(true)
//   const [toggleSwitchSize, settoggleSwitchSize] = useState(true)

//   return (
//     <React.Fragment>

//       <MetaTags>
//         <title>profile</title>
//       </MetaTags>

//       <Row>
//         <Col>
//           <Card>
//             <CardBody>


//               <Row className="mb-3">
//               <h4 className="card-title">Personal Details</h4>
//                 <label
//                   htmlFor="example-text-input"
//                   className="col-md-2 col-form-label"
//                 >
//                   Employee ID

//                 </label>
//                 <div className="col-md-10">
//                   <input
//                     className="form-control"
//                     type="text"
//                     defaultValue=""
//                   />
//                 </div>
//               </Row>
//               <Row className="mb-3">
//                 <label
//                   htmlFor="example-search-input"
//                   className="col-md-2 col-form-label"
//                 >
//                   First Name
//                 </label>
//                 <div className="col-md-10">
//                   <input
//                     className="form-control"
//                     type="search"
//                     defaultValue=""
//                   />
//                 </div>
//               </Row>
//               <Row className="mb-3">
//                 <label
//                   htmlFor="example-email-input"
//                   className="col-md-2 col-form-label"
//                 >
//                   Last Name
//                 </label>
//                 <div className="col-md-10">
//                   <input
//                     className="form-control"
//                     type="email"
//                     defaultValue=""
//                   />
//                 </div>
//               </Row>
//               <Row className="mb-3">
//                 <label
//                   htmlFor="example-email-input"
//                   className="col-md-2 col-form-label"
//                 >
//                   Email
//                 </label>
//                 <div className="col-md-10">
//                   <input
//                     className="form-control"
//                     type="email"
//                     defaultValue=""
//                   />
//                 </div>
//               </Row>
//               <Row className="mb-3">
//                 <label
//                   htmlFor="example-tel-input"
//                   className="col-md-2 col-form-label"
//                 >
//                   Contact Number
//                 </label>
//                 <div className="col-md-10">
//                   <input
//                     className="form-control"
//                     type="tel"
//                     defaultValue=""
//                   />
//                 </div>
//               </Row>


//               <Row className="mb-3">
//                 <label
//                   htmlFor="example-date-input"
//                   className="col-md-2 col-form-label"
//                 >
//                   Date of Birth
//                 </label>
//                 <div className="col-md-10">
//                   <input
//                     className="form-control"
//                     type="date"
//                     id="example-date-input"
//                   />
//                 </div>
//               </Row>
//               <Row className="mb-3">
//                 <label
//                   htmlFor="example-search-input"
//                   className="col-md-2 col-form-label"
//                 >
//                   Designation
//                 </label>

//                 <div className="col-md-10">
//                   <input
//                     className="form-control"
//                     type="search"
//                     defaultValue=""
//                   />

//                 </div>
//               </Row>
//               <Row className="mb-3">
//                 <label
//                   htmlFor="example-month-input"
//                   className="col-md-2 col-form-label"
//                 >
//                   SkillSet
//                 </label>
//                 <Col>
//                   <div className="col-md-8">
//                     <input
//                       className="form-control"
//                       type="search"
//                       defaultValue="technology"
//                     />
//                   </div>
//                 </Col>
//                 <Col>
//                   <div className="col-md-4">
//                     <input
//                       className="form-control"
//                       type="search"
//                       defaultValue="Years"

//                     />

//                   </div>

//                 </Col>

//                 <Col>
//                   <div className="col-md-4">
//                     <input
//                       className="form-control"
//                       type="search"
//                       defaultValue="Months"
//                     />

//                   </div>

//                 </Col>

//               </Row>
//               <Row className="mb-3">
//                 <label
//                   htmlFor="example-date-input"
//                   className="col-md-2 col-form-label"
//                 >
//                   Joining Date

//                 </label>
//                 <div className="col-md-10">
//                   <input
//                     className="form-control"
//                     type="date"
//                     id="example-date-input"
//                   />
//                 </div>
//               </Row>
//               <Row className="mb-3">
//                 <label
//                   htmlFor="example-date-input"
//                   className="col-md-2 col-form-label"
//                 >
//                   Joining Day Experience

//                 </label>
//                 <div className="col-md-10">
//                   <input
//                     className="form-control"
//                     type="date"
//                     id="example-date-input"
//                   />
//                 </div>
//               </Row>
//               <Row className="mb-3">
//                 <label
//                   htmlFor="example-date-input"
//                   className="col-md-2 col-form-label"
//                 >
//                   Last working Day

//                 </label>
//                 <div className="col-md-10">
//                   <input
//                     className="form-control"
//                     type="date"
//                     id="example-date-input"
//                   />
//                 </div>
//               </Row>

//             </CardBody>
//           </Card>
//         </Col>
//       </Row>

//       <Row>
//         <Col lg={12}>
//           <Card>
//             <CardBody>
//               <h4 className="card-title">Employer Details</h4>

//               <Row className="mb-3">
//                 <label
//                   htmlFor="example-text-input"
//                   className="col-md-2 col-form-label"
//                 >
//                   Band

//                 </label>
//                 <div className="col-md-10">
//                   <input
//                     className="form-control"
//                     type="text"
//                     defaultValue=""
//                   />
//                 </div>
//               </Row>
//               <Row className="mb-3">
//                 <label
//                   htmlFor="example-search-input"
//                   className="col-md-2 col-form-label"
//                 >
//                   Department

//                 </label>
//                 <div className="col-md-10">
//                   <input
//                     className="form-control"
//                     type="search"
//                     defaultValue=""
//                   />
//                 </div>
//               </Row>
//               <Row className="mb-3">
//                 <label
//                   htmlFor="example-email-input"
//                   className="col-md-2 col-form-label"
//                 >
//                   Cost Center

//                 </label>
//                 <div className="col-md-10">
//                   <input
//                     className="form-control"
//                     type="email"
//                     defaultValue=""
//                   />
//                 </div>
//               </Row>
//               <Row className="mb-3">
//                 <label
//                   htmlFor="example-text-input"
//                   className="col-md-2 col-form-label"
//                 >
//                   Account Relationship Manager
//                 </label>
//                 <div className="col-md-10">
//                   <input
//                     className="form-control"
//                     type="text"
//                     defaultValue=""
//                   />
//                 </div>
//               </Row>
//               <Row className="mb-3">
//                 <label
//                   htmlFor="example-date-input"
//                   className="col-md-2 col-form-label"
//                 >
//                   Previous Appraisal Date

//                 </label>
//                 <div className="col-md-10">
//                   <input
//                     className="form-control"
//                     type="date"
//                     id="example-date-input"
//                   />
//                 </div>
//               </Row>
//               <Row className="mb-3">
//                 <label
//                   htmlFor="example-date-input"
//                   className="col-md-2 col-form-label"
//                 >
//                   Appraisal Due Date

//                 </label>
//                 <div className="col-md-10">
//                   <input
//                     className="form-control"
//                     type="date"
//                     id="example-date-input"
//                   />
//                 </div>
//               </Row>

//             </CardBody>
//           </Card>
//         </Col>
//       </Row>

//       <Row>
//         <Col lg={12}>
//           <Card>
//             <CardBody>
//               <h4 className="card-title">Customer Reporting Manager Details</h4>

//               <Row className="mb-3">
//                 <label
//                   htmlFor="example-text-input"
//                   className="col-md-2 col-form-label"
//                 >
//                   Customer Reporting Manager Name


//                 </label>
//                 <div className="col-md-10">
//                   <input
//                     className="form-control"
//                     type="text"
//                     defaultValue=""
//                   />
//                 </div>
//               </Row>

//               <Row className="mb-3">
//                 <label
//                   htmlFor="example-email-input"
//                   className="col-md-2 col-form-label"
//                 >
//                   Customer Reporting Manager Email ID

//                 </label>
//                 <div className="col-md-10">
//                   <input
//                     className="form-control"
//                     type="email"
//                     defaultValue=""
//                   />
//                 </div>
//               </Row>

//               <Row className="mb-3">
//                 <label
//                   htmlFor="example-email-input"
//                   className="col-md-2 col-form-label"
//                 >
//                   Customer Reporting Manager Contact

//                 </label>
//                 <div className="col-md-10">
//                   <input
//                     className="form-control"
//                     type="email"
//                     defaultValue=""
//                   />
//                 </div>
//               </Row>
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
//     </React.Fragment>
//   )
// }

// export default connect(null, { setBreadcrumbItems })(FormElements);