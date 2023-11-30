INSERT INTO careerdb.tbl_rolesmaster (rollname) VALUES ('TEAM_MEMBER');
INSERT INTO careerdb.tbl_rolesmaster (rollname) VALUES ('ACCOUNT_MANAGER');
INSERT INTO careerdb.tbl_rolesmaster (rollname) VALUES ('HR_SUPPORT');
INSERT INTO careerdb.tbl_rolesmaster (rollname) VALUES ('SUPER_ADMIN');

INSERT INTO careerdb.tbl_userinfo (username, passwrd, emailid, firsttimelogin, areaccountnonexpired, areaccountnonlocked, arecredentialsnonexpired, areenabled, rollid) VALUES ('hrsupport', '$2a$10$mSR2ocqXjzhFRLawOTHAgej3btNjyWDBJaWNaXWsOjFYTzuDbjVZC', 'hr.support@ifocussystec.in', false, true, true, true, true, 3);
INSERT INTO careerdb.tbl_userinfo (username, passwrd, emailid, firsttimelogin, areaccountnonexpired, areaccountnonlocked, arecredentialsnonexpired, areenabled, rollid) VALUES ('superadmin', '$2a$10$XTkl2.tK4pg3XS6sanmax.qhv.OGjCR9Wa5yszCNiQOTIsV9RM2aa', 'ifocusgiteaadmin@ifocussystec.in', false, true, true, true, true, 4);

INSERT INTO careerdb.tbl_bandsmaster (experience, grade) VALUES (12, 'A1');
INSERT INTO careerdb.tbl_bandsmaster (experience, grade) VALUES (36, 'A2');
INSERT INTO careerdb.tbl_bandsmaster (experience, grade) VALUES (60, 'A3');
INSERT INTO careerdb.tbl_bandsmaster (experience, grade) VALUES (84, 'A4');
INSERT INTO careerdb.tbl_bandsmaster (experience, grade) VALUES (108, 'A5');
INSERT INTO careerdb.tbl_bandsmaster (experience, grade) VALUES (132, 'A6');
INSERT INTO careerdb.tbl_bandsmaster (experience, grade) VALUES (168, 'B1');
INSERT INTO careerdb.tbl_bandsmaster (experience, grade) VALUES (204, 'B2');
INSERT INTO careerdb.tbl_bandsmaster (experience, grade) VALUES (240, 'B3');
INSERT INTO careerdb.tbl_bandsmaster (experience, grade) VALUES (300, 'C1');
INSERT INTO careerdb.tbl_bandsmaster (experience, grade) VALUES (360, 'C2');

INSERT INTO careerdb.tbl_costcentersmaster (costcentername, costcenterlocation) VALUES ('Amagi','Bangalore');
INSERT INTO careerdb.tbl_costcentersmaster (costcentername, costcenterlocation) VALUES ('Amazon','Bangalore');
INSERT INTO careerdb.tbl_costcentersmaster (costcentername, costcenterlocation) VALUES ('On Bench','Bangalore');
INSERT INTO careerdb.tbl_costcentersmaster (costcentername, costcenterlocation) VALUES ('Business Manager','Bangalore');
INSERT INTO careerdb.tbl_costcentersmaster (costcentername, costcenterlocation) VALUES ('Channel Works','Bangalore');
INSERT INTO careerdb.tbl_costcentersmaster (costcentername, costcenterlocation) VALUES ('Corporate Office','Bangalore');
INSERT INTO careerdb.tbl_costcentersmaster (costcentername, costcenterlocation) VALUES ('DDPL','Bangalore');
INSERT INTO careerdb.tbl_costcentersmaster (costcentername, costcenterlocation) VALUES ('Diageo','Bangalore');
INSERT INTO careerdb.tbl_costcentersmaster (costcentername, costcenterlocation) VALUES ('Fitbod','Bangalore');
INSERT INTO careerdb.tbl_costcentersmaster (costcentername, costcenterlocation) VALUES ('Fossil','Bangalore');
INSERT INTO careerdb.tbl_costcentersmaster (costcentername, costcenterlocation) VALUES ('General Leave','Bangalore');
INSERT INTO careerdb.tbl_costcentersmaster (costcentername, costcenterlocation) VALUES ('IDC Tec.(Wipro)','Bangalore');
INSERT INTO careerdb.tbl_costcentersmaster (costcentername, costcenterlocation) VALUES ('Management','Bangalore');
INSERT INTO careerdb.tbl_costcentersmaster (costcentername, costcenterlocation) VALUES ('Mediacorp','Bangalore');
INSERT INTO careerdb.tbl_costcentersmaster (costcentername, costcenterlocation) VALUES ('Nerd Rabbit','Bangalore');
INSERT INTO careerdb.tbl_costcentersmaster (costcentername, costcenterlocation) VALUES ('Philips','Bangalore');
INSERT INTO careerdb.tbl_costcentersmaster (costcentername, costcenterlocation) VALUES ('Recruitment','Bangalore');
INSERT INTO careerdb.tbl_costcentersmaster (costcentername, costcenterlocation) VALUES ('Relutech','Bangalore');
INSERT INTO careerdb.tbl_costcentersmaster (costcentername, costcenterlocation) VALUES ('Sartorius Stedim','Bangalore');
INSERT INTO careerdb.tbl_costcentersmaster (costcentername, costcenterlocation) VALUES ('Sony','Bangalore');
INSERT INTO careerdb.tbl_costcentersmaster (costcentername, costcenterlocation) VALUES ('Southern States','Bangalore');

