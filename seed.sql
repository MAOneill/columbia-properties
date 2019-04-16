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


insert into users
(name,login_id,password)
values
('Harman','harman','$2a$10$jZp0F7lHE2GcmoWrAchLdeygutazccwUTz7WAOWGx46Ietqy5BVVm'),
('Rob','roneill','$2a$10$e1goHoRtk30TeAyZ72Km7egFY74kiT5jkzYT6J1qXwIqso8CFbq6m');


insert into property 
(property_name,street_address,county,city,state,zipcode,squarefeet,description,directions,contact_id,type,show_mp,show_di,show_pd,pd_description,year_opened,major_tenants)
values
('The Village at Druid Hills','2566 Briarcliff Rd NE','Dekalb County','Atlanta','GA','30329',22287,'<li>New Construction- 22,287 square feet of retail and restaurant space</li>
    <li>Tenants include Mattress Firm and Sprint</li>
    <li>Coming Soon- Newk&rsquo;s Eatery, Penn Station Subs, Willy&rsquo;s Mexicana Grill, Sport Clips, Nail Care Spa, and Tin Drum Asia Caf&eacute;</li>
    <li>Access on both North Druid Hills Road and Briarcliff Road</li>
    <li>Pylon Signage available with great exposure on North Druid Hills Road</li>
    <li>High-end architectural features with excellent visibility</li>
    <li>Close proximity to Target and just across North Druid Hills Rd. from Loehmann&rsquo;s Plaza.</li>
    <li>112,825 People within a 3 mile radius &nbsp; &nbsp;
    <ul>
        <li>N. Druid Hills Rd. AADT- 46,130</li>
        <li>Briarcliff Rd. AADT- 11,710</li>
    </ul>
    </li>','',1,'Strip Retail',true,true,false,'is a 26,150 s.f. development just east of Buckhead in the heart of Atlanta. Columbia and our partners closed this land purchase in 45 days in December 2012 from a regional lender who had foreclosed on the property. It is an outstanding piece of real estate located just off I-85 at North Druid Hills & Briarcliff Roads, less than 2 miles east of Lenox Mall and Phipps Plaza. Columbia was able to secure tenant commitments from national credit tenants Sprint, Mattress Firm, Newk’s Cafe, Sports Clips, and Willy’s all before commencing construction. Columbia sold the free-standing Mattress Firm in May of 2014 and refinanced the construction loan on the remaining shopping center into a permanent non-recourse loan creating a long-term high-quality income stream on this high quality asset.',0,''),
('Brownsville Square','6525 Hiram-Douglasville Highway','Douglas County','Douglasville','GA','30134',50000,'Brownsville Square is in an excellent neighborhood location at the intersection of Hwy 92 and Brownsville Rd.  Average household income within a one mile radius is $90,589.  Shops enjoy excellent visibility and access from both Brownsville Rd. and Hwy 92.  This location is a high-growth area with projected 23.9% population growth in the next 5 years.','',1,'Grocery Anchored',true,true,true,'is a 65,000 square foot center which was originally developed by Columbia in 1995 as a Winn-Dixie and was re-tenanted with a Food Lion grocery store in 2009 and subsequently re-tenanted with a Food Depot grocery store in 2012 when Food Lion withdrew from the Atlanta market.',1997,'Winn-Dixie Marketplace'),
('Parkside West Cobb Phase II','3805 Dallas Highway SW','Cobb County','Marietta','GA','30064',9500,'<strong>Coming Fall 2018! +/-9500 square feet restaurant and retail space</strong></p>
<ul>
    <li>Excellent access, sought after retail location on Dallas Hwy</li>
    <li>Full access from Dallas Hwy</li>
    <li>Adjacent to The Avenue West Cobb</li>
    <li>Average HH income within a 3 mile radius of $120,469</li>
    <li>Lifestyle center with upscale architecture</li>
    <li>Strip retail center with Parkside West Cobb anchors including Sprouts, Petco, Marshalls, Stein Mart, Ulta and Rack Room</li>
    <li>146,610 GLA</li>
    <li>Traffic Counts - 32,850 cars per day</li>
</ul>
<p><a href="http://www.loopnet.com/Listing/Dallas-Hwy-Marietta-GA/11266002/" target="_blank">Loopnet Listing</a>','',1,'Grocery Anchored',true,true,true,'',2018,''),
('Merchants Exchange','4400 Roswell Rd.','Cobb County','Marietta','GA','30062',9500,' ','',1,'Grocery Anchored',true,true,true,'',2004,''),
('Village Shoppes at Windermere','3120 - 3130 Mathis Airport Road','Forsyth County','Suwanee','GA','30024',9500,'The Village Shoppes at Windermere is a 105,000 square foot Publix and CVS Pharmacy anchored shopping center located in the rapidly growing and affluent community of South Forsyth County.','',1,'Grocery Anchored',true,true,true,'',2018,''),
('Merganser Commons at Bonaire','3SR 247 & HWY 96','Houston County','Warner Robins','GA','31005',9500,'New Publix anchored shopping center opening August 2018
Close proximity to Robins Air Force Base
Average Household Income within a 3-mile radius: $90,614
Traffic Count on SR 247- 14,440 AADT
Traffic Counts on SR 96- 17,000 AADT','',1,'Grocery Anchored',true,true,true,'',2018,'');

insert into photo
(prop_id,url,photo_name)
values
(1,'propertyphotos/11555422466villiagedruidhills.jpg','villiagedruidhills.jpg'),
(2,'propertyphotos/11555422568bbc5b2f68f59a78.jpg','brownsville_square.jpg'),
(3,'propertyphotos/1155536142811555342669parksidewest2.jpg','parksidewest.jpg'),
(4,'propertyphotos/11555422369merchantsBig.jpg','merchantswalk.jpg'),
(5,'propertyphotos/11555422484windermere.jpg','windermere.jpg'),
(6,'propertyphotos/11555422440merganserbonaire.jpg','merganser.jpg');



insert into media
(prop_id,url,file_title,display)
values
(1,'mediafiles/11555424190The-Village-at-Druid-Hills-Flyer.pdf', 'Villiage Druid Hills Flyer',true),
(2,'mediafiles/11555424050Brownsville-Square-Flyer.pdf','Brownsville Square Flyer',true),
(3,'mediafiles/11555423824Parkside-Phase-II-Marketing-Package-1.11.18.pdf','Parkside Phase II Marketing Package',true),
(3,'mediafiles/11555423844Parkside-Tenants-Layout-OP-3-10.2016.pdf','Parkside Phase II Layout',true),
(3,'mediafiles/11555423872Parkside-West-Cobb-Phase-II-Flyer.pdf','Parkside Phase II Marketing Package',true),
(4,'mediafiles/11555423615Merchants-Exchange-Flyer.pdf','Merchants Exchange',true),
(5,'mediafiles/11555424218VSW-Brochure-Flyer-r.pdf','Villiage Shoppes of Windermere Flyer',true),
(6,'mediafiles/11555424112Merganser-color-2012115-site-plan.pdf','Merganser Bonaire Site Plan',true),
(6,'mediafiles/11555424130Merganser-Commons-Flyer.pdf','Merganser Bonaire Flyer',true);


