insert into dept 
    (name)
    values
    ('Leasing'),
    ('Property Management'),
    ('Accounts Payable / Accounts Receivable'),
    ('Development & Acquisitions'),
    ('Administrative')
;

insert into employee 
(name, title, email, phone, description, department_id)
values
('Harmon Jenkins','Director of Leasing','hjenkins@columbiapropertiesinc.com','(678) 460-3122','As Director of Leasing for Columbia, Harman is responsible for directing all of the leasing and marketing efforts for CRM’s portfolio of properties. She joined CRM in 2008 after spending 18 months as Director of Leasing with RCG Ventures. At RCG, Harman oversaw the leasing effort for a portfolio of retail property totaling over 3,000,000 square feet.  Prior to her stint with RCG, Harman spent 9 years as a leasing agent with Columbia Properties overseeing a portfolio of 1,000,000 square feet and 2 years as a leasing agent with Spectrum Services.  In total, Harman has been leasing shopping centers in Metro Atlanta for over 15 years and knows the market and tenants as well as anyone.  Harman is a graduate of Georgia State University.',1),
('Rob O’Neill','Partner','roneill@columbiapropertiesinc.com','(678) 460-3124','Rob is responsible for oversight of Columbia’s management and leasing operation, as well as project management.  Rob has been in the commercial real estate business since receiving his MBA from the University of Miami in 1993.  Prior to joining Columbia in 2007, Rob spent 11 years in commercial lending with Column Financial, a subsidiary of Credit Suisse, where he was responsible for the origination and underwriting of over $1.5 billion in commercial real estate loans.  The majority of the loans Rob originated were for shopping centers in the Southeast giving him detailed operating knowledge that he applies on a daily basis in overseeing the management of Columbia’s portfolio.  Rob holds and MBA from the University of Miami and a Finance BBA from the University of Georgia.',2);

insert into property 
(property_name,street_address,county,city,state,zipcode,squarefeet,description,directions,contact_id,type,show_mp,show_di,show_pd,pd_description,year_opened,major_tenants)
values
('Brownsville Square','6525 Hiram-Douglasville Highway','Douglas County','Douglasville','GA','30134',50000,'Brownsville Square is in an excellent neighborhood location at the intersection of Hwy 92 and Brownsville Rd.  Average household income within a one mile radius is $90,589.  Shops enjoy excellent visibility and access from both Brownsville Rd. and Hwy 92.  This location is a high-growth area with projected 23.9% population growth in the next 5 years.','',1,'Grocery Anchored',true,true,true,'is a 65,000 square foot center which was originally developed by Columbia in 1995 as a Winn-Dixie and was re-tenanted with a Food Lion grocery store in 2009 and subsequently re-tenanted with a Food Depot grocery store in 2012 when Food Lion withdrew from the Atlanta market.',1997,'Winn-Dixie Marketplace');

insert into photo
(prop_id,url,photo_name)
values
(1,'propertyphotos/bbc5b2f68f59a78.jpg','brownsville_ugly.jpg');

insert into media
(prop_id,url,file_title,display)
values
(1,'mediafiles/FINANCIAL_STATEMENT.pdf','Tenant Lease Applicatoin',true),
(1,'mediafiles/Brownsville-Square-Flyer.pdf', 'Brownsville Square Property Information',true),
(1,'mediafiles/Prince-Creek-Village-Center-Marketing-Package','dontuse',false);


