import TermsAndConditionsContent from "@/components/common/TermsAndConditionsContent";
import { getAlternates } from "@/utils/canonical";

export const metadata = {
  title: "Terms and Conditions | Dream Ziarah's Booking Guidelines",
  description:
    "Review Dream Ziarah's terms and conditions to understand our booking guidelines and policies. Essential information for planning your spiritual journey with us.",
  alternates: getAlternates('/terms-and-conditions'),
};

const TermsAndConditions = () => {
  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <section className="layout-pt-lg layout-pb-lg">
        <div className="container">
          <div className="row justify-center">
            <div className="col-xl-10 col-lg-11">
              <div className="px-30 py-30 rounded-4 border-light">
                <TermsAndConditionsContent />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End terms and conditions section */}
    </>
  );
};

export default TermsAndConditions;