INSERT INTO careerdb.tbl_departmentsmaster (departmenthead, departmentname) VALUES ('hrsupport','Admin');
INSERT INTO careerdb.tbl_departmentsmaster (departmenthead, departmentname) VALUES ('hrsupport','Business Development');
INSERT INTO careerdb.tbl_departmentsmaster (departmenthead, departmentname) VALUES ('hrsupport','Finance');
INSERT INTO careerdb.tbl_departmentsmaster (departmenthead, departmentname) VALUES ('hrsupport','Human Resources');
INSERT INTO careerdb.tbl_departmentsmaster (departmenthead, departmentname) VALUES ('hrsupport','Information Development');
INSERT INTO careerdb.tbl_departmentsmaster (departmenthead, departmentname) VALUES ('hrsupport','Information Testing');
INSERT INTO careerdb.tbl_departmentsmaster (departmenthead, departmentname) VALUES ('hrsupport','IT Administration');
INSERT INTO careerdb.tbl_departmentsmaster (departmenthead, departmentname) VALUES ('hrsupport','Management');
INSERT INTO careerdb.tbl_departmentsmaster (departmenthead, departmentname) VALUES ('hrsupport','Marketing');
INSERT INTO careerdb.tbl_departmentsmaster (departmenthead, departmentname) VALUES ('hrsupport','Network Architect');
INSERT INTO careerdb.tbl_departmentsmaster (departmenthead, departmentname) VALUES ('hrsupport','Non IT');
INSERT INTO careerdb.tbl_departmentsmaster (departmenthead, departmentname) VALUES ('hrsupport','Operations');
INSERT INTO careerdb.tbl_departmentsmaster (departmenthead, departmentname) VALUES ('hrsupport','Support');

INSERT INTO careerdb.tbl_ratingsmaster (ratinggrade, ratingclass) VALUES (1, 'Poor');
INSERT INTO careerdb.tbl_ratingsmaster (ratinggrade, ratingclass) VALUES (2, 'Average');
INSERT INTO careerdb.tbl_ratingsmaster (ratinggrade, ratingclass) VALUES (3, 'Good');
INSERT INTO careerdb.tbl_ratingsmaster (ratinggrade, ratingclass) VALUES (4, 'Very Good');
INSERT INTO careerdb.tbl_ratingsmaster (ratinggrade, ratingclass) VALUES (5, 'Excellent');

INSERT INTO careerdb.tbl_upskilltypesmaster (upskilltypename) VALUES ('On the job Training');
INSERT INTO careerdb.tbl_upskilltypesmaster (upskilltypename) VALUES ('Workshops, Seminars, and Conferences');
INSERT INTO careerdb.tbl_upskilltypesmaster (upskilltypename) VALUES ('Online Courses and Webinars');
INSERT INTO careerdb.tbl_upskilltypesmaster (upskilltypename) VALUES ('Professional Certifications and Accreditations');
INSERT INTO careerdb.tbl_upskilltypesmaster (upskilltypename) VALUES ('Job Rotation and Cross-Functional Assignments');
INSERT INTO careerdb.tbl_upskilltypesmaster (upskilltypename) VALUES ('Leadership and Management Development Programs');
INSERT INTO careerdb.tbl_upskilltypesmaster (upskilltypename) VALUES ('Internal Training Programs Developed and Delivered by Subject Matter Experts');

INSERT INTO careerdb.tbl_kpimaster (kpiname) VALUES ('Attendance');
INSERT INTO careerdb.tbl_kpimaster (kpiname) VALUES ('Feedback');
INSERT INTO careerdb.tbl_kpimaster (kpiname) VALUES ('Self Appraisal');
INSERT INTO careerdb.tbl_kpimaster (kpiname) VALUES ('Up SKill');