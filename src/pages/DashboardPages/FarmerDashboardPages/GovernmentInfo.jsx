import { useState } from "react";
import { useTheme } from "../../../hooks/useTheme";
import GovtNewsMenu from "../../../components/Dashboard/RouteBasedComponents/FarmerRoutesComponents/GovtNewsButtonCollection/GovtNewsMenu";
import NavButton from "../../../components/shared/Buttons/NavButton";
import { Hamburger, HamburgerIcon, LucideHamburger, Menu } from "lucide-react";

const GovernmentInfo = () => {
  const [isMenu, setIsMenu] = useState(false);
  const handleMenu = () => {
    setIsMenu((prev) => !prev);
  };

  const { theme } = useTheme();
  const themeBackground = theme === "dark" ? "bg-dark" : "bg-light";
  const themeForeground = theme === "dark" ? "fg-dark" : "fg-light";

  const digitalServiceRegistration = "http://service.moa.gov.bd/auth/login";
  const waterQualityExamination = "http://service.moa.gov.bd/portal/service-details?service_type=customerTypeList&customer_type_id=7&service_id=26";
  const irrigationSchemeService = "http://service.moa.gov.bd/portal/service-details?service_type=customerTypeList&customer_type_id=7&service_id=27";
  const pumpOperationSelection = "http://service.moa.gov.bd/portal/service-details?service_type=customerTypeList&customer_type_id=7&service_id=28";
  const irrigationCard = "http://service.moa.gov.bd/portal/service-details?service_type=customerTypeList&customer_type_id=7&service_id=30";
  const pumpMaintenance = "http://service.moa.gov.bd/portal/service-details?service_type=customerTypeList&customer_type_id=7&service_id=32";
  const cropsStrorageFacility = "http://service.moa.gov.bd/portal/service-details?service_type=customerTypeList&customer_type_id=7&service_id=33";
  const bazarInformationCollection = "http://service.moa.gov.bd/portal/service-details?service_type=customerTypeList&customer_type_id=7&service_id=42";
  const krishInstrumentPurchase = "http://service.moa.gov.bd/portal/service-details?service_type=customerTypeList&customer_type_id=7&service_id=45";
  const seedExamination = "http://service.moa.gov.bd/portal/service-details?service_type=customerTypeList&customer_type_id=7&service_id=52";
  const tubeWelSetupLicence = "http://service.moa.gov.bd/portal/service-details?service_type=customerTypeList&customer_type_id=7&service_id=74";
  
  
  
  
  const bssNewsUrl2 = "https://www.bssnews.net/bangla/national/agriculture";
  const bssNewsUrl = "https://dam.gov.bd/";
  const bazarDor = "http://service.moa.gov.bd/market-directory/market-daily-price-report";

  const krishiLicense = "http://service.moa.gov.bd/portal/service-details?service_type=orgList&org_id=13&service_id=76"


  const [newsContainer, setNewsContainer] = useState(bssNewsUrl);
  const handleNewsContainer = (newsLink) => {
    setNewsContainer(newsLink);
  };

  return (
    <div  className={`${themeBackground} relative h-screen`}>
     {
      isMenu && (
         <div
        className={`pt-20 pl-4 pr-4 bg-black/50 absolute left-0 top-0 w-50 h-screen z-100 flex flex-col items-start justify-start gap-1`}
      >
        <NavButton
          label="ডিজিটাল সার্ভিস রেজিস্ট্রেশন"
          onClick={() => {handleNewsContainer(digitalServiceRegistration), handleMenu()}}
        />
        <NavButton
          label="Bazar Dor"
          onClick={() => {handleNewsContainer(bazarDor), handleMenu()}}
        />
        <NavButton
          label="Krishi License"
          onClick={() => {handleNewsContainer(krishiLicense), handleMenu()}}
        />
        <NavButton
          label="new2"
          onClick={() => {handleNewsContainer(bssNewsUrl), handleMenu()}}
        />
      </div>

      )
     }

      <div className={`relative h-screen`} style={{ overflow: "hidden" }}>
        <Menu
          onClick={handleMenu}
          size={50}
          className="z-200 text-gray-700 absolute left-6 top-4 cursor-pointer"
        />
        <iframe
          src={newsContainer}
          title="Government Agriculture News"
          style={{
            width: "100%",
            height: "100vh",
            border: "none",
          }}
        />
      </div>
    </div>
  );
};

export default GovernmentInfo;
